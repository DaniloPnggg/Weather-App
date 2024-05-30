const apiKey = "200bace125037e26c623f961096761ab"
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q="
const searchBtn = document.querySelector(`.search button`)
const searchInput = document.querySelector(`.search input`)
const weatherIcon = document.querySelector(`.weather-icon`)
let errorMessage = document.querySelector(`.error`)

async function checkWeather(city) {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`)

    if (response.status === 404) {
        document.querySelector(`.error`).style.display = `block`
        document.querySelector(`.weather`).style.display = `none`
    } else {

        document.querySelector(`.error`).style.display = `none`
        document.querySelector(`.weather`).style.display = `block`

        let data = await response.json()

        document.querySelector(`.city`).innerHTML = data.name
        document.querySelector(`.temp`).innerHTML = Math.round(data.main.temp) + `°c`
        document.querySelector(`.humidity`).innerHTML = data.main.humidity + `%`
        document.querySelector(`.wind`).innerHTML = data.wind.speed + `km/h`



        if (data.weather[0].main === `Clouds`) {
            weatherIcon.src = `images/clouds.png`
        }
        else if(data.weather[0].main === `Rain`) {
            weatherIcon.src = `images/rain.png`
        }
        else if (data.weather[0].main === `Clear`) {
            weatherIcon.src = `images/clear.png`
        }
        else if (data.weather[0].main === `Drizzle`) {
            weatherIcon.src = `images/drizzle.png`
        }
        else if (data.weather[0].main === `Mist`) {
            weatherIcon.src = `images/mist.png`
        }
        else if (data.weather[0].main === `Snow`) {
            weatherIcon.src = `images/snow.png`
        }

        localStorage.setItem(`lastCity`, city)

        console.log(data)

    }



}

function search() {
    searchBtn.addEventListener(`click`, () => {
        if (searchInput.value === ``) {
            document.querySelector(`.error`).style.display = `block`
        } else {
            checkWeather(searchInput.value)
        }



    })

    searchInput.addEventListener(`keydown`, (e) => {
        if (e.key === `Enter`) {
            if (searchInput.value === ``) {
                document.querySelector(`.error`).style.display = `block`
            } else {
                checkWeather(searchInput.value)
            }
        }
    })



}

window.onload = function() {
    const lastCity = localStorage.getItem(`lastCity`)
    if (lastCity) {
        checkWeather(lastCity)
    } else {
        checkWeather(`New York`)
    }
}



search()
