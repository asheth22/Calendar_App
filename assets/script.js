var now = dayjs();
var container = $(".container");
var txtArea = "";

setPlanner();

$(".saveBtn").on('click', function () {
    var currentEl = $(this);
    var parentIndex = parseInt(currentEl.parent().index());
    console.log("parent index on click:", parentIndex);
    txtArea = currentEl.siblings(".description");
    localStorage.setItem(parentIndex, txtArea.val());
    console.log(txtArea.val());
})
function setPlanner() {
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
            descEl.addClass("past");
        }
        else if (hour === cHour) {            
            descEl.addClass("present");
        }
        else {            
            descEl.addClass("future");
        }
    });
}
