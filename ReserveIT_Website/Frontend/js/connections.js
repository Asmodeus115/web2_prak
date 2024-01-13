
// Diese Funktionen sind für den Anmelde-Vorgang
// Sie prüft, ob der User schon existiert. Falls ja,
// wird der User an die index.html weitergeleitet.


function doLoginProcess() {

  console.log("doLoginProcess startet!");

  $('#signInBtn').submit(function (event) {

    const matrikelNr = document.getElementById('login__matrikelnr').value;
    console.log("LogIn Vorgang startet.");

    var isUserLogedin = 0;
    sessionStorage.setItem('isUserLogedin', isUserLogedin);

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
        isUserLogedin = 1;
        sessionStorage.setItem('matrikelNr', matrikelNr);
        sessionStorage.setItem('isUserLogedin', isUserLogedin);

        $('#loginArea').empty();
        signedInLinkBar();
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
}

/*
function ladeWebseite() {

  //$('#grid-oben').insertAfter('<main id="grid-unten"><h1>htest</h1></main>');
  $('#loginArea').attr("id", "grid-unten");
  $('#grid-unten').removeAttr("class");
  console.log("Neue Funkt");
  //$('#loginArea').insertAfter('<main id="grid-unten"><h1>htest</h1></main>');
}
*/

function isUserLogedin() {
  var isUserLogedin = sessionStorage.getItem('isUserLogedin');
  console.log("isUserLogedin Funktion: \nWert= ", isUserLogedin);

  if (isUserLogedin == 1) {
    console.log("User ist angemeldet");
    //alert("Logedin: ", isUserLogedin);
    $('#loginArea').empty();
    console.log("login geleert");
    
    signedInLinkBar();
    loginKiller();
    runMain();

  } else if(isUserLogedin == 0 || isUserLogedin == null ) {
    console.log("isUserLogedin = ", isUserLogedin);
    doLoginProcess();
  } else{
    alert("Was anderens:",  isUserLogedin);
  }
}

function signedInLinkBar() {
  document.getElementById("linkleiste").innerHTML = '<button id="lageplanBtn" class="btn lageplanBtn" type="button">Lageplan</button><button class="btn aboutBtn" id="ueberunsBtn" type="button" onclick="aboutUs()">Über uns</button> <button id="meineBuchungenBtn" class="btn buchungenBtn" type="button" onclick="meineBuchungen()">Meine Buchungen</button><button class="btn" id="impressumBtn" type="button" onclick="impressum()">Impressum</button> <button class="btn" id="signOut()" type="button" onclick="logoutBtn()">Log out</button>';
}

function loginKiller(){
  console.log("loginKiller startet");
  document.getElementById("loginArea").classList.remove("align");
  document.getElementById("loginArea").id = "grid-unten";
  document.getElementById("logo").addEventListener("click", runMain);
  document.getElementById("lageplanBtn").addEventListener("click", runMain);
}


//--------------------------------------------------------//
// Dies Funktion wird aktiviert, wenn der Button
// Meine Buchungen geklick wird. Es werden alle
// Buchungen aufgelistet, die der User hat.

function meineBuchungen() {

  function zeigeBuchungen(arr) {
    $('#grid-unten').empty();

    $('#grid-unten').append('<div></div>')
    var tmp;

    if (arr.length === 0) {
      tmp.text('Keine Buchung vorhanden');
      return;
    }

    tmp = '<table id="tabelle"><tr>';
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
    BenutzerID: sessionStorage.getItem('matrikelNr')
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
    $('#grid-unten').append('<div></div>')
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
}

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
      meineBuchungen();
    }).fail(function (xhr) {
      console.log('Die Stornierung des Termins war nicht erfolgreich!');

    });
  });
}

