const Router = require("express");

const {
  createCountry,
  getAllCountries,
  getCountryById,
} = require("../controller/CountryController");

const route = new Router();

route.get("/countries", getAllCountries);
route.get("/country/:countryId", getCountryById);
route.post("/country", createCountry);

module.exports = route;
