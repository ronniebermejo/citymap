(function() {
  'use strict';
  angular.module('citymap.maps').controller('mainController', MainController);

  MainController.$inject = ['MapsConfig','instagram', '$http'];
  function MainController(MapsConfig, instagram, $http) {
    var vm = this;
    vm.pickupLocation = { latitude: 20.6, longitude: -100.383333, id: 1};
    vm.deliveryLocation ={ latitude: 20.62, longitude: -100.383336, id: 2};
    vm.deliveryLocation2 ={ latitude: 20.622, longitude: -100.383336, id: 3};
    vm.mapOptions = MapsConfig.mapOptions();
    vm.markers = [vm.pickupLocation,vm.deliveryLocation, vm.deliveryLocation2 ];


    vm.images = [];
    vm.labels = [];
    vm.news = [];
    var options = {hash: 'queretaro'};

    activate();

    function activate() {
      $http.jsonp('http://ajax.googleapis.com/ajax/services/feed/load?callback=JSON_CALLBACK&v=1.0&q=http://www.eluniversal.com.mx/rss/estados.xml').success(function(result){
        console.log(result);
        vm.news = result.responseData.feed.entries;
      });


      instagram.get().success(function(response) {
        vm.images = response.data;
        console.log(vm.images);
        //
        //angular.forEach(vm.images, function(image){
        //  var http = new XMLHttpRequest();
        //  http.open("GET", image.images.standard_resolution.url, true);
        //  http.responseType = "blob";
        //
        //  http.onload = function(e) {
        //    if (this.status === 200) {
        //      var image = new Image();
        //      image.onload = function() {
        //        EXIF.getData(image, function() {
        //          console.log(this);
        //          var log = EXIF.pretty(this);
        //          console.log(log);
        //        });
        //      };
        //      image.src = URL.createObjectURL(http.response);
        //    } else {
        //      console.log(e);
        //    }
        //  };
        //  http.send();

          //vm.mapOptions.label.push('a');
          //image.location.title ='araara';
          //image.location.icon= 'https://chart.googleapis.com/chart?chst=d_bubble_icon_text_small&chld=ski|bb|Wheeee!|FFFFFF|000000';
          //image.location.labelContent ="red";
          //image.location.labelClass= "labels";
          //image.location.labelAnchor = new google.maps.Point(22, 0);

          //vm.markers.push(image);

        });



    }



  }
})();
