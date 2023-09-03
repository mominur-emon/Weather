import React, { useState } from "react";
import "./style.css";
import { BsSearch } from "react-icons/bs";
import axios from "axios";

const Home = () => {
  const [info, setInfo] = useState({
    celcius: 10,
    name: "Rajshahi",
    humidity: 10,
    speed: 2,
    image: "/Images/cloudy.png",
  });

  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const handleNameClick = () => {
    if (name !== "") {
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=ce2932f6437dfc374fef916a7b976e85&&units=metric`;
      axios
        .get(apiUrl)
        .then((res) => {
          console.log(res.data);
          let imagePath = "";
          if (res.data.weather[0].main === "Clouds") {
            imagePath = "/Images/clouds.png";
          } else if (res.data.weather[0].main === "Clear") {
            imagePath = "/Images/sun.png";
          } else if (res.data.weather[0].main === "Rain") {
            imagePath = "/Images/rain.png";
          } else if (res.data.weather[0].main === "Drizzle") {
            imagePath = "/Images/drizzle.png";
          } else if (res.data.weather[0].main === "Mist") {
            imagePath = "/Images/mist.png";
          } else {
            imagePath = "/Images/cloudy.png";
          }

          setInfo({
            ...info,
            celcius: res.data.main.temp,
            name: res.data.name,
            humidity: res.data.main.humidity,
            speed: res.data.wind.speed,
            image: imagePath,
          });
          setError("");
        })
        .catch((err) => {
          if (err.response.status === 404) {
            setError("Invalid City Name");
          } else {
            setError("");
          }
          console.log(err);
        });
    }
  };
  return (
    <div className="container">
      <div className="weather">
        <div className="search">
          <input
            type="text"
            placeholder="Enter the city"
            onChange={(e) => setName(e.target.value)}
          />
          <button onClick={handleNameClick}>
            <BsSearch />
          </button>
        </div>
        <div className="error">
          <p>{error}</p>
        </div>
        <div className="w-info">
          <img src={info.image} alt="" />
          <h1>{Math.round(info.celcius)}&#176;C</h1>
          <h2>{info.name}</h2>
        </div>
        <div className="details">
          <div className="col">
            <img src="/Images/humidity.png" alt="" />
            <div>
              <h3>{Math.round(info.humidity)}% </h3>
              <h3>Humidity</h3>
            </div>
          </div>
          <div className="col">
            <img src="/Images/wind.png" alt="" />
            <div>
              <h3>{Math.round(info.speed)} km/h</h3>
              <h3>Wind</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
