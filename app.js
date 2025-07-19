const express = require('express');
const app =  express();
const path = require('path');
const mongoose = require('mongoose');
const Listing = require('./models/listing.js');
const MONGO_URL = 'mongodb://127.0.0.1:27017/wanderlust';
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');

async function main(){
    await mongoose.connect(MONGO_URL);
}

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname,"/public")));


main().then((req,res)=>{
    console.log("connected to DB");
 });
//.catch((err)=>{
//     console.log(err);
// })

app.get('/', (req, res) => {
    res.send("Hello i am the root");
});
//Index route
app.get('/listings', async (req, res) => {
    const allListings = await Listing.find({});
   res.render('listings/index.ejs', { allListings });
});

// Crate route for new request
app.get('/listings/new',(req,res)=>
    {
        res.render('./listings/new.ejs');
    });
    
//Show route 
app.get('/listings/:id', async (req,res)=>{
    let { id } = req.params;
    const listing = await Listing.findById(id);  
    res.render("listings/show.ejs",{listing});

});

//Crate route 
app.post('/listings',async (req,res)=>{
    const newListing =new Listing (req.body.listing);
    await newListing.save();
    res.render('./listings');
});

//Edit route
app.get('/listings/:id/edit', async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id); // ← this line is crucial!
    res.render('listings/edit', { listing });
});
//update after edit 
app.put ("/listings/:id",async (req,res)=>
{
    let { id }= req.params;
    await Listing.findByIdAndUpdate(id,{...req.body.listing});
    res.redirect("/listings");
})

//delete

app.delete("/listings/:id",async(req,res)=>
{
    let { id }=req.params;
    await Listing.findByIdAndDelete(id);
    res.redirect("/listings");
});



// catch((err) => {
//     console.log(err);   
// });
//test listening
// app.get('/testListing',async(req,res)=>
// {
//     let sampleListening = new Listing ({
//         title : "My New Villa",
//         description : "By the beach",
//         price: 1200,
//         location : "Kheda , Gujarat",
//         country:'India',
//     });
//         await sampleListening.save();
//         console.log("sample was saved");
//         res.send("successful testing");
// });

app.listen(8080, () => {
    console.log('Server is running on port 8080');
});