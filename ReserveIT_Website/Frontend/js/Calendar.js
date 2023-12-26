

class WeeklyCalendar {
  constructor() {
    this.main = document.getElementById('mainCalendar');
    this.calendarArea = null;
    this.navigation = null;
    this.buchungsfenster = null;
    this.cancelButton = null;
    this.submitButton = null;
    this.currentDateElement = null;
    this.prevWeekBtn = null;
    this.nextWeekBtn = null;
    this.currentDate = new Date();
    this.times = ['07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00'];
    this.startOfWeek = null;
    this.endOfWeek = null;
    this.cellDate = null;
    this.eventDate = null;
    this.eventStartTime = null;
    this.eventEndTime = null;
    this.bookingWindowIsOpen = false; 
    window.cellPos = null;
    window.time = null;
    window.startDatum = null;
    window.endeDatum = null;
    

    this.createCalendar();
    this.updateCurrentDate();
    this.createBookingWindowElements();

    this.addEventListeners();

  }

  createCalendar() {

    this.calendarArea = document.createElement('div');
    this.calendarArea.classList.add('calendararea');

    this.navigation = document.createElement('div');
    this.navigation.id = 'navigation';

    this.prevWeekBtn = document.createElement('i');
    this.prevWeekBtn.id = 'prevWeekBtn';
    this.prevWeekBtn.innerHTML = '&#8592';
    this.navigation.appendChild(this.prevWeekBtn);

    this.currentDateElement = document.createElement('span');
    this.currentDateElement.id = 'currentDate';
    this.currentDateElement.classList.add('weekDisplay');
    this.navigation.appendChild(this.currentDateElement);

    this.nextWeekBtn = document.createElement('i');
    this.nextWeekBtn.id = 'nextWeekBtn';
    this.nextWeekBtn.innerHTML = '&#8594';
    this.navigation.appendChild(this.nextWeekBtn);

    this.calendarArea.appendChild(this.navigation);

    this.table = document.createElement('table');
    this.table.id = 'calendar'
    const thead = document.createElement('thead');
    thead.innerHTML = '<tr><th id="columnTime">Time</th>' +
      '<th class="columnDays">Mo</th><th class="columnDays">Di</th><th class="columnDays">Mi</th>' +
      '<th class="columnDays">Do</th><th class="columnDays">Fr</th><th class="columnDays">Sa</th></tr>';
    this.table.appendChild(thead);

    const tbody = document.createElement('tbody');
    this.times.forEach(time => {
      const row = document.createElement('tr');
      row.innerHTML = `<td class="time-cell">${time}</td>` +
        '<td class="day-cell"></td><td class="day-cell"></td><td class="day-cell"></td>' +
        '<td class="day-cell"></td><td class="day-cell"></td><td class="day-cell"></td>';

      row.querySelectorAll('.day-cell').forEach((cell, index) => {
        cell.addEventListener('click', () => this.cellClick(index, time));
      });

      tbody.appendChild(row);
      this.table.appendChild(tbody);
      this.calendarArea.appendChild(this.table);
    });

    //document.body.appendChild(this.calendarArea);
    this.main.appendChild(this.calendarArea);
    //this.bodyCalendar.appendBild(bookWinow)
  }

  createBookingWindowElements() {
    this.bookingForm = document.createElement('form');
    this.bookingForm.id = 'buchungsfenster';
    this.buchungsfenster = this.bookingForm;

    const bookTitle = document.createElement('h2');
    bookTitle.id = 'bookTitel';
    bookTitle.textContent = 'Raumbuchung';
    this.bookingForm.appendChild(bookTitle);

    const roomNumber = document.createElement('h4');
    roomNumber.id = "roomNumber"
    roomNumber.textContent = '';
    this.bookingForm.appendChild(roomNumber);

    const dateLabel = document.createElement('label');
    dateLabel.for = 'date';
    dateLabel.classList.add('bookDescriptor');
    dateLabel.textContent = 'Datum';
    this.bookingForm.appendChild(dateLabel);

    const dateInputDiv = document.createElement('div');
    const dateInput = document.createElement('input');
    dateInput.type = 'date';
    dateInput.required = true;
    dateInput.id = 'bookDate';
    dateInput.name = 'date';
    dateInput.classList.add('shortInput');
    dateInputDiv.appendChild(dateInput);
    this.bookingForm.appendChild(dateInputDiv);

    const timeLabel = document.createElement('label');
    timeLabel.for = 'time';
    timeLabel.classList.add('bookDescriptor');
    timeLabel.textContent = 'Zeit';
    this.bookingForm.appendChild(timeLabel);

    const timeInputDiv = document.createElement('div');
    const startTimeInput = document.createElement('input');
    startTimeInput.type = 'time';
    startTimeInput.required = true;
    startTimeInput.id = 'bookStart';
    startTimeInput.name = 'time';
    startTimeInput.classList.add('shortInput');
    timeInputDiv.appendChild(startTimeInput);

    const dash = document.createTextNode(' — ');

    const endTimeInput = document.createElement('input');
    endTimeInput.type = 'time';
    endTimeInput.required = true;
    endTimeInput.id = 'bookEnd';
    endTimeInput.name = 'time';
    endTimeInput.classList.add('shortInput');
    timeInputDiv.appendChild(dash);
    timeInputDiv.appendChild(endTimeInput);

    this.bookingForm.appendChild(timeInputDiv);

    const bookControlsDiv = document.createElement('div');
    bookControlsDiv.id = 'bookControls';

    const cancelButton = document.createElement('input');
    cancelButton.type = 'button';
    cancelButton.id = 'cancelButton';
    cancelButton.value = 'abbrechen';
    cancelButton.classList.add('button');
    bookControlsDiv.appendChild(cancelButton);

    this.cancelButton = cancelButton;

    const submitButton = document.createElement('input');
    submitButton.type = 'submit';
    submitButton.id = 'submitButton';
    submitButton.value = 'buchen';
    submitButton.classList.add('button');
    bookControlsDiv.appendChild(submitButton);
    this.submitButton = submitButton;

    this.bookingForm.appendChild(bookControlsDiv);

    //document.body.appendChild(this.bookingForm);
    this.main.appendChild(this.bookingForm);
  }

