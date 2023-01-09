const express = require("express");
const bodyParser = require("body-parser");

const app = express();
let items=["Go to walk","Go shopping","Buy food"];
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"))

app.set('view engine','ejs');

app.get("/",function(req,res){
	let options={weekday:"long",
	day:"numeric",
	month:"long"};
	let today= new Date();
	let day=today.toLocaleDateString("en-US",options);
	res.render("list",{theday:day,newitem:items});
});
app.post("/",function(req,res){
	let item=req.body.newvalue;
	items.push(item);
	res.redirect("/");
})

app.listen(4000,()=>{
	console.log("server running at port 4000");
});