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
    let image = ""
    if (weather === null) {
      image = "bg-[url('/images/nocturno.webp')]"
    } else if (weather.weather[0].icon === "01d" || weather.weather[0].icon === "02d" || 
               weather.weather[0].icon === "03d" || weather.weather[0].icon === "04d" ||
               weather.weather[0].icon === "09d" || weather.weather[0].icon === "10d" ||
               weather.weather[0].icon === "11d" || weather.weather[0].icon === "13d" ||
               weather.weather[0].icon === "50d") {
      image = "bg-[url('/images/background-light.svg')]"
    } else {
      image = "bg-[url('/images/nocturno.webp')]"
    }
    return image
  }

  return (
    <main className={`flex justify-center items-center h-screen bg-cover bg-no-repeat ${background()}`}>
      {        
        weather === null
        ? <LoaderWaiting />
        : <WeatherDetail weather={weather}/>
      }
    </main>
  )
}

export default App
