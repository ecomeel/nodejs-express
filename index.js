const express = require('express')
// const path = require('path')
const exphbs = require('express-handlebars')

const coursesRouter = require('./routes/courses')
const addRouter = require('./routes/add')
const homeRouter = require('./routes/home')
const cardRouter = require('./routes/card')

const app = express()
const hbs = exphbs.create({
  defaultLayout: 'default',
  extname: 'hbs'
})

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'pages')

app.use(express.static('public'))
app.use(express.urlencoded({extended: false}))

app.use('/', homeRouter)
app.use('/courses', coursesRouter)
app.use('/add', addRouter)
app.use('/card', cardRouter)

const PORT = process.env.PORT || 3000

app.listen(PORT, (req, res) => {
  console.log('Server is running on PORT', PORT)
})