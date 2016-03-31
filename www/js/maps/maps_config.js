(function () {
  'use strict';
  angular.module('citymap.maps', []);
  angular.module('citymap.maps').
  factory('MapsConfig', MapsConfig);

  function MapsConfig() {

    var service = {
      mapOptions: mapOptions
    };

    return service;

    function mapOptions() {
      return {
        disableDefaultUI: true,
        routeColor: "#0C60EE",
        styles: mapStyle(),
        icons: mapIcons(),
        zoom: 12,
        center:{ latitude: 20.62, longitude: -100.383336, lng:-100.383336, lat: 20.62 }
      };
    }

    function mapIcons() {
      return {
        small_transparent_icon:
          '/imagery/tiny_inverted_logo.png',
        destination_icon:
          'imagery/green-circle-marker.png',
        red_circle:
          'imagery/red-circle-marker.png',
        green_circle:
          'imagery/green-circle-marker.png'
      };
    }

    function mapStyle() {
      //Grey
      return [
        {
          "featureType": "administrative",
          "elementType": "all",
          "stylers": [
            {
              "visibility": "on"
            },
            {
              "saturation": -100
            },
            {
              "lightness": -20
            }
          ]
        },
        {
          "featureType": "road",
          "elementType": "all",
          "stylers": [
            {
              "visibility": "on"
            },
            {
              "saturation": -100
            },
            {
              "lightness": 70
            }
          ]
        },
        {
          "featureType": "water",
          "elementType": "all",
          "stylers": [
            {
              "visibility": "on"
            },
            {
              "saturation": -10
            },
            {
              "lightness": 30
            }
          ]
        },
        {
          "featureType": "landscape.man_made",
          "elementType": "all",
          "stylers": [
            {
              "visibility": "simplified"
            },
            {
              "saturation": -60
            },
            {
              "lightness": 10
            }
          ]
        },
        {
          "featureType": "landscape.natural",
          "elementType": "all",
          "stylers": [
            {
              "visibility": "simplified"
            },
            {
              "saturation": -60
            },
            {
              "lightness": 60
            }
          ]
        },
        {
          "featureType": "poi",
          "elementType": "all",
          "stylers": [
            {
              "visibility": "off"
            },
            {
              "saturation": -100
            },
            {
              "lightness": 60
            }
          ]
        },
        {
          "featureType": "transit",
          "elementType": "all",
          "stylers": [
            {
              "visibility": "off"
            },
            {
              "saturation": -100
            },
            {
              "lightness": 30
            }
          ]
        }
      ];
    }
  }
})();
