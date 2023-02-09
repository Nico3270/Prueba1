const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended:true}));
const port = 3000;
const axios = require('axios');


app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/index.html");
});

app.get("/prueba",(req,res)=>{
    res.send("Hola a todos");
});



app.post("/",(req,res)=>{
    let ciudad = req.body.city;
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+ciudad+"&appid=dc0968df6d34a81309f09c65e171e54d&units=metric";
    axios.get(url).then((result) => {
        let temp = result.data.main.temp;
        let icon = result.data.weather[0].icon;
        let description = result.data.weather[0].description;
        let imageIcon = "https://openweathermap.org/img/wn/"+ icon +"@2x.png";
        res.write("<img src="+imageIcon+">");
        res.write("<h1>La temperatura actual en " + ciudad + " es de "+temp+" grados Celsious</h1>");
        res.write("<h1>La descripción del clima en " + ciudad + " es "+ description);
        res.send();
    });
});

app.listen(port, () => {
    console.log("Servidor inicializado en el puerto 3000");
});