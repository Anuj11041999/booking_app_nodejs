const express = require('express');
const bodyParser = require('body-parser');

const controller = require('./controller/main')
const app = express();
const sequelize = require('./util/database');

var cors = require('cors');
app.use(cors());
app.use(bodyParser.json({extended:false}));

app.get('/user/',controller.getAppointments);
app.post('/user/add',controller.addAppointment);
app.post('/delete/:id',controller.removeAppointment);
// app.get('/',controller.getEditAppointment);
// app.post('/',controller.postEditAppointment);

sequelize
    .sync()
    .then(result=>{
        app.listen(3000)
    })
    .catch(err=>{
        console.log(err)
    });
