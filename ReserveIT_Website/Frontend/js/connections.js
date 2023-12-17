// Diese Funktionen ist für den Anmelde-Vorgang
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


//--------------------------------------------------------//
// Dies Funktion wird aktiviert, wenn der Button
// Meine Buchungen geklick wird. Es werden alle
// Buchungen aufgelistet, die der User hat.
$('#meineBuchungenBtn').click(function (event) {

    $('#content').next().remove();
    $('#content').empty();

    const matrikelNr = 12345;

    console.log("zeige meine Buchungen " + matrikelNr);
    //$('sexyAnton').remove();

    // disable default event
    event.preventDefault();
    $('#lageplan').hide();


    function zeigeBuchungen(arr) {
        $('#content').empty();

        let tmp;

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
        tmp += '</tr>';

        console.log("log test");
        var i = 1;
        arr.forEach(obj => {
            tmp += '<tr>';
            tmp += '<td>' + i + '</td>';
            tmp += '<td>' + obj.RaumID + '</td>';
            tmp += '<td>' + obj.BenutzerID + '</td>';
            tmp += '<td>' + obj.Startzeit + '</td>';
            tmp += '<td>' + obj.Endzeit + '</td>';
            tmp += '<td>' + obj.BuchungCode + '</td>';
            //tmp += '<td>' + (obj.alter >= 18 ? 'erwachsen' : 'Kind') + '</td>';
            tmp += '</tr>';
            i++;
        });
        tmp += '</table>';
        $('#content').append(tmp);
        //$('#content').html(tmp);
    }

    console.log('loading all recs from api');
    // convert data of form to object
    const meinObjekt = {
        BenutzerID: 12345
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

    }).fail(function (xhr) {
        console.log('error received');
    });
});




//--------------------------------------------------------//
// Diese Funktion soll die .svg Dateien der Grundrisse aus
// der Datenbank holen und anzeigen.
function zeigeGebaeude(arr) {
    var tmp;

    if (arr.length == 0) {
        tmp.text('Keine Gebäude vorhanden');
        return;
    }

    tmp += '<div></div>'
    tmp += '<ul class="list-group" id="gebBtn">';

    console.log("log test");
    var i = 1;
    arr.forEach(obj => {
        tmp += '<li id="GebBtn' + obj.Name + '" class="list-group-item btn btn' + obj.Name + '" onclick="swapButtonsGeb(\'' + obj.Name + '\')">' + obj.Name + '</li>';
        console.log('<li id="GebBtn' + obj.Name + '" class="list-group-item btn btn' + obj.Name + '"onclick="swapButtonsGeb(\'' + obj.Name + '\')">' + obj.Name + '</li>');
    });
    tmp += '</ul>';
    $('#content').html(tmp);

    // Bild von Campus Lagepaln anzeigen
    var svgElement = $('<img style="height: 50%;width: 50%;"  src="../img/campusplan_raeume_albstadt.svg" alt="campusAlb"/>');
    svgElement.insertAfter('#content');
}



function ladeGrundrisse(arr) {

    let ids = arr;
    var liIds = $('#gebBtn li').map(function () {
        return this.id;
    }).get();

    for (let index = 0; index < liIds.length; index++) {
        const ElementID = liIds[index];


        $('#' + ElementID).click(function (event) {
            console.log("ID: " + ids[index].id);
            console.log('loading all recs from api');
            // convert data of form to object
            var meinObjekt = {
                id: ids[index].id
            };

            // Erstellen Sie ein neues FormData-Objekt
            var formData = new FormData();

            // Fügen Sie jedes Element aus dem JSON-Objekt zum FormData-Objekt hinzu
            for (var schluessel in meinObjekt) {
                formData.append(schluessel, meinObjekt[schluessel]);
            }

            console.log(formData);

            // send form with ajax
            $.ajax({
                url: 'http://localhost:8000/api/etage/laden',
                type: 'POST',
                data: formData,
                contentType: false,
                cache: false,
                processData: false,
                dataType: 'json'
            }).done(function (response) {
                $('#content').next().remove();
                $('#content').empty();

                var arr = response;
                console.log('response from Etage received');
                console.log(response);

                var tmp;

                if (arr.length == 0) {
                    tmp.text('Keine Etagen vorhanden');
                    return;
                }

                tmp += '<div></div>'
                tmp += '<ul class="list-group" id="gebBtn">';

                console.log("log test");
                var i = 1;
                arr.forEach(obj => {
                    //{ id: 6, Bezeichnung: "EG", Grundriss: "..\\img\\206_eg.svg", … }
                    tmp += '<li id="RaumBtn' + obj.id + '" class="list-group-item btn btn' + obj.id + '" onclick="swapButtonsGeb(\'' + obj.id + '\')">' + obj.Bezeichnung + '</li>';
                    // console.log('<li id="GebBtn' + obj.Name + '" class="list-group-item btn btn' + obj.Name + '"onclick="swapButtonsGeb(\'' + obj.Name + '\')">' + obj.Name + '</li>');
                });
                tmp += '</ul>';
                $('#content').html(tmp);

                console.log("../img/" + arr[0].Grundriss)

                $('#svgContainer').load("../img/" + arr[0].Grundriss);

                $('#RaumBtn' + arr[0].id).click(function (event) {
                    $('#lageplan').load("../img/" + arr[index].Grundriss);
                    console.log("Btn 1");
                });



            }).fail(function (xhr) {
                console.log('error received');
            });
        });

    }
}


$('#lageplan').click(function (event) {
    // main leeren
    $('#content').empty();

    console.log("zeige Gebäude ");
    // disable default event
    event.preventDefault();


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
});






