// Wait for the DOM to be ready
document.addEventListener('DOMContentLoaded', function () {
    // Get the login form by ID
    const loginForm = document.querySelector('.form');

    // Add a submit event listener to the form
    loginForm.addEventListener('submit', function (event) {
        // Prevent the default form submission behavior
        event.preventDefault();

        // Get the values of matrikelnr and password
        const matrikelnr = document.getElementById('login__matrikelnr').value;
        const password = document.getElementById('login__password').value;


        // convert data of form to object
        var meinObjekt = {
            id: matrikelnr,
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
});
