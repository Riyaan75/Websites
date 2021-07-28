const express = require("express");
const bodyParser = require("body-parser");
const date=require(__dirname + "/date.js");
 console.log(date);
const request=require("request");
const https = require("https");
const { getDefaultSettings } = require("http2");
// due to scope initialize item or any var above
// create array so that we can add multiple items
var items=["Buy Food ", "Cook Food" ,"Eat Food"];
let workItems=[];
const app = express(); 
// ejs setting line 
app.set('view engine', 'ejs');
//in order to get input
app.use(bodyParser.urlencoded({extended:true}));
//inorder to use css and java script in server
app.use(express.static("public"));

app.get("/",function(req,res){
  //getting valur of day from date.js through module
          let day=date.getDate();
          var today =new Date();
          //options members order don't effect the webpage
          var options={
          weekday:"long",
          day:"numeric",
           month:"long",
           year:"numeric"
 };
     
     var dayH =today.toLocaleDateString("hi-IN",options);
     var dayA =today.toLocaleDateString("ar-SA",options);
     // you can't have 2 render but in one you can add many lists as you want
     res.render("List", {listTitle:day,kindOfDayH:dayH, kindOfDayA:dayA , newListItems:items });
      
    
     
});
  app.post("/", function(req,res){
//for input you must use app.use(bodyParser.urlencoded({extended:true}));
    let item=req.body.newItem;
    if(req.body.list==="work")
    {
      workItems.push(item);
      res.redirect("/work")
    }
    else{
      items.push(item);
     res.redirect("/");
    }
      
       
       
  });

  app.get("/work", function(req,res){

    var today =new Date();
    var options={
      weekday:"long",
      day:"numeric",
      month:"long"
  };
    
    var dayH =today.toLocaleDateString("hi-IN",options);
    var dayA =today.toLocaleDateString("ar-SA",options);
     res.render("list",{listTitle:"work list",kindOfDayH:dayH, kindOfDayA:dayA,newListItems:workItems})
  });

  app.get("/about", function(req,res){
    res.render("about")
  })

  app.post("/work", function(req,res){
    let item=req.body.newItem;
    workItems.push(item);
    res.redirect("/work");
  })

    // var cd=today.getDay();
    //   if(cd===0  )
    //  {
    //      day="Sunday";
    //  }
    //  else if(cd===1  )
    //  {
    //      day="Monday";
    //  }
    //  else if(cd===2  )
    //  {
    //      day="Tuesday";
    //  }
    // else if(cd===3 )
    //  {
    //      day="Wednesday";
    //  }
    // else if(cd===4  )
    //  {
    //      day="Thursday";
    //  }
    // else if(cd===5  )
    //  {
    //      day="Friday";
    //  }
    //  else if(cd==6)
    //  {
    //      day="Saturday";
    //  }
    //  else{
    //      console.log("error");
    //  }
     //res.render is an alternate of sendFile in ejs
     // list.ejs file should be present in views folder
     //kindOfDay is a var we used in list.ejs 


app.listen(3000, function(){
    console.log("Server is started at port 3000");
})