const express = require('express')
const path = require('path')
const hbs = require('hbs')
const app = express()
const viewsPath = path.join(__dirname, '../templates/views')
const publicPath = path.join(__dirname, '../public')
const partialsPath = path.join(__dirname, '../templates/partials')
const port = process.env.PORT || 3000
const geoCode = require('./utils.js/geocode')
const forecast = require('./utils.js/forecast')

app.use(express.static(publicPath))

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.get('', (req, res) => {
    res.render('index', {
        title : 'Weather',
        name : 'Chirag'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title : 'About Me',
        name : 'Chirag'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
      message : 'This is a help page.',
      title : 'Help',
      name : 'Chirag'
    })
})

app.get('/weather', (req, res) => {

    if(!req.query.address){
        return res.send({
            error : 'Please provide a valid input.'
        })
    }

    geoCode(req.query.address, (error, {latitude, longitude, address}={}) => {
        if(error){
            return res.send({error})
        }
        console.log(address)
        forecast(latitude, longitude, (error, forecastData) => {
            if(error){
                return res.send({error})
            }
            res.send({
                address,
                forecast : forecastData
            })
        })
    })
    
})

app.get('/help/*', (req, res) => {
    res.render('404', {
      message : '404.',
      title : 'Not found',
      name : 'Chirag'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
      message : 'Page not found.',
      title : 'Not found',
      name : 'Chirag'
    })
})

app.listen(port, () => {
    console.log(`Server running on port ${port}.`)
})