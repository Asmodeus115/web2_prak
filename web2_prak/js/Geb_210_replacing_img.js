
// Finde die Liste der Links und das Bild-Element
var navList = document.getElementById("navList");
var meinBild = document.getElementById("standardbild_EG");

// Füge Klick-Ereignislistener zu den Links hinzu
navList.addEventListener("click", function(event) {
  if (event.target.tagName === "A") {
    var bildPfad = event.target.getAttribute("data-image");
    meinBild.src = bildPfad;
    meinBild.alt = event.target.textContent;
    event.preventDefault(); // Verhindert das Standardverhalten des Links
  }
});

