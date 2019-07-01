const path = require("path")
const express = require("express")
const hbs = require("hbs")
const geo = require("./utils/geocode.js")
const fore = require("./utils/forecast.js")

const app = express()
const port = process.env.PORT || 3000

//console.log(__dirname)
//console.log(path.join(__dirname, "../public"))

const publicPath = path.join(__dirname, "../public")
const viewsPath = path.join(__dirname, "../templates/views")
const partialsPath = path.join(__dirname, "../templates/partials")

app.use(express.static(publicPath))
app.set("view engine", "hbs")
app.set("views", viewsPath)
hbs.registerPartials(partialsPath)

app.get("", (req, res) => {
    res.render("index", {
        title: "Weather App",
        name: "Daniel Felipe"
    })
})

app.get("/weather", (req, res) => {
    if(!req.query.address)
        return res.send("Please provide an address")
    
    geo.geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error)
            return res.send({error})
    
        fore.forecast(latitude, longitude, (error, forecastData) => {
            if(error)
                return res.send({error})
            
            res.send({
                forecast: forecastData.forecast,
                location: location,
                address: req.query.address
            })  
        })
    })    
})


app.listen(port, () => console.log("Server is up on port" + port))


