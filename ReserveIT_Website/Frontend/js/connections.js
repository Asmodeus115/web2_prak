


// Add a submit event listener to the form
$('#signInBtn').submit(function (event) {

    var matrikelNr =  document.getElementById('login__matrikelnr').value;
    console.log("LogIn Vorgang startet.");
    // Get the login form by ID
    // const loginForm = document.querySelector('.form');

    // Prevent the default form submission behavior
    event.preventDefault();

    // Get the values of matrikelnr and password

    const password = document.getElementById('login__password').value;

    // convert data of form to object
    var meinObjekt = {
        id: matrikelNr,
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

        $('#tabelle').html(tmp);

    }



    console.log('loading all recs from api');
    // convert data of form to object
    var meinObjekt = {
        BenutzerID: 12345
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
        url: 'http://localhost:8000/api/buchung/laden',
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


//--------------------------------------------------------------------------------------//





$('#bookModal').submit(function (event) {
    console.log("form submit called");
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

    
    var datum = $('#bookDate').val();
    var start = $('#bookStart').val();
    var end = $('#bookEnd').val();
    var matNr = $('#bookMatrikel').val();
    var buchungCode = generateRandomString();

    var startDate = datum + " " + start + ":00"
    var endDate = datum + " " + end + ":00"
    //var matNr = event.matNr;
    console.log(startDate + "\n" + endDate);

    /*
    var dt = helper.formatToGermanDate(startDate);
    console.log(dt);
    */
    //alert(datum);



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

    console.log(formData);

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
        console.log('response received, uploaded files cnt=' + response.length);
        console.log($('#output').text(response.length + ' Datei(en) aufgeladen'));

    }).fail(function (xhr) {
        console.log('error received');
        alert('Es ist ein Fehler beim Aufladen aufgetreten');
    });

});




