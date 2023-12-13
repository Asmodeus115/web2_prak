
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

function calenderElement(){

}

function swapButtonsGeb(gebNr){
    loadSVG('http://localhost:3000/img/'+gebNr+"_"+1+".svg");
    etagenAdder(gebNr);
}

function removeOldButtons(){
    const etagen = document.getElementById("gebBtn");
    const btns = etagen.querySelectorAll('li');
    btns.forEach(function (btns){
        etagen.removeChild(btns);
    });
}


function etagenAdder(gebNr){
    const etagen = document.getElementById("gebBtn");
    let i = 1;
    etagen.forEach( function (btn) {
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

    });
}


loadSVG('http://localhost:3000/img/campusplan_raeume_albstadt.svg');
