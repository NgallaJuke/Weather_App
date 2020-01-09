navigator.geolocation.getCurrentPosition(
  position => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    console.log("lat", latitude);
    console.log("long", longitude);
  },
  error => {
    if (error) {
      console.log("Daakar ");
    }
  }
);
