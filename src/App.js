/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import "./App.scss";

function App() {
  const [weatherData, setWeatherData] = useState();
  console.log(weatherData);

  const url =
    "https://api.open-meteo.com/v1/forecast?latitude=41.015137&longitude=28.979530&hourly=temperature_2m,rain,is_day&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset,rain_sum,windspeed_10m_max&current_weather=true&windspeed_unit=mph&timezone=GMT";

  const options = {
    method: "GET",
  };

  const getData = async () => {
    try {
      const response = await fetch(url, options);
      const result = await response.json();
      setWeatherData(result);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const str = weatherData?.daily?.sunrise[0];
  const parca = str?.substring(11, 16);

  const sunset = weatherData?.daily?.sunset[0];
  const sun = sunset?.substring(11, 16);

  const abc = weatherData?.current_weather?.time;

  const time = abc?.substring(0, 10);

  const array = weatherData?.daily?.time;
  const newArray = array?.slice(1);

  return (
    <div className="App">
      <div className="container">
        <div className="weather-title">
          <div className="city">İstanbul</div>
          <div className="date">{time} </div>
        </div>
        <div className="current-weather">
          <div className="current-weather-data">
            <img
              src="https://tbilisi-weather-saba.netlify.app/assets/day-669d81d8.svg"
              alt=""
            />
            <div className="temperature">
              <div className="temperature-value">
                {weatherData?.current_weather?.temperature}&deg;
              </div>
              <div className="temperature-summary">sunny</div>
            </div>
          </div>
          <div className="current-weather-stats">
            <div className="stats-up">
              <div>
                <div className="stats-value">
                  {weatherData?.daily?.temperature_2m_max[0]} &deg;
                </div>
                <div className="stats-label">High</div>
              </div>
              <div>
                <div className="stats-value">
                  {weatherData?.daily?.windspeed_10m_max[0]}mph
                </div>
                <div className="stats-label">Wind</div>
              </div>
              <div>
                <div className="stats-value">{parca}</div>
                <div className="stats-label">Sunrise</div>
              </div>
            </div>
            <div className="stats-down">
              <div>
                <div className="stats-value">
                  {weatherData?.daily?.temperature_2m_min[0]} &deg;
                </div>
                <div className="stats-label">Low</div>
              </div>
              <div>
                <div className="stats-value">
                  {weatherData?.daily?.rain_sum[0]}mm
                </div>
                <div className="stats-label">Rain</div>
              </div>
              <div>
                <div className="stats-value">{sun}</div>
                <div className="stats-label">Sunset</div>
              </div>
            </div>
          </div>
        </div>
        <div className="weater-content">
          <h2>Next 6 days</h2>
          <div className="next-6-days">
            <ul>
              {newArray?.map((item, index) => (
                <li className="item">
                  <div className="item-wrap">
                    <div className="item-date">{item}</div>
                    <img
                      src="https://tbilisi-weather-saba.netlify.app/assets/day-669d81d8.svg"
                      alt=""
                    />
                  </div>
                  <div className="item-wrap">
                    <div className="item-low">
                      <div>
                        {weatherData?.daily?.temperature_2m_min[index + 1]}{" "}
                        &deg;
                      </div>
                      <div>Low</div>
                    </div>
                    <div className="item-high">
                      <div>
                        {weatherData?.daily?.temperature_2m_max[index + 1]}{" "}
                        &deg;
                      </div>
                      <div>High</div>
                    </div>
                  </div>
                  <div className="item-wrap">
                    <div className="item-rain">
                      <div>{weatherData?.daily?.rain_sum[index + 1]}mm</div>
                      <div>Rain</div>
                    </div>
                    <div className="item-wind">
                      <div>
                        {weatherData?.daily?.windspeed_10m_max[index + 1]}mph
                      </div>
                      <div>Wind</div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
