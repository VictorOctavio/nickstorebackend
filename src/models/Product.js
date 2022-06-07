const {Schema, model} = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const productSchema = Schema({
    title: String,
    price: Number,
    description: String,
    imageURL: Array,
    category: String,
    state: Boolean,
    information: {
        marca: String,
        model: String,
        stock: Boolean,
        numStock: Number,
        tallas: Array,
        oferta: {
            priceSale: Number,
            active: Boolean
        }
    },
},{
    timestamps: true,
    versionKey: false
});

productSchema.plugin(mongoosePaginate);

module.exports = model('Product', productSchema);
