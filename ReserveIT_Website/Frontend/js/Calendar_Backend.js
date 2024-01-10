
function calenderStart() {
    $(document).ready(function () {
        console.log("form submit called");


        ladeAlleBuchugenByRaumID();

        $('#submitButton').click(function () {
            ceateBooking();
        });

        $('#prevWeekBtn, #nextWeekBtn').click(function () {
            entferneFarben();
            ladeAlleBuchugenByRaumID();
        });

        // Wenn auf btn aktuell Kalender geklickt wird, werden alle Buchungen
        // des Users angezeigt.
        $('#sexyAnton').click(function () {   
            ladeAlleBuchugenByTime();
            $('#prevWeekBtn, #nextWeekBtn').click(function () {
                entferneFarben();
                ladeAlleBuchugenByTime();
            });
        });

    });
}

function ladeAlleBuchugenByRaumID() {

    var raumID = $('#roomNumber').html().replace(/_/g, '');

    console.log("RaumID: ", raumID);
    const meinObjekt = {
        RaumID: raumID
    };

    // Erstellen ein neues FormData-Objekt
    const formData = new FormData();

    // Fügen Sie jedes Element aus dem JSON-Objekt zum FormData-Objekt hinzu
    for (const schluessel in meinObjekt) {
        formData.append(schluessel, meinObjekt[schluessel]);
    }

    // send form with ajax
    $.ajax({
        url: 'http://localhost:8000/api/buchung/ladeBuchugenByRaumID',
        type: 'POST',
        data: formData,
        contentType: false,
        cache: false,
        processData: false,
        dataType: 'json'
    }).done(function (response) {
        console.log('Alle Buchung erfolgreich aus der DB geholt!');
        console.log(response);
        zeigeFarben(response);
        checkBackgroundColor();

        $('.day-cell').click(function () {
            buchungPruefen(response);
        });
        $('#bookDate').blur(function () {
            buchungPruefen(response);
        });

        $('#bookStart').blur(function () {
            buchungPruefen(response);
        });

        $('#bookEnd').blur(function () {
            buchungPruefen(response);
        });

    }).fail(function (xhr) {
        console.log('Es ist ein Fehler beim Holen aufgetreten\n' + xhr);

    });
}


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
        checkBackgroundColor();

        $('.day-cell').click(function () {
            buchungPruefen(response);
        });
        $('#bookDate').blur(function () {
            buchungPruefen(response);
        });

        $('#bookStart').blur(function () {
            buchungPruefen(response);
        });

        $('#bookEnd').blur(function () {
            buchungPruefen(response);
        });

    }).fail(function (xhr) {
        console.log('Es ist ein Fehler beim Holen aufgetreten\n' + xhr);

    });
}



