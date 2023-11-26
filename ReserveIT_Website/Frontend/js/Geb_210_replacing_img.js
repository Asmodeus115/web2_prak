
let bild = document.getElementById("standardbild");

if(window.location.href.indexOf('../geb210.html')){
  document.getElementById("etageBtn210").addEventListener("click", function (event) {
    console.log("hä");
    if (event.target.id === "eg-210") {
      bild.data = '../img/210_eg.svg';
      console.log("hä");
    } else if (event.target.id === "og-210") {
      bild.data = '../img/210_og.svg';
      console.log("hä");
    } else if (event.target.id === "og2-210") {
      bild.data = '../img/210_og2.svg';
    }
  });
}

if(window.location.href.indexOf('../geb201.html')){
  document.getElementById("etageBtn201").addEventListener("click", function (event) {
    console.log("hä");
    if (event.target.id === "eg-201") {
      bild.data = '../img/201_eg.svg';
      console.log("hä");
    } else if (event.target.id === "og-201") {
      bild.data = '../img/201_og.svg';
    } else if (event.target.id === "og2-201") {
      bild.data = '../img/201_og2.svg';
    }
  });
}
if(window.location.href.indexOf('../geb205.html')){
  document.getElementById("etageBtn205").addEventListener("click", function (event) {
    if (event.target.id === "eg-205") {
      bild.data = '../img/205_eg.svg';
      console.log("hä");
    } else if (event.target.id === "og-205") {
      bild.data = '../img/205_og.svg'
      bild.alt = "hello";
    }
  });
}
if(window.location.href.indexOf('../geb206.html')){
  document.getElementById("etageBtn206").addEventListener("click", function (event) {
    if (event.target.id === "eg-206") {
      bild.data = '../img/206_eg.svg';
      console.log("hä");
    } else if (event.target.id === "og-206") {
      bild.data = '../img/206_og.svg';
    } else if (event.target.id === "og2-206") {
      bild.data = '../img/206_og2.svg';
    } else if (event.target.id === "og3-206") {
      bild.data = '../img/206_og3.svg';
    }
  });
}
