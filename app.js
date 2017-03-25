var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    request     = require("request"),
    mongoose    = require("mongoose");

mongoose.connect("mongodb://localhost/yelp_camp");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

//SCHEMA SETUP
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});

var Campground = mongoose.model("Campground", campgroundSchema);
    
app.get("/", function(req, res){
    res.render("landing");
});


//INDEX - show all campgrounds
app.get("/campgrounds", function(req, res){
    //get all campgrounds from db
    Campground.find({}, function(err, allCampgrounds){
        if(err){
            console.log("THERE WAS A PROBLEM - CAMPGROUNDS");
            console.log(err);
        }else{
            res.render("index", {campgrounds: allCampgrounds}); 
        }
    });
});

app.get("/search", function(req, res){
    res.render("search");
});

//CREATE - add new campground to DB
app.post("/campgrounds", function(req, res){ //this is the REST convention - should be the same url
    //get form data
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;
    var newCampground = {name: name, image: image, description: description};
   //create a new campgroun and save to DB
    Campground.create(newCampground, function(err, newlyCreated){
        if(err){
            console.log("THERE WAS AN ERROR - POST CAMPGROUNDS");
            console.log(err);
        }else{
            res.redirect("/campgrounds");
        }
    });
});


//NEW - show form to create new campground
app.get("/campgrounds/new", function(req, res){
    res.render("new");
});

//this needs to be positioned AFTER "/campgrounds/new"
//SHOW - shows more info about one campgroud
app.get("/campgrounds/:id", function(req, res){
    //find the campground with provided ID
    Campground.findById(req.params.id, function(err, foundCampground){
        if(err){
            console.log("THERE WAS AN ERROR - CAMPGROUNDS/:ID");
            console.log(err);
        }else {
            console.log(foundCampground);
            res.render("show", {campground: foundCampground} );
        }
    });
});

    
   // res.render("show");
    //find the campground with provided ID
    // Campground.findById(req.params.id, function(err, foundCampground){
    //     if(err){
    //         console.log("THERE WAS AN ERROR - CAMPGROUNDS/:ID");
    //         console.log(err);
    //     }else{
    //         //render show template with this campground
    //         console.log("RES.RENDER CALLED");
    //         res.render("show", {campground: foundCampground});   
    //     }
    // });
// 

app.get("*", function(req, res){
   res.render("notFound"); 
});


app.listen(process.env.PORT, process.env.IP, function(){
    console.log("The server has started. Yay!!! Time to celebrate : )");
});

//RESTFUL ROUTES

//name          url           verb          descrption
// ================================================================
// INDEX        /dogs          GET       Displays a list of all dogs
// NEW          /dogs/new      GET       Displays a form to make a new dog
// CREATE       /dogs          POST      Adds a new dog to DB
// SHOW         /dogs/:id      GET       Shows info about one dog
// EDIT         /dogs/:id/edit GET       Show edit form for one dog
// UPDATE       /dogs/:id      PUT       Update a particular dog, then redirects somewhere
// DESTROY      /dogs/:id      DELETE    Deletes a particular dog, then redirects somewhere

// There are 3 routes that redirect: CREATE, UPDATE, DESTROY - these take something new and send you

//REST - stands for representational state transfer

//CRUD
//CREATE
//READ
//UPDATE
//DESTROY