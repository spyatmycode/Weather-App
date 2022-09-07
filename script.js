const form = document.querySelector('form')
const weatherInfoContainer = document.querySelector('.information')
const input  = document.querySelector('input')


form.addEventListener('submit', weatherFunction)

function weatherFunction(e){
    e.preventDefault()

    getApiData(input.value)

    
}

function getApiData(country){
    
    let xhr = new XMLHttpRequest
    let output;
    let apiKEY = "a255820c36cc4000bd165551220709"

    xhr.open('GET',`http://api.weatherapi.com/v1/current.json?key=${apiKEY}&q=${country}&aqi=yes`, true)

     xhr.onload =  function(){
       
        if(xhr.status===200){
              output = JSON.parse(xhr.responseText)
              console.log(output);
              let {name, country} = output.location

              let {temp_c, condition, humidity, wind_kph} = output.current
            //   console.log(temp_c, condition.text,condition.icon );

            let renderedData = `<h2>${name}, ${country}</h2>
            <p class="temp">${temp_c}°</p>
            <p class="description"><img src="${condition.icon}" alt="" width="20px"> ${condition.text}</p>
            <p class="humidity">Humidity: ${humidity}%</p>
            <p class="speed">
                Wind speed: ${wind_kph}km/h
            </p>`

            weatherInfoContainer.innerHTML = renderedData
            document.body.style.backgroundImage = `url('https://source.unsplash.com/1600x900/?${condition.text}-weather')`



        }

        xhr.onprogress = function(){
            weatherInfoContainer.innerHTML = `<p>Loading...</p>`
        }

       


        

        

        
    }
     
     

   

   

    xhr.send()

    

    
}

window.addEventListener('load', function(){
    if(navigator.geolocation){
        this.navigator.geolocation.getCurrentPosition((position)=>{
            let latitude
            let longitude

            latitude = position.coords.latitude
            longitude = position.coords.longitude

            let xhr = new XMLHttpRequest
    let output;
    let apiKEY = "a255820c36cc4000bd165551220709"

    xhr.open('GET',`http://api.weatherapi.com/v1/current.json?key=${apiKEY}&q=${latitude},${longitude}&aqi=yes`, true)

     xhr.onload =  function(){
       
        if(xhr.status===200){
              output = JSON.parse(xhr.responseText)
              console.log(output);
              let {name, country} = output.location

              let {temp_c, condition, humidity, wind_kph} = output.current
            //   console.log(temp_c, condition.text,condition.icon );

            let renderedData = `<h2>${name}, ${country}</h2>
            <p class="temp">${temp_c}°</p>
            <p class="description"><img src="${condition.icon}" alt="" width="20px"> ${condition.text}</p>
            <p class="humidity">Humidity: ${humidity}%</p>
            <p class="speed">
                Wind speed: ${wind_kph}km/h
            </p>`

            weatherInfoContainer.innerHTML = renderedData
            document.body.style.backgroundImage = `url('https://source.unsplash.com/1600x900/?${condition.text}-weather')`



        }
        
    }
 

    xhr.send()

            // http://api.weatherapi.com/v1/current.json?key=a255820c36cc4000bd165551220709&q=6.52,3.34&aqi=yes
        })

    }
})




 



