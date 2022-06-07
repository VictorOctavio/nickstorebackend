const Sub = require('../models/Sub');
const jwt = require('jsonwebtoken');
const sendConfirm = require('../libs/nodemailer');

const controller = {
    newSub: async(req, res) => {
        try{
            const {email} = req.body;
            
            const validateEmail = await Sub.findOne({email});
            if(validateEmail) return res.json({err: true, message: 'Usuario ya subscripto'});
                       
            const sub = new Sub({
                email, confirmSub: false
            })

            await sub.save()
            
            const token = jwt.sign({
                _id: sub._id
            }, process.env.token_secret);
            
            await sendConfirm(token, email);

            return res.header('auth-token', token).json({err: null, data: token, message: 'Se envio mail de confirmación. Verifica correo electronico!'})
        
        }catch(err){return res.json({err: true, message: 'Algo salió mal en la subscripción.'})}
    },


    confirSub: async(req, res) => {
        try{

            const user = req.user._id;
            const updateSub = await Sub.findOneAndUpdate({_id: user}, {confirmSub: true});
            if(!updateSub) return res.json({err: true, message: 'Error al confirmar sub'});
            
            return res.json({err: null, message: 'Confirmacion Exitosa'});

        }catch(err){return res.json({err: true, message: 'Algo salió mal en confirmar sub'})}
    }
}

module.exports = controller;