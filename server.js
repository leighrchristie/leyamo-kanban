// SERVER CONFIG
const express = require('express')
const Handlebars = require('handlebars')
const expressHandlebars = require('express-handlebars')
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')
const app = express()
const {User, Task, Project, sequelize} = require('./models')
const handlebars = expressHandlebars({
    handlebars: allowInsecurePrototypeAccess(Handlebars)
})
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.engine('handlebars', handlebars)
app.set('view engine', 'handlebars')


// GET REQUESTS
app.get('/', (req, res) => {
    res.render('landing_page')
})

app.get('/view_all_projects', async (req, res) => {
    const projects = await Project.findAll()
    res.render('all_project_boards', {projects})
})

app.get('/project_board/:id', async (req, res) => {
    const project = await Project.findByPk(req.params.id)
    res.render('project_board', {project})
})

app.get('/project_board/:id/add_task', async (req, res) => {
    const project = await Project.findByPk(req.params.id)
    res.render('add_task', {project})
})

app.get('/project_board/:id/add_collaborator', async (req, res) => {
    const users = await User.findAll()
    const project = await Project.findByPk(req.params.id)
    res.render('add_collaborator', {users, project})
})


// POST REQUESTS
app.post('/add_user', async (req, res) => {
    await User.create(req.body)
    res.redirect('/')
})

app.post('/new_project_board', async (req, res) => {
    const project = await Project.create(req.body)
    res.redirect(`/project_board/${project.id}`)
})

app.post('/project_board/:id/add_task', async (req, res) => {
    await Task.create(req.body)
    console.log(req.body)
    res.redirect(`/project_board/${req.params.id}`)
})


// SERVER LOCATION
app.listen(3001, async () => {
    await sequelize.sync()
    console.log('web server running')
})