function impressum() {
  $('#grid-unten').empty();
  $('#loginArea').empty();

  // disable default event
  event.preventDefault();

  var meinString = `

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


  $('#grid-unten').append('<div></div>');
  $('#grid-unten').append(meinString);

  $('#loginArea').append('<div></div>');
  $('#loginArea').append(meinString);

}

function aboutUs() {
  $('#grid-unten').empty();
  $('#loginArea').empty();

  // disable default event
  event.preventDefault();

  var meinString = `
        <div class="textarea">
        <h1 id="textarea-h1">Unsere Gründergeschichte</h1>
        
          <p>
            Ein kalter Herbstabend in der kleinen Hochschulstadt, 
            wo die Blätter in den Farben des Sonnenuntergangs leuchteten, 
            bildete den perfekten Hintergrund für den Beginn unserer gemeinsamen Reise. 
            Vier Studenten, jeder mit seiner einzigartigen Perspektive und Expertise, 
            kamen zusammen und legten den Grundstein für das, was bald zu 
            einem aufregenden Unterfangen werden sollte.
            </p>

          <p>
            Unsere Geschichte begann in einem kleinen Seminarraum, 
            in dem wir uns im Rahmen eines gemeinsamen Projekts für unser Studium der IT-Security und Wirtschaftsinformatik zusammenfanden. 
            Zwischen Codezeilen und Datenbanken entdeckten wir eine gemeinsame Leidenschaft für innovative Lösungen und die Verbindung von Technologie und Geschäft.
          </p>

          <p>
            Eines Tages, als wir gemeinsam über die Herausforderungen im Hochschulalltag sprachen, 
            stolperten wir über ein scheinbar einfaches, aber sehr reales Problem: Die Reservierung von Räumen an der Hochschule war ein zeitraubender und oft verwirrender Prozess.
            Dies war der Moment, in dem die Saat für unsere Geschäftsidee gelegt wurde.
          </p>

          <p>
            Wir begannen, unsere Fähigkeiten und Kenntnisse zu kombinieren. Die beiden IT-Security-Studenten brachten ihr tiefes Verständnis für Datenschutz und Sicherheit ein, 
            während die Wirtschaftsinformatik-Studenten ihre Fähigkeiten in den Bereichen Geschäftsanalyse und Management einsetzten. 
            Gemeinsam wagten wir uns in die Welt der Startup-Unternehmen.
          </p>

          <p>
            In den nächsten Monaten arbeiteten wir unermüdlich an unserer Idee, verfeinerten das Konzept, 
            erstellten Prototypen und präsentierten unser Projekt in verschiedenen Hochschulkursen. 
            Das Feedback war positiv, aber wir waren uns bewusst, dass der Weg von einer Idee zu einem erfolgreichen Unternehmen steinig sein würde.
          </p>

          <p>
            Die nächste Etappe unserer Reise führte uns zu branchenrelevanten Veranstaltungen und Networking-Events, 
            wo wir unser Projekt vorstellten und wertvolle Einblicke von Branchenexperten erhielten. 
            Jeder von uns trug dazu bei, das Unternehmen voranzutreiben, sei es durch die Verbesserung der Benutzeroberfläche, 
            das Hinzufügen von Sicherheitsfunktionen oder das Entwickeln einer nachhaltigen Geschäftsstrategie.
          </p>

          <p>
            Unsere harte Arbeit zahlte sich aus, als wir schließlich die Finanzierung für unser Startup sicherten. 
            Mit einem gemischten Gefühl von Aufregung und Nervosität starteten wir unsere Plattform zur Raumreservierung. 
            Die ersten Monate waren von intensiver Kundenbetreuung, ständiger Verbesserung der Plattform und dem Anpassen an die Dynamik des Marktes geprägt.
          </p>

          <p>
            Mit der Zeit gewannen wir das Vertrauen unserer Nutzer und erweiterten unsere Dienstleistungen. 
            Das einfache Projekt aus dem Studium entwickelte sich zu einem vielversprechenden Unternehmen, das die Art und Weise, wie Menschen Räume buchen, revolutionierte.
          </p>

          <p>
            Die Reise war nicht ohne Herausforderungen, aber unsere gemeinsame Entschlossenheit, gepaart mit der einzigartigen Mischung unserer Fähigkeiten, trieb uns voran. 
            Heute blicken wir stolz auf das, was wir erreicht haben, aber unsere Geschichte ist noch nicht zu Ende.
            Mit jedem Tag lernen wir dazu, wachsen weiter und setzen unsere Leidenschaft dafür ein, die Raumbuchung so einfach wie möglich zu gestalten.
          </p>

          <p>
            Unsere Gründergeschichte ist eine Ode an die Zusammenarbeit, den Glauben an Innovation und die Kraft einer Idee, 
            die in einem kleinen Seminarraum an der Hochschule entstand und zu einem erfolgreichen Unternehmen heranwuchs.
          </p>
      </div>
`;


$('#grid-unten').append('<div></div>');
$('#grid-unten').append(meinString);

$('#loginArea').append('<div></div>');
$('#loginArea').append(meinString);
  

}

function kontakt() {
  $('#grid-unten').empty();
  $('#loginArea').empty();

  // disable default event
  event.preventDefault();

  var meinString = `
  <div class="textarea">
  <h1 id="textarea-h1">Kontaktieren Sie uns</h1>
    <p>Wir freuen uns, von Ihnen zu hören. Nutzen Sie eine der folgenden Methoden, um mit uns in Kontakt zu treten:</p>

    <h2>Kontaktinformationen</h2>

    <ul>
        <li>Telefon: +49 123 456 789</li>
        <li>E-Mail: <a href="mailto:reserveit.email@example.com" style="color: rgba(0, 0, 0, 0.648); ">reserve-itt@example.com</a></li>
        <li>Adresse: Musterstraße 33, 72458 Albstadt-Ebingen</li>
    </ul>

    <h2>Kontaktformular</h2>

    <p>Füllen Sie das untenstehende Formular aus, um uns direkt eine Nachricht zu senden:</p>

    <form id="kontaktformular">

      <label for="name">Vor- und Nachname:</label>
      <div>
          <input type="name" required id="kontaktname" name="name" class="shortInputKontaktformular">
      </div><br>

      <label for="email">E-Mail:</label>
      <div>
          <input type="email" required id="kontaktemail" name="email" class="shortInputKontaktformular">
      </div><br>

      <label for="description">Nachricht:</label>
      <div>
          <textarea name="description" id="kontaktnachricht" class="s8hortInputKontaktformular"></textarea>
      </div>

      <div id="kontaktformularAbesenden">
          <input type="submit" id="submitButtonKontaktformular" value="Absenden" class="button">
      </div>
  </form>


<p>Vielen Dank für Ihr Interesse an unserer Raumreservierungsplattform!</p>
`;


  
$('#grid-unten').append('<div></div>');
$('#grid-unten').append(meinString);

$('#loginArea').append('<div></div>');
$('#loginArea').append(meinString);

}

function datenschutz() {
  $('#grid-unten').empty();
  $('#loginArea').empty();

  // disable default event
  event.preventDefault();

  var meinString = `
      <div class="textarea">
      <h1 id="textarea-h1">Datenschutz</h1>
        <p>Stand: 3. November 2023</p>
        <h2>Inhaltsübersicht</h2>
        <ul class="index">
            <li><a class="index-link" href="#m3">Verantwortlicher</a></li>
            <li><a class="index-link" href="#mOverview">Übersicht der Verarbeitungen</a></li>
            <li><a class="index-link" href="#m2427">Maßgebliche Rechtsgrundlagen</a></li>
            <li><a class="index-link" href="#m27">Sicherheitsmaßnahmen</a></li>
            <li><a class="index-link" href="#m25">Übermittlung von personenbezogenen Daten</a></li>
            <li><a class="index-link" href="#m24">Internationale Datentransfers</a></li>
            <li><a class="index-link" href="#m10">Rechte der betroffenen Personen</a></li>
            <li><a class="index-link" href="#m134">Einsatz von Cookies</a></li>
            <li><a class="index-link" href="#m225">Bereitstellung des Onlineangebotes und Webhosting</a></li>
            <li><a class="index-link" href="#m182">Kontakt- und Anfragenverwaltung</a></li>
        </ul>
        <h2 id="m3">Verantwortlicher: Shetland Sheepdog</h2>
        <h2 id="mOverview">Übersicht der Verarbeitungen</h2>
        <p>Die nachfolgende Übersicht fasst die Arten der verarbeiteten Daten und die Zwecke ihrer Verarbeitung zusammen und
            verweist auf die betroffenen Personen.</p>
        <h3>Arten der verarbeiteten Daten</h3>
        <ul>
            <li>Kontaktdaten.</li>
            <li>Inhaltsdaten.</li>
            <li>Nutzungsdaten.</li>
            <li>Meta-, Kommunikations- und Verfahrensdaten.</li>
        </ul>
        <h3>Kategorien betroffener Personen</h3>
        <ul>
            <li>Kommunikationspartner.</li>
            <li>Nutzer.</li>
        </ul>
        <h3>Zwecke der Verarbeitung</h3>
        <ul>
            <li>Kontaktanfragen und Kommunikation.</li>
            <li>Sicherheitsmaßnahmen.</li>
            <li>Verwaltung und Beantwortung von Anfragen.</li>
            <li>Feedback.</li>
            <li>Bereitstellung unseres Onlineangebotes und Nutzerfreundlichkeit.</li>
            <li>Informationstechnische Infrastruktur.</li>
        </ul>
        <h2 id="m2427">Maßgebliche Rechtsgrundlagen</h2>
        <p><strong>Maßgebliche Rechtsgrundlagen nach der DSGVO: </strong>Im Folgenden erhalten Sie eine Übersicht der
            Rechtsgrundlagen der DSGVO, auf deren Basis wir personenbezogene Daten verarbeiten. Bitte nehmen Sie zur
            Kenntnis,
            dass neben den Regelungen der DSGVO nationale Datenschutzvorgaben in Ihrem bzw. unserem Wohn- oder Sitzland
            gelten
            können. Sollten ferner im Einzelfall speziellere Rechtsgrundlagen maßgeblich sein, teilen wir Ihnen diese in der
            Datenschutzerklärung mit.</p>
        <ul>
            <li><strong>Einwilligung (Art. 6 Abs. 1 S. 1 lit. a) DSGVO)</strong> - Die betroffene Person hat ihre
                Einwilligung
                in die Verarbeitung der sie betreffenden personenbezogenen Daten für einen spezifischen Zweck oder mehrere
                bestimmte Zwecke gegeben.</li>
            <li><strong>Vertragserfüllung und vorvertragliche Anfragen (Art. 6 Abs. 1 S. 1 lit. b) DSGVO)</strong> - Die
                Verarbeitung ist für die Erfüllung eines Vertrags, dessen Vertragspartei die betroffene Person ist, oder zur
                Durchführung vorvertraglicher Maßnahmen erforderlich, die auf Anfrage der betroffenen Person erfolgen.</li>
            <li><strong>Berechtigte Interessen (Art. 6 Abs. 1 S. 1 lit. f) DSGVO)</strong> - Die Verarbeitung ist zur
                Wahrung
                der berechtigten Interessen des Verantwortlichen oder eines Dritten erforderlich, sofern nicht die
                Interessen
                oder Grundrechte und Grundfreiheiten der betroffenen Person, die den Schutz personenbezogener Daten
                erfordern,
                überwiegen.</li>
        </ul>
        <p><strong>Nationale Datenschutzregelungen in Deutschland: </strong>Zusätzlich zu den Datenschutzregelungen der
            DSGVO
            gelten nationale Regelungen zum Datenschutz in Deutschland. Hierzu gehört insbesondere das Gesetz zum Schutz vor
            Missbrauch personenbezogener Daten bei der Datenverarbeitung (Bundesdatenschutzgesetz – BDSG). Das BDSG enthält
            insbesondere Spezialregelungen zum Recht auf Auskunft, zum Recht auf Löschung, zum Widerspruchsrecht, zur
            Verarbeitung besonderer Kategorien personenbezogener Daten, zur Verarbeitung für andere Zwecke und zur
            Übermittlung
            sowie automatisierten Entscheidungsfindung im Einzelfall einschließlich Profiling. Ferner können
            Landesdatenschutzgesetze der einzelnen Bundesländer zur Anwendung gelangen.</p>
        <p><strong>Hinweis auf Geltung DSGVO und Schweizer DSG: </strong>Diese Datenschutzhinweise dienen sowohl der
            Informationserteilung nach dem schweizerischen Bundesgesetz über den Datenschutz (Schweizer DSG) als auch nach
            der
            Datenschutzgrundverordnung (DSGVO). Aus diesem Grund bitten wir Sie zu beachten, dass aufgrund der breiteren
            räumlichen Anwendung und Verständlichkeit die Begriffe der DSGVO verwendet werden. Insbesondere statt der im
            Schweizer DSG verwendeten Begriffe „Bearbeitung" von „Personendaten", "überwiegendes Interesse" und "besonders
            schützenswerte Personendaten" werden die in der DSGVO verwendeten Begriffe „Verarbeitung" von „personenbezogenen
            Daten" sowie "berechtigtes Interesse" und "besondere Kategorien von Daten" verwendet. Die gesetzliche Bedeutung
            der
            Begriffe wird jedoch im Rahmen der Geltung des Schweizer DSG weiterhin nach dem Schweizer DSG bestimmt.</p>

        <h2 id="m27">Sicherheitsmaßnahmen</h2>
        <p>Wir treffen nach Maßgabe der gesetzlichen Vorgaben unter Berücksichtigung des Stands der Technik, der
            Implementierungskosten und der Art, des Umfangs, der Umstände und der Zwecke der Verarbeitung sowie der
            unterschiedlichen Eintrittswahrscheinlichkeiten und des Ausmaßes der Bedrohung der Rechte und Freiheiten
            natürlicher
            Personen geeignete technische und organisatorische Maßnahmen, um ein dem Risiko angemessenes Schutzniveau zu
            gewährleisten.</p>
        <p>Zu den Maßnahmen gehören insbesondere die Sicherung der Vertraulichkeit, Integrität und Verfügbarkeit von Daten
            durch
            Kontrolle des physischen und elektronischen Zugangs zu den Daten als auch des sie betreffenden Zugriffs, der
            Eingabe, der Weitergabe, der Sicherung der Verfügbarkeit und ihrer Trennung. Des Weiteren haben wir Verfahren
            eingerichtet, die eine Wahrnehmung von Betroffenenrechten, die Löschung von Daten und Reaktionen auf die
            Gefährdung
            der Daten gewährleisten. Ferner berücksichtigen wir den Schutz personenbezogener Daten bereits bei der
            Entwicklung
            bzw. Auswahl von Hardware, Software sowie Verfahren entsprechend dem Prinzip des Datenschutzes, durch
            Technikgestaltung und durch datenschutzfreundliche Voreinstellungen.</p>

        <h2 id="m25">Übermittlung von personenbezogenen Daten</h2>
        <p>Im Rahmen unserer Verarbeitung von personenbezogenen Daten kommt es vor, dass die Daten an andere Stellen,
            Unternehmen, rechtlich selbstständige Organisationseinheiten oder Personen übermittelt oder sie ihnen gegenüber
            offengelegt werden. Zu den Empfängern dieser Daten können z. B. mit IT-Aufgaben beauftragte Dienstleister oder
            Anbieter von Diensten und Inhalten, die in eine Webseite eingebunden werden, gehören. In solchen Fällen beachten
            wir
            die gesetzlichen Vorgaben und schließen insbesondere entsprechende Verträge bzw. Vereinbarungen, die dem Schutz
            Ihrer Daten dienen, mit den Empfängern Ihrer Daten ab.</p>

        <h2 id="m24">Internationale Datentransfers</h2>
        <p>Datenverarbeitung in Drittländern: Sofern wir Daten in einem Drittland (d. h., außerhalb der Europäischen Union
            (EU),
            des Europäischen Wirtschaftsraums (EWR)) verarbeiten oder die Verarbeitung im Rahmen der Inanspruchnahme von
            Diensten Dritter oder der Offenlegung bzw. Übermittlung von Daten an andere Personen, Stellen oder Unternehmen
            stattfindet, erfolgt dies nur im Einklang mit den gesetzlichen Vorgaben. Sofern das Datenschutzniveau in dem
            Drittland mittels eines Angemessenheitsbeschlusses anerkannt wurde (Art. 45 DSGVO), dient dieser als Grundlage
            des
            Datentransfers. Im Übrigen erfolgen Datentransfers nur dann, wenn das Datenschutzniveau anderweitig gesichert
            ist,
            insbesondere durch Standardvertragsklauseln (Art. 46 Abs. 2 lit. c) DSGVO), ausdrückliche Einwilligung oder im
            Fall
            vertraglicher oder gesetzlich erforderlicher Übermittlung (Art. 49 Abs. 1 DSGVO). Im Übrigen teilen wir Ihnen
            die
            Grundlagen der Drittlandübermittlung bei den einzelnen Anbietern aus dem Drittland mit, wobei die
            Angemessenheitsbeschlüsse als Grundlagen vorrangig gelten. Informationen zu Drittlandtransfers und vorliegenden
            Angemessenheitsbeschlüssen können dem Informationsangebot der EU-Kommission entnommen werden: <a
                href="https://ec.europa.eu/info/law/law-topic/data-protection/international-dimension-data-protection_de"
                target="_blank">https://ec.europa.eu/info/law/law-topic/data-protection/international-dimension-data-protection_de.</a>
        </p>
        <p>EU-US Trans-Atlantic Data Privacy Framework: Im Rahmen des sogenannten „Data Privacy Framework" (DPF) hat die
            EU-Kommission das Datenschutzniveau ebenfalls für bestimmte Unternehmen aus den USA im Rahmen der
            Angemessenheitsbeschlusses vom 10.07.2023 als sicher anerkannt. Die Liste der zertifizierten Unternehmen als
            auch
            weitere Informationen zu dem DPF können Sie der Webseite des Handelsministeriums der USA unter <a
                href="https://www.dataprivacyframework.gov/" target="_blank">https://www.dataprivacyframework.gov/</a> (in
            Englisch) entnehmen. Wir informieren Sie im Rahmen der Datenschutzhinweise, welche von uns eingesetzten
            Diensteanbieter unter dem Data Privacy Framework zertifiziert sind.</p>

        <h2 id="m10">Rechte der betroffenen Personen</h2>
        <p>Rechte der betroffenen Personen aus der DSGVO: Ihnen stehen als Betroffene nach der DSGVO verschiedene Rechte zu,
            die
            sich insbesondere aus Art. 15 bis 21 DSGVO ergeben:</p>
        <ul>
            <li><strong>Widerspruchsrecht: Sie haben das Recht, aus Gründen, die sich aus Ihrer besonderen Situation
                    ergeben,
                    jederzeit gegen die Verarbeitung der Sie betreffenden personenbezogenen Daten, die aufgrund von Art. 6
                    Abs.
                    1 lit. e oder f DSGVO erfolgt, Widerspruch einzulegen; dies gilt auch für ein auf diese Bestimmungen
                    gestütztes Profiling. Werden die Sie betreffenden personenbezogenen Daten verarbeitet, um Direktwerbung
                    zu
                    betreiben, haben Sie das Recht, jederzeit Widerspruch gegen die Verarbeitung der Sie betreffenden
                    personenbezogenen Daten zum Zwecke derartiger Werbung einzulegen; dies gilt auch für das Profiling,
                    soweit
                    es mit solcher Direktwerbung in Verbindung steht.</strong></li>
            <li><strong>Widerrufsrecht bei Einwilligungen:</strong> Sie haben das Recht, erteilte Einwilligungen jederzeit
                zu
                widerrufen.</li>
            <li><strong>Auskunftsrecht:</strong> Sie haben das Recht, eine Bestätigung darüber zu verlangen, ob betreffende
                Daten verarbeitet werden und auf Auskunft über diese Daten sowie auf weitere Informationen und Kopie der
                Daten
                entsprechend den gesetzlichen Vorgaben.</li>
            <li><strong>Recht auf Berichtigung:</strong> Sie haben entsprechend den gesetzlichen Vorgaben das Recht, die
                Vervollständigung der Sie betreffenden Daten oder die Berichtigung der Sie betreffenden unrichtigen Daten zu
                verlangen.</li>
            <li><strong>Recht auf Löschung und Einschränkung der Verarbeitung:</strong> Sie haben nach Maßgabe der
                gesetzlichen
                Vorgaben das Recht, zu verlangen, dass Sie betreffende Daten unverzüglich gelöscht werden, bzw. alternativ
                nach
                Maßgabe der gesetzlichen Vorgaben eine Einschränkung der Verarbeitung der Daten zu verlangen.</li>
            <li><strong>Recht auf Datenübertragbarkeit:</strong> Sie haben das Recht, Sie betreffende Daten, die Sie uns
                bereitgestellt haben, nach Maßgabe der gesetzlichen Vorgaben in einem strukturierten, gängigen und
                maschinenlesbaren Format zu erhalten oder deren Übermittlung an einen anderen Verantwortlichen zu fordern.
            </li>
            <li><strong>Beschwerde bei Aufsichtsbehörde:</strong> Sie haben unbeschadet eines anderweitigen
                verwaltungsrechtlichen oder gerichtlichen Rechtsbehelfs das Recht auf Beschwerde bei einer Aufsichtsbehörde,
                insbesondere in dem Mitgliedstaat ihres gewöhnlichen Aufenthaltsorts, ihres Arbeitsplatzes oder des Orts des
                mutmaßlichen Verstoßes, wenn Sie der Ansicht sind, dass die Verarbeitung der Sie betreffenden
                personenbezogenen
                Daten gegen die Vorgaben der DSGVO verstößt.</li>
        </ul>

        <h2 id="m134">Einsatz von Cookies</h2>
        <p>Cookies sind kleine Textdateien, bzw. sonstige Speichervermerke, die Informationen auf Endgeräten speichern und
            Informationen aus den Endgeräten auslesen. Z. B. um den Login-Status in einem Nutzerkonto, einen Warenkorbinhalt
            in
            einem E-Shop, die aufgerufenen Inhalte oder verwendete Funktionen eines Onlineangebotes speichern. Cookies
            können
            ferner zu unterschiedlichen Zwecken eingesetzt werden, z. B. zu Zwecken der Funktionsfähigkeit, Sicherheit und
            Komfort von Onlineangeboten sowie der Erstellung von Analysen der Besucherströme. </p>
        <p><strong>Hinweise zur Einwilligung: </strong>Wir setzen Cookies im Einklang mit den gesetzlichen Vorschriften ein.
            Daher holen wir von den Nutzern eine vorhergehende Einwilligung ein, außer wenn diese gesetzlich nicht gefordert
            ist. Eine Einwilligung ist insbesondere nicht notwendig, wenn das Speichern und das Auslesen der Informationen,
            also
            auch von Cookies, unbedingt erforderlich sind, um dem den Nutzern einen von ihnen ausdrücklich gewünschten
            Telemediendienst (also unser Onlineangebot) zur Verfügung zu stellen. Zu den unbedingt erforderlichen Cookies
            gehören in der Regel Cookies mit Funktionen, die der Anzeige und Lauffähigkeit des Onlineangebotes , dem
            Lastausgleich, der Sicherheit, der Speicherung der Präferenzen und Auswahlmöglichkeiten der Nutzer oder
            ähnlichen
            mit der Bereitstellung der Haupt- und Nebenfunktionen des von den Nutzern angeforderten Onlineangebotes
            zusammenhängenden Zwecken dienen. Die widerrufliche Einwilligung wird gegenüber den Nutzern deutlich
            kommuniziert
            und enthält die Informationen zu der jeweiligen Cookie-Nutzung.</p>
        <p><strong>Hinweise zu datenschutzrechtlichen Rechtsgrundlagen: </strong>Auf welcher datenschutzrechtlichen
            Rechtsgrundlage wir die personenbezogenen Daten der Nutzer mit Hilfe von Cookies verarbeiten, hängt davon ab, ob
            wir
            Nutzer um eine Einwilligung bitten. Falls die Nutzer einwilligen, ist die Rechtsgrundlage der Verarbeitung Ihrer
            Daten die erklärte Einwilligung. Andernfalls werden die mithilfe von Cookies verarbeiteten Daten auf Grundlage
            unserer berechtigten Interessen (z. B. an einem betriebswirtschaftlichen Betrieb unseres Onlineangebotes und
            Verbesserung seiner Nutzbarkeit) verarbeitet oder, wenn dies im Rahmen der Erfüllung unserer vertraglichen
            Pflichten
            erfolgt, wenn der Einsatz von Cookies erforderlich ist, um unsere vertraglichen Verpflichtungen zu erfüllen. Zu
            welchen Zwecken die Cookies von uns verarbeitet werden, darüber klären wir im Laufe dieser Datenschutzerklärung
            oder
            im Rahmen von unseren Einwilligungs- und Verarbeitungsprozessen auf.</p>
        <p><strong>Speicherdauer: </strong>Im Hinblick auf die Speicherdauer werden die folgenden Arten von Cookies
            unterschieden:</p>
        <ul>
            <li><strong>Temporäre Cookies (auch: Session- oder Sitzungs-Cookies):</strong> Temporäre Cookies werden
                spätestens
                gelöscht, nachdem ein Nutzer ein Online-Angebot verlassen und sein Endgerät (z. B. Browser oder mobile
                Applikation) geschlossen hat.</li>
            <li><strong>Permanente Cookies:</strong> Permanente Cookies bleiben auch nach dem Schließen des Endgerätes
                gespeichert. So können beispielsweise der Login-Status gespeichert oder bevorzugte Inhalte direkt angezeigt
                werden, wenn der Nutzer eine Website erneut besucht. Ebenso können die mit Hilfe von Cookies erhobenen Daten
                der
                Nutzer zur Reichweitenmessung verwendet werden. Sofern wir Nutzern keine expliziten Angaben zur Art und
                Speicherdauer von Cookies mitteilen (z. B. im Rahmen der Einholung der Einwilligung), sollten Nutzer davon
                ausgehen, dass Cookies permanent sind und die Speicherdauer bis zu zwei Jahre betragen kann.</li>
        </ul>
        <p><strong>Allgemeine Hinweise zum Widerruf und Widerspruch (sog. "Opt-Out"): </strong>Nutzer können die von ihnen
            abgegebenen Einwilligungen jederzeit widerrufen und der Verarbeitung entsprechend den gesetzlichen Vorgaben
            widersprechen. Hierzu können Nutzer unter anderem die Verwendung von Cookies in den Einstellungen ihres Browsers
            einschränken (wobei dadurch auch die Funktionalität unseres Onlineangebotes eingeschränkt sein kann). Ein
            Widerspruch gegen die Verwendung von Cookies zu Online-Marketing-Zwecken kann auch über die Websites <a
                href="https://optout.aboutads.info/" target="_new">https://optout.aboutads.info</a> und <a
                href="https://www.youronlinechoices.com/" target="_new">https://www.youronlinechoices.com/</a> erklärt
            werden.
        </p>
        <ul class="m-elements">
            <li class=""><strong>Rechtsgrundlagen:</strong> Berechtigte Interessen (Art. 6 Abs. 1 S. 1 lit. f) DSGVO).
                Einwilligung (Art. 6 Abs. 1 S. 1 lit. a) DSGVO).</li>
        </ul>
        <p><strong>Weitere Hinweise zu Verarbeitungsprozessen, Verfahren und Diensten:</strong></p>
        <ul class="m-elements">
            <li><strong>Verarbeitung von Cookie-Daten auf Grundlage einer Einwilligung: </strong>Wir setzen ein Verfahren
                zum
                Cookie-Einwilligungs-Management ein, in dessen Rahmen die Einwilligungen der Nutzer in den Einsatz von
                Cookies,
                bzw. der im Rahmen des Cookie-Einwilligungs-Management-Verfahrens genannten Verarbeitungen und Anbieter
                eingeholt sowie von den Nutzern verwaltet und widerrufen werden können. Hierbei wird die
                Einwilligungserklärung
                gespeichert, um deren Abfrage nicht erneut wiederholen zu müssen und die Einwilligung entsprechend der
                gesetzlichen Verpflichtung nachweisen zu können. Die Speicherung kann serverseitig und/oder in einem Cookie
                (sogenanntes Opt-In-Cookie, bzw. mithilfe vergleichbarer Technologien) erfolgen, um die Einwilligung einem
                Nutzer, bzw. dessen Gerät zuordnen zu können. Vorbehaltlich individueller Angaben zu den Anbietern von
                Cookie-Management-Diensten, gelten die folgenden Hinweise: Die Dauer der Speicherung der Einwilligung kann
                bis
                zu zwei Jahren betragen. Hierbei wird ein pseudonymer Nutzer-Identifikator gebildet und mit dem Zeitpunkt
                der
                Einwilligung, Angaben zur Reichweite der Einwilligung (z. B. welche Kategorien von Cookies und/oder
                Diensteanbieter) sowie dem Browser, System und verwendeten Endgerät gespeichert; <span
                    class=""><strong>Rechtsgrundlagen:</strong> Einwilligung (Art. 6 Abs. 1 S. 1 lit. a) DSGVO).</span></li>
        </ul>
        <h2 id="m225">Bereitstellung des Onlineangebotes und Webhosting</h2>
        <p>Wir verarbeiten die Daten der Nutzer, um ihnen unsere Online-Dienste zur Verfügung stellen zu können. Zu diesem
            Zweck
            verarbeiten wir die IP-Adresse des Nutzers, die notwendig ist, um die Inhalte und Funktionen unserer
            Online-Dienste
            an den Browser oder das Endgerät der Nutzer zu übermitteln.</p>
        <ul class="m-elements">
            <li><strong>Verarbeitete Datenarten:</strong> Nutzungsdaten (z. B. besuchte Webseiten, Interesse an Inhalten,
                Zugriffszeiten); Meta-, Kommunikations- und Verfahrensdaten (z. .B. IP-Adressen, Zeitangaben,
                Identifikationsnummern, Einwilligungsstatus).</li>
            <li><strong>Betroffene Personen:</strong> Nutzer (z. .B. Webseitenbesucher, Nutzer von Onlinediensten).</li>
            <li><strong>Zwecke der Verarbeitung:</strong> Bereitstellung unseres Onlineangebotes und Nutzerfreundlichkeit;
                Informationstechnische Infrastruktur (Betrieb und Bereitstellung von Informationssystemen und technischen
                Geräten (Computer, Server etc.).). Sicherheitsmaßnahmen.</li>
            <li class=""><strong>Rechtsgrundlagen:</strong> Berechtigte Interessen (Art. 6 Abs. 1 S. 1 lit. f) DSGVO).</li>
        </ul>
        <p><strong>Weitere Hinweise zu Verarbeitungsprozessen, Verfahren und Diensten:</strong></p>
        <ul class="m-elements">
            <li><strong>Erhebung von Zugriffsdaten und Logfiles: </strong>Der Zugriff auf unser Onlineangebot wird in Form
                von
                so genannten "Server-Logfiles" protokolliert. Zu den Serverlogfiles können die Adresse und Name der
                abgerufenen
                Webseiten und Dateien, Datum und Uhrzeit des Abrufs, übertragene Datenmengen, Meldung über erfolgreichen
                Abruf,
                Browsertyp nebst Version, das Betriebssystem des Nutzers, Referrer URL (die zuvor besuchte Seite) und im
                Regelfall IP-Adressen und der anfragende Provider gehören. Die Serverlogfiles können zum einen zu Zwecken
                der
                Sicherheit eingesetzt werden, z. B., um eine Überlastung der Server zu vermeiden (insbesondere im Fall von
                missbräuchlichen Angriffen, sogenannten DDoS-Attacken) und zum anderen, um die Auslastung der Server und
                ihre
                Stabilität sicherzustellen; <span class=""><strong>Rechtsgrundlagen:</strong> Berechtigte Interessen (Art. 6
                    Abs. 1 S. 1 lit. f) DSGVO). </span><strong>Löschung von Daten:</strong> Logfile-Informationen werden für
                die
                Dauer von maximal 30 Tagen gespeichert und danach gelöscht oder anonymisiert. Daten, deren weitere
                Aufbewahrung
                zu Beweiszwecken erforderlich ist, sind bis zur endgültigen Klärung des jeweiligen Vorfalls von der Löschung
                ausgenommen.</li>
        </ul>
        <h2 id="m182">Kontakt- und Anfragenverwaltung</h2>
        <p>Bei der Kontaktaufnahme mit uns (z. B. per Post, Kontaktformular, E-Mail, Telefon oder via soziale Medien) sowie
            im
            Rahmen bestehender Nutzer- und Geschäftsbeziehungen werden die Angaben der anfragenden Personen verarbeitet
            soweit
            dies zur Beantwortung der Kontaktanfragen und etwaiger angefragter Maßnahmen erforderlich ist.</p>
        <ul class="m-elements">
            <li><strong>Verarbeitete Datenarten:</strong> Kontaktdaten (z. B. E-Mail, Telefonnummern); Inhaltsdaten (z. B.
                Eingaben in Onlineformularen); Nutzungsdaten (z. B. besuchte Webseiten, Interesse an Inhalten,
                Zugriffszeiten);
                Meta-, Kommunikations- und Verfahrensdaten (z. .B. IP-Adressen, Zeitangaben, Identifikationsnummern,
                Einwilligungsstatus).</li>
            <li><strong>Betroffene Personen:</strong> Kommunikationspartner.</li>
            <li><strong>Zwecke der Verarbeitung:</strong> Kontaktanfragen und Kommunikation; Verwaltung und Beantwortung von
                Anfragen; Feedback (z. B. Sammeln von Feedback via Online-Formular). Bereitstellung unseres Onlineangebotes
                und
                Nutzerfreundlichkeit.</li>
            <li class=""><strong>Rechtsgrundlagen:</strong> Berechtigte Interessen (Art. 6 Abs. 1 S. 1 lit. f) DSGVO).
                Vertragserfüllung und vorvertragliche Anfragen (Art. 6 Abs. 1 S. 1 lit. b) DSGVO).</li>
        </ul>
        <p><strong>Weitere Hinweise zu Verarbeitungsprozessen, Verfahren und Diensten:</strong></p>
        <ul class="m-elements">
            <li><strong>Kontaktformular: </strong>Wenn Nutzer über unser Kontaktformular, E-Mail oder andere
                Kommunikationswege
                mit uns in Kontakt treten, verarbeiten wir die uns in diesem Zusammenhang mitgeteilten Daten zur Bearbeitung
                des
                mitgeteilten Anliegens; <span class=""><strong>Rechtsgrundlagen:</strong> Vertragserfüllung und
                    vorvertragliche
                    Anfragen (Art. 6 Abs. 1 S. 1 lit. b) DSGVO), Berechtigte Interessen (Art. 6 Abs. 1 S. 1 lit. f)
                    DSGVO).</span></li>
        </ul>


      </div>
