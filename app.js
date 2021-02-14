
var path = require('path');
var express = require('express');
var hbs = require('hbs');
var weather = require('../functions/weather.js');
var app = express()
var pubPath = path.join(__dirname,'../public')
var viewsPath = path.join(__dirname,'../templates/views')
var partialsPath = path.join(__dirname,'../templates/partials')

app.use(express.static(pubPath))
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.get('',(req,res)=>{
   res.render('index',{
       title:'Weather App'
   })
})

app.get('/about',(req,res)=>{
   res.render('about')
})

app.get('/weather',(req,res)=>{
    if (!req.query.location) {
        return res.send({
            error:'Location Required'
        })
    }
    weather(req.query.location,(error,data)=>{
        if (error !== undefined) {
            return res.send({
                error
            })
        }else{
          return res.send({
              location:data.location.name,
              temp: data.current.temperature,
              icon:data.current.weather_icons[0],
              desc:data.current.weather_descriptions[0]
          })
        }
    })
})

app.listen(2000,()=>{
    console.log('Server is Up')
})