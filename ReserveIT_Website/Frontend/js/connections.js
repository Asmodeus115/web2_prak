

// Add a submit event listener to the form
$('#signInBtn').submit(function (event) {

    const matrikelNr = document.getElementById('login__matrikelnr').value;
    console.log("LogIn Vorgang startet.");
    // Get the login form by ID
    // const loginForm = document.querySelector('.form');

    // Prevent the default form submission behavior
    event.preventDefault();

    // Get the values of matrikelnr and password

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
        console.log('response received -->' + response);

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

//----------------------------------------------------------------------------------------//

$('#meineBuchungenBtn').click(function (event) {

    const matrikelNr = 12345;

    console.log("zeige meine Buchungen " + matrikelNr);
    //$('sexyAnton').remove();

    // disable default event
    event.preventDefault();
    $('#lageplan').hide();


    function zeigeBuchungen(arr) {

        $('#titel').html('<h1>Mein Buchungen</h1>');
        let tmp;

        if (arr.length === 0) {
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
        //console.log('response received, uploaded files cnt=' + response.length);
        //console.log($('#output').text(response.length + ' Datei(en) aufgeladen'));
        console.log('Buchung erfolgreich erstellt!');

    }).fail(function (xhr) {
        console.log('error received');
        alert('Es ist ein Fehler beim Aufladen aufgetreten');
    });

});







$('#lagerplan').click(function (event) {
    console.log("zeige Gebäude ");
    // disable default event
    event.preventDefault();
    function zeigeBuchungen(arr) {
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

        $('#tabelle').html(tmp);

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
                    $('#tabelle').html(tmp);

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
        zeigeBuchungen(response);
        ladeGrundrisse(response);

    }).fail(function (xhr) {
        console.log('error from Gebaeude received');
    });




});




function ladeGrundriss(response) {

    $(document).ready(function () {
        // IDs der <li>-Elemente im #gebBtn-Element abrufen
        var liIds = $('#gebBtn li').map(function () {
            return this.id;
        }).get();

        // Jetzt kannst du auf die IDs zugreifen oder sie ausgeben
        console.log(liIds);

        // Beispiel: Iteration über die IDs
        liIds.forEach(function (id) {
            console.log("ID: " + id);


            $('#' + id).click(function (event) {

                console.log(response);

                // disable default event
                event.preventDefault();
                //$('#lageplan').hide();

                /*
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
                
                */

                console.log('loading all recs from api');
                // convert data of form to object
                var meinObjekt = {
                    id: 210
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
                    console.log('response from Etage received');
                    console.log(response);

                    zeigeBuchunginca(response);
                    //zeigeBuchungen(response);

                }).fail(function (xhr) {
                    console.log('error received');
                });
            });
        });
    });
};




$('#GebBtn210').click(function (event) {

    console.log("zeige Lagepaln ");

    // disable default event
    event.preventDefault();
    //$('#lageplan').hide();

    /*
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

    */

    console.log('loading all recs from api');
    // convert data of form to object
    var meinObjekt = {
        id: 2
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
        console.log('response received');
        console.log(response);
        //zeigeBuchungen(response);

    }).fail(function (xhr) {
        console.log('error received');
    });
});







