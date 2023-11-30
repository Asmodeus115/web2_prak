
/*
  if (document.querySelectorAll(".linkleisteMain").length>0){
    document.querySelectorAll(".linkleisteMain").forEach(link =>{
      link.addEventListener("click", (event)=>{

        if () {

        } else if (*event.target.className === "kalenderBtn") {

        } else if (event.target.className === "datenschutzBtn") {

        } else if (event.target.className === "impressumBtn") {

        } else if (event.target.className === "buchungenBtn") {

        } else if (event.target.className === "ueberunsBtn") {

        } else if (event.target.className === "kontaktBtn") {

        } else if (event.target.className === "anfahrtBtn") {

        }else {
          console.log("fehler linkleiste")
        }
      });
    });
}

  const links206 = document.querySelectorAll(".btn206");
  const links201 = document.querySelectorAll(".btn201");
  const links210 = document.querySelectorAll(".btn210");
  const links205 = document.querySelectorAll(".btn205");

  if (links201.length>0){
    links201.forEach(link =>{
      link.addEventListener("click",() =>{
        document.createElement('')
      });
    });
  }
  if (links206.length>0){
    links206.forEach(link =>{
      link.addEventListener("click",() =>{

      });
    });
  }
  if (links205.length>0){
    links205.forEach(link =>{
      link.addEventListener("click",() =>{

        console.log("oha1")
      });
    });
  }
  if (links210.length>0){
    links210.forEach(link =>{
      link.addEventListener("click",() =>{

      });
    });


}
*/
function loadSVG(url){
    fetch(url)
        .then(response => response.text())
        .then(svgData => {
            document.getElementById('lageplan').innerHTML = svgData;

            document.getElementById('logo').addEventListener('click',()=>{
                console.log('click');
            });
        })
        .catch(error =>{
            console.log("clickfail", error);
        })
}

function calendar(){

}
loadSVG('http://localhost:3000/img/campusplan_raeume_albstadt.svg');