  addEventListeners() {
    this.prevWeekBtn.addEventListener('click', () => this.navigateWeek(-1));
    this.nextWeekBtn.addEventListener('click', () => this.navigateWeek(1));
    this.cancelButton.addEventListener('click', () => this.closeBookingWindow());
    this.submitButton.addEventListener('click', () => this.submitBook());

    // Ueberpruefung des Datums und der Uhrzeiten:
    const dateInput = document.getElementById('bookDate');
    dateInput.addEventListener('blur', () => this.validateDate());

    // Ueberpruefung der Startzeit nach dem Verlassen des Eingabefelds
    const startTimeInput = document.getElementById('bookStart');
    startTimeInput.addEventListener('blur', () => this.validateDate());

    // Ueberpruefung der Endzeit nach dem Verlassen des Eingabefelds
    const endTimeInput = document.getElementById('bookEnd');
    endTimeInput.addEventListener('blur', () => this.validateDate());

  }


  updateCurrentDate() {
    this.startOfWeek = new Date(this.currentDate);
    this.startOfWeek.setDate(this.currentDate.getDate() - this.currentDate.getDay() + (this.currentDate.getDay() === 0 ? -6 : 1));

    this.endOfWeek = new Date(this.startOfWeek);
    this.endOfWeek.setDate(this.startOfWeek.getDate() + 5);


    this.currentDateElement.textContent = `${this.formatDate(this.startOfWeek)} - ${this.formatDate(this.endOfWeek)}`;
    window.startDatum = `${this.formatDate(this.startOfWeek)}`;
    window.endeDatum = `${this.formatDate(this.endOfWeek)}`;


    const wochentage = document.querySelectorAll('.columnDays');
    let currentDay = this.startOfWeek;

    wochentage.forEach(day => {
      day.innerHTML = `${day.textContent.slice(0, 2)}<br><span class="currentDay">${currentDay.getDate()}.</span>`;
      currentDay.setDate(currentDay.getDate() + 1);
    });
    this.startOfWeek.setDate(this.startOfWeek.getDate() - 6);
  }


  cellClick(cellPos, time) {
    if (this.bookingWindowIsOpen == false) {
      if (time == '19:00') {
        alert("Nach 18:00 uhr können keine Buchungen mehr vorgenommen werden!");
        return;
      }
      this.cellDate = new Date(this.startOfWeek);
      this.cellDate.setDate(this.cellDate.getDate() + cellPos);
      document.getElementById('bookDate').value = this.formatBookDate(this.cellDate);
      document.getElementById('bookStart').value = time;
      const startTime = new Date(`2000-01-01 ${time}`);
      const endTime = new Date(startTime.getTime() + 60 * 60 * 1000);
      document.getElementById('bookEnd').value = this.formatTime(endTime);

      const gecklicktesDatum = new Date(`${this.formatBookDate(this.cellDate)} ${time}`);
      const datumHeute = new Date(`${this.formatBookDate(new Date)} ${new Date().getHours()}:${new Date().getMinutes()}`);
     
      if (gecklicktesDatum < datumHeute) {
        alert('Das ausgewählte Datum liegt in der Vergangenheit.\nBitte wählen Sie ein gültiges Datum.');
        return; // Verlasse die Methode, wenn das Datum ungültig ist
      }

      // für die Datenbank:
      window.cellPos = parseInt(cellPos, 10) + 1;
      var timeArray = time.split(":");
      var hours = parseInt(timeArray[0], 10);
      window.time = hours - 6;
      this.eventDate = this.formatDate(this.cellDate);
      this.eventStartTime = time;
      this.eventEndTime = this.formatTime(endTime);


      this.openBookingWindow();
    }
  }

  openBookingWindow() {
    if (this.bookingWindowIsOpen == false) {
      this.buchungsfenster.style.display = 'block';
      //document.body.style.overflow = 'hidden';
      this.bookingWindowIsOpen = true;
    }
  }

