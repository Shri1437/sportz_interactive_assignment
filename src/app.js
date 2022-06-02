const express = require("express")
const countryRoute = require("./routes/country.route.js")

const app = express();

app.use(express.json());

app.use(express.static("public"));


app.use("/",countryRoute);

const PORT=  8080
app.listen(PORT, () => console.log(`Listening On PORT ${PORT}`))