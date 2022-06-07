const {model, Schema} = require('mongoose');

const subSchema = Schema({
    email: String,
    confirmSub: Boolean
},{
    timestamps: true,
    versionKey: false
})

module.exports = model('Sub', subSchema);