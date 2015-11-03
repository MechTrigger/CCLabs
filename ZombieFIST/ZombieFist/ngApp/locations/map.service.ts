namespace zombieApp.locations {
    'use strict';


    // interface used by the save and delete methods to communicate back w/ the controller
    export interface ILocationChanged {
        (location: locationVm): ng.IPromise<number>;
    }


    export interface IMapService {
        createMap(htmlId: string, locations?: Array<locationVm>, mapOptions?: google.maps.MapOptions);
        onLocationChanged(callback: ILocationChanged);
        onLocationDeleted(callback: ILocationChanged);
        setLocations(locations: Array<locationVm>);
    }


    export class mapService implements IMapService {
        static $inject: string[] = ['$http', '$q', '$rootScope'];

        constructor(private $http: ng.IHttpService, private $q: ng.IQService, private $rootScope: ng.IRootScopeService) {
            this.randomMarkers = new Array<google.maps.Marker>();
            this.userMarkers = new Array<google.maps.Marker>();
        }

        //  map, marker, and callback references
        //---------------------------------------
        private map: google.maps.Map;
        private randomMarkers: Array<google.maps.Marker>;
        private userMarkers: Array<google.maps.Marker>;
        private saveCallback: ILocationChanged;
        private deleteCallback: ILocationChanged;
        private lastBounds: google.maps.LatLngBounds;
        private lastZoom: number;

        //  default options
        //---------------------------------------
        private zombiePopulation: number = 6;
        private bigfootPopulation: number = 1;
        private defaultLocationType: locationType = locationType.supplies;
        private defaultNewMarkerTitle: string = 'New Marker';


        private defaultMapOptions: google.maps.MapOptions = {
            center: new google.maps.LatLng(48.119720154066194, -121.89085013582616),
            zoom: 3,
            disableDoubleClickZoom: true,
            mapTypeId: google.maps.MapTypeId.HYBRID,
            mapTypeControlOptions: {
                style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
                position: google.maps.ControlPosition.TOP_LEFT,
                mapTypeIds: [
                    google.maps.MapTypeId.ROADMAP,
                    google.maps.MapTypeId.TERRAIN,
                    google.maps.MapTypeId.HYBRID,
                    google.maps.MapTypeId.SATELLITE
                ]
            }
        };

        // create the map.
        //---------------------------------------
        createMap(htmlId: string, locations?: Array<locationVm>, mapOptions?: google.maps.MapOptions) {

            // verify the map div exists
            var mapDiv = angular.element(htmlId)[0];
            if (mapDiv === undefined)
                console.error('could not find html map element w/ an id of "' + htmlId + '"');

            // use default options except for whatever values were supplied
            var options = angular.extend({}, this.defaultMapOptions, mapOptions || {});

            // create the map
            this.map = new google.maps.Map(mapDiv, options);

            // set the map double-click event to add a marker
            this.map.addListener('dblclick', event => {

                var lat = event.latLng.lat(), lng = event.latLng.lng();
                var marker = this.markerFromCoords(lat, lng, 'new marker', locationType.supplies);
                this.setMarkerEvents(marker); 
                google.maps.event.trigger(marker, 'click');
            });

            // set the map resize handler
            this.map.addListener('bounds_changed', () => this.refreshRandomMarkers());

            // add the locations if any were specified
            if (locations !== undefined && locations.length > 0) {
                this.setLocations(locations);
            }
        }

        // register save callback
        //---------------------------------------
        onLocationChanged(callback: ILocationChanged) {
            this.saveCallback = callback;
        }

        // register delete callback
        //---------------------------------------
        onLocationDeleted(callback: ILocationChanged) {
            this.deleteCallback = callback;
        }

        // set the locations passed in
        //---------------------------------------
        setLocations(locations?: Array<locationVm>) {

            this.clearMarkers(this.userMarkers);

            angular.forEach(locations, (location) => {

                var marker = this.markerFromLocation(location);
                this.setMarkerEvents(marker);
            });
        }

        // create marker w/ coords
        //---------------------------------------
        private markerFromCoords(lat: number, lng: number, title?: string, itemType?: locationType, id?: number): google.maps.Marker {

            var _id = id || 0;
            var _title = title || this.defaultNewMarkerTitle;
            var _type = itemType || this.defaultLocationType;

            var marker = new google.maps.Marker({
                position: new google.maps.LatLng(lat, lng),
                draggable: true,
                clickable: true,
                map: this.map,
                title: _title
            });

            marker.set('locationId', _id);
            marker.set('locationType', _type);
            marker = this.setIcon(marker);

            this.userMarkers.push(marker);

            return marker;
        }

        // create marker w/ location
        //---------------------------------------
        private markerFromLocation(location: locationVm): google.maps.Marker {

            return this.markerFromCoords(location.latitude,
                                         location.longitude,
                                         location.title,
                                         location.locationType,
                                         location.id);
        }

        // wire up all of the events for a marker
        //---------------------------------------
        private setMarkerEvents(marker: google.maps.Marker): void {

            var itemType = <locationType>marker.get('locationType');

            // user cannot drag coder camps, zombies, or bigfoot around
            if (itemType !== locationType.coderCamps && itemType !== locationType.zombies && itemType !== locationType.bigfoot) {
                marker.addListener('dragend', () => this.markerChanged(marker));
            }

            marker.addListener('click', () => {
                var infoWindow = new google.maps.InfoWindow();

                if (itemType === locationType.coderCamps) {
                    infoWindow.setContent('<div><img width="400" src="http://www.codercamps.com/images/codercamps-logo-01.svg"></div>');

                } else if (itemType === locationType.bigfoot) {
                    infoWindow.setContent('<div><img width="400" src="http://images.fineartamerica.com/images-medium-large-5/sasquatch-road-trip-rich-legg.jpg" /></div>');

                } else if (itemType === locationType.zombies) {
                    infoWindow.setContent('<div><img width="400" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS587OX56jamKnArh_6-lGpiBBKP1UQ7fxYwmaDhFZRw-KrQC4l" /></div>');

                } else {
                    var div = this.getInfoWindowEditForm(marker);
                    infoWindow.setContent(div);
                }

                infoWindow.open(this.map, marker);
            });
        }

        // set the type-specific display
        //---------------------------------------
        private setIcon(marker: google.maps.Marker): google.maps.Marker {

            let itemType = <locationType>marker.get('locationType');

            switch (itemType) {
                case locationType.bigfoot:
                    marker.setIcon(new google.maps.MarkerImage(
                        '/content/images/mapicon_bigfoot.png',
                        new google.maps.Size(48, 48),
                        new google.maps.Point(0, 0),
                        new google.maps.Point(24, 24),
                        new google.maps.Size(48, 48)
                    ));
                    marker.setAnimation(google.maps.Animation.DROP);
                    break;

                case locationType.bugout:
                    marker.setIcon(new google.maps.MarkerImage(
                        '/content/images/mapicon_bugout.png',
                        new google.maps.Size(48, 48),
                        new google.maps.Point(0, 0),
                        new google.maps.Point(24, 24),
                        new google.maps.Size(48, 48)
                    ));
                    marker.setAnimation(google.maps.Animation.DROP);
                    break;

                case locationType.coderCamps:
                    marker.setIcon(new google.maps.MarkerImage(
                        '/content/images/mapicon_codercamps.png',
                        new google.maps.Size(48, 48),
                        new google.maps.Point(0, 0),
                        new google.maps.Point(24, 24),
                        new google.maps.Size(48, 48)
                    ));
                    marker.setAnimation(null);
                    break;

                case locationType.food:
                    marker.setIcon(new google.maps.MarkerImage(
                        '/content/images/mapicon_food.png',
                        new google.maps.Size(48, 48),
                        new google.maps.Point(0, 0),
                        new google.maps.Point(24, 24),
                        new google.maps.Size(48, 48)
                    ));
                    marker.setAnimation(google.maps.Animation.DROP);
                    break;

                case locationType.supplies:
                    marker.setIcon(new google.maps.MarkerImage(
                        '/content/images/mapicon_supplies.png',
                        new google.maps.Size(48, 48),
                        new google.maps.Point(0, 0),
                        new google.maps.Point(24, 24),
                        new google.maps.Size(48, 48)
                    ));
                    marker.setAnimation(google.maps.Animation.DROP);
                    break;

                case locationType.water:
                    marker.setIcon(new google.maps.MarkerImage(
                        '/content/images/mapicon_water.png',
                        new google.maps.Size(48, 48),
                        new google.maps.Point(0, 0),
                        new google.maps.Point(24, 24),
                        new google.maps.Size(48, 48)
                    ));
                    marker.setAnimation(google.maps.Animation.DROP);
                    break;

                case locationType.weapons:
                    marker.setIcon(new google.maps.MarkerImage(
                        '/content/images/mapicon_weapons.png',
                        new google.maps.Size(48, 48),
                        new google.maps.Point(0, 0),
                        new google.maps.Point(24, 24),
                        new google.maps.Size(48, 48)
                    ));
                    marker.setAnimation(google.maps.Animation.DROP);
                    break;

                case locationType.zombies:
                    marker.setIcon(new google.maps.MarkerImage(
                        '/content/images/mapicon_zombies.png',
                        new google.maps.Size(48, 48),
                        new google.maps.Point(0, 0),
                        new google.maps.Point(24, 24),
                        new google.maps.Size(48, 48)
                    ));
                    marker.setAnimation(google.maps.Animation.DROP);
                    break;
            }

            return marker;
        }

        // build edit location info window
        //---------------------------------------
        private getInfoWindowEditForm(marker: google.maps.Marker): Node {

            var imgDiv = document.createElement('div');
            imgDiv.id = 'zfiw_img_wrapper';

            var img = document.createElement('img');
            var lat = marker.getPosition().lat();
            var lng = marker.getPosition().lng();

            img.src = 'https://maps.googleapis.com/maps/api/streetview?size=400x250&location=' + lat + ',' + lng;
            img.width = 400;
            img.height = 250;
            img.id = 'zfiw_img_streetview';
            imgDiv.appendChild(img);

            var btnDiv = document.createElement('div');
            btnDiv.id = 'zfiw_btn_wrapper';

            var bugBtn = document.createElement('button');
            bugBtn.id = 'zfiw_btn_bugout';
            bugBtn.title = 'Bug Out';
            bugBtn.innerHTML = 'Bug Out';
            bugBtn.addEventListener('click', () => {
                marker.set('locationType', locationType.bugout);
                this.setIcon(marker);
            });
            btnDiv.appendChild(bugBtn);

            var weaponBtn = document.createElement('button');
            weaponBtn.id = 'zfiw_btn_weapon';
            weaponBtn.title = 'Weapon';
            weaponBtn.innerHTML = 'Weapon';
            weaponBtn.addEventListener('click', () => {
                marker.set('locationType', locationType.weapons);
                this.setIcon(marker);
            });
            btnDiv.appendChild(weaponBtn);

            var foodBtn = document.createElement('button');
            foodBtn.id = 'zfiw_btn_food';
            foodBtn.title = 'Food';
            foodBtn.innerHTML = 'Food';
            foodBtn.addEventListener('click', () => {
                marker.set('locationType', locationType.food);
                this.setIcon(marker);
            });
            btnDiv.appendChild(foodBtn);

            var waterBtn = document.createElement('button');
            waterBtn.id = 'zfiw_btn_water';
            waterBtn.title = 'Water';
            waterBtn.innerHTML = 'Water';
            waterBtn.addEventListener('click', () => {
                marker.set('locationType', locationType.water);
                this.setIcon(marker);
            });
            btnDiv.appendChild(waterBtn);

            var supplyBtn = document.createElement('button');
            supplyBtn.id = 'zfiw_btn_supply';
            supplyBtn.innerText = 'Supplies';
            supplyBtn.innerHTML = 'Supplies';
            supplyBtn.addEventListener('click', () => {
                marker.set('locationType', locationType.supplies);
                this.setIcon(marker);
            });
            btnDiv.appendChild(supplyBtn);


            var inputDiv = document.createElement('div');
            inputDiv.id = 'zfiw_input_wrapper';

            var textBox = document.createElement('input');
            textBox.id = 'zfiw_textbox';
            textBox.type = 'text';
            textBox.value = marker.getTitle();
            textBox.addEventListener('change', () => marker.setTitle(textBox.value));

            var saveBtn = document.createElement('button');
            saveBtn.id = 'zfiw_save';
            saveBtn.innerText = 'Save';
            saveBtn.addEventListener('click', () => this.markerChanged(marker));

            var deleteBtn = document.createElement('button');
            deleteBtn.id = 'zfiw_delete';
            deleteBtn.innerText = 'Delete';
            deleteBtn.addEventListener('click', () => {
                marker.setMap(null);
                this.markerDeleted(marker);
            });

            inputDiv.appendChild(textBox);
            inputDiv.appendChild(saveBtn);
            inputDiv.appendChild(deleteBtn);

            var container = document.createElement('div');
            container.id = 'zfiw_wrapper';
            container.appendChild(imgDiv);
            container.appendChild(btnDiv);
            container.appendChild(inputDiv);

            return container;
        }

        // refresh random Markers
        //---------------------------------------
        private refreshRandomMarkers(): void {

            var newBounds = this.map.getBounds();
            var newZoom = this.map.getZoom();

            let needsRefresh = false; 
            if (this.lastBounds === undefined) {
                needsRefresh = true;

            } else {
                if (newZoom !== this.lastZoom || !this.lastBounds.intersects(newBounds)) {
                    needsRefresh = true;
                    this.lastBounds = newBounds;
                    this.lastZoom = newZoom;
                }
            }

            if (needsRefresh) {

                this.clearMarkers(this.randomMarkers);
                this.makeRandomMarkersForType(this.zombiePopulation, 'zombie', locationType.zombies);
                this.makeRandomMarkersForType(this.bigfootPopulation, 'bigfoot', locationType.bigfoot);
                this.lastBounds = this.map.getBounds();
            }
        }

        // clear either user or random markers
        //---------------------------------------
        private clearMarkers(markers: Array<google.maps.Marker>): void {

            for (var i = 0; i < this.randomMarkers.length; i++) {
                markers[i].setMap(null);
            }
            this.randomMarkers = new Array<google.maps.Marker>();
        }

        // make a # of random markers by type
        //---------------------------------------
        private makeRandomMarkersForType(count: number, name: string, itemType: locationType): void {

            let bounds = this.map.getBounds();
            let southWest = bounds.getSouthWest();
            let northEast = bounds.getNorthEast();
            let lngSpan = northEast.lng() - southWest.lng();
            let latSpan = northEast.lat() - southWest.lat();
            var i: number;

            for (i = 0; i < count; i++) {

                let lat = southWest.lat() + latSpan * Math.random();
                let lng = southWest.lng() + lngSpan * Math.random();
                let title = name + ' #' + i + 1;

                var marker = this.markerFromCoords(lat, lng, title, itemType);
                this.setIcon(marker);
                this.setMarkerEvents(marker);


                this.randomMarkers.push(marker);
            }
        }

        // create a location from a marker
        //---------------------------------------
        private locationFromMarker(marker: google.maps.Marker): locationVm {

            var id = marker.get('locationId');
            var title = marker.getTitle();
            var lat = marker.getPosition().lat();
            var lng = marker.getPosition().lng();
            var locationType = marker.get('locationType');

            return new locationVm(id, title, lat, lng, locationType);
        }

        // save handler
        //---------------------------------------
        private markerChanged(marker: google.maps.Marker): void {
            marker = this.setIcon(marker);

            if (this.saveCallback !== undefined) {
                var location = this.locationFromMarker(marker);

                // Have to wrap this w/ $rootScope.$apply() so that angular proceses
                // can update based on changes that happened outside angular (in google maps)
                // http://stackoverflow.com/questions/20805534/why-doesnt-angular-ignore-subsequent-digest-invocations
                this.$rootScope.$apply(() => {
                    this.saveCallback(location).then(id => marker.set('locationId', id));
                });
            }
        }

        // delete handler
        //---------------------------------------
        private markerDeleted(marker: google.maps.Marker): void {
            var location = this.locationFromMarker(marker);

            if (this.deleteCallback !== undefined) {

                // Have to wrap this w/ $rootScope.$apply() so that angular proceses
                // can update based on changes that happened outside angular (in google maps)
                // http://stackoverflow.com/questions/20805534/why-doesnt-angular-ignore-subsequent-digest-invocations
                this.$rootScope.$apply(() => {
                    this.deleteCallback(location);
                });
            }
        }
    }

    angular.module('zombieApp').service('mapService', mapService);
} 