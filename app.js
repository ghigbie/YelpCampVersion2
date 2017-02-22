var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    request     = require("request"),
    mongoose    = require("mongoose");

mongoose.connect("mongodb://localhost/yelp_camp");

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.set("view engine", "ejs");

//SCHEMA SETUP
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String,
});

var Campground = mongoose.model("Campground", campgroundSchema);

Campground.create(
    {
      name: "Granite Hill",
      image: "http://rvdreams.smugmug.com/Howard-Lindas-Full-Timing-RV/Places-We-Have-Visited-2013/Helena-Montana-Area/i-8PWrr8S/0/S/DSC_0613-S.jpg",
      description: "This is a huge granite hill, no bathrooms, no water, beautiful granite"
       
    }, function(err, campgroound){
        if(err){
            console.log("SOMETHING WENT WRONG");
            console.log(err);
        }else{
            console.log("CAMPGROUND CREATED!!!");
            console.log(campgroound);
        }
});

// var campgrounds = [
//         {name: "Salmon Creek", image: "http://camprrm.com/wp-content/uploads/2012/02/widewaters-campground-1-540x250.jpg"}, 
//         {name: "Granite Hill", image: "http://rvdreams.smugmug.com/Howard-Lindas-Full-Timing-RV/Places-We-Have-Visited-2013/Helena-Montana-Area/i-8PWrr8S/0/S/DSC_0613-S.jpg"},    
//         {name: "Mountain Goat's Rest", image: "http://rvdreams.smugmug.com/Howard-Lindas-Full-Timing-RV/Places-We-Have-Visited-2013/Helena-Montana-Area/i-k3gqnJ6/0/S/DSC_0612-S.jpg"},
//         {name: "Salmon Creek", image: "http://camprrm.com/wp-content/uploads/2012/02/widewaters-campground-1-540x250.jpg"}, 
//         {name: "Granite Hill", image: "http://rvdreams.smugmug.com/Howard-Lindas-Full-Timing-RV/Places-We-Have-Visited-2013/Helena-Montana-Area/i-8PWrr8S/0/S/DSC_0613-S.jpg"},    
//         {name: "Mountain Goat's Rest", image: "http://rvdreams.smugmug.com/Howard-Lindas-Full-Timing-RV/Places-We-Have-Visited-2013/Helena-Montana-Area/i-k3gqnJ6/0/S/DSC_0612-S.jpg"},
//         {name: "Salmon Creek", image: "http://camprrm.com/wp-content/uploads/2012/02/widewaters-campground-1-540x250.jpg"}, 
//         {name: "Granite Hill", image: "http://rvdreams.smugmug.com/Howard-Lindas-Full-Timing-RV/Places-We-Have-Visited-2013/Helena-Montana-Area/i-8PWrr8S/0/S/DSC_0613-S.jpg"},    
//         {name: "Mountain Goat's Rest", image: "http://rvdreams.smugmug.com/Howard-Lindas-Full-Timing-RV/Places-We-Have-Visited-2013/Helena-Montana-Area/i-k3gqnJ6/0/S/DSC_0612-S.jpg"}    
// ];       


    
app.get("/", function(req, res){
    res.render("landing");
});


//INDEX - show all campgrounds
app.get("/campgrounds", function(req, res){
    //get all campgrounds from db
    Campground.find({}, function(err, allCampgrounds){
        if(err){
            console.log("THERE WAS A PROBLEM");
            console.log(err);
        }else{
            res.render("campgrounds", {campgrounds: allCampgrounds});
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
    var newCampground = {name: name, image: image};
   //create a new campgroun and save to DB
    Campground.create(newCampground, function(err, newlyCreated){
        if(err){
            console.log("THERE WAS AN ERROR");
            console.log(err);
        }else{
            res.redirect("/campgrounds");
        }
    });
});

//NEW - show form to create new campground
app.get("/campgrounds/new", function(req, res){
    res.render("new.ejs");
});

//this needs to be positioned AFTER "/campgrounds/new"
app.get("/campgrounds/:id", function(req, res){
    //find the campground with provided ID
    //render show template with this campground
    
   res.send("<h1>THIS WILL BE THE SHOW PAGE ONE DAY</h1>"); 
});

app.get("*", function(req, res){
   res.render("notFound"); 
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("The server has started. Yay!!! Time to celebrate : )");
});

