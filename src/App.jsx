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
      return "bg-[url('/images/nocturno.webp')]"
    }
  }


  const bgImages = {
    "01d": "bg-[url('/images/background-day.svg')]",
    "02d": "bg-[url('/images/background-day.svg')]",
    "03d": "bg-[url('/images/background-cloudy.svg'])",
    "04d": "bg-[url('/images/background-cloudy.svg'])",
    "09d": "bg-[url('/images/background-rainy.svg')]",
    "10d": "bg-[url('/images/background-rainy.svg')]",
    "11d": "bg-[url('/images/background-stormy.svg'])",
    "13d": "bg-[url('/images/background-snowy.svg')]",
    "50d": "bg-[url('/images/background-foggy.svg')]",
    "01n": "bg-[url('/images/background-night.svg')]",
    "02n": "bg-[url('/images/background-night.svg')]",
    "03n": "bg-[url('/images/background-cloudy.svg'])",
    "04n": "bg-[url('/images/background-cloudy.svg'])",
    "09n": "bg-[url('/images/background-rainy.svg')]",
    "10n": "bg-[url('/images/background-rainy.svg')]",
    "11n": "bg-[url('/images/background-stormy.svg'])",
    "13n": "bg-[url('/images/background-snowy.svg')]",
    "50n": "bg-[url('/images/background-foggy.svg')]",
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
