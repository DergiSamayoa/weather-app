import axios from "axios";
import { useEffect, useState } from "react"
import WeatherDetail from "./components/WeatherDetail";
import LoaderWaiting from "./components/LoaderWaiting";

function App() {

  const [weather, setWeather] = useState(null)

  const success = (position) => {
    const { coords: { latitude, longitude } } = position
    axios
        .get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=e2b798872fb193be0d21ac89f2f0299d&lang=sp&units=metric`)
        .then(({data}) => setWeather(data))
        .catch((error) => console.log(error))
  }

  useEffect(() => { 
    navigator.geolocation.getCurrentPosition(success)
  }, []);

  const background = () => {
    if (weather === null) {
      return "bg-[url('/images/background-light.svg')]"
    } else if (weather.weather[0].icon === "01d" || weather.weather[0].icon === "02d") {
      return "bg-[url('/images/background-light.svg')]"
    } else {
      return "bg-[url('/images/nocturno.jpg')]"
    }
  }


  const bgImages = {
    "01d": "url(./images/background-day.svg)",
    "02d": "url(./images/background-day.svg)",
    "03d": "url(./images/background-cloudy.svg)",
    "04d": "url(./images/background-cloudy.svg)",
    "09d": "url(./images/background-rainy.svg)",
    "10d": "url(./images/background-rainy.svg)",
    "11d": "url(./images/background-stormy.svg)",
    "13d": "url(./images/background-snowy.svg)",
    "50d": "url(./images/background-foggy.svg)",
    "01n": "url(./images/background-night.svg)",
    "02n": "url(./images/background-night.svg)",
    "03n": "url(./images/background-cloudy.svg)",
    "04n": "url(./images/background-cloudy.svg)",
    "09n": "url(./images/background-rainy.svg)",
    "10n": "url(./images/background-rainy.svg)",
    "11n": "url(./images/background-stormy.svg)",
    "13n": "url(./images/background-snowy.svg)",
    "50n": "url(./images/background-foggy.svg)",
  }


  return (
    <main className={`flex justify-center items-center h-screen bg-[url(./images/background-light.svg)] bg-cover bg-no-repeat ${background()}`}>
      {        
        weather === null
        ? <LoaderWaiting />
        : <WeatherDetail weather={weather}/>
      }
    </main>
  )
}

export default App
