runMain();

function calendar(){
  loadCalendar();
  calenderStart();
}
function runMain(){
  loadButtons();
  loadLageplan();
}

function clickHouse(id, klassenname, test){
  let svgObject = document.getElementById(id);
  svgObject.addEventListener("load", function loadHover(){
    let svgDocument = svgObject.contentDocument;
    let clickable = svgDocument.querySelectorAll(klassenname);

    clickable.forEach(function (element){
      element.addEventListener("click", function(){
        console.log("click");
        console.log(element.id);
        return element.id;
      });
    });
  });
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
  svgHover("lageplan", ".gebSVG");
  clickHouse("lageplan", ".gebSVG","test");
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
  svgObject.addEventListener("load", function loadHover(){
    console.log("let");
    let svgDocument = svgObject.contentDocument;
    let hoverItem = svgDocument.querySelectorAll(klassenname);

    hoverItem.forEach(function (element){
      console.log("funktion addelement")
      element.addEventListener("mouseenter", function (){
        console.log("mouseover");
        element.style.opacity = "0.9";
        element.style.fill = "#333";
        element.style.cursor = "pointer"
      });
      element.addEventListener("mouseleave", function(){
        console.log("mouseout");
        element.style.opacity = "1";
        element.style.fill="";
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
