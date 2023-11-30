
function loadSVG(url){
    fetch(url)
        .then(response => response.text())
        .then(svgData => {
            document.getElementById('lageplan').innerHTML = svgData;
        })
        .catch(error =>{
            console.log("loading fail", error);
        })
}

function swapButtonsGeb(gebNr){
    loadSVG('http://localhost:3000/img/'+gebNr+"_"+1+".svg");
    etagenAdder(gebNr);
  }

  function etagenWechsel(etagenNr){

  }

function etagenAdder(gebNr){
    const etagen = document.getElementById("gebBtn");
    let i = 1;
    const btn = etagen.querySelectorAll('.btn');
    btn.forEach( function (btn) {
        btn.setAttribute('id',gebNr+"_"+i);
        switch (i){
            case 1:{
                btn.textContent = gebNr+" "+"EG";
                break;
            }
            case 2:{
                btn.textContent = gebNr+" "+"OG 1";
                break;
            }
            case 3:{
                btn.textContent = gebNr+" "+"OG 2";
                break;
            }
            case 4:{
                btn.textContent = gebNr+" "+"OG 3";
                break;
            }
            case 5:{
                btn.textContent = gebNr+" "+"OG 4";
                break;
            }
        }
        i++;
    });
}


loadSVG('http://localhost:3000/img/campusplan_raeume_albstadt.svg');
