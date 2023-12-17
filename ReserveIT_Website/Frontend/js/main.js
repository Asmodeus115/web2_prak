
function loadLogo(){
  removeChild("grid-unten");
  const gridHolder = document.createElement("div");
  const svg = document.createElement("object");
  const svgHolder = document.createElement("div")
  svgHolder.id = "svgHolder"
  svg.id = "lageplan";
  svg.data = "../img/campusplan_raeume_albstadt.svg";
  gridHolder.className = "list-group"
  gridHolder.id = "sidebar"
  console.log("hä");

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
