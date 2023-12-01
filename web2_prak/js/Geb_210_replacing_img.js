

  let bild = document.getElementById("standardbild");
document.addEventListener("DOMContentLoaded", function (){
  document.getElementById("etageBtn210").addEventListener("click", function(event){
    if (event.target.id === "eg-210") {
      bild.src = "../img/210_EG.jpg";
      bild.alt="hello";
    } else if (event.target.id === "og-210"){
      bild.src= "../img/210_1-OG.jpg";
    } else if (event.target.id === "og2-210") {
      bild.src = "../img/210_2-OG.jpg";
    }
  });
});

document.addEventListener("DOMContentLoaded", function (){
  document.getElementById("etageBtn201").addEventListener("click", function (event){
    console.log("hä");
    if (event.target.id === "eg-201") {
      bild.src = "../img/201_EG.jpg";
      bild.alt="hello";
      console.log("hä");
    } else if (event.target.id === "og-201"){
      bild.src= "../img/201_1-OG.jpg";
      bild.alt="hello";
    } else if (event.target.id === "og2-201") {
      bild.src = "../img/201_2-OG.jpg";
      bild.alt="hello";
    }
  });
});
document.addEventListener("DOMContentLoaded", function (){
  document.getElementById("etageBtn205").addEventListener("click", function (event){
    if (event.target.id === "eg-205") {
      bild.src = "../img/205_EG.jpg";
      bild.alt="hello";
      console.log("hä");
    } else if (event.target.id === "og-205"){
      bild.src= "../img/205_1-OG.jpg";
      bild.alt="hello";
    }
  });
});

  document.addEventListener("DOMContentLoaded", function (){
    document.getElementById("etageBtn206").addEventListener("click", function (event){
      if (event.target.id === "eg-206") {
        bild.src = "../img/206_EG.jpg";
        bild.alt="hello";
        console.log("hä");
      } else if (event.target.id === "og-206"){
        bild.src= "../img/206_1-OG.jpg";
        bild.alt="hello";
      }else if (event.target.id === "og2-206"){
        bild.src= "../img/206_2-OG.jpg";
        bild.alt="hello";
      }
      else if (event.target.id === "og3-206"){
        bild.src= "../img/206_3-OG.jpg";
        bild.alt="hello";
      }
    });
  });


