document.addEventListener("DOMContentLoaded", function (){
  document.getElementById("logo").addEventListener("click", function (){
    window.location.href="index.html"
  });


  /*linkbuttons*/
  document.getElementById("linkleiste").addEventListener("click", function (event){
    if (event.target.id === "lageplanBtn"){
      window.location.href="index.html";
    } else if (event.target.id === "kalenderBtn"){
      window.location.href="Calendar.html";
    } else if (event.target.id === "datenschutzBtn"){
      window.location.href="Datenschutz.html";
    } else if (event.target.id === "impressumBtn"){
      window.location.href="Impressum.html";
    } else if (event.target.id === "buchungenBtn"){
      window.location.href="Calendar.html";
    } else if (event.target.id === "ueberunsBtn"){
      window.location.href="";
    } else if (event.target.id === "210btn"){
      window.location.href="geb_210.html";
    } else if (event.target.id === "206btn"){
      window.location.href="geb_206.html";
    } else if (event.target.id === "205btn"){
      window.location.href="geb_205.html";
    } else if (event.target.id === "201btn"){
      window.location.href="geb_201.html";
    } else{
      console.log("fehler")
    }
});
/*sidebarButtons*/
  document.getElementById("gebBtn").addEventListener("click", function(event){
    if (event.target.id === "210btn"){
      window.location.href="geb_210.html";
    } else if (event.target.id === "207btn"){
      window.location.href="geb_207.html";
    } else if (event.target.id === "206btn"){
      window.location.href="geb_206.html";
    } else if (event.target.id === "205btn"){
      window.location.href="geb_205.html";
    } else if (event.target.id === "201btn"){
      window.location.href="geb_201.html";
    } else{
      console.log("fehler")
    }
  });
/*
  document.getElementById("dots").addEventListener("click", function(event){
    if (event.target.id === "dot210"){
      window.location.href="./html/geb_210.html";
    } else if (event.target.id === "dot207"){
      window.location.href="./html/geb_207.html";
    } else if (event.target.id === "dot206"){
      window.location.href="./html/geb_206.html";
    } else if (event.target.id === "dot205"){
      window.location.href="./html/geb_205.html";
    } else if (event.target.id === "dot201"){
      window.location.href="./html/geb_201.html";
    } else{
      console.log("fehler")
    }
  });
*/

});

/* lageplan svg manipulation*/
let svgObject = document.getElementById("lageplan");
let svgDoc = svgObject.contentDocument;
let geb201 = svgDoc.getElementById("201svg");
let geb205 = svgDoc.getElementById("205svg");
let geb210 = svgDoc.getElementById("210svg");
let geb206 = svgDoc.getElementById("206svg");

window.addEventListener("load", function (){
  geb201.addEventListener("click", function ev201 (event){

    window.location.href="geb_201.html"
  })
});
window.addEventListener("load", function (){
  geb206.addEventListener("click", function ev206 (event){

    window.location.href="geb_206.html"

  });
});

window.addEventListener("load", function (){
  geb210.addEventListener("click", function ev210(event){

    window.location.href="geb_210.html"

  });
});
window.addEventListener("load", function (){
  geb205.addEventListener("click", function ev205 (event){
    window.location.href="geb_205.html";

  });
});
