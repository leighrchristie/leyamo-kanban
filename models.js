const {Sequelize, Model, DataTypes} = require('sequelize')
const path = require('path')
const sequelize = process.env.NODE_ENV === 'test'
    ? new Sequelize('sqlite::memory:', null, null, {dialect: 'sqlite'})
    : new Sequelize({dialect: 'sqlite', storage: path.join(__dirname, 'data.db')})


class User extends Model {}
User.init({
    name: DataTypes.STRING,
    image: DataTypes.STRING
}, {sequelize})

class Project extends Model {}
Project.init({
    name: DataTypes.STRING
}, {sequelize})

class Task extends Model {}
Task.init({
    name: DataTypes.STRING
}, {sequelize})

Project.hasMany(User)
Project.hasMany(Task)
User.hasMany(Project)
User.hasMany(Task)
Task.belongsTo(User)

module.exports = {
    User,
    Project, 
    Task,
    sequelize
}
