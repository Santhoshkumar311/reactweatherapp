import { useState } from 'react'
import './App.css'
import PropTypes from "prop-types"



import searchIcon from "./assets/search.png"
import cloudIcon from "./assets/cloud.png"
import drizzleIcon from "./assets/drizzle.png"
import rainIcon from "./assets/rain.png"
import humidityIcon from "./assets/humidity.png"
import snowIcon from "./assets/snow.png"
import clearIcon from "./assets/clear.png"
import windIcon from "./assets/wind.png"


  const WeatherDetails =({icon, temp, city,country,latitude,longitude,humidity,wind}) =>
    {
     return(
       <>
      <div className="image">
        <img src={icon} alt="Image" />
      </div> 
      <div className="temp">{temp}°C</div>
      <div className="location">{city}</div>
      <div className="country">{country}</div>
      <div className="cord">
        <div>
           <span className="lat">latitude:</span>
           <span>{latitude}</span>
           </div>
          <div>
           <span className="long">longitude: </span>
           <span>{longitude}</span>
           </div>
          </div>
           <div className="data-container">
            <div className="element">
              <img src={humidityIcon} alt="humidity" className="icon"/>
                 <div className="data">
                  <div className="humidity-percent">{humidity}%</div>
                  <div className="text">Humidity</div>
                 </div>
            </div>
              <div className="element">
              <img src={windIcon} alt="wind" className="icon"/>
                 <div className="data">
                  <div className="wind-percent">{wind} km/h</div>
                  <div className="text">Wind Speed</div>
                 </div>
            </div>
           </div> 
      </>
     )
    }  
WeatherDetails.propTypes = {
  icon: PropTypes.string.isRequired,
  temp: PropTypes.number.isRequired,
  city: PropTypes.string.isRequired,
  country: PropTypes.string.isRequired,
  latitude: PropTypes.number.isRequired,
  longitude: PropTypes.number.isRequired,
  humidity: PropTypes.number.isRequired,
  wind: PropTypes.number.isRequired,
};

function App() {
  
  let api_key = 'bdcab7a432dd2e989ef0193622bc1fc3'
  const [text,setText]= useState("Chennai")
const [icon, setIcon] = useState(snowIcon)
const [temp, setTemp] = useState(0)
const [city, setCity] = useState("Chennai")
const [country, setCountry] = useState("India")
const [latitude, setLatitude] = useState(0)
const [longitude, setLongitude] = useState(0)
const [humidity, setHumidity] = useState(0)
const [wind, setWind] = useState(0)
const [cityNotFound, setCityNotFound] = useState(false)
const [loading, setLoading] = useState(false)
const[error,setError]=useState(null)

const weatherIconMap = {
  "01d": clearIcon,
  "01n": clearIcon,
  "02d": cloudIcon,
  "02n": cloudIcon,
  "03d": drizzleIcon,
  "03n": drizzleIcon,
  "04d": drizzleIcon,
  "04n": drizzleIcon,
  "09d": rainIcon,
  "09n": rainIcon,
  "10d": rainIcon,
  "10n": rainIcon,
  "13d": snowIcon,
  "13n": snowIcon,
}

const search=async()=>
{
  setLoading(true)
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=${api_key}&units=Metric`
  try{let res = await fetch(url)
    let data = await res.json()
    // console.log(data)
    if (data.cod === "404") {
      setCityNotFound(true);
      setLoading(false);
      return;
    }
    setHumidity(data.main.humidity);
    setWind(data.wind.speed);
    setTemp(Math.floor(data.main.temp));  
    setCity(data.name);
    setCountry(data.sys.country);
    setLatitude(data.coord.lat);
    setLongitude(data.coord.lon); 
    const weatherIconCode = data.weather[0].icon; 
    setIcon(weatherIconMap[weatherIconCode] || drizzleIcon);

  }catch(error){
    console.error("An error occurred:", error.message);
    setCityNotFound(true);
    setLoading(false);
    return;
  }finally{
    setLoading(false)

  }
}
const handleCity = async (e) => {
setText(e.target.value)
}
const handleKeyDown = async (e) => {
if (e.key === "Enter") {
search()
}
}
return (
 <>
  <div className="container">
    <div className='input-container'>
      <input type='text' className='cityInput'
       placeholder='Search City'
       onChange={handleCity}
       value={text} onKeyDown={handleKeyDown}
      />
      <div className="search-icon" onClick={search}>
        <img src={searchIcon} alt="SearchIcon"/>

      </div>
    </div>


           {loading &&<div className="loading-message">{loading && "Loading..."}</div>}
           {error && <div className="error-message">{error}</div>}
           {cityNotFound && <div className="error-message">City Not Found</div>}

          {!loading && !cityNotFound && <WeatherDetails icon={icon} temp={temp} city={city} country={country} latitude={latitude} longitude={longitude} 
     humidity={humidity} wind={wind} />}

     <p className="copyright">Designed by <span>SANTHOSHKUMAR K</span> </p>
  </div>
  </>
  )
}

export default App
