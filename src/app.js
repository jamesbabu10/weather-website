const path = require("path");
const express = require("express");
const hbs = require("hbs");

const geocode = require("./../utils/geocode.js");
const forecast = require("./../utils/forecast.js");

console.log(__dirname);

const app = express();

//
console.log(path.join(__dirname, "../public"));
const viewsPath = path.join(__dirname, "../templates/views");
const partialspath = path.join(__dirname, "../templates/partials");
//setup static directory to serve

app.use(express.static(path.join(__dirname, "../public")));
//setup handelbars enginer and views location

app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialspath);
//app.set("views", path.join(__dirname, "../public/views"));
app.get("/james", (req, res) => {
  res.send("<h1>Hello Express!</h1>");
});
app.get("", (req, res) => {
  res.render("index", {
    title: "weather app",
    name: "james babu",
  });
});
app.get("/about", (req, res) => {
  res.render("about", {
    title: "about title",
    name: "james babu",
  });
});
app.get("/help", (req, res) => {
  res.render("help", {
    message: "this is help message",
    title: "help",
    name: "james",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "Enter the address",
    });
  } else {
    const address = req.query.address;
    if (address) {
      geocode(address, (error, { long, lat, location } = {}) => {
        if (error) {
          return res.send({ error });
          // return console.log(error);
        }
        //console.log("data", data);
        forecast(long, lat, (error, forecastdata) => {
          if (error) {
            return res.send({ error });
            //  return console.log(error);
          }
          // console.log(forecastdata);
          //console.log(forecastdata.current.weather_descriptions);
          res.send({
            address: req.query.address,
            location: location,
            forecast: forecastdata.current.weather_descriptions[0],
          });
        });
      });
    } else {
      console.log("please enter a location");
    }
  }
});
app.get("/products", (req, res) => {
  if (!req.query.search) {
    res.send({ error: "You must provide a search term" });
  } else {
    console.log(req.query.search);
    console.log(req.query.rating);
  }

  res.send({
    products: [],
  });
});

app.get("/help/*", (req, res) => {
  res.send("article note found");
});
app.get("/error", (req, res) => {
  res.render("404", {
    error: "this is 404 error message",
    title: "error",
    name: "james error page",
  });
});
app.get("*", (req, res) => {
  res.render("404", {
    error: "page not found error",
    title: "error",
    name: "james error page",
  });
});
app.listen(3000, () => {
  console.log("running");
});
