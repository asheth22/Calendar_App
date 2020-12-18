var now = dayjs();
var container = $(".container");

setPlanner();

$(".saveBtn").on('click', function () {
    var currentEl = $(this);
    var parentIndex = parseInt(currentEl.parent().index());
    console.log("parent index on click:", parentIndex);
    var txtArea = currentEl.siblings(".description");
    localStorage.setItem(parentIndex, txtArea.val());
    console.log(txtArea.val());
})
function setPlanner() {
    $("#currentDay").text(now.format("dddd, MMMM D YYYY"));

    container.children().each(function () {
        var element = $(this);
        var index = parseInt(element.index());
        var pHourEl = element.children(".hour");
        var pHour = dayjs().hour(9 + index);
        pHour = pHour.format("h A");
        pHourEl.html(pHour);
        pHour = dayjs().hour(9 + index);
        var hour = parseInt(pHour.format("H"));
        var cHour = parseInt(dayjs().format("H"));

        console.log("current hour: ", cHour, "pHour: ", hour);
        descEl = element.children(".description");
        if (hour < cHour) {
            console.log("planner time", hour, "is less than current hour", cHour);
            descEl.addClass("past");
        }
        else if (hour === cHour) {
            console.log("planner time", hour, "is equal to current hour", cHour);
            descEl.addClass("present");
        }
        else {
            console.log("planner time", hour, "is greater to current hour", cHour);
            descEl.addClass("future");
        }
    });
}
