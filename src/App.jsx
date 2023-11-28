import axios from "axios";
import { useEffect, useState } from "react"
import WeatherDetail from "./components/WeatherDetail";
import LoaderWaiting from "./components/LoaderWaiting";

function App() {

  const [weatherApp, setWeather] = useState(null)

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
    if (weatherApp === null) {
      image = "bg-[url('/images/background-light.svg')]"
    } else if (weatherApp.weather[0].icon === "01d" || weatherApp.weather[0].icon === "02d") {
      image = "bg-[url('/images/day.jpg')]"
    } else if (weatherApp.weather[0].icon === "01n" || weatherApp.weather[0].icon === "02n") {
      image = "bg-[url('/images/night.webp')]"
    } else if (weatherApp.weather[0].icon === "03d" || weatherApp.weather[0].icon === "04d") {
      image = "bg-[url('/images/cloudy-day.jpg')]"
    } else if (weatherApp.weather[0].icon === "03n" || weatherApp.weather[0].icon === "04n") {
      image = "bg-[url('/images/cloudy-night.jpg')]"
    } else if (weatherApp.weather[0].icon === "09d" || weatherApp.weather[0].icon === "10d") {
      image = "bg-[url('/images/rainy-day.webp')]"
    } else if (weatherApp.weather[0].icon === "09n" || weatherApp.weather[0].icon === "10n") {
      image = "bg-[url('/images/rainy-night.webp')]"
    } else if (weatherApp.weather[0].icon === "11d") {
      image = "bg-[url('/images/stormy-day.webp')]"
    } else if (weatherApp.weather[0].icon === "11n") {
      image = "bg-[url('/images/stormy-night.webp')]"
    } else if (weatherApp.weather[0].icon === "13d") {
      image = "bg-[url('/images/snowy-day.webp')]"
    } else if (weatherApp.weather[0].icon === "13n") {
      image = "bg-[url('/images/snowy-night.webp')]"
    } else if (weatherApp.weather[0].icon === "50d") {
      image = "bg-[url('/images/foggy-day.jpg')]"
    } else {
      image = "bg-[url('/images/foggy-night.jpg')]"
    }
    return image
  }  

  return (
    <main className={`flex justify-center items-center h-screen bg-center bg-cover bg-no-repeat ${background()}`}>
      {        
        weatherApp === null
        ? <LoaderWaiting />
        : <WeatherDetail weatherApp={weatherApp}/>
      }
    </main>
  )
}

export default App
