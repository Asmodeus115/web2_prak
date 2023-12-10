
$(document).ready(function () {
    console.log("form submit called");

    ladeAlleBuchugenByTime();

    $('#submitButton').click(function (event) {
        ceateBooking();
        zeigeFarben();
        
    });
});

function ladeAlleBuchugenByTime() {
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
        console.log('Es ist ein Fehler beim Holen aufgetreten\n' + xhr);

    });
}



// In dieser Funktion darfst du dich austuben Habibi @SG4747
function zeigeFarben(arr) {
    console.log('Hier ist zeigeFarben Funktion' + arr.length);
    // Hier ist dein Spielplatz @SG4747 

    arr.forEach(function (booking) {
        // Hier wird jede Buchung in arr durchlaufen
        var spaltenindex = 4//booking.zellenSpalte;
        var zeilenindex = 3//booking.zellenZeile;

        markiereZelle(spaltenindex, zeilenindex, 'red');
       
    });
}


// Diese Funktion setzt die Hintergrundfarbe einer Zelle in einer Tabelle
function markiereZelle(spaltenindex, zeilenindex, farbe) {
    var tabelle = document.getElementById('calendar');

    // Überprüfe, ob die Tabelle existiert
    if (tabelle) {
        // Finde die Zeile in der Tabelle
        var zeile = tabelle.getElementsByTagName('tr')[zeilenindex];

        // Überprüfe, ob die Zeile existiert
        if (zeile) {
            // Finde die Zelle in der Zeile
            var zelle = zeile.getElementsByTagName('td')[spaltenindex];

            // Überprüfe, ob die Zelle existiert
            if (zelle) {
                // Setze die Hintergrundfarbe der Zelle
                zelle.style.backgroundColor = farbe;
            } else {
                console.error('Zelle existiert nicht');
            }
        } else {
            console.error('Zeile existiert nicht');
        }
    } else {
        console.error('Tabelle existiert nicht');
    }
}



//--------------------------------------------------------//
// Dies Funktion wird aktiviert, wenn auf den Buchungsbutton 
// im Kalender geklickt wird. 
// Es wird einen Eintrag (Buchung) in der Datenbank erstellt.
function ceateBooking() {
    console.log("Erstellung einer Buchung startet!");

    // disable default event
    event.preventDefault();

    function generateRandomString() {
        var length = 8;
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var result = '';
        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return result;
    }

    var zellenSpalte = window.cellPos;
    var zellenZeile = window.time;

    var datum = $('#bookDate').val();
    var start = $('#bookStart').val();
    var end = $('#bookEnd').val();
    //var matNr = $('#bookDate').val();
    var matNr = 12345;
    var buchungCode = generateRandomString();

    var startDate = datum + " " + start + ":00" 
    var endDate = datum + " " + end + ":00"
    //var matNr = event.matNr;
    console.log(startDate + "\n" + endDate);
    

    // convert data of form to object
    var meinObjekt = {
        RaumID: 1,
        BenutzerID: matNr,
        Startzeit: startDate,
        Endzeit: endDate,
        BuchungCode: buchungCode
    };

    // Erstellen Sie ein neues FormData-Objekt
    var formData = new FormData();

    // Fügen Sie jedes Element aus dem JSON-Objekt zum FormData-Objekt hinzu
    for (var schluessel in meinObjekt) {
        formData.append(schluessel, meinObjekt[schluessel]);
    }

    // send form with ajax
    $.ajax({
        url: 'http://localhost:8000/api/buchung/erstellen',
        type: 'POST',
        data: formData,
        contentType: false,
        cache: false,
        processData: false,
        dataType: 'json'
    }).done(function (response) {
        console.log('Buchen erfolgreich abgeschlossen');

    }).fail(function (xhr) {
        console.log('Fehler beim Erstellen des Termins');
    }); 
}



