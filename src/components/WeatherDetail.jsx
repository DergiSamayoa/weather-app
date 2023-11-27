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

  // const bgImages = {
  //   "01d": "url(./images/background-day.svg)",
  //   "02d": "url(./images/background-day.svg)",
  //   "03d": "url(./images/background-cloudy.svg)",
  //   "04d": "url(./images/background-cloudy.svg)",
  //   "09d": "url(./images/background-rainy.svg)",
  //   "10d": "url(./images/background-rainy.svg)",
  //   "11d": "url(./images/background-stormy.svg)",
  //   "13d": "url(./images/background-snowy.svg)",
  //   "50d": "url(./images/background-foggy.svg)",
  //   "01n": "url(./images/background-night.svg)",
  //   "02n": "url(./images/background-night.svg)",
  //   "03n": "url(./images/background-cloudy.svg)",
  //   "04n": "url(./images/background-cloudy.svg)",
  //   "09n": "url(./images/background-rainy.svg)",
  //   "10n": "url(./images/background-rainy.svg)",
  //   "11n": "url(./images/background-stormy.svg)",
  //   "13n": "url(./images/background-snowy.svg)",
  //   "50n": "url(./images/background-foggy.svg)",
  // }

  return (
    <article className="lg:w-2/4 grid gap-4 bg-indigo-400 bg-opacity-40 rounded-xl">
      <header className="p-6">
        <ul className="flex justify-between">
          <li>
            <h4>Climan en tu ciudad</h4>
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
        <section className="grid grid-cols-3 lg:grid lg:grid-cols-2 gap-4 items-center bg-white/40 rounded-xl p-6">
          <div className="flex gap-1">
            <div>
              <img src="/images/ico_weather-windy.svg" alt="Wind speed icon" />
            </div>
            <span>{weather.wind.speed}m/s</span>
          </div>
          <div className="flex gap-1">
            <div>
              <img
                src="/images/ico_weather_raindrops.svg"
                alt="Humidity icon"
              />
            </div>
            <span>{weather.main.humidity}%</span>
          </div>
          <div className="flex gap-1">
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
