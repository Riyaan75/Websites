//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose=require("mongoose");
const date = require(__dirname + "/date.js");
const _=require("lodash");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb+srv://admin-riyaan:Test123@cluster0.klvgm.mongodb.net/todolistDB", {useNewUrlParser:true});
const itemsSchema={
  name:String
};
const Item=mongoose.model("Item",itemsSchema);
 const item1=new Item({
   name:"welcome to your todo list"
 });
 const item2=new Item({
   name:"Hit + to add items"
 });
 const item3=new Item({
   name:"Hit this to delete items"
 });

 //making new schema for custom list 
  const ListSchema={
    name:String,
    items:[itemsSchema]
  };
  const List=mongoose.model("List",ListSchema);

  const defaultItems=[item1,item2,item3];
app.get("/", function(req, res) {


 Item.find({},function(err,foundItems){
   //if there is no items in a list then this will add 3 new items
   if(foundItems.length===0){
 
 Item.insertMany(defaultItems,function(err){
   if(err)
   console.log(err);
   else
   console.log("Succesfully done");
 })
 res.redirect("/");
   }
   else{
    res.render("list", {listTitle: "Today", newListItems: foundItems});
   }

 })
   


});

app.post("/", function(req, res){

  const itemName = req.body.newItem;
  const listName=req.body.list;

  const item=new Item({
    name:itemName
  });

  if(listName==="Today"){
    item.save();
    res.redirect("/");
  }
  else{
    List.findOne({name: listName}, function(err,foundList){
      if(err){
        console.log(err);
      }
      let x=foundList.items;
      x.push(item);
   
    foundList.save();
    res.redirect("/"+ listName);
    })
  }

  
  
});
app.post("/delete",function(req,res){
  var checkedItemId=req.body.checkbox;
  const listName=req.body.listName;

  if(listName==="Today"){
    if(checkedItemId){
      checkedItemId = checkedItemId.trim();
    }
    Item.findByIdAndRemove(checkedItemId, function(err){
      if(err){
        console.log(err);
      }
      else
      {
        console.log("successfully deleted");
      }
     res.redirect("/")
    });
  }

  else{
    List.findOneAndUpdate({name: listName},{$pull:{items:{_id:checkedItemId}}}, function(err,foundList){
      if(!err){
        res.redirect("/"+listName);
      }
    })
  }

  
  
});

//making custom list so that we can make as many lists as we want
app.get("/:customListName", function(req,res){
  const customListName=_.capitalize(req.params.customListName);

  List.findOne({name:customListName},function(err, foundList){
   if(!err){
     if(!foundList){
       //create a new lists
       const list=new List({
        name:customListName,
        items:defaultItems
      });
      list.save();
      res.redirect("/"+customListName)
     }
     else{
       //show an existing lissts
       res.render("list", {listTitle: foundList.name, newListItems: foundList.items});
     }
   }
  });

  
   
});


app.get("/about", function(req, res){
  res.render("about");
});

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}
app.listen(port,function(){
  console.log("Server started successfully")
});
