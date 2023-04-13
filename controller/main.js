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
    try{
        if(req.params.id=='undefined'){
            console.log('ID missing');
            return res.status(400).json({err:'ID missing'});
        }
        const uId = req.params.id
        User.destroy({where: {id:uId}}).then(result=>{
            res.sendStatus(200);
        }).catch(err=>{
            console.log(err);
        });
    }catch(err){
        console.log(err);
        res.status(500).json(err);
    }
    
}

exports.getEditAppointment
exports.postEditAppointment