// In dieser Funktion darfst du dich austuben Habibi @SG4747
function zeigeFarben(arr) {
    console.log('Hier ist zeigeFarben Funktion');
    // Hier ist dein Spielplatz @SG4747
    const endOfWeek = createDateFromDateString(window.endeDatum);
    const startOfWeek = createDateFromDateString(window.startDatum);


    arr.forEach(function (booking) {
        // Hier wird jede Buchung in arr durchlaufen
        const bookDate = createDateFromDateString(booking.Startzeit);
        var spaltenindex = booking.ZellenSpalte;
        var buchungsbeginn = timeStringToInt(booking.Startzeit) - 6; // gebuchte uhrzeit - 6 ergibt den zeilenindex
        var buchungsende = timeStringToInt(booking.Endzeit) - 6;



        if (startOfWeek <= bookDate && endOfWeek >= bookDate) {

            if (buchungsbeginn >= 1 && buchungsbeginn <= 12) { // fruehstens ab 07:00 uhr,spätestens 18:00 Uhr
                markiereZelle(spaltenindex, buchungsbeginn, 'red');

                // if (buchungsende >= 2 && buchungsende <= 13) { // fruehstens ab 08:00 Uhr, spätestens 19:00 Uhr
                //     for (let i = buchungsende; i >= buchungsbeginn; i--) {
                //         markiereZelle(spaltenindex, i, 'red');
                //     }
                // }
            }
            else {
                alert("Fehler: Gebuchte Zeit ist außerhalb der Öffnungszeiten! \n\n\Die Öffnungszeiten sind von Mo. - Sa.: 07:00 - 19:00 Uhr.")
            }
        }

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


    var datum = $('#bookDate').val();
    var start = $('#bookStart').val();
    var end = $('#bookEnd').val();
    //var matNr = $('#bookDate').val();
    var raumID = $('#roomNumber').html().replace(/_/g, '');
    var buchungCode = generateRandomString();

    var startDate = datum + " " + start + ":00";
    var endDate = datum + " " + end + ":00";
    //var matNr = event.matNr;


    // convert data of form to object
    var meinObjekt = {
        RaumID: raumID,
        BenutzerID: 12345,
        Startzeit: startDate,
        Endzeit: endDate,
        BuchungCode: buchungCode,
        ZellenSpalte: zellenSpalte,
    };

    // Erstellen Sie ein neues FormData-Objekt
    var formData = new FormData();

    console.log(formData);

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


function createDateFromDateString(dateString) {
    const parts = dateString.split('.');
    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1; // Monate in JavaScript sind nullbasiert
    const year = parseInt(parts[2], 10);
    return new Date(year, month, day);
}

function timeStringToInt(timeInString) {
    const timeString = timeInString.split(' ')[1];
    const timeInt = parseInt(timeString, 10);
    return timeInt;
}

function entferneFarben() {
    // Iteriere über alle Zellen und entferne die Hintergrundfarbe
    var tabelle = document.getElementById('calendar');
    if (tabelle) {
        var zeilen = tabelle.getElementsByTagName('tr');
        for (var i = 0; i < zeilen.length; i++) {
            var zellen = zeilen[i].getElementsByTagName('td');
            for (var j = 0; j < zellen.length; j++) {
                zellen[j].style.backgroundColor = '';
            }
        }
    }
}

function checkBackgroundColor() {
    var tabelle = document.getElementById('calendar');
    var buchungsfenster = document.getElementById('buchungsfenster');

    // Überprüfe, ob die Tabelle existiert
    if (tabelle) {
        var zeilen = tabelle.getElementsByTagName('tr');

        // Iteriere durch jede Zeile
        for (var i = 0; i < zeilen.length; i++) {
            var zellen = zeilen[i].getElementsByTagName('td');

            // Iteriere durch jede Zelle in der aktuellen Zeile
            for (var j = 0; j < zellen.length; j++) {
                var zelle = zellen[j];
                // Überprüfe die Hintergrundfarbe der Zelle
                if (zelle.style.backgroundColor === 'red') {
                    zelle.addEventListener('click', function () {
                        buchungsfenster.style.display = 'none';
                    });
                }

            }
        }
    } else {
        console.error('Tabelle existiert nicht');
    }
}


function buchungPruefen(arr) {
    const datumBuchungsfenster = document.getElementById('bookDate').value;
    const startzeitBuchungsfenster = parseInt(document.getElementById('bookStart').value, 10);
    const endzeitBuchungsfenster = parseInt(document.getElementById('bookEnd').value, 10);


    arr.forEach(function (booking) {
        // Startzeit und Endzeit von YYYY.MM.DD HH:mm auf YYYY-MM-DD HH:mm bringen
        const gebuchtesDatum = `${createDateFromDateString(booking.Startzeit).getFullYear()}-${createDateFromDateString(booking.Startzeit).getMonth() + 1}-${createDateFromDateString(booking.Startzeit).getDate()}`;
        const gebuchteStartzeit = timeStringToInt(booking.Startzeit);
        const gebuchteEndzeit = timeStringToInt(booking.Endzeit);


        if (datumBuchungsfenster == gebuchtesDatum) {
            if (startzeitBuchungsfenster == gebuchteStartzeit || startzeitBuchungsfenster >= gebuchteStartzeit && startzeitBuchungsfenster < gebuchteEndzeit) {
                alert("Der Raum ist zu dieser Zeit bereits reserviert.")
                document.getElementById('submitButton').disabled = true;
                document.getElementById('submitButton').style.backgroundColor = 'grey';
            }

            else if (startzeitBuchungsfenster < gebuchteStartzeit && endzeitBuchungsfenster >= gebuchteEndzeit) {
                alert("Dieser Termin überschneidet sich mit einem bereits gebuchten Termin.")
                document.getElementById('submitButton').disabled = true;
                document.getElementById('submitButton').style.backgroundColor = 'grey';
            }

            else {
                document.getElementById('submitButton').disabled = false; // Aktiviere den Submit-Button
                document.getElementById('submitButton').style.backgroundColor = 'var(--font-color)';
            }
        }

        else {
            document.getElementById('submitButton').disabled = false; // Aktiviere den Submit-Button
            document.getElementById('submitButton').style.backgroundColor = 'var(--font-color)';
        }
    });

}



