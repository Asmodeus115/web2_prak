loadLageplan();
function loadLageplan(){
  removeChild("grid-unten");
  const gridHolder = document.createElement("div");
  const svg = document.createElement("object");
  const svgHolder = document.createElement("div")
  svgHolder.id = "svgHolder"
  svg.id = "lageplan";
  svg.data = "../img/campus.svg";
  svg.type = "image/svg+xml"
  gridHolder.className = "list-group"
  gridHolder.id = "sidebar"

  document.getElementById("grid-unten").appendChild(gridHolder);
  document.getElementById("grid-unten").appendChild(svgHolder)
  document.getElementById("svgHolder").appendChild(svg);
}

function removeChild(parent){
  parent = document.getElementById(parent);
  while (parent.firstChild){
    parent.removeChild(parent.firstChild);
  }
}

function svgHover(){
  let svgObject = document.getElementById("lageplan");
  svgObject.addEventListener("load", function (){
    let svgDocument = svgObject.contentDocument;
    let targetElement = svgDocument.getElementsByClassName("gebSVG")

    Array.from(targetElement).forEach(function (element){
      element.addEventListener("mouseover", function (){
        this.style.opacity = "0.9";
        this.style.cursor="pointer"
      });
      element.addEventListener("mouseout", function (){
        this.style.opacity = "1";
      });
    });
  });
}
