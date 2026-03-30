const express = require('express')
const app = express()
app.set('view engine', 'ejs')
app.set('views', './views')

app.use(express.static('public'))


const port = 3000

app.get('/', (req, res) => {
  res.render('index')
})

app.get('/about', (req,res)=>{
  res.render('about')
})
app.get('/contact', (req,res)=>{
  res.render('contact')
})

app.post('/submit', (req,res)=>{
res.redirect('/contact')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


