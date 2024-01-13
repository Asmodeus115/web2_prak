isUserLogedin();

function calendar(){
  loadCalendar();
  calenderStart();
}

function runMain(){
  console.log("runMain startet");
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
        if (element.id.length > 3) {
          calendar();
          document.getElementById('roomNumber').innerHTML = element.id;

          // Variable erstellen und Wert zuweisen
          var RaumID = element.id;

          // Speichern in sessionStorage
          sessionStorage.setItem('RaumID', RaumID);

        }
        else {
          // console.log("gebäude geklickt");
        }
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
        element.style.opacity = "0.9";
        element.style.fill = "#333";
        element.style.cursor = "pointer"
      });
      element.addEventListener("mouseleave", function(){
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

function loginBtn(){
  document.getElementById("loginArea").innerHTML = '<div class="grid">\n' +
    '\n' +
    '      <form id="signInBtn" class="form login">\n' +
    '\n' +
    '        <div class="form__field">\n' +
    '          <label for="login__matrikelnr"><svg class="icon">\n' +
    '            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#user"></use>\n' +
    '          </svg><span class="hidden">matrikelnr</span></label>\n' +
    '          <input id="login__matrikelnr" type="text" name="matrikelnr" class="form__input" placeholder="Matrikelnummer"\n' +
    '                 pattern="[0-9]{1,5}" title="Please enter only numbers with a maximum length of 5 digits" required>\n' +
    '        </div>\n' +
    '\n' +
    '        <div class="form__field">\n' +
    '          <label for="login__password"><svg class="icon">\n' +
    '            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#lock"></use>\n' +
    '          </svg><span class="hidden">Password</span></label>\n' +
    '          <input id="login__password" type="password" name="password" class="form__input" placeholder="Password"\n' +
    '                 required>\n' +
    '        </div>\n' +
    '\n' +
    '        <div class="form__field">\n' +
    '          <input type="submit" value="Sign In">\n' +
    '        </div>\n' +
    '\n' +
    '      </form>\n' +
    '\n' +
    '      <h1 id="fehler" style="color: red;"></h1>\n' +
    '\n' +
    '\n' +
    '    </div>\n' +
    '\n' +
    '\n' +
    '    <svg xmlns="http://www.w3.org/2000/svg" class="icons">\n' +
    '      <symbol id="arrow-right" viewBox="0 0 1792 1792">\n' +
    '        <path\n' +
    '          d="M1600 960q0 54-37 91l-651 651q-39 37-91 37-51 0-90-37l-75-75q-38-38-38-91t38-91l293-293H245q-52 0-84.5-37.5T128 1024V896q0-53 32.5-90.5T245 768h704L656 474q-38-36-38-90t38-90l75-75q38-38 90-38 53 0 91 38l651 651q37 35 37 90z" />\n' +
    '      </symbol>\n' +
    '      <symbol id="lock" viewBox="0 0 1792 1792">\n' +
    '        <path\n' +
    '          d="M640 768h512V576q0-106-75-181t-181-75-181 75-75 181v192zm832 96v576q0 40-28 68t-68 28H416q-40 0-68-28t-28-68V864q0-40 28-68t68-28h32V576q0-184 132-316t316-132 316 132 132 316v192h32q40 0 68 28t28 68z" />\n' +
    '      </symbol>\n' +
    '      <symbol id="user" viewBox="0 0 1792 1792">\n' +
    '        <path\n' +
    '          d="M1600 1405q0 120-73 189.5t-194 69.5H459q-121 0-194-69.5T192 1405q0-53 3.5-103.5t14-109T236 1084t43-97.5 62-81 85.5-53.5T538 832q9 0 42 21.5t74.5 48 108 48T896 971t133.5-21.5 108-48 74.5-48 42-21.5q61 0 111.5 20t85.5 53.5 62 81 43 97.5 26.5 108.5 14 109 3.5 103.5zm-320-893q0 159-112.5 271.5T896 896 624.5 783.5 512 512t112.5-271.5T896 128t271.5 112.5T1280 512z" />\n' +
    '      </symbol>\n' +
    '    </svg>'
    //doLoginProcess();
}

function logoutBtn() {
  sessionStorage.setItem('isUserLogedin', 0);
  sessionStorage.clear();
  location.reload();
}
