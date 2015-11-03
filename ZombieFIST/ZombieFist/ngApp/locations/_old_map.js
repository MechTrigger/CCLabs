// wrap the code in a variable that acts like a namespace
// so that it doesn't run on load and instead we can load it
// when we want to.
var victor = victor || {};
victor.maps = victor.maps || {};

victor.maps.initialize = function () {

    console.log('initalizing');
    var map;
    var initialZoom;
    var elevationService;
    var geocoder;

    //Must have at least zoom & center to work
    function init() {
        //------------------------------------------------------------------------------------
        //========================== JSON an array of styles below========================

        var styles = [
        {
            "stylers": [
                {
                    "hue": "#baf4c4"
                },
                {
                    "saturation": 10
                }
            ]
        },
        {
            "featureType": "water",
            "stylers": [
                {
                    "color": "#effefd"
                }
            ]
        },
        {
            "featureType": "all",
            "elementType": "labels",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "administrative",
            "elementType": "labels",
            "stylers": [
                {
                    "visibility": "on"
                }
            ]
        },
        {
            "featureType": "road",
            "elementType": "all",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "transit",
            "elementType": "all",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        }
        ];

        //=============================================================================
        // Create a new StyledMapType object, passing it the array of styles,
        // as well as the name to be displayed on the map type control.
        var styledMap = new google.maps.StyledMapType(styles,
          { name: "Zombie Maps.     " });
        //=============================================================================//dragable marker
        // Dragable markers, add here at line 90 and 132,
        var myLatlng = new google.maps.LatLng(48.372127563769325, -117.92478568270114); //buggout
        var myLatlng2 = new google.maps.LatLng(47.76386240369889, -117.91522092535403); //defense
        var myLatlng3 = new google.maps.LatLng(47.136182663368174, -117.8995997400513); //food
        var myLatlng4 = new google.maps.LatLng(48.372127563769325, -117.92478568270114); //buggout2
        var myLatlng5 = new google.maps.LatLng(47.76386240369889, -117.91522092535403); //defense2
        var myLatlng6 = new google.maps.LatLng(47.136182663368174, -117.8995997400513); //food2
        var myLatlng13 = new google.maps.LatLng(48.372127563769325, -117.92478568270114); //buggout5
        var myLatlng14 = new google.maps.LatLng(47.76386240369889, -117.91522092535403); //defense5
        var myLatlng15 = new google.maps.LatLng(47.136182663368174, -117.8995997400513); //food5
        //original 9 Above
        var myLatlng7 = new google.maps.LatLng(48.86575367028046, -125.30355341150668); //buggout3 top left group
        var myLatlng8 = new google.maps.LatLng(49.248605954881185, -125.2869317622414); //defense3
        var myLatlng9 = new google.maps.LatLng(49.12271810182605, -125.85400170996097); //food3
        var myLatlng10 = new google.maps.LatLng(49.42647058481456, -120.1878727169266); //buggout4 top center group
        var myLatlng11 = new google.maps.LatLng(49.448951213266476, -120.7386831135979); //defense4
        var myLatlng12 = new google.maps.LatLng(49.04387903007716, -120.3605023713341); //food4

        var mapOptions = {
            center: new google.maps.LatLng(48.119720154066194, -121.89085013582616), // Initial Loading View maybe?
            zoom: 3, // Initial Loading Zoom
            center: myLatlng, //dragable marker

            mapTypeId: google.maps.MapTypeId.HYBRID,
            mapTypeControl: true,
            scaleControl: true,
            panControl: true,
            streetViewControl: true,
            rotateControl: true,
            overViewMapControl: true,
            keyboardShortcuts: true,

            mapTypeControlOptions: {
                mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'map_style'],
                style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
                position: google.maps.ControlPosition.TOP_RIGHT,
                mapTypeIds: [
                  google.maps.MapTypeId.ROADMAP,
                  google.maps.MapTypeId.TERRAIN,
                  google.maps.MapTypeId.HYBRID,
                  google.maps.MapTypeId.SATELLITE,
                  'map_style',

                ]

            }
        };
        map = new google.maps.Map(document.getElementById('mapDiv'), mapOptions);
        console.log('mapDiv', document.getElementById('mapDiv'));
        // uncoment line 122-123 then commment 125-126, then add your new jason array above
        //Associate the styled map with the MapTypeId and set it to display.
        //map.mapTypes.set('map_style', styledMap);
        //map.setMapTypeId('map_style');
        map.mapTypes.set('map_style', styledMap);
        mapTypeId: google.maps.MapTypeId.SATELLITE

        //--------------------------Dragable markers below----------------------------------------  ------------------------------
        //bugout orignal 9
        var image = "http://i.imgur.com/eVpp8aG.png";
        var marker = new google.maps.Marker({
            icon: image,
            zoom: 18,
            position: myLatlng,
            map: map,
            draggable: true,
            title: "Bugout Location",
            animation: google.maps.Animation.DROP,


        });

        // defense orignal 9
        var image = "http://i.imgur.com/6BKwrh8.png";
        var marker = new google.maps.Marker({
            icon: image,
            zoom: 18,
            position: myLatlng2,
            map: map,
            draggable: true,
            title: "Defense",
            animation: google.maps.Animation.DROP,
        });

        //food orignal 9
        var image = "http://i.imgur.com/nc4wZAU.png";
        var marker = new google.maps.Marker({
            icon: image,
            zoom: 18,
            position: myLatlng3,
            map: map,
            draggable: true,
            title: "Food",
            animation: google.maps.Animation.DROP,
        });

        //bugout2 orignal 9
        var image = "http://i.imgur.com/eVpp8aG.png";
        var marker = new google.maps.Marker({
            icon: image,
            zoom: 18,
            position: myLatlng,
            map: map,
            draggable: true,
            title: "Bugout Location",
            animation: google.maps.Animation.DROP,

        });

        //defense2 orignal 9
        var image = "http://i.imgur.com/6BKwrh8.png";
        var marker = new google.maps.Marker({
            icon: image,
            zoom: 18,
            position: myLatlng2,
            map: map,
            draggable: true,
            title: "Defense",
            animation: google.maps.Animation.DROP,
        });

        //food2 orignal 9
        var image = "http://i.imgur.com/nc4wZAU.png";
        var marker = new google.maps.Marker({
            icon: image,
            zoom: 18,
            position: myLatlng3,
            map: map,
            draggable: true,
            title: "Food",
            animation: google.maps.Animation.DROP,
        });

        //bugout3 top left group
        var image = "http://i.imgur.com/eVpp8aG.png";
        var marker = new google.maps.Marker({
            icon: image,
            zoom: 18,
            position: myLatlng7,
            map: map,
            draggable: true,
            title: "Bugout Location",
            animation: google.maps.Animation.DROP,

        });

        // defense3 top left group
        var image = "http://i.imgur.com/6BKwrh8.png";
        var marker = new google.maps.Marker({
            icon: image,
            zoom: 18,
            position: myLatlng8,
            map: map,
            draggable: true,
            title: "Defense",
            animation: google.maps.Animation.DROP,
        });

        //food3 top left group
        var image = "http://i.imgur.com/nc4wZAU.png";
        var marker = new google.maps.Marker({
            icon: image,
            zoom: 18,
            position: myLatlng9,
            map: map,
            draggable: true,
            title: "Food",
            animation: google.maps.Animation.DROP,
        });

        //bugout4 top center group
        var image = "http://i.imgur.com/eVpp8aG.png";
        var marker = new google.maps.Marker({
            icon: image,
            zoom: 18,
            position: myLatlng10,
            map: map,
            draggable: true,
            title: "Bugout Location",
            animation: google.maps.Animation.DROP,

        });

        // defense4 top center group
        var image = "http://i.imgur.com/6BKwrh8.png";
        var marker = new google.maps.Marker({
            icon: image,
            zoom: 18,
            position: myLatlng11,
            map: map,
            draggable: true,
            title: "Defense",
            animation: google.maps.Animation.DROP,
        });

        //food4 top center group
        var image = "http://i.imgur.com/nc4wZAU.png";
        var marker = new google.maps.Marker({
            icon: image,
            zoom: 18,
            position: myLatlng12,
            map: map,
            draggable: true,
            title: "Food",
            animation: google.maps.Animation.DROP,
        });


        //bugout5 orignal 9
        var image = "http://i.imgur.com/eVpp8aG.png";
        var marker = new google.maps.Marker({
            icon: image,
            zoom: 18,
            position: myLatlng13,
            map: map,
            draggable: true,
            title: "Bugout Location",
            animation: google.maps.Animation.DROP,

        });

        // defense5 orignal 9
        var image = "http://i.imgur.com/6BKwrh8.png";
        var marker = new google.maps.Marker({
            icon: image,
            zoom: 18,
            position: myLatlng14,
            map: map,
            draggable: true,
            title: "Defense",
            animation: google.maps.Animation.DROP,
        });

        //food5 orignal 9
        var image = "http://i.imgur.com/nc4wZAU.png";
        var marker = new google.maps.Marker({
            icon: image,
            zoom: 18,
            position: myLatlng15,
            map: map,
            draggable: true,
            title: "Food",
            animation: google.maps.Animation.DROP,
        });


        //-----------------------------------------------------------------------------------------End of Style Code for Map

        addButtons();
        addCircle();
        addCircle2();
        addCircle3();
        addCircle4();
        addCircle5();
        addCircle6();
        addCircle7();
        addCircle8();
        addCircle9();
        addMarkers();
        addMarkers2();
        addMarkers3();
        addMarkers4();
        addMarkers5();

        addPolyline();
        addEditablePolygon();
        addDraggableRectangle();
        //addKmlLayer();
        //addGeoJSONDataLayer();
        addElevationService();
        addGeocodingService();
        //addGoToInitialExtent();
        addShowCoords();

    }


    google.maps.event.addDomListener(window, "load", init);

    function addButtons() {

        console.log('btnTerrain', document.getElementById('btnTerrain'));
        console.log('btnHybrid', document.getElementById('btnHybrid'));
        console.log('btnRoadmap', document.getElementById('btnRoadmap'));
        console.log('btnSatellite', document.getElementById('btnSatellite'));

        document.getElementById('btnTerrain').addEventListener('click', function () {
            map.setMapTypeId(google.maps.MapTypeId.TERRAIN);
        });
        document.getElementById('btnHybrid').addEventListener('click', function () {
            map.setMapTypeId(google.maps.MapTypeId.HYBRID);
        });
        document.getElementById('btnRoadmap').addEventListener('click', function () {
            map.setMapTypeId(google.maps.MapTypeId.ROADMAP);
        });
        document.getElementById('btnSatellite').addEventListener('click', function () {
            map.setMapTypeId(google.maps.MapTypeId.SATELLITE);
        });


    }

    //function addGroundOverlay() {

    //    var imageBounds = new google.maps.LatLngBounds(
    //            new google.maps.LatLng(53.178521, -3.438549),
    //            new google.maps.LatLng(53.194979, -3.390613));
    //    var historicalOverlay = new google.maps.GroundOverlay(
    //            'http://localhost:8080/gmaps/images/denbigh.jpg',
    //            imageBounds);
    //    historicalOverlay.setMap(map);
    //}

    //====================================================================== Makers ================================================================

    function addMarkers() {
        //tacoma
        var image = "http://i.imgur.com/a6aiEwX.png";
        var centerMarker = new google.maps.Marker({
            icon: image,
            position: new google.maps.LatLng(47.23565393158508, -122.46094293310546),
            map: map,
            title: "Choose wisly",
            animation: google.maps.Animation.BOUNCE,
        });

        var contentString = '<div id="content">' +
              '<div id="siteNotice">' +
              '</div>' +
              '<div id="bodyContent">' +
              '<img src="http://i.imgur.com/aJPSHpr.jpg"/>' +
              '<p>Back to <a href="http://dev-zombiefist.azurewebsites.net/">ZombieFist</a>' +
              '</div>' +
              '</div>';

        var infowindow = new google.maps.InfoWindow({
            content: contentString
        });

        google.maps.event.addListener(centerMarker, 'click', function () {
            infowindow.open(map, centerMarker);
        });

        var pubMarker = new google.maps.Marker({                                                         // <== CoderCamps
            // icon: image,
            icon: 'http://i.imgur.com/X9soJmi.png',
            position: new google.maps.LatLng(47.66973856375987, -122.11834843200688),
            map: map,
            title: "Stay hydrated",
            animation: google.maps.Animation.DROP,
        });

    }

    // Arlington // Home Icon
    function addMarkers2() {

        var image = "http://i.imgur.com/o9aGqDv.png ";
        var centerMarker = new google.maps.Marker({
            icon: image,

            position: new google.maps.LatLng(45.875129249373394, -122.04020089819339),                   // <== BigFoot
            map: map,
            title: "Master Bugout Location",
            animation: google.maps.Animation.DROP,
        });

        var contentString = '<div id="content">' +
                '<div id="siteNotice">' +
                '</div>' +
                '<div id="bodyContent">' +
                '<img src="https://s-media-cache-ak0.pinimg.com/736x/04/17/18/041718df30180558e619761e44362aaa.jpg""/>' +
                '<p>Back to <a href="http://dev-zombiefist.azurewebsites.net/">ZombieFist</a>' +
                '</div>' +
                '</div>';

        var infowindow = new google.maps.InfoWindow({
            content: contentString
        });

        google.maps.event.addListener(centerMarker, 'click', function () {
            infowindow.open(map, centerMarker);
        });

        var pubMarker = new google.maps.Marker({
            //  icon: image,
            position: new google.maps.LatLng(47.12796405479038, -123.66291589453124),
            map: map,
            title: "Check the back seat"
        });

    }


    // Neah 
    function addMarkers3() {

        var image = "http://i.imgur.com/a6aiEwX.png";
        var centerMarker = new google.maps.Marker({
            icon: image,
            position: new google.maps.LatLng(48.30683094643776, -124.55962314038084),
            map: map,
            title: "Stay in shape",
            animation: google.maps.Animation.BOUNCE,
        });

        var contentString = '<div id="content">' +
                '<div id="siteNotice">' +
                '</div>' +
                '<div id="bodyContent">' +
                '<img src="http://i.imgur.com/Nf25Iml.jpg"/>' +
                '<p>Back to <a href="http://dev-zombiefist.azurewebsites.net/">ZombieFist</a>' +
                '</div>' +
                '</div>';

        var infowindow = new google.maps.InfoWindow({
            content: contentString
        });

        google.maps.event.addListener(centerMarker, 'click', function () {
            infowindow.open(map, centerMarker);
        });

        var pubMarker = new google.maps.Marker({
            //  icon: image,
            position: new google.maps.LatLng(48.15360284864125, -123.92384118749999),
            map: map,
            title: "Stay alert, stay alive",
            animation: google.maps.Animation.DROP,
        });

    }

    // East border
    function addMarkers4() {

        var image = "http://i.imgur.com/a6aiEwX.png";
        var centerMarker = new google.maps.Marker({
            icon: image,
            position: new google.maps.LatLng(47.744747645234646, -121.01177758886718),
            map: map,
            title: "Aim for the head",
            animation: google.maps.Animation.BOUNCE,
        });

        var contentString = '<div id="content">' +
                '<div id="siteNotice">' +
                '</div>' +
                '<div id="bodyContent">' +
                '<img src="http://i.imgur.com/TcICyAi.jpg"/>' +
                '<p>Back to <a href="http://dev-zombiefist.azurewebsites.net/">ZombieFist</a>' +
                '</div>' +
                '</div>';

        var infowindow = new google.maps.InfoWindow({
            content: contentString
        });

        google.maps.event.addListener(centerMarker, 'click', function () {
            infowindow.open(map, centerMarker);
        });

        var pubMarker = new google.maps.Marker({
            //  icon: image,
            position: new google.maps.LatLng(46.53598842807456, -122.93859071447753),
            map: map,
            title: "Travel light",
            animation: google.maps.Animation.DROP,
        });

    }

    // Blaine North
    function addMarkers5() {

        var image = "http://i.imgur.com/a6aiEwX.png";
        var centerMarker = new google.maps.Marker({
            icon: image,
            position: new google.maps.LatLng(48.98167914855639, -122.71073169424437),
            map: map,
            title: "My secret confession",
            animation: google.maps.Animation.BOUNCE,
        });

        var contentString = '<div id="content">' +
                '<div id="siteNotice">' +
                '</div>' +
                '<div id="bodyContent">' +
                '<p><b>Im talking about you grandma!</b> </p>' +
                '<img src="http://i.imgur.com/9w8BByb.jpg"/>' +
                '<p>Back to <a href="http://dev-zombiefist.azurewebsites.net/">ZombieFist</a>' +
                '</div>' +
                '</div>';

        var infowindow = new google.maps.InfoWindow({
            content: contentString
        });

        google.maps.event.addListener(centerMarker, 'click', function () {
            infowindow.open(map, centerMarker);
        });

        var pubMarker = new google.maps.Marker({
            //  icon: image,
            position: new google.maps.LatLng(46.921602365184064, -121.54135293676757),
            map: map,
            icon: 'https://chart.googleapis.com/chart?chst=d_bubble_icon_text_small&chld=ski|bb|Run Fast!|FFFFFF|000000',
            title: "Zombies hate fast food!",
            animation: google.maps.Animation.DROP,
        });

    }

    // Extra Sample Marker

    //function addMarkers() {

    //    var image = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSb7i6HpKzQmV_d-TrbhAhMASlDfWCfjfjLptnndjC66wComcjh";
    //    var centerMarker = new google.maps.Marker({
    //        icon: image,
    //        position: new google.maps.LatLng(47.23565393158508, -122.46094293310546),
    //        map: map,
    //        title: "ZombieFist Head Quarters"
    //    });

    //    var contentString = '<div id="content">' +
    //            '<div id="siteNotice">' +
    //            '</div>' +
    //            '<h1 id="firstHeading" class="firstHeading">ZombieFist Headquarters</h1>' +
    //            '<div id="bodyContent">' +
    //            '<p>Here at <b>ZombieFist.Com</b>, One of the first things that we want </p>' +
    //            'for everyone.</p>' +
    //            '<img src="data:image/jpeg;base64,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"/>' +
    //           '<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS587OX56jamKnArh_6-lGpiBBKP1UQ7fxYwmaDhFZRw-KrQC4l"/>' +
    //            '<p>For more information, visit us at <a href="http://dev-zombiefist.azurewebsites.net/">ZombieFist</a>' +
    //            '</div>' +
    //            '</div>';

    //    var infowindow = new google.maps.InfoWindow({
    //        content: contentString
    //    });

    //    google.maps.event.addListener(centerMarker, 'click', function () {
    //        infowindow.open(map, centerMarker);
    //    });

    //    var pubMarker = new google.maps.Marker({
    //        //  icon: image,
    //        icon: 'http://chart.apis.google.com/chart?chst=d_map_pin_icon&chld=cafe|FFFF00',
    //        position: new google.maps.LatLng(47.66973856375987, -122.11834843200688),
    //        map: map,
    //        title: "Redmond- Base Camp"
    //    });

    //}

    //=============================================================== Shapes ====================================================================
    function addPolyline() {
        var pathCoordinates = [

             //new google.maps.LatLng(46.47510701099538, -123.88538903906249), //Canada Border touch
             //new google.maps.LatLng(46.59980202050395, -120.53181237890624),  //Wenatchee
             //new google.maps.LatLng(47.468929434571415, -3000.252740476562), // Yakima
             //new google.maps.LatLng(48.99660639273374, -120.74152264453124),  //Ocean
             // new google.maps.LatLng(49.001589303872386, -122.62663907720946), //Canada Border across
        ];
        var pathToCenter = new google.maps.Polyline({
            path: pathCoordinates,
            geodesic: true,
            strokeColor: '#0000FF',
            strokeOpacity: 5.0,
            strokeWeight: 4
        });
        pathToCenter.setMap(map);
    }

    function addEditablePolygon() {
        var natureCoords = [
            //new google.maps.LatLng(52.347295, -3.059607),
            //new google.maps.LatLng(52.347138, -3.061066),
            //new google.maps.LatLng(52.346351, -3.060465),
            //new google.maps.LatLng(52.345460, -3.060465),
            //new google.maps.LatLng(52.344569, -3.059864),
            //new google.maps.LatLng(52.344726, -3.058748),
                // THIS EXAMPLE IS OVER in England
            new google.maps.LatLng(52.347138, -3.061066),
            new google.maps.LatLng(52.346351, -3.060465),
            new google.maps.LatLng(52.345460, -3.060465),
            new google.maps.LatLng(52.344569, -3.059864),
            new google.maps.LatLng(52.344726, -3.058748),

        ];
        var natureArea = new google.maps.Polygon({
            path: natureCoords,
            strokeColor: "#FFFFFF",
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: "#00FF00",
            fillOpacity: 0.6,
            editable: true
        });
        natureArea.setMap(map);
    }

    //CD: Rectangle of awesome, added the editable.
    function addDraggableRectangle() {
        var bounds = new google.maps.LatLngBounds(
           //new google.maps.LatLng(47.66136860020881, -122.18328065588378), //SW CORNER "REDMOND"
           // new google.maps.LatLng(48.65774628525631, -121.11065454199218) //NE CORNER
        );
        var rectangle = new google.maps.Rectangle({
            bounds: {
                north: 48.56695115878165,  //Down
                south: 48.76695115878165,  //up
                east: -120.993649, //right
                west: -121.309999 // Left
            },
            editable: true,
            draggable: true,
            map: map,
            fillColor: "#00FF00",
            fillOpacity: 0.6,
            strokeColor: "#FF0000",
            strokeOpacity: 0.8,
            strokeWeight: 2,

        });
    }
    //===============================================  ADD Circle =======================================================================

    //Redomnd
    function addCircle() {
        var circle = new google.maps.Circle({
            map: map,
            center: new google.maps.LatLng(47.67050145217417, -122.11991615011596),
            fillColor: "#FF33FF",
            fillOpacity: 0.5,
            strokeColor: "#FF0000",
            strokeOpacity: 0.8,
            strokeWeight: 2

        });
        circle.setRadius(2000);

    }

    // Mt. Baker
    function addCircle2() {
        var circle = new google.maps.Circle({
            map: map,
            center: new google.maps.LatLng(48.77666717214871, -121.80828637792968),
            fillColor: "#FF33FF",
            fillOpacity: 0.5,
            strokeColor: "#FF0000",
            strokeOpacity: 0.8,
            strokeWeight: 2
        });
        circle.setRadius(5000);

    }

    // Glacier Peak
    function addCircle3() {
        var circle = new google.maps.Circle({
            map: map,
            center: new google.maps.LatLng(48.11029547100509, -121.11134118749999),
            fillColor: "#FF33FF",
            fillOpacity: 0.5,
            strokeColor: "#FF0000",
            strokeOpacity: 0.8,
            strokeWeight: 2
        });
        circle.setRadius(3000);

    }

    // Cle Enum
    function addCircle4() {
        var circle = new google.maps.Circle({
            map: map,
            center: new google.maps.LatLng(47.40775905829221, -121.19167871191405),
            fillColor: "#FF33FF",
            fillOpacity: 0.5,
            strokeColor: "#FF0000",
            strokeOpacity: 0.8,
            strokeWeight: 2
        });
        circle.setRadius(5000);

    }

    // Morton
    function addCircle5() {
        var circle = new google.maps.Circle({
            map: map,
            center: new google.maps.LatLng(46.67617765628997, -122.36824578955077),
            fillColor: "#FF33FF",
            fillOpacity: 0.5,
            strokeColor: "#FF0000",
            strokeOpacity: 0.8,
            strokeWeight: 2
        });
        circle.setRadius(2000);

    }

    // Chicago camp
    function addCircle6() {
        var circle = new google.maps.Circle({
            map: map,
            center: new google.maps.LatLng(47.73686887922448, -123.52893418981932),
            fillColor: "#FF33FF",
            fillOpacity: 0.5,
            strokeColor: "#FF0000",
            strokeOpacity: 0.8,
            strokeWeight: 2
        });
        circle.setRadius(10000);

    }


    // Capital Sate Forest
    function addCircle7() {
        var circle = new google.maps.Circle({
            map: map,
            center: new google.maps.LatLng(46.97533197819156, -123.17883081152343),
            fillColor: "#FF33FF",
            fillOpacity: 0.5,
            strokeColor: "#FF0000",
            strokeOpacity: 0.8,
            strokeWeight: 2
        });
        circle.setRadius(1000);

    }

    // Bumping Lake
    function addCircle8() {
        var circle = new google.maps.Circle({
            map: map,
            center: new google.maps.LatLng(46.85044641343798, -121.3207680673828),
            fillColor: "#FF33FF",
            fillOpacity: 0.5,
            strokeColor: "#FF0000",
            strokeOpacity: 0.8,
            strokeWeight: 2

        });
        circle.setRadius(7000);

    }

    // Circle around State
    function addCircle9() {
        var circle = new google.maps.Circle({
            map: map,
            center: new google.maps.LatLng(47.848531941680356, -122.53973550512694),
            fillColor: "#ff00f6",
            fillOpacity: 0.1,
            strokeColor: "ffffff",
            strokeOpacity: 0.4,
            strokeWeight: 4

        });
        circle.setRadius(150000);

    }

    //================================================ Add KML IN THE FUTURE ============================================================

    //function addKmlLayer() {
    //    var offasDykeLayer = new google.maps.KmlLayer('http://hikeview.co.uk/tracks/hikeview-offas-dyke.kml');
    //    offasDykeLayer.setMap(map);
    //}

    //function addGeoJSONDataLayer() {
    //    //map.data.loadGeoJson('http://localhost:8080/gmaps/data/SecretCastlesOfWales.json');

    //    map.data.setStyle({
    //        icon: 'http://localhost/gmaps/images/castle.png',
    //        strokeColor: 'green'
    //    });
    //}

    //======================================================  Elevation  ===================================================================

    function addElevationService() {

        // Create an ElevationService
        elevationService = new google.maps.ElevationService();

        // Add a listener for the double click event and call getElevation on that location
        google.maps.event.addListener(map, 'click', getElevation);

    }

    function getElevation(event) {

        var locations = [];

        var infowindow = new google.maps.InfoWindow();

        // Retrieve the clicked location and add it to the array
        var userClickLocation = event.latLng;
        locations.push(userClickLocation);

        // Create a LocationElevationRequest object using the array's single value
        var positionalRequest = {
            'locations': locations
        }

        // Send the location request
        elevationService.getElevationForLocations(positionalRequest, function (results, status) {
            if (status == google.maps.ElevationStatus.OK) {
                // Retrieve the first result
                if (results[0]) {
                    // Open an info window indicating the elevation at the clicked position
                    infowindow.setContent("Elevation is " + Math.round(results[0].elevation) + " meters");
                    infowindow.setPosition(userClickLocation);
                    infowindow.open(map);
                } else {
                    alert("Danger, get Away!");
                }
            } else {
                //alert("Elevation service failed due to: " + status);
                alert("You must be out of your mind ");
            }
        });
    }
    //==================================================================================================================================
    function addGeocodingService() {
        geocoder = new google.maps.Geocoder();
    }

    function geocodeAddress() {
        var address = document.getElementById("address").value;
        geocoder.geocode({ 'address': address }, function (results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                map.setCenter(results[0].geometry.location);
                var marker = new google.maps.Marker({
                    map: map,
                    position: new google.maps.LatLng(47.76690569072244, -122.26421899511722), //Geo Click

                });
                map.setZoom(7);
                map.panTo(marker.position);

            } else {
                alert("Geocode failed with the following error: " + status);
            }
        });
    }

    function addGoToInitialExtent() {
        google.maps.event.addListener(map, 'rightclick', function () {
            map.setCenter(initialCenter);
            map.setZoom(initialZoom);
        });
    }

    function addShowCoords() {
        google.maps.event.addListener(map, 'center_changed', function () {
            var newCenter = map.getCenter();
            var newZoom = map.getZoom();
            document.getElementById('coordsDiv').innerHTML = "Longitude and Latitude: " + newCenter.toString() + "<br>Zoom: " + newZoom;
        });
    }

    function calcRoute() {

        var directionsService = new google.maps.DirectionsService();

        var directionsDisplay;
        directionsDisplay = new google.maps.DirectionsRenderer();
        directionsDisplay.setMap(map);
        directionsDisplay.setPanel(document.getElementById("directionsPanel"));

        var start = document.getElementById("start").value;
        var end = new google.maps.LatLng(47.4089984360623, -121.19352825622559); //mt. raineer home base
        var request = {
            origin: start,
            destination: end,
            travelMode: google.maps.TravelMode.WALKING
        };
        directionsService.route(request, function (result, status) {
            if (status == google.maps.DirectionsStatus.OK) {
                directionsDisplay.setDirections(result);
            } else {
                alert("Hight satellite interference. Could not calculate directions. Try again, or get eatin by zombies!");
            }

        });
    }

    init();
    console.log('initalized');
}