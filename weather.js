const weatherToday = document.querySelector(".js-weather");
const API_KEY = "d36fa561b2844cf5a9dfa7cc94959af8";
const COORDS ="coords";

function getWeather(lat,lon){
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric
    `)
    .then(function(response) {
        return response.json() ;
      })
      .then(function(json) {
          const temperature = json.main.temp;
          const place = json.name;
          const weathers = json.weather[0].description;
          
          weatherToday.innerText = `${weathers}, ${temperature}°c 
           @ ${place}`;
  });
}
function saveCoords(coordsObj){
  localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}
function handleGeoSuccses(position){
    console.log(position);
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude,
        longitude
       // 이런 식으로 이름이 같으면 그냥 위와 같이 한번만 써도 된다. 
       //latitude : latitude,
        //longitude : longitude 
       };
       saveCoords(coordsObj);
       getWeather(latitude,longitude);
}

function handleGeoError(){
    console.log("Can't acsses geolocation");
}
function askForCoord(){
    navigator.geolocation.getCurrentPosition(handleGeoSuccses,handleGeoError);
}
function loadCoord(){
  const loadedCoords = localStorage.getItem(COORDS)  ;

  if (loadedCoords === null){
      askForCoord();
}else{
    const parseCoords = JSON.parse(loadedCoords);
    console.log(parseCoords);
    getWeather(parseCoords.latitude,parseCoords.longitude);
}
}

function init(){
    loadCoord();
    }
init();