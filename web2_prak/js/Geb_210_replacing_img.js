
document.addEventListener("DOMContentLoaded", function () {
  var bild = document.getElementById("standardbild");
  document.getElementById("etageBtn210").addEventListener("click", function(event){
    if (event.target.id === "eg-210") {
      bild.src = "../img/210_EG.jpg";
      bild.alt="hello"
      // Verhindert das Standardverhalten des Links
    } else if (event.target.id === "og-210"){
      bild.src= "../img/210_1-OG.jpg";
    } else if (event.target.id === "og2-210") {
      bild.src = "../img/210_2-OG.jpg";
    }
  });

  document.getElementById()
})
// Finde die Liste der Links und das Bild-Element
// Füge Klick-Ereignislistener zu den Links hinzu


