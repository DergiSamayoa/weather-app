// import React, { useEffect, useState } from 'react';

import { useEffect } from "react";

const WeatherDetail = ({ weather }) => {
  console.log(weather);

  const convertToFahrenheit = () => {
    return (weather.main.temp * (9 / 5) + 32).toFixed(1);
  }

  useEffect(() => {
    convertToFahrenheit();
  });

  return (
    <article className="w-2/4 grid gap-4">
      <header>
        <ul>
          <li>
            <h4>Weather app</h4>
          </li>
          <li>
            <input type="search" name="" id="" />
          </li>
          <li>
            <button>dark/light</button>
          </li>
        </ul>
      </header>
      <div className="grid gap-3 text-center">
        <h1>
          {weather.name}, {weather.sys.country}
        </h1>
        {/* card de clima */}
        <section className="bg-white/40 p-2 rounded-xl grid grid-cols-2">
          <h3 className="col-span-2">{weather.weather[0].description}</h3>
          <p className="text-4xl">{convertToFahrenheit()}&#8457;</p>{" "}
          {/* &#8457; para grados Farenheit */}
          <div className="flex justify-center">
            <img
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt=""
            />
          </div>
        </section>
        <section className="grid grid-cols-3 justify-items-center bg-white/40">
          <div className="flex gap-1">
            <div>
              <img src="/images/ico_weather-windy.svg" alt="Wind speed icon" />
            </div>
            <span>{weather.wind.speed} m/s</span>
          </div>
          <div className="flex gap-1">
            <div>
              <img src="/images/ico_weather_raindrops.svg" alt="Humidity icon" />
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
      <button className="p-2 rounded-lg bg-slate-700 text-white">
        Fahrenheit
      </button>
    </article>
  );
};

export default WeatherDetail;
