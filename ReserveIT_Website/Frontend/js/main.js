

/*linkleiste index.html*/
if(window.location.pathname.includes("index.html")){
  document.getElementById("linkleisteMain").addEventListener("click", function (event){
    if (event.target.id === "lageplanBtn") {
      window.location.href = "index.html";
    } else if (event.target.id === "kalenderBtn") {
      window.location.href = "Calendar.html";
    } else if (event.target.id === "datenschutzBtn") {
      window.location.href = "Datenschutz.html";
    } else if (event.target.id === "impressumBtn") {
      window.location.href = "Impressum.html";
    } else if (event.target.id === "buchungenBtn") {
      window.location.href = "Calendar.html";
    } else if (event.target.id === "ueberunsBtn") {
      window.location.href = "ueberuns.html";
    } else if (event.target.id === "kontaktBtn") {
      window.location.href = "kontakt.html";
    } else if (event.target.id === "anfahrtBtn") {
      window.location.href = "https://maps.app.goo.gl/uSkcTxGHvDX1AJY8A";
    }else {
      console.log("fehler linkleiste")
    }
  });
}
  /*linkleiste gebaeude*/
  const links206 = document.querySelectorAll(".btn206");
  const links201 = document.querySelectorAll(".btn201");
  const links210 = document.querySelectorAll(".btn210");
  const links205 = document.querySelectorAll(".btn205");

  if (links201.length>0){
    links201.forEach(link =>{
      link.addEventListener("click",() =>{
        window.location.href="geb_201.html";
      });
    });
  }
  if (links206.length>0){
    links206.forEach(link =>{
      link.addEventListener("click",() =>{
        window.location.href="geb_206.html";
      });
    });
  }
  if (links205.length>0){
    links205.forEach(link =>{
      link.addEventListener("click",() =>{
        window.location.href="geb_205.html";
        console.log("oha1")
      });
    });
  }
  if (links210.length>0){
    links210.forEach(link =>{
      link.addEventListener("click",() =>{
        window.location.href="geb_210.html";
      });
    });
  /*sidebarButtons gebaeude*/

}
  const logos = document.querySelectorAll(".logo");

  if (logos.length>0){
    logos.forEach(logo =>{
      logo.addEventListener('click', () =>{
        window.location.href="index.html";
      });
    });
  }else {
    console.log("fehler logo")
  }

