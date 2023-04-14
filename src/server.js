require('dotenv').config({path:"../words.env"})

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const routes = require("./routes");
const path = require("path");
app.use(express.static("../public"));
console.log(path.join(__dirname, "public"))


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(routes);

app.listen(process.env.PORT, () => {
    console.log("Servidor rodando")
})