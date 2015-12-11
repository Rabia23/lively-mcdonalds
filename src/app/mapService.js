angular.module('livefeed.map', [
  'helper_factories',
  'ngMap'

])

.service('mapService', function(_){


  var infoWindow = new google.maps.InfoWindow();

  return {

    createMarker: function (info, map, icon){
      var marker = new google.maps.Marker({
        map: map,
        position: new google.maps.LatLng(info.latitude, info.longitude),
        //title: info.name,
        icon: icon
      });
    
      marker.content = '<div class="infoWindowContent">' + info.feedback_count + '</div>';

      google.maps.event.addListener(marker, 'mouseover', function(){
          infoWindow.setContent('<h2>' + info.name + '</h2>' + '<h2>' + marker.content + '</h2>');
          infoWindow.open(map, this);
      });

      google.maps.event.addListener(marker, 'mouseout', function(){
          infoWindow.close(map, this);
      });
    
      return marker;      
    }
    
  };

});