  closeBookingWindow() {
    if (this.bookingWindowIsOpen == true) {
      this.buchungsfenster.style.display = 'none';
      //document.body.style.overflow = 'auto';
      this.bookingWindowIsOpen = false;
    }
  }



  submitBook() {
  //   const confirmation = window.confirm('Buchung erfolgreich!\n\nMöchten Sie zur Übersicht Ihrer Buchungen wechseln?');

  //   // Weiterleitung zur anderen HTML-Seite, wenn der Benutzer "OK" auswählt
  //   if (confirmation) {
  //     window.location.href = './Impressum.html';
  //   }
  }

  formatDate(date) {
    const options = { year: 'numeric', month: 'numeric', day: 'numeric' };

    // Extrahiere Tag, Monat und Jahr
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Monate sind nullbasiert
    const year = date.getFullYear();

    // Gib das formatierte Datum zurück
    return `${day}.${month}.${year}`;
  }

  formatBookDate(date) {
    //const isoDate = date.toISOString().split('T')[0]; // Extrahiere das Datumteil aus dem ISO-String YYYY-MM-DD
    //return isoDate;
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return date.toLocaleDateString('de-DE', options).split('.').reverse().join('-');

  }

  formatTime(date) {
    // Diese Funktion formatiert die Uhrzeit im Format 'HH:mm'
    const options = { hour: '2-digit', minute: '2-digit' };
    return date.toLocaleTimeString('de-DE', options);
  }

  navigateWeek(offset) {
    if (this.bookingWindowIsOpen == false) {
    this.currentDate.setDate(this.currentDate.getDate() + (offset * 7));
    this.updateCurrentDate();
    }
  }

  validateDate() {
    const eingabeDatum = new Date(document.getElementById('bookDate').value);
    eingabeDatum.setHours(0, 0, 0, 0);

    const heute = new Date();
    heute.setHours(0, 0, 0, 0);
    
    const eingabeStartzeit = document.getElementById('bookStart').value;
    const eingabeEndzeit = document.getElementById('bookEnd').value;

    // Überprüfe, ob das eingegebene Datum in der Vergangenheit liegt oder ein Sonntag ist
    if (eingabeDatum < heute || eingabeDatum.getDay() === 0) {
      document.getElementById('bookDate').style.borderBottomColor = 'red';
      document.getElementById('submitButton').disabled = true; // Deaktiviere den Submit-Button
      document.getElementById('submitButton').style.backgroundColor = 'grey';
      document.getElementById('bookStart').disabled = true;
      document.getElementById('bookEnd').disabled = true;

      if (eingabeDatum.getDay() === 0){
        alert('Sonntags sind die Gebäude geschlossen.\nBitte wählen Sie ein gültiges Datum.');
      }
      else {
      alert('Das Datum liegt in der Vergangenheit.\nBitte wählen Sie ein gültiges Datum.');
      }
    }

    // Überprüfe, ob die Startzeit vor 07:00 Uhr liegt oder nach 18 Uhr
    else if (eingabeStartzeit < '07:00' || eingabeStartzeit > '18:00') {
      alert('Die Startzeit liegt außerhalb der Öffnungszeiten.\nDie früheste Startzeit liegt bei 07:00 Uhr und die späteste bei 18:00 Uhr.');
      document.getElementById('submitButton').disabled = true;
      document.getElementById('submitButton').style.backgroundColor = 'grey';

      document.getElementById('bookDate').disabled = true;
      document.getElementById('bookEnd').disabled = true;
      document.getElementById('bookStart').style.borderBottomColor = 'red';
    }
    // Überprüfe, ob die Endzeit vor 08:00 Uhr liegt oder nach 19 Uhr
    else if (eingabeEndzeit < eingabeStartzeit || eingabeEndzeit < '08:00' || eingabeEndzeit > '19:00') {
      if (eingabeEndzeit < eingabeStartzeit) {
        alert('Ungültige Zeiteingabe: Die Endzeit darf nicht kleiner als die Startzeit sein!');
      }
      else {
        alert('Die Endzeit liegt außerhalb der Öffnungszeiten.');
      }
      
      document.getElementById('submitButton').disabled = true; // Deaktiviere den Submit-Button
      document.getElementById('submitButton').style.backgroundColor = 'grey';

      document.getElementById('bookDate').disabled = true;
      document.getElementById('bookStart').disabled = true;
      document.getElementById('bookEnd').style.borderBottomColor = 'red';
    } 
    
    else {
      document.getElementById('submitButton').disabled = false; // Aktiviere den Submit-Button
      document.getElementById('submitButton').style.backgroundColor = 'var(--font-color)';
      
      document.getElementById('bookDate').style.borderBottomColor = 'var(--grid-color)';
      document.getElementById('bookDate').disabled = false;
      
      document.getElementById('bookStart').style.borderBottomColor = 'var(--grid-color)';
      document.getElementById('bookEnd').style.borderBottomColor = 'var(--grid-color)';
      document.getElementById('bookStart').disabled = false;
      document.getElementById('bookEnd').disabled = false;
      
    }
  }
}