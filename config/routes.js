var home = require('../app/controllers/home');

//you can include all your controllers

module.exports = function (app, passport) {



    app.get('/', home.home);//home


}
