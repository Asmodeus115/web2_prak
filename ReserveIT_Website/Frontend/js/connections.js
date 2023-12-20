

// Diese Funktionen sind für den Anmelde-Vorgang
// Sie prüft, ob der User schon existiert. Falls ja,
// wird der User an die index.html weitergeleitet.

$('#signInBtn').submit(function (event) {

    const matrikelNr = document.getElementById('login__matrikelnr').value;
    console.log("LogIn Vorgang startet.");

    // Prevent the default form submission behavior
    event.preventDefault();
    const password = document.getElementById('login__password').value;

    // convert data of form to object
    const meinObjekt = {
        id: matrikelNr,
        passwort: password,
    };

    // Erstellen Sie ein neues FormData-Objekt
    const formData = new FormData();

    // Fügen Sie jedes Element aus dem JSON-Objekt zum FormData-Objekt hinzu
    for (const schluessel in meinObjekt) {
        formData.append(schluessel, meinObjekt[schluessel]);
    }

    console.log(formData);

    // send form with ajax
    $.ajax({
        url: 'http://localhost:8000/api/benutzer/existiert',
        type: 'POST',
        data: formData,
        contentType: false,
        cache: false,
        processData: false,
        dataType: 'json'
    }).done(function (response) {
        console.log('Anmeldung = ' + response);

        if (response) {
            window.location.href = '/html/index.html';
        } else {
            $('#fehler').html('Fehler beim Anmelden');
            $('#login__matrikelnr').val('');
            $('#login__password').val('');
        }

    }).fail(function (xhr) {
        console.log('error received');
        $('#login__matrikelnr').val('');
        $('#login__password').val('');
        $('#fehler').html('Fehler beim Anmelden');
    });

});

// 205-135
// Gebäude-Etag+Raumnummer


//--------------------------------------------------------//
// Dies Funktion wird aktiviert, wenn der Button
// Meine Buchungen geklick wird. Es werden alle
// Buchungen aufgelistet, die der User hat.

$('#meineBuchungenBtn').click(function (event) {

    $('#grid-unten').empty();

    // disable default event
    event.preventDefault();


    function zeigeBuchungen(arr) {
        $('#grid-unten').empty();

        var tmp = "1";

        if (arr.length === 0) {
            tmp.text('Keine Buchung vorhanden');
            return;
        }

        tmp += '<table id="tabelle"><tr>';
        tmp += '<th>Nr</th>';
        tmp += '<th>RaumID</th>';
        tmp += '<th>BenutzerID</th>';
        tmp += '<th>Startzeit</th>';
        tmp += '<th>Endzeit</th>';
        tmp += '<th>BuchungCode</th>';
        tmp += '<th>Stornieren</th>';
        tmp += '</tr>';

        var i = 1;
        arr.forEach(obj => {
            tmp += '<tr>';
            tmp += '<td>' + i + '</td>';
            tmp += '<td>' + obj.RaumID + '</td>';
            tmp += '<td>' + obj.BenutzerID + '</td>';
            tmp += '<td>' + obj.Startzeit + '</td>';
            tmp += '<td>' + obj.Endzeit + '</td>';
            tmp += '<td>' + obj.BuchungCode + '</td>';
            tmp += '<td><input class="storinerenBtn" type="checkbox" id=' + obj.id + '> Stornieren </td>';
            tmp += '</tr>';
            i++;
        });
        tmp += '</table>';
        $('#grid-unten').append(tmp);
    }

    // convert data of form to object
    const meinObjekt = {
        //BenutzerID: sessionStorage.getItem('MatrikelNr')
        BenutzerID: 12345
    };

    // Erstellen ein neues FormData-Objekt
    const formData = new FormData();

    // Fügen Sie jedes Element aus dem JSON-Objekt zum FormData-Objekt hinzu
    for (const schluessel in meinObjekt) {
        formData.append(schluessel, meinObjekt[schluessel]);
    }

    // send form with ajax
    $.ajax({
        url: 'http://localhost:8000/api/buchung/ladeMeineBuchungen',
        type: 'POST',
        data: formData,
        contentType: false,
        cache: false,
        processData: false,
        dataType: 'json'
    }).done(function (response) {
        console.log('response received');
        console.log(response);
        zeigeBuchungen(response);

        var SlotsToCancle = [];
        var showBtn = 0;

        var checkbox = document.getElementsByClassName('storinerenBtn');
        $('#grid-unten').append('<button  id="conformStorno" type="submit" value="Stornierung bestätigen">Absenden</button>');

        for (var i = 0; i < checkbox.length; i++) {
            $('#' + checkbox[i].id).on('change', function () {
                var id = $(this).attr('id');

                if ($(this).prop('checked')) {
                    SlotsToCancle.push(id);

                } else {
                    SlotsToCancle = SlotsToCancle.filter(function (item) {
                        return item !== id;
                    });
                    console.log(SlotsToCancle);

                }

            });

            console.log(SlotsToCancle);
        }

        $('#conformStorno').click(function () {
            if (SlotsToCancle.length > 0) {
                storniereBuchung(SlotsToCancle[0]);
            } else {

            }
        });
    }).fail(function (xhr) {
        console.log('error received');
    });
});


