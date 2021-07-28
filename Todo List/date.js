 //instead of module.exports.getDate=getDate you can just use
  exports.getDate=getDate;

function getDate(){

var today =new Date();
    //options members order don't effect the webpage
     var options={
         weekday:"long",
         day:"numeric",
         month:"long",
         year:"numeric"
     };

     var day =today.toLocaleDateString("en-US",options);
     
    return day;
    }

     module.exports.getDay=getDay;
function getDay(){

var today =new Date();
    //options members order don't effect the webpage
     var options={
         weekday:"long",
         year:"numeric"
     };

     var day =today.toLocaleDateString("en-US",options);
     
    return day;
    }