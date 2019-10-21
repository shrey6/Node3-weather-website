const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const app = express()
const port = process.env.PORT || 3000


//define path for express config
const publicdirectory =path.join(__dirname,'../public')
const viewspath = path.join(__dirname,'../templates/views')
const partialspath = path.join(__dirname,'../templates/partials')

//setup handlebars and views location

app.set('view engine','hbs')
app.set('views',viewspath)
hbs.registerPartials(partialspath)

//setup static directory to serve
app.use(express.static(publicdirectory))


app.get('',(req,res)=>{
    res.render('index', {
        title: 'Weather App',
        name: 'Shrey'

    })
})
app.get('/about',(req,res)=>{
    res.render('about', {
        title: 'About me',
        name: 'Shrey'

    })
})
app.get('/help', (req,res)=> {
    res.render('help',{
        Helptext: 'this is some helpfull text',
        title: 'Help',
        name: 'Shrey'
        
    })
        // {
        // name: 'Shrey',
        // age: '27'
    })

    
// })
// app.get('/about',(req,res)=>{ 
//     res.send(express.static(path.join(__dirname,'../public/about.html')))
// })
app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'You must provide a search term'
            
        })
    }
    
        geocode(req.query.address, (error,{latitude,longitude,location} ={})=>{
            if(error){
                return res.send({error})
            }

        
            // const {latitude}
         
            forecast(latitude,longitude,(error,forecastData) =>{
                if(error){
                    return res.send({error})
                }
            
            
        
        res.send({
        forecast: forecastData,
        location,
        address: req.query.address
   
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
    res.render('404',
    {
        title: '404',
        errortext: 'Help page not found',
        name: 'Shrey'
    })
})
app.get('*',(req,res) =>{
    res.render('404',{
        title: '404',
        
        name: 'Shrey' 
    })
})

//this let us configure what server will do once someone tries to get resources from url
app.listen(port, ()=>{
    console.log('Server running on port port' +port)
})