`;


  
$('#grid-unten').append('<div></div>');
$('#grid-unten').append(meinString);

$('#loginArea').append('<div></div>');
$('#loginArea').append(meinString);

}

function agb() {
  $('#grid-unten').empty();
  $('#loginArea').empty();

  // disable default event
  event.preventDefault();

  var meinString = `
  <div class="textarea">
        <h1 id="textarea-h1">Allgemeine Geschäftsbedingungen</h1>
          <strong>1. Geltungsbereich</strong><br>
          <p>Diese Allgemeinen Geschäftsbedingungen (nachfolgend "AGB") gelten für die Nutzung der Raumreservierungsplattform (nachfolgend "Plattform"). Die Plattform wird betrieben von [Dein Unternehmen], nachfolgend "Anbieter" genannt. </p><br>
          <strong>2. Registrierung und Anmeldung</strong><br>
          <p>(a) Die Nutzung der Plattform erfordert eine Registrierung. Der Nutzer verpflichtet sich, genaue und aktuelle Informationen während des Registrierungsprozesses bereitzustellen. <br></p>
          <p>(b) Die Anmeldung erfolgt mit der Matrikelnummer des Nutzers. Der Nutzer ist für die Geheimhaltung seiner Anmeldeinformationen verantwortlich. </p><br>
          <strong>3. Raumreservierung</strong><br>
          <p>(a) Die Raumreservierung erfolgt über die Plattform. Der Nutzer kann verfügbare Räume einsehen und einen Raum für einen bestimmten Zeitraum reservieren. <br></p>
          <p>(b) Die Reservierung ist verbindlich und unterliegt den auf der Plattform angegebenen Bedingungen. </p><br><br>
          <strong>4. Stornierung</strong><br>
          <p>(a) Der Nutzer kann eine Reservierung gemäß den auf der Plattform angegebenen Stornierungsbedingungen stornieren. <br></p>
          <p>(b) Bei Nichterscheinen des Nutzers ohne vorherige Stornierung können Gebühren anfallen. </p><br>
          <strong>5. Datenschutz</strong><br>
          <p>Die Erhebung und Verarbeitung personenbezogener Daten erfolgt gemäß den Datenschutzbestimmungen, die auf der Plattform einsehbar sind. </p><br>
          <strong>6. Haftungsausschluss</strong><br>
          <p>Der Anbieter übernimmt keine Gewähr für die Verfügbarkeit der Räume und haftet nicht für Schäden, die durch die Nutzung der Plattform entstehen. </p><br>
          <strong>7. Nutzungsbedingungen</strong><br>
          <p>Der Nutzer verpflichtet sich, die Plattform nur gemäß den festgelegten Nutzungsbedingungen zu verwenden. Verstöße können zur Sperrung des Nutzerkontos führen. </p><br>
          <strong>8. Änderungen der AGB</strong><br>
          <p>Der Anbieter behält sich das Recht vor, diese AGB jederzeit zu ändern. Die Nutzer werden über Änderungen informiert. </p><br>
          <strong>9. Schlussbestimmungen</strong><br>
          <p>Es gilt das Recht der Bundesrepublik Deutschland. Gerichtsstand für alle Streitigkeiten aus diesem Vertrag ist Albstadt-Ebingen. Sollte eine Bestimmung dieser AGB unwirksam sein, bleiben die übrigen Bestimmungen davon unberührt.
    </div>
`;


  
$('#grid-unten').append('<div></div>');
$('#grid-unten').append(meinString);

$('#loginArea').append('<div></div>');
$('#loginArea').append(meinString);

}


