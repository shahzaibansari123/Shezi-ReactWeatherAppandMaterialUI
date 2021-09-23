import './App.css';
import { useState, useEffect, useRef } from "react"
import axios from 'axios';

import { styled } from '@mui/material/styles';
// import { Form, Button, FormControl, Container, Row, Col } from 'react-bootstrap'
import { TextField, Button, Grid, } from '@mui/material';
import Item from '@mui/material/Grid'
// import MenuIcon from '@mui/icons-material/Menu';
// import { height } from '@mui/system';

const Div = styled('div')(({ theme }) => ({

  padding: theme.spacing(4),
  // width: "60%",
  // height: "300px",
  margin: "auto",
  borderRadius: "50px",
  // backgroundAttachment: "fixed",

  [theme.breakpoints.up('xs')]: {
    // backgroundColor: "pink",
    marginTop: "10%",
    fontSize: "10px",
    // marginBottom: "50px",
    width: "60%",
    height: "500px",
    // margin: "auto",
    // marginTop: "50px",
    // height:"1115px",
    //   width: "400px",
    // height: "900px",
    // backgroundAttachment: "fixed",
  },

  [theme.breakpoints.up('sm')]: {
    backgroundColor: "red",
    width: "70%",
    height: "600px",
    // margin: "auto",
    marginTop: "20%",
    fontSize: "10px",
    // width: "600px",
    // position: "relative",
  },

  [theme.breakpoints.up('md')]: {
    backgroundColor: "orange",
    // width: "500px",
    // width:"95.8%",
    // height: "689px",
    width: "80%",
    height: "700px",
    marginTop: "20%",
    fontSize: "14px",

  },

  [theme.breakpoints.up('lg')]: {
    // backgroundColor: "red",
    // backgroundColor: "yellow",
    // width: "1000px",
    // width:"95.8%",
    // height: "689px",
    width: "80%",
    height: "500px",
    marginTop: "5%",
    fontSize: "20px",
  },

  [theme.breakpoints.up('xl')]: {
    backgroundColor: "green",
    // width: "1000px",
    // width:"95.8%",
    // height: "689px",
    // backgroundAttachment: "fixed",
    width: "85%",
    height: "550px",
    marginTop: "5%",
    fontSize: "20px",
  },
}));

function App() {
  const [weather, setweather] = useState(null)

  // const [cityName, setCityName] = useState("karachi")
  const cityName = useRef("london");

  const [location, setLocation] = useState(null)

  const [submit, setSubmit] = useState(false)

  useEffect(() => {

    let name = "";

    if (cityName.current.value) {
      name = `q=${cityName.current.value}`
    }
    // else if (location) {
    // if (!location) {
    // } 
    else if (location === "fail") {
      alert('please turn on your loaction')
    } else if (location && location.latitude) {
      name = `lat=${location.latitude}&lon=${location.longitude}`
    }

    console.log("name: ", name)
    if (name) {
      axios.get(`https://api.openweathermap.org/data/2.5/weather?${name}&&appid=0c702b3dffad340f5e1890bd9eeb5d0f&units=metric`)
        .then(res => {
          const newWeather = res.data;
          // console.log("newWeather: ", newWeather);
          setweather(newWeather);
        });
    }

  }, [submit, location]);

  useEffect(() => {

    function getLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          console.log("position got: ", position.coords.latitude);
          // console.log("position got: ", position.coords.longitude);
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          })

        }, function (error) {

          setLocation("fail")

        });
      } else {
        console.log("Geolocation is not supported by this browser.");
      }
    }

    getLocation()

  }, []);
  return (
    <div>

      {/* <h1>City Name:</h1> */}
      {/* <input onChange={(e) => {
        console.log("e: ", e.target.value)
        setCityName(e.target.value)
      }} /> */}
      {/* <input ref={cityName} />
      <button onClick={() => {
        console.log("name: ", cityName.current.value)
        setSubmit(!submit)
      }} >Submit</button> */}
      {/* <br /> */}
      {/* <h1>{weather?.main?.temp}</h1> */}

      {
        (weather !== null) ?
          <>
            <Div className={weather?.weather[0].main}>
              <Grid container spacing={1}>
                <Grid item xl={10} lg={10} xs={8} sm={8} md={8}>
                  <Item><TextField placeholder="enter city name" color="primary" sx={{ backgroundColor: "lightgray", color: 'white' }} fullWidth inputRef={cityName} >
                  </TextField>
                  </Item>
                </Grid>
                <Grid item xl={2} lg={2} xs={4} sm={4} md={4}>
                  <Item><Button sx={{ height: '55px', width: '90%', backgroundColor: "lightgray", color: 'black' }} onClick={() => {
                    console.log("name: ", cityName.current.value)
                    setSubmit(!submit)
                  }}>Search</Button>
                  </Item>
                </Grid>
              </Grid>
              {/* <input ref={cityName} />
      <button onClick={() => {
        console.log("name: ", cityName.current.value)
        setSubmit(!submit)
      }} >Submit</button> */}
              <br />
              <Grid container spacing={2}>
                <Grid item xl={12} lg={12} xs={12} sm={12} md={12}>
                  <Item sx={{ textAlign: "center", }}><h1 >{weather.name}</h1>
                    <h2 >{weather?.weather[0].main}</h2>
                    <h1  >{weather?.main?.temp} <span id="degree">°C</span></h1>
                  </Item>
                </Grid>
              </Grid>
              <Grid container spacing={0} sx={{ backgroundColor: "black", opacity: "0.3", color: "white", padding: "2px" }}>
                <Grid item xl={4} lg={4} xs={4} sm={4} md={4}>
                  <Item sx={{ textAlign: "center", }}>
                    <h4 >Humidity: {weather?.main?.humidity} g/kg</h4>
                    <h4 >Wind Speed: {weather?.wind.speed} m/s</h4>
                    <h4 >Wind Direction : {weather.wind.deg} °</h4>
                  </Item>
                </Grid>
                <Grid item xl={4} lg={4} xs={4} sm={4} md={4}>
                  <Item sx={{ textAlign: "center", }}><h4 >Min Temperature : {weather.main.temp_min}°C</h4>
                    <h4 > Latitude: {weather.coord.lat}</h4>
                    <h4 > Country : {weather.sys.country}</h4>
                  </Item>
                </Grid>
                <Grid item xl={4} lg={4} xs={4} sm={4} md={4}>
                  <Item sx={{ textAlign: "center", }}><h4 >Max Temperature : {weather.main.temp_max}°C</h4>
                    <h4 >Longitude: {weather.coord.lon}</h4>
                    <h4 >Feels Like : {weather.main.feels_like}°C</h4>
                  </Item>
                </Grid>
              </Grid>
            </Div>
          </>
          :
          <center>
            <h1>Loading...</h1>
          </center>
      }
    </div>
  );
}

export default App;