//--------------------------------------------------------//
// Diese Funktion soll die .svg Dateien der Grundrisse aus
// der Datenbank holen und anzeigen.
function zeigeGebaeude(arr) {
    loadLageplan()
    let tmp;

    if (arr.length === 0) {
        tmp.text('Keine Gebäude vorhanden');
        return;
    }

    tmp = '<ul class="list-group" id="gebBtn">';

    console.log("log test");
    var i = 1;
    arr.forEach(obj => {
        tmp += '<li id="GebBtn' + obj.id + '" class="list-group btn' + obj.id + '">' + obj.id + '</li>';
        console.log('<li id="GebBtn' + obj.Name + '" class="list-group btn' + obj.Name + '">' + obj.Name + '</li>');
    });
    tmp += '</ul>';
    $('#sidebar').append(tmp);

}


function ladeGrundrisse(arr) {
    // gebBtn210
    var liIds = $('#gebBtn li').map(function () {
        return this.id;
    }).get();

    for (let index = 0; index < liIds.length; index++) {
        const ElementID = liIds[index];

        $('#' + ElementID).click(function (event) {
            console.log("ID: " + arr[index].id);
            var meinObjekt = {
                id: arr[index].id
            };

            var formData = new FormData();
            for (var schluessel in meinObjekt) {
                formData.append(schluessel, meinObjekt[schluessel]);
            }


            $.ajax({
                url: 'http://localhost:8000/api/etage/laden',
                type: 'POST',
                data: formData,
                contentType: false,
                cache: false,
                processData: false,
                dataType: 'json'
            }).done(function (response) {
                zeigeEtage(response);
            }).fail(function (xhr) {
                console.log('error received');
            });
        });
    }
}

function zeigeEtage(response) {

    $('#grid-unten').empty();
    var tmp = "1";

    if (response.length == 0) {
        tmp = 'Keine Etagen vorhanden';
        return;
    }

    tmp += '<div></div>'
    tmp += '<ul class="list-group">';


    response.forEach(obj => {
        tmp += '<li id="EtageBtn' + obj.id + '" class="list-group btn' + obj.id + '">' + obj.Bezeichnung + '</li>';
    });

    tmp += '</ul>';
    $('#grid-unten').append(tmp);


    const svg = document.createElement("object");
    const svgHolder = document.createElement("div");

    svgHolder.id = "svgHolder"
    svg.id = "etageSVG";
    svg.data = "../img/" + response[0].Grundriss;
    svg.type = "image/svg+xml"

    document.getElementById("grid-unten").appendChild(svgHolder);
    document.getElementById("svgHolder").appendChild(svg);

    for (let index = 0; index < response.length; index++) {
        const element = response[index];
        // #EtageBtn2101
        $('#EtageBtn' + response[index].id).click(function (event) {
            svg.data = "../img/" + response[index].Grundriss;
        });

    }
    svgHover("etageSVG", "roomSVG")
}

