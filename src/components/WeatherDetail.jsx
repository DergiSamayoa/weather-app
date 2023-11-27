import { useEffect, useState } from "react";

const WeatherDetail = ({ weather }) => {
  const [unit, setUnit] = useState("celcius");

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
    console.log(weather.weather[0].icon);
    return metric;
  };

  useEffect(() => {
    changeMetric();
  });

  return (
    <article className="lg:w-2/4 grid gap-4 bg-indigo-400 bg-opacity-40 rounded-xl p-6">
      <header className="p-6">
        <ul className="flex justify-between">
          <li>
            <h4>Clima en tu ciudad</h4>
          </li>
          <li>
            <input type="search" name="" id="" />
          </li>
          <li>
            <button>oscuro/claro</button>
          </li>
        </ul>
      </header>
      <div className="grid gap-3 text-center lg:grid-cols-1">
        <h1 className="lg:col-span-2">
          {weather.name}, {weather.sys.country}
        </h1>
        {/* card de clima */}
        <section className="bg-white/40 p-2 rounded-xl grid grid-cols-2 items-center">
          <h3 className="col-span-2">{weather.weather[0].description}</h3>
          <p className="text-6xl">{changeMetric()}</p>
          <div className="flex justify-center">
            <img
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt=""
            />
          </div>
        </section>
        <section className="grid grid-cols-3 lg:grid lg:grid-cols-1 gap-4 items-center bg-white/40 rounded-xl p-6">
          <div className="grid grid-cols-2 py-2 
                  lg:border-b-4 lg:border-r-0 lg:border-b-slate-600 
                  border-r-4 border-r-slate-600">
            <div>
              <img src="/images/ico_weather-windy.svg" alt="Wind speed icon" />
            </div>
            <span>{weather.wind.speed}m/s</span>
          </div>
          <div className="grid grid-cols-2 py-2 
                  lg:border-b-4 lg:border-r-0 lg:border-b-slate-600 
                  border-r-4 border-r-slate-600">
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
      <button
        onClick={changeUnit}
        className="p-2 rounded-lg bg-slate-700 text-white
        hover:bg-blue-600 hover:border-2 hover:border-blue-500" >
        {unit === "celcius" ? "Ver en Fahrenheit" : "Ver en Celcius"}
      </button>
    </article>
  );
};

export default WeatherDetail;
