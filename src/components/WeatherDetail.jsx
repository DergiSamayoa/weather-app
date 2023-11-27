import { useEffect, useState } from "react";
import { IconMoonFilled, IconSearch, IconSunFilled } from "@tabler/icons-react";
import axios from "axios";

const WeatherDetail = ({ weather }) => {
  const [unit, setUnit] = useState("celcius");
  const [city, setCity] = useState();

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

  {
    /* CITY SEARCH */
  }
  const searchWeather = (event, city) => {
    if (event.preventDefault) {
      event.preventDefault();
    }
    if (event.target) {
      city = event.target.city.value.toLowerCase();
    }
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=e2b798872fb193be0d21ac89f2f0299d&lang=sp&units=metric`;
    console.log(apiUrl)
    axios
      .get(apiUrl)
      .then(({ city }) => setCity(city))
      .catch((error) => console.log("Error al obtener el clima:", error));
  };

  useEffect(() => {
    searchWeather({}, "Miami");
  });

  return (
    <article
      className="lg:w-2/4 grid gap-4 bg-yellow-400 bg-opacity-80 rounded-xl p-6
                dark:bg-indigo-400 dark:bg-opacity-40"
    >
      <header className="p-2 ">
        <div className="grid grid-cols-1">
          <div className="justify-items-stretch font-semibold text-2xl mb-3 text-center">
            <h4 className="w-5/6">Clima en tu ciudad</h4>    
          </div>
          <div className=" ">
              <form onSubmit={searchWeather}>
                  <input
                    className="p-3 m-2 rounded-xl w-5/6"
                    type="search"
                    name="city"
                    id="city"
                    value={city}
                    placeholder="Nombre de la ciudad"
                  />
                  <button
                    className="border-4 rounded-full p-3 border-b-slate-900 text-slate-900 
                                hover:border-b-slate-900 hover:bg-slate-900 hover:text-slate-500
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
          {weather.name}, {weather.sys.country}
        </h1>
        {/* card de clima */}
        <section
          className="bg-yellow-200 p-2 rounded-xl grid grid-cols-2 items-center
                  dark:bg-white/40"
        >
          <h3 className="col-span-2 uppercase font-bold">
            {weather.weather[0].description}
          </h3>
          <p className="text-6xl">{changeMetric()}</p>
          <div className="flex justify-center">
            <img
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
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
            <span>{weather.wind.speed}m/s</span>
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
            <span>{weather.main.humidity}%</span>
          </div>
          <div className="grid grid-cols-2 py-2 ">
            <div>
              <img src="/images/ico_weather_pressure.svg" alt="Pressure icon" />
            </div>
            <span>{weather.main.pressure}hPa</span>
          </div>
        </section>
      </div>
      <div className="flex content-around gap-5">
        <button
          onClick={changeUnit}
          className="p-2 rounded-lg bg-yellow-700 text-white border-2 border-yellow-500 hover:bg-yellow-600 hover:text-black
          dark:bg-slate-700 dark:hover:text-white dark:hover:bg-slate-600 dark:border-slate-500 dark:text-black w-5/6">
          {unit === "celcius" ? "Ver en Fahrenheit" : "Ver en Celcius"}
        </button>
        <button
                onClick={toggleTheme}
                className="border-4 rounded-full p-3 border-b-slate-900 text-slate-900
                          hover:border-b-slate-900 hover:bg-slate-900 hover:text-slate-500 
                          dark:border-b-white-400 dark:text-white inline-block"
              >
                <IconMoonFilled className="block dark:hidden" />
                <IconSunFilled className="hidden dark:block" />
              </button>
      </div>
    </article>
  );
};

export default WeatherDetail;
