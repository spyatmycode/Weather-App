const form = document.querySelector('form')
const weatherInfoContainer = document.querySelector('.information')
const input  = document.querySelector('input')
const loader = document.querySelector('.loader')

form.addEventListener('submit',function(e){
    e.preventDefault()
    weather.fetchGeolocation(input.value)
})


let weather = {

    apiKey: `1840716844f0e872958745ce1f0cc2b5`,
    
    fetchGeolocation: function(location_name){
        fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${location_name}&limit=5&appid=${this.apiKey}`)
        .then(res=>res.json())
        .then(function(data){
            weatherInfoContainer.innerHTML = `<section class="loader"><img src="./assets/cloud.gif" alt=""width="50px"></section>`
            setTimeout(()=>{
            // console.log(data);
            let {lat,lon,name,state,country} = data[0]
            
            weather.fetchWeather(lat,lon,name,state,country)
            
            
           
            },3000)
        })
    },

    fetchWeather: function(lat, lon, location_name,state,country){
       
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${this.apiKey}`)
        .then(res=>res.json())
        .then(function(data){
           let {temp,humidity} = data.main
           let {speed} = data.wind //m/s
           let {description,icon} = data.weather[0]
           console.log(data);

           weatherInfoContainer.innerHTML = 
           `<h2>${location_name},${state} (${country})</h2>
           <p class="temp">${(temp - 273).toFixed(1)}°C</p>
           <p class="description"><img src="http://openweathermap.org/img/wn/${icon}@2x.png" alt="" width="40px"> ${description}</p>
           <p class="humidity">Humidity: ${humidity}%</p>
           <p class="speed">
               Wind speed: ${speed} m/s
           </p>`

           document.body.style.backgroundImage = `url('https://source.unsplash.com/1600x900/?${description}-weather')`


        })
    },

    fetchWeather_lat_lon: function(lat,lon){
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${this.apiKey}`)
        .then(res=>res.json())
        .then(function(data){
            weatherInfoContainer.innerHTML = `<section class="loader"><img src="./assets/cloud.gif" alt=""width="50px"></section>`
           setTimeout(() => {
            
            

            let {temp,humidity} = data.main
           let {speed} = data.wind //m/s
           let {description,icon} = data.weather[0]
           let {name} = data
           let {country} = data.sys



           weatherInfoContainer.innerHTML = 
           `<h2>${name},${country}</h2>
           <p class="temp">${(temp - 273).toFixed(1)}°C</p>
           <p class="description"><img src="http://openweathermap.org/img/wn/${icon}@2x.png" alt="" width="40px"> ${description}</p>
           <p class="humidity">Humidity: ${humidity}%</p>
           <p class="speed">
               Wind speed: ${speed} m/s
           </p>`

           document.body.style.backgroundImage = `url('https://source.unsplash.com/1600x900/?${description}')`
           }, 4000);

    })




}
}


window.addEventListener('load',()=>{
    if(navigator.geolocation){
        this.navigator.geolocation.getCurrentPosition((position)=>{
            let latitude
            let longitude

            latitude = position.coords.latitude
            longitude = position.coords.longitude
            weather.fetchWeather_lat_lon(latitude,longitude)
     })  
    }
})


