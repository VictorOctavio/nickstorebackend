const {Schema, model} = require('mongoose');

const adminSchema = Schema({
   nickname: String,
   email: String,
   password: String,
   admin: {type: Boolean, default: false}
})

module.exports = model('admin', adminSchema);