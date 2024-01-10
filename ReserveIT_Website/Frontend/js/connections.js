

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
            console.log('Anmeldung removed');
            //$('.grid-layout').insertBefore('<h1>htest</h1>');

            $('#loginArea').empty();
            //$('#loginArea').insertAfter('<main id="grid-unten"><h1>htest</h1></main>');
            //ladeWebseite();
            loginKiller();
            runMain();

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


function ladeWebseite() {

    //$('#grid-oben').insertAfter('<main id="grid-unten"><h1>htest</h1></main>');
    $('#loginArea').attr("id", "grid-unten");
    $('#grid-unten').removeAttr("class");
    console.log("Neue Funkt");
    //$('#loginArea').insertAfter('<main id="grid-unten"><h1>htest</h1></main>');
}


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
                storniereBuchung(SlotsToCancle);
            } else {
                console.log("Es wurden keine Buchungen ausgewählt, die storniert werden sollen!");
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
    // IDs der Debäude Buttons in LiLds speichern
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
                zeigeEtage(response, arr);

            }).fail(function (xhr) {
                console.log('error received');
            });
        });
    }
}

function zeigeEtage(response, gebBtn) {
    $('#grid-unten').empty();
    var tmp = '';

    if (response.length == 0) {
        tmp = 'Keine Etagen vorhanden';
        return;
    }

    //tmp += '<div></div>'
    tmp += '<ul class="list-group">';


    //-------------- Hier werden die Buttons der Gebäude ober dem Grundriss erstellt @Asmodeus115 @SG4747---------
    tmpGebBtn = '<ul class="GebOnEtage" id="gebBtn">';
    console.log("log test");
    var i = 1;
    gebBtn.forEach(obj => {

        tmpGebBtn += '<li id="GebBtn' + obj.id + '" class="btnOnEtage btn' + obj.id + '" type="button">' + obj.id + '</li>';
        console.log('<li id="GebBtn' + obj.id + '" class="btnOnEtage btn' + obj.id + '" type="button">' + obj.id + '</li>');
    });
    tmpGebBtn += '</ul>';
    $('#grid-unten').append('<div></div>');
    $('#grid-unten').append(tmpGebBtn);

    ladeGrundrisse(gebBtn);
    //-------------------------

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
    svgHover("etageSVG", ".roomSVG")
    clickHouse("etageSVG", ".roomSVG", "test")
}

function loadButtons() {
    // main leeren
    $('#grid-unten').empty();
    console.log("test");


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


function storniereBuchung(ids) {

    console.log("Die BuchungsIDs zum Stornieren: ", ids);
    ids.forEach(id => {

        // send form with ajax
        $.ajax({
            url: 'http://localhost:8000/api/buchung/' + id,
            type: 'delete',
            contentType: false,
            cache: false,
            processData: false,
            dataType: 'json'
        }).done(function (response) {
            console.log('Stornierung = ' + response);

        }).fail(function (xhr) {
            console.log('error received');

        });

    });


}





$('.impressumBtn').click(function () {
    $('#grid-unten').empty();

    // disable default event
    event.preventDefault();

    var meinString = `

    <div>
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


    $('#grid-unten').append('<div></div>');
    $('#grid-unten').append(meinString);


});

$('.aboutBtn').click(function () {
    $('#grid-unten').empty();

    // disable default event
    event.preventDefault();

    var meinString = `
        <h1 id="textarea-h1">Unsere Gründergeschichte</h1>
        <div>
          <p>
            Ein kalter Herbstabend in der kleinen Hochschulstadt, wo die Blätter in den Farben des Sonnenuntergangs leuchteten, bildete den perfekten Hintergrund für den Beginn unserer gemeinsamen Reise. Vier Studenten, jeder mit seiner einzigartigen Perspektive und Expertise, kamen zusammen und legten den Grundstein für das, was bald zu einem aufregenden Unterfangen werden sollte.<br><br>
            Unsere Geschichte begann in einem kleinen Seminarraum, in dem wir uns im Rahmen eines gemeinsamen Projekts für unser Studium der IT-Security und Wirtschaftsinformatik zusammenfanden. Zwischen Codezeilen und Datenbanken entdeckten wir eine gemeinsame Leidenschaft für innovative Lösungen und die Verbindung von Technologie und Geschäft. <br><br>
            Eines Tages, als wir gemeinsam über die Herausforderungen im Hochschulalltag sprachen, stolperten wir über ein scheinbar einfaches, aber sehr reales Problem: Die Reservierung von Räumen an der Hochschule war ein zeitraubender und oft verwirrender Prozess. Dies war der Moment, in dem die Saat für unsere Geschäftsidee gelegt wurde. <br><br>
            Wir begannen, unsere Fähigkeiten und Kenntnisse zu kombinieren. Die beiden IT-Security-Studenten brachten ihr tiefes Verständnis für Datenschutz und Sicherheit ein, während die Wirtschaftsinformatik-Studenten ihre Fähigkeiten in den Bereichen Geschäftsanalyse und Management einsetzten. Gemeinsam wagten wir uns in die Welt der Startup-Unternehmen. <br><br>
            In den nächsten Monaten arbeiteten wir unermüdlich an unserer Idee, verfeinerten das Konzept, erstellten Prototypen und präsentierten unser Projekt in verschiedenen Hochschulkursen. Das Feedback war positiv, aber wir waren uns bewusst, dass der Weg von einer Idee zu einem erfolgreichen Unternehmen steinig sein würde. <br><br>
            Die nächste Etappe unserer Reise führte uns zu branchenrelevanten Veranstaltungen und Networking-Events, wo wir unser Projekt vorstellten und wertvolle Einblicke von Branchenexperten erhielten. Jeder von uns trug dazu bei, das Unternehmen voranzutreiben, sei es durch die Verbesserung der Benutzeroberfläche, das Hinzufügen von Sicherheitsfunktionen oder das Entwickeln einer nachhaltigen Geschäftsstrategie. <br><br>
            Unsere harte Arbeit zahlte sich aus, als wir schließlich die Finanzierung für unser Startup sicherten. Mit einem gemischten Gefühl von Aufregung und Nervosität starteten wir unsere Plattform zur Raumreservierung. Die ersten Monate waren von intensiver Kundenbetreuung, ständiger Verbesserung der Plattform und dem Anpassen an die Dynamik des Marktes geprägt. <br><br>
            Mit der Zeit gewannen wir das Vertrauen unserer Nutzer und erweiterten unsere Dienstleistungen. Das einfache Projekt aus dem Studium entwickelte sich zu einem vielversprechenden Unternehmen, das die Art und Weise, wie Menschen Räume buchen, revolutionierte. <br><br>
            Die Reise war nicht ohne Herausforderungen, aber unsere gemeinsame Entschlossenheit, gepaart mit der einzigartigen Mischung unserer Fähigkeiten, trieb uns voran. Heute blicken wir stolz auf das, was wir erreicht haben, aber unsere Geschichte ist noch nicht zu Ende. Mit jedem Tag lernen wir dazu, wachsen weiter und setzen unsere Leidenschaft dafür ein, die Raumbuchung so einfach wie möglich zu gestalten. <br><br>
            Unsere Gründergeschichte ist eine Ode an die Zusammenarbeit, den Glauben an Innovation und die Kraft einer Idee, die in einem kleinen Seminarraum an der Hochschule entstand und zu einem erfolgreichen Unternehmen heranwuchs.
          </p>
      </div>
`;


    $('#grid-unten').append(meinString);


});



