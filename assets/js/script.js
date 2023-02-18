var APIKey = "138c4f3e26171567773d7c38e74364f7"
// Above code is for the weather api
// 
var searchBtn = document.getElementById('search-btn');
var cityInput = document.getElementById('city')
var fiveDayContainer = document.querySelector('#five-day-container')
// may need coordinates
var recentSearchContainer = document.querySelector('#recent-search-container')
var searchInput = document.getElementById("city")
var currentIcon = document.querySelector('.icon-container')

searchBtn.addEventListener('click', getCity)

getWeatherHistory()

function getCity() {
    var city = cityInput.value
    getCurrentForecast(city)
    setHistory(city)
}

function setHistory(city) {
    var storage = JSON.parse(localStorage.getItem('weatherHistory'))
    if (storage === null) {
        storage = []
    }
    storage.push(city)
    localStorage.setItem('weatherHistory', JSON.stringify(storage))

    getWeatherHistory()
}

function getWeatherHistory() {
    var storage = JSON.parse(localStorage.getItem('weatherHistory'))
    if (storage === null) {
        recentSearchContainer.textContent = "No Current History"
    } else {
        recentSearchContainer.textContent = ''
        for (var i = 0; i < storage.length; i++) {
            var btn = document.createElement('button')
            btn.textContent = storage[i]
            recentSearchContainer.append(btn)

            btn.addEventListener('click', function(event) {
                getCurrentForecast(event.target.textContent)
            })
        }
    }
}

function getCurrentForecast(value) {
    console.log(value)
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${value}&appid=${APIKey}&units=imperial`)
    .then(response => response.json())
    .then(currentData => {
        console.log(currentData)

        document.getElementById('current-city').textContent = currentData.name
        // get elements and render current forecast data
        document.getElementById('humidity').textContent = currentData.main.humidity
        document.getElementById('current-temp').textContent = currentData.main.temp
        document.getElementById('gust').textContent = currentData.wind.gust


        currentIcon.textContent = ''
        var icon = document.createElement('img')
        icon.setAttribute('src', "http://openweathermap.org/img/w/" + currentData.weather[0].icon + ".png")
        currentIcon.append(icon)

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
            card.setAttribute('class', 'card')
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
            var icon = document.createElement('img')
            icon.src = "http://openweathermap.org/img/wn/" +  fiveData.list[i * 8].weather[0].icon + "@2x.png"
            // var str = "<img src= http://openweathermap.org/img/wn/" + icon + "@2x.png">
            card.append(icon)
            // http://openweathermap.org/img/wn/10d@2x.png
        }
    })
}