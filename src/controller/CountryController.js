let countries = require("../../data/data.json");
const idGen = require("../utils/generateId");
const fs = require("fs");

const isValidName = function (value) {
  if (!/^([a-zA-Z ]){3,20}$/.test(value.trim())) {
    return false;
  }
  return true;
};

const isValid = function (value) {
  if (typeof value === "undefined" || value === null) return false;
  if (typeof value === "string" && value.trim().length === 0) return false;
  return true;
};

const isValidRequestBody = function (requestBody) {
  return Object.keys(requestBody).length > 0;
};

//...........................Create Countries....................................//

exports.createCountry = async (req, res) => {
  try {
    const { body } = req;
    //Validate body
    if (!isValidRequestBody(body)) {
      return res.status(400).send({
        status: false,
        message: "Country details must be present in body",
      });
    }

    const { name, continent, flag, rank } = body;

    if (!isValidName(name)) {
      return res
        .status(400)
        .send("Country name must be between 3 to 20 characters");
    }

    if (!isValid(name)) {
      return res.status(400).send("Country name must be present");
    }

    if (!isValid(continent)) {
      return res.status(400).send("continent field must be present");
    }

    if (!isValid(rank)) {
      return res.status(400).send("rank field must be present");
    }

    if (!isValid(flag)) {
      return res.status(400).send("flag path must be present");
    }

    const newCountry = Object.assign({ id: idGen() }, body);

    countries.countries.push(newCountry);

    fs.readFile(`${__dirname}/../../data/data.json`, (err, data) => {
      if (err) {
        return err;
      }
      let store = JSON.parse(data.toString());
      for (let i = 0; i < store.countries.length; i++) {
        if (
          store.countries[i].name == name ||
          store.countries[i].rank == rank
        ) {
          return res.send({ msg: "name and rank should be unique" });
        }
      }
      fs.writeFile(
        `${__dirname}/../../data/data.json`,
        JSON.stringify(countries),
        (err) => {
          if (err) throw err;

          res.status(201).send({
            status: "Success",
            results: countries.length,
            data: { country: newCountry },
          });
        }
      );
    });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

//...........................Get All Countries....................................//

exports.getAllCountries = (req, res) => {
  try {
    const allCountries = [];
    countries.countries.forEach((el) => {
      country = {};
      country.id = el.id;
      country.name = el.name;
      allCountries.push(country);
    });
    res.status(200).send(allCountries);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

//...........................Get Countries By Id....................................//

exports.getCountryById = (req, res) => {
  try {
    const { countryId } = req.params;
    const country = countries.countries.find((el) => el.id === countryId);
    if (!country) {
      res.status(400).send({ status: false, msg: "Invalid Country Id" });
    }
    res.status(200).send(country);
  } catch (err) {
    res.status(500).send(err.message);
  }
};
