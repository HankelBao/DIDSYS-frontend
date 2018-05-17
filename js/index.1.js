function login() {
    scorer_username = $("#login_username").val();
    scorer_password = $("#login_password").val();
    $.ajax({
        type:"POST",
        url:"ajax/get-scorerboard",
        data:{"username":scorer_username, "password":scorer_password},
        success:function(result){
            $("#modal_content").html(result);
        }
    });
}

function score_submit() {
    items_counter = $("#items_counter").val();
    var items = new Array();
    var items_reason = new Array();
    for (var i = 1; i <= items_counter; i++) {
        items[i] = $("#"+i).val();
        items_reason[i] = $("#"+i+"R").val(); 
    }
    $("#modal_content").html("We are busy loading data and checking your account.<br>Please wait patiently...");
    $.ajax({
        type:"POST",
        traditional:true,
        url:"ajax/score-submit.html",
        data:{
            "scores":items,
            "scores_reason":items_reason,
            "username":scorer_username,
            "password":scorer_password
        },
        success:function(result){
            $("#modal_content").html(result);
            update_index();
        }
    });
}

function update_scoreboard()  {
    $.getJSON("ajax/get-scoreboard", function(result) {
        $("#scoreboard_header").empty();
        $.each(result.scoreboard_head, function(i, value) {
            line = "<th>" + value + "</th>";
            $("#scoreboard_header").append(line);
        })
        $("#scoreboard_body").empty();
        $.each(result.scoreboard_body, function(i, value) {
            $("#scoreboard_body").append("<tr>");
            $.each(value, function(i, item) {
                line = "<td>" + item + "</td>";
                $("#scoreboard_body").append(line);
            })
            $("#scoreboard_body").append("</tr>");
        })
    })
}

function update_scoreranking()  {
    $.getJSON("ajax/get-scoreranking", function(result) {
        $("#scoreranking_header").empty();
        $.each(result.scoreranking_head, function(i, value) {
            line = "<th>" + value + "</th>";
            $("#scoreranking_header").append(line);
        })
        $("#scoreranking_body").empty();
        $.each(result.scoreranking_body, function(i, value) {
            $("#scoreranking_body").append("<tr>");
            $.each(value, function(i, item) {
                line = "<td>" + item + "</td>";
                $("#scoreranking_body").append(line);
            })
            $("#scoreranking_body").append("</tr>");
        })
    })
}

function update_scoremoements() {
    $.getJSON("ajax/get-scoremoments", function(result) {
        $("#scoremoments_content").empty();
        $.each(result.scoremoemnts, function(i, value) {
            line = "<li class='list-group-item'>" + value + "</li>";
            $("#scoremoments_content").append(line);
        })
    })
}

function update_index() {
    $.getJSON("ajax/get-index", function(result) {
        $("#scoreboard-body").empty();
        $.each(result.scoreboard_body, function(i, value) {
            $("#scoreboard-body").append("<tr>");
            $.each(value, function(i, item) {
                line = "<td>" + item + "</td>";
                $("#scoreboard-body").append(line);
            })
            $("#scoreboard-body").append("</tr>");
        })
        $("#scoreranking-body").empty();
        $.each(result.scoreranking_body, function(i, value) {
            $("#scoreranking-body").append("<tr>");
            $.each(value, function(i, item) {
                line = "<td>" + item + "</td>";
                $("#scoreranking-body").append(line);
            })
            $("#scoreranking-body").append("</tr>");
        })
        $("#scoremoments-content").empty();
        $.each(result.scoremoments, function(i, value) {
            line = "<li class='list-group-item'>" + value + "</li>";
            $("#scoremoments-content").append(line);
        })
    })
}

$(document).ready(function(){
    update_index();
});

function more_on_scoreboard(input_date) {
    $.ajax({
        type:"GET",
        url:"ajax/more-on-scoreboard",
        data:{"date":input_date},
        success:function(result){
            $("#modal_content").html(result);
        }
    });
}

function more_on_scoreranking(count_unit) {
    $.ajax({
        type:"GET",
        url:"ajax/more-on-scoreranking",
        data:{"count_unit":count_unit},
        success:function(result){
            $("#modal_content").html(result);
        }
    });   
}