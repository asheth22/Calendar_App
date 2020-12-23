var now = dayjs();
var container = $(".container");
var txtArea = "";
var setInt;
var initTime;
var initTimeS;

setPlanner();
/* Internval function will to auto-trigger setPlanner at top of the hour */
setInt = setInterval(interval, 1000);
function interval() {
    initTime = parseInt(dayjs().format("mm"));
    initTimeS = parseInt(dayjs().format("ss"));
    var minLeft = 60 - initTime;

    if (initTime !== 0) {
        console.log("initTime: ", initTime, " ", typeof (initTime), "minLeft: ", minLeft, " ", typeof (minLeft));
    }
    else {
        console.log("Top of the hourr");
        console.log("initTime: ", initTime, "initTimeS: ", initTimeS);
        // location.reload(); 
        if (initTimeS === 0) {
            setPlanner();
        }
    }
}
/* Function to save updates made to the planner */
$(".saveBtn").on('click', function () {
    var currentEl = $(this);
    var parentIndex = parseInt(currentEl.parent().index());
    console.log("parent index on click:", parentIndex);
    txtArea = currentEl.siblings(".description");
    localStorage.setItem(parentIndex, txtArea.val());
    console.log(txtArea.val());
})
/* Initialize and update planner every hour */
function setPlanner() {

    now = dayjs();
    $("#currentDay").text(now.format("dddd, MMMM D YYYY"));

    container.children().each(function () {
        var element = $(this);
        var index = parseInt(element.index());
        var pHourEl = element.children(".hour");
        var txtEl = element.children(".description");
        console.log(txtEl);
        if (localStorage.getItem(index) !== null) {
            // txtArea(HTML) = localStorage.setItem(index);
            console.log("txtArea: ", txtEl);
            txtEl.html(localStorage.getItem(index));
        }
        var pHour = dayjs().hour(9 + index);
        pHour = pHour.format("h A");
        pHourEl.html(pHour);
        pHour = dayjs().hour(9 + index);
        var hour = parseInt(pHour.format("H"));
        var cHour = parseInt(dayjs().format("H"));

        console.log("current hour: ", cHour, "pHour: ", hour);
        descEl = element.children(".description");
        if (hour < cHour) {
            descEl.removeClass("present");
            descEl.addClass("past");
        }
        else if (hour === cHour) {
            descEl.removeClass("future");
            descEl.addClass("present");
        }
        else {
            descEl.addClass("future");
        }

        return;
    });

}
