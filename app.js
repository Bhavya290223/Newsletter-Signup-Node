// jshint esversion:6
const express = require('express');
const app = express();
const https = require('https');

app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));

app.get('/', function(req, res) {
  res.sendFile(__dirname + "/signup.html");
});

app.post('/', function(req, res) {
  const firstN = req.body.first;
  const lastN = req.body.last;
  const emailID = req.body.email;
  const data = {
    members: [
      {
        email_address: emailID,
        status: "subscribed",
        merge_fields: {
          FNAME: firstN,
          LNAME: lastN
        }
      }
    ]
  };
  const jsonData = JSON.stringify(data);
  const url = "https://us8.api.mailchimp.com/3.0/lists/36ff0a3eb3";
  const options = {
    method: "POST",
    auth:"bhavay:a029dd75a6de673cc24b7a0bededb3e5-us8"
  };
  const request = https.request(url, options, function(resp) {

    if (resp.statusCode === 200) {
      res.sendFile(__dirname + "/success.html");
    } else {
      res.sendFile(__dirname + "/failure.html");
    }

    resp.on("data", function(data) {
      console.log(JSON.parse(data));
    });
  });
  request.write(jsonData);
  request.end();
});

app.post("/failure", function(req, res) {
  res.redirect("/");
});

app.listen(process.env.PORT || 3000, function() {
  console.log("Server is running on port 3000");
});



//API key : a029dd75a6de673cc24b7a0bededb3e5-us8a029dd75a6de673cc24b7a0bededb3e5-us8
// list id : 36ff0a3eb3
