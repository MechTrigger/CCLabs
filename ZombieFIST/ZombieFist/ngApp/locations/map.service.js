var zombieApp;
(function (zombieApp) {
    var locations;
    (function (locations_1) {
        'use strict';
        var mapService = (function () {
            function mapService($http, $q, $rootScope) {
                this.$http = $http;
                this.$q = $q;
                this.$rootScope = $rootScope;
                //  default options
                //---------------------------------------
                this.zombiePopulation = 6;
                this.bigfootPopulation = 1;
                this.defaultLocationType = locations_1.locationType.supplies;
                this.defaultNewMarkerTitle = 'New Marker';
                this.defaultMapOptions = {
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
                this.randomMarkers = new Array();
                this.userMarkers = new Array();
            }
            // create the map.
            //---------------------------------------
            mapService.prototype.createMap = function (htmlId, locations, mapOptions) {
                var _this = this;
                // verify the map div exists
                var mapDiv = angular.element(htmlId)[0];
                if (mapDiv === undefined)
                    console.error('could not find html map element w/ an id of "' + htmlId + '"');
                // use default options except for whatever values were supplied
                var options = angular.extend({}, this.defaultMapOptions, mapOptions || {});
                // create the map
                this.map = new google.maps.Map(mapDiv, options);
                // set the map double-click event to add a marker
                this.map.addListener('dblclick', function (event) {
                    var lat = event.latLng.lat(), lng = event.latLng.lng();
                    var marker = _this.markerFromCoords(lat, lng, 'new marker', locations_1.locationType.supplies);
                    _this.setMarkerEvents(marker);
                    google.maps.event.trigger(marker, 'click');
                });
                // set the map resize handler
                this.map.addListener('bounds_changed', function () { return _this.refreshRandomMarkers(); });
                // add the locations if any were specified
                if (locations !== undefined && locations.length > 0) {
                    this.setLocations(locations);
                }
            };
            // register save callback
            //---------------------------------------
            mapService.prototype.onLocationChanged = function (callback) {
                this.saveCallback = callback;
            };
            // register delete callback
            //---------------------------------------
            mapService.prototype.onLocationDeleted = function (callback) {
                this.deleteCallback = callback;
            };
            // set the locations passed in
            //---------------------------------------
            mapService.prototype.setLocations = function (locations) {
                var _this = this;
                this.clearMarkers(this.userMarkers);
                angular.forEach(locations, function (location) {
                    var marker = _this.markerFromLocation(location);
                    _this.setMarkerEvents(marker);
                });
            };
            // create marker w/ coords
            //---------------------------------------
            mapService.prototype.markerFromCoords = function (lat, lng, title, itemType, id) {
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
            };
            // create marker w/ location
            //---------------------------------------
            mapService.prototype.markerFromLocation = function (location) {
                return this.markerFromCoords(location.latitude, location.longitude, location.title, location.locationType, location.id);
            };
            // wire up all of the events for a marker
            //---------------------------------------
            mapService.prototype.setMarkerEvents = function (marker) {
                var _this = this;
                var itemType = marker.get('locationType');
                // user cannot drag coder camps, zombies, or bigfoot around
                if (itemType !== locations_1.locationType.coderCamps && itemType !== locations_1.locationType.zombies && itemType !== locations_1.locationType.bigfoot) {
                    marker.addListener('dragend', function () { return _this.markerChanged(marker); });
                }
                marker.addListener('click', function () {
                    var infoWindow = new google.maps.InfoWindow();
                    if (itemType === locations_1.locationType.coderCamps) {
                        infoWindow.setContent('<div><img width="400" src="http://www.codercamps.com/images/codercamps-logo-01.svg"></div>');
                    }
                    else if (itemType === locations_1.locationType.bigfoot) {
                        infoWindow.setContent('<div><img width="400" src="http://images.fineartamerica.com/images-medium-large-5/sasquatch-road-trip-rich-legg.jpg" /></div>');
                    }
                    else if (itemType === locations_1.locationType.zombies) {
                        infoWindow.setContent('<div><img width="400" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS587OX56jamKnArh_6-lGpiBBKP1UQ7fxYwmaDhFZRw-KrQC4l" /></div>');
                    }
                    else {
                        var div = _this.getInfoWindowEditForm(marker);
                        infoWindow.setContent(div);
                    }
                    infoWindow.open(_this.map, marker);
                });
            };
            // set the type-specific display
            //---------------------------------------
            mapService.prototype.setIcon = function (marker) {
                var itemType = marker.get('locationType');
                switch (itemType) {
                    case locations_1.locationType.bigfoot:
                        marker.setIcon(new google.maps.MarkerImage('/content/images/mapicon_bigfoot.png', new google.maps.Size(48, 48), new google.maps.Point(0, 0), new google.maps.Point(24, 24), new google.maps.Size(48, 48)));
                        marker.setAnimation(google.maps.Animation.DROP);
                        break;
                    case locations_1.locationType.bugout:
                        marker.setIcon(new google.maps.MarkerImage('/content/images/mapicon_bugout.png', new google.maps.Size(48, 48), new google.maps.Point(0, 0), new google.maps.Point(24, 24), new google.maps.Size(48, 48)));
                        marker.setAnimation(google.maps.Animation.DROP);
                        break;
                    case locations_1.locationType.coderCamps:
                        marker.setIcon(new google.maps.MarkerImage('/content/images/mapicon_codercamps.png', new google.maps.Size(48, 48), new google.maps.Point(0, 0), new google.maps.Point(24, 24), new google.maps.Size(48, 48)));
                        marker.setAnimation(null);
                        break;
                    case locations_1.locationType.food:
                        marker.setIcon(new google.maps.MarkerImage('/content/images/mapicon_food.png', new google.maps.Size(48, 48), new google.maps.Point(0, 0), new google.maps.Point(24, 24), new google.maps.Size(48, 48)));
                        marker.setAnimation(google.maps.Animation.DROP);
                        break;
                    case locations_1.locationType.supplies:
                        marker.setIcon(new google.maps.MarkerImage('/content/images/mapicon_supplies.png', new google.maps.Size(48, 48), new google.maps.Point(0, 0), new google.maps.Point(24, 24), new google.maps.Size(48, 48)));
                        marker.setAnimation(google.maps.Animation.DROP);
                        break;
                    case locations_1.locationType.water:
                        marker.setIcon(new google.maps.MarkerImage('/content/images/mapicon_water.png', new google.maps.Size(48, 48), new google.maps.Point(0, 0), new google.maps.Point(24, 24), new google.maps.Size(48, 48)));
                        marker.setAnimation(google.maps.Animation.DROP);
                        break;
                    case locations_1.locationType.weapons:
                        marker.setIcon(new google.maps.MarkerImage('/content/images/mapicon_weapons.png', new google.maps.Size(48, 48), new google.maps.Point(0, 0), new google.maps.Point(24, 24), new google.maps.Size(48, 48)));
                        marker.setAnimation(google.maps.Animation.DROP);
                        break;
                    case locations_1.locationType.zombies:
                        marker.setIcon(new google.maps.MarkerImage('/content/images/mapicon_zombies.png', new google.maps.Size(48, 48), new google.maps.Point(0, 0), new google.maps.Point(24, 24), new google.maps.Size(48, 48)));
                        marker.setAnimation(google.maps.Animation.DROP);
                        break;
                }
                return marker;
            };
            // build edit location info window
            //---------------------------------------
            mapService.prototype.getInfoWindowEditForm = function (marker) {
                var _this = this;
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
                bugBtn.addEventListener('click', function () {
                    marker.set('locationType', locations_1.locationType.bugout);
                    _this.setIcon(marker);
                });
                btnDiv.appendChild(bugBtn);
                var weaponBtn = document.createElement('button');
                weaponBtn.id = 'zfiw_btn_weapon';
                weaponBtn.title = 'Weapon';
                weaponBtn.innerHTML = 'Weapon';
                weaponBtn.addEventListener('click', function () {
                    marker.set('locationType', locations_1.locationType.weapons);
                    _this.setIcon(marker);
                });
                btnDiv.appendChild(weaponBtn);
                var foodBtn = document.createElement('button');
                foodBtn.id = 'zfiw_btn_food';
                foodBtn.title = 'Food';
                foodBtn.innerHTML = 'Food';
                foodBtn.addEventListener('click', function () {
                    marker.set('locationType', locations_1.locationType.food);
                    _this.setIcon(marker);
                });
                btnDiv.appendChild(foodBtn);
                var waterBtn = document.createElement('button');
                waterBtn.id = 'zfiw_btn_water';
                waterBtn.title = 'Water';
                waterBtn.innerHTML = 'Water';
                waterBtn.addEventListener('click', function () {
                    marker.set('locationType', locations_1.locationType.water);
                    _this.setIcon(marker);
                });
                btnDiv.appendChild(waterBtn);
                var supplyBtn = document.createElement('button');
                supplyBtn.id = 'zfiw_btn_supply';
                supplyBtn.innerText = 'Supplies';
                supplyBtn.innerHTML = 'Supplies';
                supplyBtn.addEventListener('click', function () {
                    marker.set('locationType', locations_1.locationType.supplies);
                    _this.setIcon(marker);
                });
                btnDiv.appendChild(supplyBtn);
                var inputDiv = document.createElement('div');
                inputDiv.id = 'zfiw_input_wrapper';
                var textBox = document.createElement('input');
                textBox.id = 'zfiw_textbox';
                textBox.type = 'text';
                textBox.value = marker.getTitle();
                textBox.addEventListener('change', function () { return marker.setTitle(textBox.value); });
                var saveBtn = document.createElement('button');
                saveBtn.id = 'zfiw_save';
                saveBtn.innerText = 'Save';
                saveBtn.addEventListener('click', function () { return _this.markerChanged(marker); });
                var deleteBtn = document.createElement('button');
                deleteBtn.id = 'zfiw_delete';
                deleteBtn.innerText = 'Delete';
                deleteBtn.addEventListener('click', function () {
                    marker.setMap(null);
                    _this.markerDeleted(marker);
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
            };
            // refresh random Markers
            //---------------------------------------
            mapService.prototype.refreshRandomMarkers = function () {
                var newBounds = this.map.getBounds();
                var newZoom = this.map.getZoom();
                var needsRefresh = false;
                if (this.lastBounds === undefined) {
                    needsRefresh = true;
                }
                else {
                    if (newZoom !== this.lastZoom || !this.lastBounds.intersects(newBounds)) {
                        needsRefresh = true;
                        this.lastBounds = newBounds;
                        this.lastZoom = newZoom;
                    }
                }
                if (needsRefresh) {
                    this.clearMarkers(this.randomMarkers);
                    this.makeRandomMarkersForType(this.zombiePopulation, 'zombie', locations_1.locationType.zombies);
                    this.makeRandomMarkersForType(this.bigfootPopulation, 'bigfoot', locations_1.locationType.bigfoot);
                    this.lastBounds = this.map.getBounds();
                }
            };
            // clear either user or random markers
            //---------------------------------------
            mapService.prototype.clearMarkers = function (markers) {
                for (var i = 0; i < this.randomMarkers.length; i++) {
                    markers[i].setMap(null);
                }
                this.randomMarkers = new Array();
            };
            // make a # of random markers by type
            //---------------------------------------
            mapService.prototype.makeRandomMarkersForType = function (count, name, itemType) {
                var bounds = this.map.getBounds();
                var southWest = bounds.getSouthWest();
                var northEast = bounds.getNorthEast();
                var lngSpan = northEast.lng() - southWest.lng();
                var latSpan = northEast.lat() - southWest.lat();
                var i;
                for (i = 0; i < count; i++) {
                    var lat = southWest.lat() + latSpan * Math.random();
                    var lng = southWest.lng() + lngSpan * Math.random();
                    var title = name + ' #' + i + 1;
                    var marker = this.markerFromCoords(lat, lng, title, itemType);
                    this.setIcon(marker);
                    this.setMarkerEvents(marker);
                    this.randomMarkers.push(marker);
                }
            };
            // create a location from a marker
            //---------------------------------------
            mapService.prototype.locationFromMarker = function (marker) {
                var id = marker.get('locationId');
                var title = marker.getTitle();
                var lat = marker.getPosition().lat();
                var lng = marker.getPosition().lng();
                var locationType = marker.get('locationType');
                return new locations_1.locationVm(id, title, lat, lng, locationType);
            };
            // save handler
            //---------------------------------------
            mapService.prototype.markerChanged = function (marker) {
                var _this = this;
                marker = this.setIcon(marker);
                if (this.saveCallback !== undefined) {
                    var location = this.locationFromMarker(marker);
                    // Have to wrap this w/ $rootScope.$apply() so that angular proceses
                    // can update based on changes that happened outside angular (in google maps)
                    // http://stackoverflow.com/questions/20805534/why-doesnt-angular-ignore-subsequent-digest-invocations
                    this.$rootScope.$apply(function () {
                        _this.saveCallback(location).then(function (id) { return marker.set('locationId', id); });
                    });
                }
            };
            // delete handler
            //---------------------------------------
            mapService.prototype.markerDeleted = function (marker) {
                var _this = this;
                var location = this.locationFromMarker(marker);
                if (this.deleteCallback !== undefined) {
                    // Have to wrap this w/ $rootScope.$apply() so that angular proceses
                    // can update based on changes that happened outside angular (in google maps)
                    // http://stackoverflow.com/questions/20805534/why-doesnt-angular-ignore-subsequent-digest-invocations
                    this.$rootScope.$apply(function () {
                        _this.deleteCallback(location);
                    });
                }
            };
            mapService.$inject = ['$http', '$q', '$rootScope'];
            return mapService;
        })();
        locations_1.mapService = mapService;
        angular.module('zombieApp').service('mapService', mapService);
    })(locations = zombieApp.locations || (zombieApp.locations = {}));
})(zombieApp || (zombieApp = {}));
//# sourceMappingURL=map.service.js.map