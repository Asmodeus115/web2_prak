import { getDayIndex, addDays, dateString} from "./CalendarHelper.js";

const MODE = {
    VIEW: 1,
    UPDATE: 2,
    CREATE: 3,
}

export class Calendar {
    constructor(){
        this.mode = MODE.VIEW;
        this.weekStart = null;
        this.weekEnd = null;
        this.weekOffset = 0; // aktueller Wochentag wird hervorgehoben
    }

    setup() {
        this.setupTimes();
        this.setupDays();
        this.calculateCurrentWeek(); /* Funktion um die Woche zu berechnen */
        this.showWeek();
        this.setupControls();
    }

    setupTimes() {
        const header = $("<div></div>").addClass("columnHeader");
        const slots = $("<div></div>").addClass("slots");
        for (let hour = 7; hour < 19; hour++) {
            $("<div></div>")
                .attr("data-hour", hour)
                .addClass("time")
                .text(`${hour}:00 - ${hour + 1}:00`)
                .appendTo(slots);
        }
        $(".dayTime").append(header).append(slots);
    }

    setupDays() {
        const cal = this;
        $(".day").each(function () {
            const dayIndex = parseInt($(this).attr("data-dayIndex"));
            const name = $(this).attr("data-name");
            const header = $("<div></div>").addClass("columnHeader").text(name);
            $("<div></div>").addClass("dayDisplay").appendTo(header);
            const slots = $("<div></div>").addClass("slots");
            $("<div></div>").addClass("dayDisplay").appendTo(header);
            for (let hour = 7; hour < 19; hour++) {
                $("<div></div>")
                    .attr("data-hour", hour)
                    .appendTo(slots)
                    .addClass("slot")
                    .click(() => cal.clickSlot(hour, dayIndex))
                    .hover(
                        () => cal.hoverOver(hour),
                        () => cal.hoverOut()
                    );
            }
            $(this).append(header).append(slots);
        });
    }
    clickSlot(hour, dayIndex) {
        if (this.mode !== MODE.VIEW) {
            return;
        }
        this.mode = MODE.CREATE;
        const start = hour.toString().padStart(2, "0") + ":00"; // damit z.B. Uhrzeit 5 zu 05 wird
        const end = hour < 23 ? (hour + 1).toString().padStart(2, "0") + ":00" : "23:59"; // 24 Uhr gibt es nicht, daher sagen wir 23:59
        const date = dateString(addDays(this.weekStart, dayIndex));
        const event = {
            start,
            end,
            date
        };
        this.openModal(event);
    }

    openModal(event) {
        $("#bookDate").val(event.date);
        $("#bookStart").val(event.start);
        $("#bookEnd").val(event.end);
        $("#bookDescription").val(event.description);
        $("#bookModal").fadeIn(200);
        $("#bookName").focus();
        $("#calendar").addClass("opaque");
        $("#bookModal").submit((e) => {
            e.preventDefault();
        })
    }

    closeModal() {
        $("#bookModal").fadeOut(200);
        $("#errors").text("");
        $("#calendar").removeClass("opaque");
        this.mode = MODE.VIEW;
    }

    hoverOver(hour) {
       $(`.time[data-hour=${hour}]`).addClass("currentTime");
    }

    hoverOut(){
        $(".time").removeClass("currentTime");
    }

    calculateCurrentWeek() {
        const now = new Date(); // damit kriegt man das aktuelle Datum
        this.weekStart = addDays(now, -getDayIndex(now)); // Damit kriegt man den Wochenstart -> aktulles datum wird mit sovielen Tagen abgezogen wie der aktuelle ist erg. = 0 => Montag
        this.weekEnd = addDays(this.weekStart, 6);
    }

    showWeek() { // Funktion zeigt aktuelle Woche an
        const options = { // datum wird passend formartiert
            month: "2-digit",
            day: "2-digit",
            year: "numeric",
        };
        $("#weekStartDisplay").text(this.weekStart.toLocaleDateString(undefined, options)); //toLocalDateString(ort, datumsformat)
        $("#weekEndDisplay").text(this.weekEnd.toLocaleDateString(undefined, options));
        for (let dayIndex=0; dayIndex < 7; dayIndex++) {    // Datum wird in den einzelnen spalten unter jedem Wochentag geschrieben
            const date = addDays(this.weekStart, dayIndex);
            const display = date.toLocaleDateString(undefined, {
                month: "2-digit",
                day: "2-digit",
            });
            $(`.day[data-dayIndex=${dayIndex}] .dayDisplay`).text(display);

        }

        if (this.weekOffset === 0) {
            this.showCurrentDay();
        } else {
            this.hideCurrentDay();
        }
    }

    setupControls() {
        $("#nextWeekBtn").click(() => this.changeWeek(1)); // wechselt vorwaerts
        $("#prevWeekBtn").click(() => this.changeWeek(-1)); // wechselt rueckwaerts
        $("#cancelButton").click(() => this.closeModal());
    }

    changeWeek(number) {
        this.weekOffset += number; // jedes mal wenn die Woche verschoben wird, wird eine nummer addiert
        this.weekStart = addDays(this.weekStart, 7 * number);
        this.weekEnd = addDays(this.weekEnd, 7 * number);
        this.showWeek(); //aktualisiert nach klick
    }

    showCurrentDay() {
        const now = new Date();
        const dayIndex = getDayIndex(now);
        $(`.day[data-dayIndex=${dayIndex}]`).addClass("currentDay");
    }

    hideCurrentDay() {
        $(".day").removeClass("currentDay");
    }
}
