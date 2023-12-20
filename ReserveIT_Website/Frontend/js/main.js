runMain();
function runMain(){
  loadButtons();
  loadLageplan();
}

function loadLageplan(){
  removeChild("grid-unten");
  const gridHolder = document.createElement("div");
  const svgHolder = document.createElement("div");
  const svg = document.createElement("object");
  svgHolder.id = "svgHolder"
  svg.id = "lageplan";
  svg.data = "../img/campus.svg";
  svg.type = "image/svg+xml"
  gridHolder.className = "list-group"
  gridHolder.id = "sidebar"

  document.getElementById("grid-unten").appendChild(gridHolder);
  document.getElementById("grid-unten").appendChild(svgHolder)
  document.getElementById("svgHolder").appendChild(svg);
  svgHover("lageplan", "gebSVG");
}

function removeChild(parent){
  parent = document.getElementById(parent);
  while (parent.firstChild){
    parent.removeChild(parent.firstChild);
  }
}

function svgHover(id, klassenname){
  console.log("funktion gestartet")
  let svgObject = document.getElementById(id);
  svgObject.addEventListener("load", function (){
    console.log("let")
    let svgDocument = svgObject.contentDocument;
    let targetElement = svgDocument.getElementsByClassName(klassenname)

    Array.from(targetElement).forEach(function (element){
      console.log("funktion addelement")
      element.addEventListener("mouseover", function (){
        this.style.opacity = "0.9";
        this.style.cursor="pointer";
        this.style.fill="#1E1F22"
        console.log("mouseover");
      });
      element.addEventListener("mouseout", function (){
        this.style.opacity = "1";
        this.style.fill="";
        console.log("mouseout");
      });
    });
  });
}

function loadCalendar(){
  removeChild("grid-unten");
  const gridHolder = document.createElement("div");
  const calendarHolder = document.createElement("div");
  const calendar = document.createElement("div");
  calendarHolder.id = "calenderHolder";
  calendar.id ="mainCalendar";

  document.getElementById("grid-unten").appendChild(gridHolder);
  document.getElementById("grid-unten").appendChild(calendarHolder);
  document.getElementById("calenderHolder").appendChild(calendar);

  const myCalendar = new WeeklyCalendar();
}

function loadImpressum(){
  removeChild("grid-unten");
  const gridHolder = document.createElement("div");
  const impressumHolder = document.createElement("div");

  impressumHolder.id = "impressumHolder";

  document.getElementById("grid-unten").appendChild(gridHolder);
  document.getElementById("grid-unten").appendChild(impressumHolder);

  impressumHolder.textContent = "hello1"
}

function loadUeberUns(){
  removeChild("grid-unten");
  const gridHolder = document.createElement("div");
  const ueberUnsHolder = document.createElement("div");

  ueberUnsHolder.id = "ueberUnsHolder";
  ueberUnsHolder.textContent = "hello"

  document.getElementById("grid-unten").appendChild(gridHolder);
  document.getElementById("grid-unten").appendChild(ueberUnsHolder);

  ueberUnsHolder.textContent = "hello"
}

