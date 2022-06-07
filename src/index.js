require('dotenv').config();
const mongoose = require('mongoose');
const app = require('./app');

mongoose.connect(process.env.mongoose, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false})
.then(() => {
    console.log('connecting mongoose successfy');

    app.listen(app.get('port'), () => {
        console.log(`server on port ${app.get('port')}`);
    });

})
.catch(err => console.log(err));