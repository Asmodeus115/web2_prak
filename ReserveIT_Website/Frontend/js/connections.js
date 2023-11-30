

/*
// Add a submit event listener to the form
$('#signInBtn').submit(function (event) {

    window.user = window.user || {};

    window.user.matrikelNr = document.getElementById('login__matrikelnr').value;
    console.log("LogIn Vorgang startet.");
    // Get the login form by ID
    const loginForm = document.querySelector('.form');

    // Prevent the default form submission behavior
    event.preventDefault();

    // Get the values of matrikelnr and password
    
    const password = document.getElementById('login__password').value;

    // convert data of form to object
    var meinObjekt = {
        id: user.matrikelNr,
        passwort: password,
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
        url: 'http://localhost:8000/api/benutzer/existiert',
        type: 'POST',
        data: formData,
        contentType: false,
        cache: false,
        processData: false,
        dataType: 'json'
    }).done(function (response) {
        console.log('response received -->' + response);

        if (response) {
            window.location.href = 'index.html';
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
*/
//----------------------------------------------------------------------------------------//

$('#meineBuchungenBtn').click(function (event) {

    var matrikelNr = 12345;
    console.log("zeige meine Buchungen " + matrikelNr);

    // disable default event
    event.preventDefault();
    $('#lageplan').hide();


    function zeigeBuchungen(arr) {

        $('#titel').html('<h1>Mein Buchungen</h1>');
        var tmp;

        if (arr.length == 0) {
            tmp.text('Keine Buchung vorhanden');
            return;
        }


        tmp += '<tr>';
        tmp += '<th>ID</th>';
        tmp += '<th>RaumID</th>';
        tmp += '<th>BenutzerID</th>';
        tmp += '<th>Startzeit</th>';
        tmp += '<th>Endzeit</th>';
        tmp += '<th>BuchungCode</th>';
        tmp += '</tr>';

        console.log("log test");

        arr.forEach(obj => {
            tmp += '<tr>';
            tmp += '<td>' + obj.id + '</td>';
            tmp += '<td>' + obj.RaumID + '</td>';
            tmp += '<td>' + obj.BenutzerID + '</td>';
            tmp += '<td>' + obj.Startzeit + '</td>';
            tmp += '<td>' + obj.Endzeit + '</td>';
            tmp += '<td>' + obj.BuchungCode + '</td>';
            //tmp += '<td>' + (obj.alter >= 18 ? 'erwachsen' : 'Kind') + '</td>';
            tmp += '</tr>';
        });

        $('#tabelle').html(tmp);

    }



    console.log('loading all recs from api');
    meinObjekt = { BenutzerID: 12345 };

    // Erstellen Sie ein neues FormData-Objekt
    var formData = new FormData();

    // Fügen Sie jedes Element aus dem JSON-Objekt zum FormData-Objekt hinzu
    for (var schluessel in meinObjekt) {
        formData.append(schluessel, meinObjekt[schluessel]);
    }

    $.ajax({
        url: 'http://localhost:8000/api/buchung/laden',
        method: 'post',
        data: formData,
        contentType: 'application/json; charset=utf-8',
        cache: false,
        dataType: 'json'
    }).done(function (response) {
        console.log("Done")
        console.log(response);
        zeigeBuchungen(response);
    }).fail(function (jqXHR, statusText, error) {
        console.log('Response Code: ' + jqXHR.status + ' - Fehlermeldung: ' + jqXHR.responseText);
        $('#output').html('Ein Fehler ist aufgetreten');
        $('#pics').text('Keine Bilder vorhanden');
    });

});





