import axios from "axios";
import { useEffect, useState } from "react"
import WeatherDetail from "./components/WeatherDetail";
import LoaderWaiting from "./components/LoaderWaiting";
import backgrounds from "./utils/backgrounds";

function App() {
  const [background, setBackground] = useState('');
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
  
  return (
    <main className={`flex justify-center items-center h-screen bg-center bg-cover bg-no-repeat ${backgrounds(weatherApp?.weather[0].icon)}`}>
      {        
        weatherApp === null
        ? <LoaderWaiting />
        : <WeatherDetail weather={weatherApp} setWeather={setWeather}/>
      }
    </main>
  )
}

export default App
