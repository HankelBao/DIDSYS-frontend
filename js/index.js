var api_host = "http://127.0.0.1:8000";

var app = new Vue({
    el: '#rootNode',
    data: {
        scoreboard_data: new Array(),
        scoreboard_more_data: new Array(),
        scoreboard_more_date: new String(),
        scoreranking_data: new Array(),
        scoreranking_more_data: new Array(),
        scoreranking_more_type: new String(),
        scorerboard_status: new Number(),
        scorerboard_size: new Number(),
        scorerboard_head: new Array(),
        scorerboard_body: new Array(),
        scorer_name: new String(),
        scorer_username: new String(),
        scorer_password: new String(),
        scorer_admin: new Boolean(),
        scorer_admin_date: new String(),
    },
    methods: {
        update_all: function () {
            this.update_scoreboard();
            this.update_scoreranking();
        },
        update_scoreboard: function () {
            $.getJSON("http://127.0.0.1:8000/scoreboard/board/get", (json) => {
                this.scoreboard_data = json.data;
            });
        },
        update_scoreboard_more: function() {
            $.getJSON("http://127.0.0.1:8000/scoreboard/board/get_by_date", {
                "date": this.scoreboard_more_date
            }, (json) => {
                this.scoreboard_more_data = json.data;
            });
        },
        update_scoreranking: function() {
            $.getJSON("http://127.0.0.1:8000/scoreboard/rank/get", (json) => {
                this.scoreranking_data = json.data;
            });
        },
        update_scoreranking_more: function(type) {
            $.getJSON("http://127.0.0.1:8000/scoreboard/rank/get_by_type", {
                "type": type
            }, (json) => {
                this.scoreranking_more_data = json.data;
                this.scoreranking_more_type = type;
            });
        },
        login: function () {
            this.scorer_username = $("#login_username").val();
            this.scorer_password = $("#login_password").val();
            $.ajax({
                type: "POST",
                url: "http://127.0.0.1:8000/scorer/login",
                data: {
                    "username": this.scorer_username,
                    "password": this.scorer_password
                },
                success: (json) => {
                    if (json.status == 0) {
                        this.scorerboard_status = 0;
                        return;
                    }
                    this.scorerboard_status = 1;
                    this.scorerboard_size = json.scorerboard_size;
                    this.scorerboard_head = json.scorerboard_head;
                    this.scorerboard_body = json.scorerboard_body;
                    this.scorer_name = json.scorer_name;
                    if (json.scorer_admin) {
                        this.scorer_admin = json.scorer_admin;
                        this.scorer_admin_date = json.scorer_admin_date;
                    }
                }
            });
        },
        score_submit: function() { 
            items_counter = this.scorerboard_size;
            var items = new Array();
            var items_reason = new Array();
            for (var i = 1; i <= items_counter; i++) {
                items[i] = $("#" + i).val();
                items_reason[i] = $("#" + i + "R").val();
            }
            this.scorerboard_status = 2;
            if (this.scorer_admin_date) {
                $.ajax({
                    type: "POST",
                    traditional: true,
                    url: "http://127.0.0.1:8000/scorer/submit_score",
                    data: {
                        "scores": items,
                        "scores_reason": items_reason,
                        "username": this.scorer_username,
                        "password": this.scorer_password,
                        "scorer_date": this.scorer_admin_date
                    },
                    success: (json) => {
                        this.scorerboard_status = 3;
                        this.update_all();
                    }
                });
            } else {
                $.ajax({
                    type: "POST",
                    traditional: true,
                    url: "http://127.0.0.1:8000/scorer/submit_score",
                    data: {
                        "scores": items,
                        "scores_reason": items_reason,
                        "username": this.scorer_username,
                        "password": this.scorer_password
                    },
                    success: (json) => {
                        this.scorerboard_status = 3;
                        this.update_all();
                    }
                });
            }
        }
    },
    mounted: function() {
        this.update_all();
        var myDate = new Date();
        this.scoreboard_more_date = myDate.getFullYear() + '-' + (myDate.getMonth() + 1) + '-' + myDate.getDate();
        this.update_scoreboard_more();
        this.scoreranking_more_type = "daily";
        this.update_scoreranking_more(this.scoreranking_more_type);
        this.login_status = 0;
    }
});
