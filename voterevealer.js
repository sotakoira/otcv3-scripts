// https://github.com/sotakoira/otcv3-scripts
UI.AddDropdown("VoteRevealer - Mode", ["none", "say", "say_team", "PrintChat"]);

var options = [];
var queue = [];
var curtime = Global.Curtime();
var every = 720

function vote_options() {
    for (var i = 0; i <= Event.GetInt("count"); i++) {
        options[i] = Event.GetString("option" + (i + 1)).toLowerCase();
    }
}
function vote_cast() {
	var mode = UI.GetValue("VoteRevealer - Mode");

		if (mode == 0) { // none
		return;
		}
		
    var entityid = Event.GetInt("entityid");
    if (entityid) {
        var team = Event.GetInt("team");
        var vote_option = Event.GetInt("vote_option");
        var name = Entity.GetName(entityid);
		var choice = options[vote_option];
		switch (team) {
		case 2: team = "[Terrorists] "; break;
		case 3: team = "[Counter-Terrorists] "; break;
		default: team = "[Vote] ";
		}
		
		if (mode == 1 || mode == 2) { //say + say_team
		queue.push(team + name + " voted " + choice);
		return;
		}

		if (mode == 3) { //PrintChat
		Global.PrintChat(team + name + " voted " + choice);
		return;
		}
    }

}
function queue_main() {
	var mode = UI.GetValue("VoteRevealer - Mode");

		if ((mode == 0 || mode == 3) || queue.length == 0 ) { // none
		return;
		}
		
		if (Global.Curtime() < curtime + (every / 1000)) {
		return;
		}
		
		if (mode == 1) { //say
		Global.ExecuteCommand("say " + queue.shift());
		curtime = Global.Curtime(); 
		return;
		}
		
		if (mode == 2) { //say_team
		Global.ExecuteCommand("say_team " + queue.shift());
		curtime = Global.Curtime(); 
		return;
		}

}

function reset() {
	curtime = 0;
}
Global.RegisterCallback("vote_options", "vote_options");
Global.RegisterCallback("vote_cast", "vote_cast");
Global.RegisterCallback("CreateMove", "queue_main");
Global.RegisterCallback("player_connect_full", "reset");