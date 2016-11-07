var map = document.getElementById("map");

function createDrivingDirectionsMap() {
    if (navigator.geolocation) {

        navigator.geolocation.getCurrentPosition(OnSuccess, OnError, {
            enableHighAccuracy: true,
            maximumAge: 1000,
            timeout: 10000
        });
    } else {
        document.getElementById(map).innerHTML = "No support for geolocation, we can't find you :(";
    }
};

function OnSuccess(position) {
    showMap(
        position.coords.latitude,
        position.coords.longitude
    );
};

function OnError(error) {
    var map = document.getElementById("map");

    switch (error.code) {
        case error.PERMISSION_DENIED:
            map.innerHTML = "User denied the request for Geolocation";
            break;
        case error.POSITION_UNAVAILABLE:
            map.innerHTML = "Location information is unavailable";
            break;
        case error.TIMEOUT:
            map.innerHTML = "The request to get user location timed out";
            break;
        case error.UNKNOWN_ERROR:
            map.innerHTML = "An unknown error occurred";
            break;
    }
};

function showMap(lat, long) {

    var directionsService = new google.maps.DirectionsService();
    var directionsRendered = new google.maps.DirectionsRenderer();

    var route = {
        origin: new google.maps.LatLng(lat, long),
        destination: "29050 S Western Ave #101a, Rancho Palos Verdes, CA 90275",
        travelMode: google.maps.DirectionsTravelMode.DRIVING
    };

    var mapOptions = {
        zoom: 10,
        center: new google.maps.LatLng(50.8504500, 4.3487800),
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    var Gmap = new google.maps.Map(document.getElementById("map"), mapOptions);
    directionsRendered.setMap(Gmap);
    directionsRendered.setPanel(document.getElementById("driving-directions"));
    directionsService.route(route, function(result, status) {
        if (status === google.maps.DirectionsStatus.OK) {
            directionsRendered.setDirections(result);
        }
    });

};
