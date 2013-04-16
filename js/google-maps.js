  
var map;
var directionDisplay;
var directionsDisplay;
var directionsService;
      
function initialize_map(elem) {

  latlng_coord = elem.attr("data-position").split(",");
  latlng_center_coord = elem.attr("data-center").split(","); 
  console.log(elem.attr("data-zoom"));
	
  var myOptions = {
    zoom: parseInt(elem.attr("data-zoom")),
    center: new google.maps.LatLng(latlng_center_coord[0], latlng_center_coord[1]),
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  map = new google.maps.Map(elem[0], myOptions);
  var marker = new google.maps.Marker({
    position: new google.maps.LatLng(latlng_coord[0], latlng_coord[1]),
    map: map,
    title: elem.attr("data-title")
  });
}

function showPosition(position) {
	
  elem = $("#google-map");
  latlng_coord = elem.attr("data-position").split(",");
  
  var bounds = new google.maps.LatLngBounds();
  var latlng = new google.maps.LatLng(latlng_coord[0], latlng_coord[1]);
  var mypos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude); 

  if(typeof marker=='undefined') { 
      marker = new google.maps.Marker({ 
      position: mypos, 
      map: map
      }); 
  } else { 
    marker.setPoint(mypos); 
  }
  
  bounds.extend(mypos);
  bounds.extend(latlng);
  map.fitBounds(bounds); 
  
  directionsDisplay.setMap(map);
  var request = {
    origin:mypos, 
    destination:latlng,
    travelMode: google.maps.DirectionsTravelMode.DRIVING
  };
  directionsService.route(request, function(response, status) {
    if (status == google.maps.DirectionsStatus.OK) {
      directionsDisplay.setDirections(response);
    }
  });
}


  $(document).ready(function () {
	  $("#google-map").each(function() {
        directionsDisplay = new google.maps.DirectionsRenderer();
        directionsService = new google.maps.DirectionsService();

        initialize_map($("#google-map"));
        
        setTimeout(function () {      
          if(navigator.geolocation) {
              navigator.geolocation.getCurrentPosition(showPosition); 
          }
        }, 1000);
      });
  });
  