document.addEventListener("DOMContentLoaded", function (){

  let svgDoc = document.getElementById("lageplan").contentDocument;
  let geb201 = svgDoc.getElementById("201svg");
  let geb205 = svgDoc.getElementById("205svg");
  let geb210 = svgDoc.getElementById("210svg");
  let geb206 = svgDoc.getElementById("206svg");

  geb201.addEventListener("click", function ev201 (event){
    window.location.href="geb_201.html"
  });

  geb206.addEventListener("click", function ev206 (event){
    window.location.href="geb_206.html"
  });

  geb210.addEventListener("click", function ev210(event){
    window.location.href="geb_210.html"
  });

  geb205.addEventListener("click", function ev205 (event){
    window.location.href="geb_205.html";
  });
});
