const express = require('express')
const Handlebars = require('handlebars')
const expressHandlebars = require('express-handlebars')
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')
const app = express()
const {User, sequelize} = require('./models')

const handlebars = expressHandlebars({
    handlebars: allowInsecurePrototypeAccess(Handlebars)
})

app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.engine('handlebars', handlebars)
app.set('view engine', 'handlebars')

app.post('/add_user', async (req, res) => {
    await User.create(req.body)
    res.redirect('/')
})

app.get('/', (req, res) => {
    res.render('landing_page')
})

app.get('/view_all_projects', (req, res) => {
    res.render('all_project_boards')
})

app.listen(3001, async () => {
    await sequelize.sync()
    console.log('web server running')
})
