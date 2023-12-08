$(document).ready(function () {
    console.log("form submit called");
    ladeAlleBuchugenByTime();

});



// In dieser Funktion darfst du dich austuben Habibi @SG4747
function zeigeFarben(arr) {
    console.log('Hier ist zeigeFarben Funktion');

    // Hier ist dein Spielplatz @SG4747
    
}



function ladeAlleBuchugenByTime(){

    // send form with ajax
    $.ajax({
        url: 'http://localhost:8000/api/buchung/alleladen',
        type: 'GET',
        contentType: 'application/json; charset=utf-8',
        cache: false,
        dataType: 'json'
    }).done(function (response) {
        console.log('Alle Buchung erfolgreich aus der DB geholt!');
        console.log(response);
        zeigeFarben(response);

    }).fail(function (xhr) {
        console.log('Es ist ein Fehler beim Holen aufgetreten');

    });

}

