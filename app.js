let express    = require("express");
// let faker      = require("faker");
let mysql      = require("mysql");
var bodyParser = require('body-parser');
var app        = express();

// == CONFIGURING EXPRESS APPLICATION ==
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
// app.use(bodyParser.json());

// == CONNECTING DATABASE == 
let connection = mysql.createConnection({
  host     : "localhost",
  user     : "agparkes",  
  database : "subscribe"        
});

// == ROOT ROUTE ==
app.get("/", function(req, res){
	// Find count of users in DB
  let q = "SELECT COUNT(*) AS count FROM users";
  connection.query(q, function (err, results) {
    if (err) throw err;
    let count = results[0].count;
    res.render("home", {count: count});
  });
});

// == POST ROUTE ==
app.post('/register', function(req, res){
  let person = {
 	email: req.body.email
 };
 connection.query('INSERT INTO users SET ?', person, function(error, result) {
   if(error) throw error;
  //console.log(error);
  //console.log(result);
  res.redirect("/");
// res.send("Thanks for joining our waiting list!")
 });
});

// == LISTEN ==
app.listen(8080, function(){
	console.log("Subscription page has started!");
});
