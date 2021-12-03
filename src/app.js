const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const path= require('path')
const express= require('express')
const hbs = require('hbs')

 const app= express()

 // Define paths for Express config
 const publicDirectoryPath= path.join(__dirname,'../public')
const viewpath=path.join(__dirname,'../template/views')
const partialpath=path.join(__dirname,'../template/partials')

 //Setup handlebars engine and views location
app.set('view engine','hbs') 
app.set('views', viewpath)
hbs.registerPartials(partialpath) 

// setup static directory to serve
app.use(express.static(publicDirectoryPath)) 

app.get('',(req,res)=>{
    res.render('index',{
        title: 'Weather App',
        name: 'Kumar yash',

    })
 })
 app.get('/about',(req,res)=>{
     res.render('about',{
         title:'About Me',
         name:'Kumar Yash'

     })
 })
 app.get('/help',(req,res)=>{
    res.render('help',{
        helptext :'This is a helpful text',
        title:'Help',
        name:'Kumar Yash'
    })
})
app.get('/weather',(req,res)=> {
    const address =req.query.address
    if(!req.query.address){
        return res.send({
            error: 'You must provide an address!'
        })
    }
    // res.send({
    //     forecast: 'It is a snowing',
    //     location: 'Philadelphia',
    //     address: req.query.address
    // })
    geocode(address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({error})
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({error})
            }

          res.send({
              forecast: forecastData,
              location,
              address: address
          })
        })
    })
})

app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title: '404',
        name: 'Kumar Yash',
        errormessage :'help article not found!'
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title: '404',
        name: 'Kumar Yash',
        errormessage :'page not found'
    })
})

app.listen(3000,()=>{
    console.log('Server is up on port 3000.')
})

