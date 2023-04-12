const User = require('../models/user');

exports.getAppointments = (req,res,next)=>{
    User.findAll()
        .then(products=>{
            console.log('fetched');
            res.json(products)
        })
        .catch(err=>{
            console.log(err);
        })
};

exports.addAppointment = (req,res,next)=>{
    const name = req.body.name;
    const email = req.body.email;
    const phone = req.body.phone;
    User.create({
        name:name,
        email:email,
        phone : phone
    }).then(result=>{
        console.log('inserted');
    }).catch(err=>{
        console.log(err);
    })
    res.json({name,email,phone});
}

exports.removeAppointment = (req,res,next)=>{
    const id = req.params.id;
    User.findByPk(id)
        .then(user=>{
            return user.destroy();
        })
        .then(result=>{
            console.log('deleted');
        })
        .catch(err=>{
            console.log(err);
        })
        res.json({id});
    
}
exports.getEditAppointment
exports.postEditAppointment
