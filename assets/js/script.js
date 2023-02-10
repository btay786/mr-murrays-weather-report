var APIKey = "138c4f3e26171567773d7c38e74364f7"
// Above code is for the weather api
// 
var searchBtn = document.getElementById('search-btn');
var cityInput = document.getElementById('city')
var fiveDayContainer = document.querySelector('#five-day-container')
// may need coordinates
var RecentSearchContainer = document.querySelector('#recent-search-container')
var searchBtn = document.getElementById("city")
// searchBtn.addEventListener('click', getCity)

function getCity() {
    var city = cityInput.value
    getCurrentForecast(city)
}

function getCurrentForecast(value) {
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${value}&appid=${APIKey}&units=imperial`)
    .then(response => response.json())
    .then(currentData => {
        console.log(currentData)

        document.getElementById('current-city').textContent = currentData.name

        var lat = currentData.coord.lat
        var lon = currentData.coord.lon
        getFiveDayForecast(lat, lon)
    })
}


function getFiveDayForecast(lat, lon) {
    fiveDayContainer.textContent = ""
    fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${APIKey}&units=imperial`)
    .then(response => response.json())
    .then(fiveData => {
        console.log(fiveData)

        for(var i = 0; i < 5; i++) {
            console.log(fiveData.list[i * 8])


            var card = document.createElement('div')
            fiveDayContainer.append(card)

            // var card = document.createElement('div')RecentSearchContainer.append(card)

            var fiveTemp = document.createElement('p')
            fiveTemp.textContent = `Temp: ${fiveData.list[i * 8].main.temp} F`
            card.append(fiveTemp)
             
            var fiveHumidity = document.createElement('p')
            fiveHumidity.textContent = `Humidity: ${fiveData.list[i * 8].main.humidity}`
            card.append(fiveHumidity)

            var fiveGust = document.createElement('p')
            fiveGust.textContent = `Gust: ${fiveData.list[i * 8].wind.gust} MPH`
            card.append(fiveGust)
            // var icon = document.createElement('img')
            // icon.src = fiveData.list[i * 8].weather[0].icon
            // card.append(icon)
            // varString str = "<img src= \http://openweathermap.org/img/wn/10d@2x.png">
            // // http://openweathermap.org/img/wn/10d@2x.png
        }
    })
}

// searchBtn.addEventListener("click", function(recalling) searchBtn = searchBtn [i];return this.searcching;

// );