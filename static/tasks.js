var RESTAPI = "http://127.0.0.1:5000/api/v1.0";

function loadList() {
    // we need to execute this only after the page is loaded
    $("#tasklist").append("<ul></ul>");

    $.getJSON("http://127.0.0.1:5000/api/v1.0/tasks", function (data) {
        // data is a parameter. it contains the response given by api and is already parsed from json to js variable
        var tasklist = data["tasks"];
        for (var i = 0; i < tasklist.length; i++) {
            var t = tasklist[i];
            $("#tasklist ul").append("<li><a >Delete</a> " + t.description + " " +t.urgent+ "</li>"); // same as t["description"}
        }
    });
}

$(document).ready(function () {
    loadList();
    $("form").submit(function () {
        var description = $("input[name='description']").val();
        var urgent = 0;
        var task = {"description": description, "urgent": urgent};

        var taskJSON = JSON.stringify(task);

        $.post({
            "url": RESTAPI + '/tasks',
            "data": taskJSON,
            "contentType": "application/json",
            "success": function(){load_task_list()}
        });
        return true;
    });
});