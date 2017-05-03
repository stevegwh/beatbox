const express = require('express');
const app = express();
const port = 8000;

const server = app.listen(process.env.PORT || port, function() {
	console.log("Listening on port 8000");
})

app.use(express.static("public"));

app.get("/", function(req, res) {
	res.render("index.html");
})