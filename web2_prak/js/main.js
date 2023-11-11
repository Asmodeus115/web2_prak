document.addEventListener("DOMContentLoaded", function (){
  document.addEventListener("click", function(event){
    const x = event.clientX;
    const y = event.clientY;

    console.log("pos: X:=" + x +" Y="+ y)
  });
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


  console.log("HELLOOOOOOO!")
  let loading = document.getElementById("loading-info");
  loading.remove();
  initApp();
  function initApp(){
    console.log("app geladen")
  }

});





const kalenderTabId = document.getElementsByClassName(""); // classennamen des elemtns eintrage
const kalenderTabClass = document.getElementById(""); //Id des elements eintrage
const loadingInfoId = document.getElementById("loading-info");

// funktion zur farbänderung
function farbeAendern(){
 //meinElement.style.color = 'rot'
}
//Eventlistener
//meinElement.addEventListener('', farbeAendern); //hier -> '' ,muss man noch eintragen was passiert, z.B. 'click' oder so

/*
function domLoad(){
  console.log("HELLOOOOOOO!")
  let loading = document.getElementById("loading-info");
  loading.remove();
  initApp();
}
*/
function initApp(){
  console.log("app geladen")
}
