const Admin = require('../models/Admin');

const Controller = {
   createAdmin: async () => {
      const admin = new Admin({
         nickname: 'client', password: 'clientpassword', admin: true, email: 'gaunavictoroctavio@gmail.com'
      })
      await admin.save();
   },

   loginAdmin: async (req, res) => {
      try {
         const { email, password } = req.body;
         const admin = await Admin.findOne({
            $or: [
               { email }, { nickname: email }
            ], password, admin: true
         });
         if(!admin) return res.json({err: true, message: 'No eres administrador'});

         return res.json({err: null, message: `Hola, ${admin.nickname}`});
      } catch (err) { return res.json({ err: true, message: 'Algo salió mal' }) }
   }
}



module.exports = Controller;