function loadButtons() {
    // main leeren
    $('#grid-unten').empty();
    console.log("test");

    // disable default event

    // send form with ajax
    $.ajax({
        url: 'http://localhost:8000/api/etage/ladenGeb',
        type: 'get',
        contentType: false,
        cache: false,
        processData: false,
        dataType: 'json'
    }).done(function (response) {
        console.log('response received');
        console.log(response);
        zeigeGebaeude(response);

        ladeGrundrisse(response);

    }).fail(function (xhr) {
        console.log('Fehler bekommen beim Laden der Geäude aus der DB!');
    });
}


function storniereBuchung(id) {

    console.log("ID: ", id);

    // convert data of form to object
    const meinObjekt = {
        id: id
    };

    // Erstellen Sie ein neues FormData-Objekt
    const formData = new FormData();

    // Fügen Sie jedes Element aus dem JSON-Objekt zum FormData-Objekt hinzu
    for (const schluessel in meinObjekt) {
        formData.append(schluessel, meinObjekt[schluessel]);
    }

    console.log(formData);

    // send form with ajax
    $.ajax({
        url: 'http://localhost:8000/api/buchung/' + id,
        type: 'delete',
        data: formData,
        contentType: false,
        cache: false,
        processData: false,
        dataType: 'json'
    }).done(function (response) {
        console.log('Stornierung = ' + response);

    }).fail(function (xhr) {
        console.log('error received');

    });

}

$(document).ready(function () {
    $('.impressumBtn').click(function () {
        $('#grid-unten').empty();

        // disable default event
        event.preventDefault();

        var meinString = `
    <p>
    <div class="textarea">
    <h1 id="textarea-h1">Impressum</h1>
    <p><strong>Border Collie</strong></p>
    <p>Reserve It GmbH<br>
    Musterstr. 33<br>
    72458 Albstadt-Ebingen</p>

    <p><strong>Kontakt:</strong></p>
    <p>Telefon: +49 (0)123 456 789<br>E-Mail: <a href="mailto:reserveit.email@example.com" style="color: rgba(0, 0, 0, 0.648); ">reserve-itt@example.com</a></p>

    <p><strong>Vertretungsberechtigte Person:</strong></p>
    <p>Shetland Sheepdog</p>

    <p><strong>Registrierung:</strong></p>
    <p>Handelsregister Albstadt<br>
    Registernummer: 54321<br>
    Umsatzsteuer-Identifikationsnummer: USt-IdNr.485481248</p>

    <p><strong>Haftungsausschluss:</strong></p>
    <p>Die bereitgestellten Informationen wurden sorgfältig geprüft und werden regelmäßig aktualisiert. Wir übernehmen jedoch keine Gewähr für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte. Haftungsansprüche gegen uns, die sich auf Schäden materieller oder ideeller Art beziehen, die durch die Nutzung oder Nichtnutzung der dargebotenen Informationen bzw. durch die Nutzung fehlerhafter und unvollständiger Informationen verursacht wurden, sind grundsätzlich ausgeschlossen, sofern kein nachweislich vorsätzliches oder grob fahrlässiges Verschulden vorliegt.</p>

    <p><strong>Urheberrecht:</strong></p>
    <p>Die durch uns erstellten Inhalte und Werke auf dieser Webseite unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechts bedürfen unserer schriftlichen Zustimmung. Soweit die Inhalte auf dieser Seite nicht von uns erstellt wurden, werden die Urheberrechte Dritter beachtet. Insbesondere werden Inhalte Dritter als solche gekennzeichnet. Sollten Sie trotzdem auf eine Urheberrechtsverletzung aufmerksam werden, bitten wir um einen entsprechenden Hinweis. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Inhalte umgehend entfernen.</p>

    <p><strong>Datenschutz:</strong></p>
    <p>Unsere Datenschutzerklärung finden Sie <a href="Datenschutz.html">hier</a>.</p>
  </div>
`;


        $('#grid-unten').append(meinString);

    });
});