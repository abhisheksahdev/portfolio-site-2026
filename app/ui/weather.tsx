"use client";

import { useEffect, useState } from "react";

import { TiWeatherCloudy } from "react-icons/ti";

export function CurrentWeather() {
  const [temp, setTemp] = useState(0);

  useEffect(() => {
    const getCurrentWeather = async () => {
      const res = await fetch(
        "https://api.openweathermap.org/data/2.5/weather?lat=26.7039077&lon=89.0916337&appid=f9307bc3837dd28a347c08293b782091&units=metric",
      );

      const resData = await res.json();

      if (res.status === 200) {
        setTemp(parseInt(resData["main"]["temp"]));
      }
    };
    getCurrentWeather();
  }, []);

  return (
    <div className="font-medium font-mono flex items-center gap-x-1 text-xs">
      <TiWeatherCloudy size={16} color="skyblue" />
      <p>{temp}&deg;C</p>
    </div>
  );
}
