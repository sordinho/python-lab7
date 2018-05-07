var RESTAPI = "http://127.0.0.1:5000/api/v1.0";

function loadList() {
    // we need to execute this only after the page is loaded
    $("#tasklist").append("<ul></ul>");

    $.getJSON("http://127.0.0.1:5000/api/v1.0/tasks", function (data) {
        // data is a parameter. it contains the response given by api and is already parsed from json to js variable
        var tasklist = data["tasks"];
        for (var i = 0; i < tasklist.length; i++) {
            var t = tasklist[i];
            $("#tasklist ul").append("<li><button id='removeTask' onclick='removeTask(this)' data-id='" + t.id + "'>Delete</button> <button id='updateTask'>Update</button> t.description t.urgent </li>");
        }


    });
}

function removeTask(taskElement) {
    var idTask = taskElement.getAttribute("data-id");
    alert(idTask);
    $.ajax({
        url: RESTAPI + "/tasks/" + idTask,
        type: 'DELETE',

    });
    //location.reload();
    return false;
}

function updateTask(id,desc,urg){
    alert(id);
    alert(desc);
    alert(urg);
}

$(document).ready(function () {
    loadList();
    $("form").submit(function () {
        var description = $("input[name='description']").val();
        var urgent = 0;

        if ($('#urgentTaskCheck').is(":checked")) {
            // alert(urgent);
            urgent = 1;
        }
        var task = {"description": description, "urgent": urgent};

        var taskJSON = JSON.stringify(task);

        $.post({
            "url": RESTAPI + '/tasks',
            "data": taskJSON,
            "contentType": "application/json",
            "success": function () {
                loadList()
            }
        });
        return true;
    });
});