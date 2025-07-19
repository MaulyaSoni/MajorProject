const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const listingSchema = new Schema({
    title: {
        type : String,
        required : true,
    },
    description: String,
     
    image: {
        filename: {
            type: String,
            default: "listingimage"
        },
        url: {
            type: String,
            default: "https://www.bing.com/images/search?view=detailV2&ccid=isgYGi7W&id=61A52B1727B0415DA279F3213A0B42A4DA1DACCA&thid=OIP.isgYGi7WuqUmHFiRa8zsvwHaC4&mediaurl=https%3a%2f%2fdefinicion.de%2fwp-content%2fuploads%2f2010%2f12%2fGoogle0.png&exph=700&expw=1800&q=google&simid=607996636710573081&FORM=IRPRST&ck=849B18FD7B907A53A044C43EC77E4412&selectedIndex=2&itb=1"
        }
    },
    price : Number,
    location : String,
    country : String,
});
const Listing = mongoose.model("Listing",listingSchema);
module.exports = Listing; 