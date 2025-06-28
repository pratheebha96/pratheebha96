const RESTAURANT_COORDS = { lat: 40.73061, lng: -73.935242 }; // example coordinates
const ORDER_RADIUS_KM = 0.1; // 100 meters

function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
  const R = 6371; // Radius of the earth in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a =
    0.5 - Math.cos(dLat)/2 +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    (1 - Math.cos(dLon)) / 2;
  return R * 2 * Math.asin(Math.sqrt(a));
}

function init() {
  const phoneOrderBtn = document.getElementById('phoneOrder');

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      const distance = getDistanceFromLatLonInKm(
        position.coords.latitude,
        position.coords.longitude,
        RESTAURANT_COORDS.lat,
        RESTAURANT_COORDS.lng
      );
      if (distance <= ORDER_RADIUS_KM) {
        phoneOrderBtn.style.display = 'inline-block';
        phoneOrderBtn.addEventListener('click', () => {
          window.location.href = 'tel:+1234567890';
        });
      }
    });
  }

  document.getElementById('onlineOrder').addEventListener('click', () => {
    alert('Online ordering not implemented.');
  });
}

document.addEventListener('DOMContentLoaded', init);
