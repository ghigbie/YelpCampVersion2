var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var request = require("request");

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.set("view engine", "ejs");

var campgrounds = [
        {name: "Salmon Creek", image: "http://camprrm.com/wp-content/uploads/2012/02/widewaters-campground-1-540x250.jpg"}, 
        {name: "Granite Hill", image: "http://rvdreams.smugmug.com/Howard-Lindas-Full-Timing-RV/Places-We-Have-Visited-2013/Helena-Montana-Area/i-8PWrr8S/0/S/DSC_0613-S.jpg"},    
        {name: "Mountain Goat's Rest", image: "http://rvdreams.smugmug.com/Howard-Lindas-Full-Timing-RV/Places-We-Have-Visited-2013/Helena-Montana-Area/i-k3gqnJ6/0/S/DSC_0612-S.jpg"},
        {name: "Salmon Creek", image: "http://camprrm.com/wp-content/uploads/2012/02/widewaters-campground-1-540x250.jpg"}, 
        {name: "Granite Hill", image: "http://rvdreams.smugmug.com/Howard-Lindas-Full-Timing-RV/Places-We-Have-Visited-2013/Helena-Montana-Area/i-8PWrr8S/0/S/DSC_0613-S.jpg"},    
        {name: "Mountain Goat's Rest", image: "http://rvdreams.smugmug.com/Howard-Lindas-Full-Timing-RV/Places-We-Have-Visited-2013/Helena-Montana-Area/i-k3gqnJ6/0/S/DSC_0612-S.jpg"},
        {name: "Salmon Creek", image: "http://camprrm.com/wp-content/uploads/2012/02/widewaters-campground-1-540x250.jpg"}, 
        {name: "Granite Hill", image: "http://rvdreams.smugmug.com/Howard-Lindas-Full-Timing-RV/Places-We-Have-Visited-2013/Helena-Montana-Area/i-8PWrr8S/0/S/DSC_0613-S.jpg"},    
        {name: "Mountain Goat's Rest", image: "http://rvdreams.smugmug.com/Howard-Lindas-Full-Timing-RV/Places-We-Have-Visited-2013/Helena-Montana-Area/i-k3gqnJ6/0/S/DSC_0612-S.jpg"}    
];       


    
app.get("/", function(req, res){
    res.render("landing");
});

app.get("/campgrounds", function(req, res){
    res.render("campgrounds", {campgrounds: campgrounds});
});

app.get("/search", function(req, res){
    res.render("search");
});

app.post("/campgrounds", function(req, res){ //this is the REST convention - should be the same url
    //get form data
    var name = req.body.name;
    var image = req.body.image;
    var newCampground = {name: name, image: image};
    campgrounds.push(newCampground);//add to campgrounds array

    res.redirect("/campgrounds");
});

app.get("/campgrounds/new", function(req, res){
    res.render("new.ejs");
});

app.get("*", function(req, res){
   res.render("notFound"); 
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("The server has started. Yay!!! Time to celebrate : )");
});

