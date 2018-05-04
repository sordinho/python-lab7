//attach an event handler on when the page is ready. using anonimous inner function (name is optional)
$(document).ready(function () {
    // we need to execute this only after the page is loaded
    $("#tasklist").append("<ul></ul>");

    $.getJSON("http://127.0.0.1:5000/api/v1.0/tasks", function (data) {
        // data is a parameter. it contains the response given by api and is already parsed from json to js variable
        var tasklist = data["tasks"];
        for (var i = 0; i<tasklist.length; i++){
            var t = tasklist[i];
            $("#tasklist ul").append("<li>"+t.description+"</li>"); // same as t["description"}
        }

    });
});

$("form").submit(function () {
    var description = $("input[name='description']").val();

    return false; // don't submit the form from browser
});