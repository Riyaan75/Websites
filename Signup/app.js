const express = require("express");
const https = require("https");
const bodyParser = require('body-parser');
const mailchimp = require("@mailchimp/mailchimp_marketing");
app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
 
app.get("/",function(req,res){
  res.sendFile(__dirname+"/signup.html");
});
app.post("/",function(req,res){
  const firstName = req.body.fname;
  const lastName = req.body.sname;
  const emailid = req.body.eadd;
 
  mailchimp.setConfig({
    apiKey: "your api key",
    server: "us6"
  });
  const listId = "your list id";
 
  async function run() {
      const response = await mailchimp.lists.addListMember(listId, {
          email_address: emailid,
          status: "subscribed",
          merge_fields: {
              FNAME: firstName,
              LNAME: lastName
          }
      });
  }
  run().catch(e => res.sendFile(__dirname + "/failure.html"));
});
app.listen(3000,function(){
  console.log("Server Running on port 3000");
})