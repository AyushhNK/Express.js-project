const express = require("express");
const https = require("https"); 	//for using api we need to require https
const app = express();



app.get("/",function(req,res){
	const url="https://api.openweathermap.org/data/2.5/weather?q=kathmandu&appid=28a10b750cb699fcccf93c656372db0c"; //adding the url of the api
	https.get(url,function(response){
		console.log(response.statusCode);	//this line is to print the status code 200 is url is ok

		response.on("data",function(data){
			weathers=JSON.parse(data);		//this line is to print the data from api in JSON format
			console.log(weathers);

			const tempe= weathers.main.temp;	//to print the specific data that is temperatur 
			console.log(tempe);

			const des= weathers.weather[0].description;		//to print description which in inside the weather array in data
			console.log(des);

			const icon = weathers.weather[0].icon;		//getting the value of icon from api and storing in icon constant
			const imageurl="http://openweathermap.org/img/wn/" + icon + "@2x.png";		//the url of the image

			//we can send the data to the website by using res.send() but cannot use more then one res.send cause it is basically the end
			// res.send("<h1>the temperature of kathmandu is"+tempe+"degree kelvin. And the weather codition is"+des+"</h1>");
			res.write("<h1>the temperature of kathmandu is"+tempe+"degree kelvin.</h1>");
			res.write("<h1>And the weather codition is"+des+"</h1>");
			res.write("<img src="+imageurl+">");		//this is to send the picture of current weather condition
			res.send();

		})
	});
});


app.listen(3000,function(){
	console.log("server running at the port 3000");
});