import { useEffect, useState } from "react";
import { IconMoonFilled, IconSearch, IconSunFilled } from "@tabler/icons-react";
import axios from "axios";

const WeatherDetail = ({ weatherApp }) => {
  const [weather, setWeather] = useState(weatherApp);
  const [unit, setUnit] = useState("celcius");
  // const [weather, setWeather] = useState("miami");
  
  const searchWeather = (event, city) => {
    if (event.preventDefault) {
      event.preventDefault();
    }
    if (event.target) {
      city = event.target.city.value.toLowerCase();
    
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=e2b798872fb193be0d21ac89f2f0299d&lang=sp&units=metric`;      
      axios
        .get(apiUrl)
        .then(({data}) => setWeather(data))
        .catch((error) => console.log("Error al obtener el clima:", error));      
      console.log(weather)
    } else {
      setWeather(weatherApp)
    }
    
  };

  // useEffect(() => {
  //   searchWeather({})
  // });

  const changeUnit = () => {
    let metric = "";
    if (unit === "fahrenheit") {
      setUnit("celcius");
    } else {
      setUnit("fahrenheit");
    }
    return metric;
  };

  const changeMetric = () => {
    let metric = "";
    if (unit === "celcius") {
      metric = `${weather.main.temp.toFixed(1)}°C`;
    } else {
      metric = `${(weather.main.temp * (9 / 5) + 32).toFixed(1)}°F`;
    }
    return metric;
  };

  useEffect(() => {
    changeMetric();
  });

  {
    /* DARK MODE */
  }
  const [isDark, setIsDark] = useState(
    localStorage.getItem("theme") === "Dark" ? true : false
  );
  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  useEffect(() => {
    localStorage.setItem("theme", isDark ? "Dark" : "Light");
  }, [isDark]);

  return (
    <article className="lg:w-2/4 grid gap-4 bg-yellow-400 bg-opacity-80 rounded-xl p-6 dark:bg-indigo-400 dark:bg-opacity-40" >
      <header className="p-2 ">
        <div className="grid grid-cols-1">
          <div className="block font-semibold text-2xl mb-3 text-center">
            <label className="relative inline-flex items-center cursor-pointer ml-2 mr-2">
              <input onClick={toggleTheme} type="checkbox" value="" className="sr-only peer"/>
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-yellow-300 dark:peer-focus:ring-slate-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-gray-600"></div>
              <IconMoonFilled className="ml-2 block dark:hidden" />
            <IconSunFilled className="text-white ml-2 hidden dark:block" />
            </label>
          </div>
          <div className=" ">
              <form onSubmit={searchWeather}>
                  <input
                    className="p-3 m-2 rounded-xl w-5/6"
                    type="search"
                    name="city"
                    id="city"
                    // value={city}
                    placeholder="Nombre de la ciudad"
                  />
                  <button
                    className="hover:border-2 hover:rounded-full p-2 border-b-yellow-900 text-yellow-900 
                                dark:hover:border-b-slate-900 hdark:hover:bg-slate-900 dark:hover:text-slate-900
                                dark:border-b-white-400 dark:text-white "
                  >
                    <IconSearch className="block " />
                  </button>
              </form>
          </div>
        </div>
      </header>
      <div className="grid gap-3 text-center lg:grid-cols-1">
        <h1 className="lg:col-span-2 uppercase">
          {weather?.name}, {weather?.sys.country}
        </h1>
        {/* card de clima */}
        <section
          className="bg-yellow-200 p-2 rounded-xl grid grid-cols-2 items-center
                  dark:bg-white/40"
        >
          <h3 className="col-span-2 uppercase font-bold">
            {weather?.weather[0].description}
          </h3>
          <p className="text-6xl">{changeMetric()}</p>
          <div className="flex justify-center">
            <img
              src={`https://openweathermap.org/img/wn/${weather?.weather[0].icon}@2x.png`}
              alt=""
            />
          </div>
        </section>
        <section
          className="grid grid-cols-3 lg:grid lg:grid-cols-1 gap-0 items-center bg-yellow-200 rounded-xl p-6
                  dark:bg-white/40"
        >
          <div
            className="grid grid-cols-2 py-2 
                  lg:border-b-4 lg:border-r-0 lg:border-b-slate-600 
                  border-r-4 border-r-slate-600"
          >
            <div>
              <img src="/images/ico_weather-windy.svg" alt="Wind speed icon" />
            </div>
            <span>{weather?.wind.speed}m/s</span>
          </div>
          <div
            className="grid grid-cols-2 py-2 
                  lg:border-b-4 lg:border-r-0 lg:border-b-slate-600 
                  border-r-4 border-r-slate-600"
          >
            <div>
              <img
                src="/images/ico_weather_raindrops.svg"
                alt="Humidity icon"
              />
            </div>
            <span>{weather?.main.humidity}%</span>
          </div>
          <div className="grid grid-cols-2 py-2 ">
            <div>
              <img src="/images/ico_weather_pressure.svg" alt="Pressure icon" />
            </div>
            <span>{weather?.main.pressure}hPa</span>
          </div>
        </section>
      </div>
      <div className="flex justify-center">
        <button
          onClick={changeUnit}
          className="w-137px p-2 rounded-lg bg-yellow-700 text-white border-2 border-yellow-500 hover:bg-yellow-600 hover:text-black
          dark:bg-slate-700 dark:hover:text-black dark:hover:bg-slate-600 dark:border-slate-500 dark:text-white ">
          {unit === "celcius" ? "Cambiar a °F" : "Cambiar a °C"}
        </button>
      </div>
    </article>
  );
};

export default WeatherDetail;
