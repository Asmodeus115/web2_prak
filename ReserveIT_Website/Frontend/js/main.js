
$(document).ready(function (event) {
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
    console.log('Fehler bekommen beim Laden des lageplans aus der DB!');
  });
});
