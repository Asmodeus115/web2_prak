
let bild = document.getElementById("standardbild");

if(window.location.pathname.includes("geb_210.html")){
  document.getElementById("etageBtn210").addEventListener("click", function (event) {
    console.log("hä");
    if (event.target.id === "eg-210") {
      bild.data = '../img/210_1.svg';
      console.log("hä");
    } else if (event.target.id === "og-210") {
      bild.data = '../img/210_2.svg';
      console.log("hä");
    } else if (event.target.id === "og2-210") {
      bild.data = '../img/210_3.svg';
    }
  });
}

if(window.location.pathname.includes("geb_201.html")){
  document.getElementById("etageBtn201").addEventListener("click", function (event) {
    console.log("hä");
    if (event.target.id === "eg-201") {
      bild.data = '../img/201_1.svg';
      console.log("hä");
    } else if (event.target.id === "og-201") {
      bild.data = '../img/201_2.svg';
    } else if (event.target.id === "og2-201") {
      bild.data = '../img/201_3.svg';
    }
  });
}
if(window.location.pathname.includes("geb_205.html")){
  document.getElementById("etageBtn205").addEventListener("click", function (event) {
    if (event.target.id === "eg-205") {
      bild.data = '../img/205_1.svg';
      console.log("hä");
    } else if (event.target.id === "og-205") {
      bild.data = '../img/205_2.svg'
      bild.alt = "hello";
    }
  });
}
if(window.location.pathname.includes("geb_206.html")){
  document.getElementById("etageBtn206").addEventListener("click", function (event) {
    if (event.target.id === "eg-206") {
      bild.data = '../img/206_1.svg';
      console.log("hä");
    } else if (event.target.id === "og-206") {
      bild.data = '../img/206_2.svg';
    } else if (event.target.id === "og2-206") {
      bild.data = '../img/206_3.svg';
    } else if (event.target.id === "og3-206") {
      bild.data = '../img/206_4.svg';
    }
  });
}
