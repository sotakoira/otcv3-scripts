// https://github.com/sotakoira/otcv3-scripts
UI.AddDropdown("VoteRevealer - Mode", ["none", "say", "say_team", "PrintChat"]);

var options = [];
var queue = [];
var curtime = Global.Curtime();
var every = 700

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
			case 1: team = "Spectators"; team_color = "\x01"; break;
			case 2: team = "Terrorists"; team_color = "\x10"; break;
			case 3: team = "Counter-Terrorists"; team_color = "\x0B"; break;
			default: team = "Vote"; team_color = "\x01";
		}
		
		if (mode == 1 || mode == 2) { //say + say_team
		queue.push("[" + team + "] " + name + " voted " + choice);
		return;
		}

		if (mode == 3) { //PrintChat
		// https://github.com/perilouswithadollarsign/cstrike15_src/blob/master/game/server/cstrike15/cs_player_resource.cpp#L514-L524
		entity_color = Entity.GetProp(entityid, "CCSPlayerResource", "m_iCompTeammateColor");
		switch (entity_color) {
			case 0: name_color = "\x09"; break; //yellow
			case 1: name_color = "\x03"; break; //purple
			case 2: name_color = "\x06"; break; //green
			case 3: name_color = "\x0B"; break; //blue
			case 4: name_color = "\x10"; break; //orange
			default: name_color = "\x01";
		}

		switch (vote_option) {
			case 0: choice_color = "\x04"; break;
			case 1: choice_color = "\x07"; break;	
			default: choice_color = "\x01";
		}
		Global.PrintChat("[" + team_color + team + "\x01] " + name_color + name + "\x01 voted " + choice_color + choice + "\x01");
		return;
		}
    }

}

function queue_main() {
	if (Cheat.FrameStage() != 1) {
    return;
	}
		var mode = UI.GetValue("VoteRevealer - Mode");

		if ((mode == 0 || mode == 3) || queue.length == 0 ) { // none
		return;
		}
		
		if (Global.Curtime() < curtime + (every / 1000)) {
		return;
		}
		
		if (mode == 1) { //say
		Global.ExecuteCommand("say \u2029" + queue.shift());
		curtime = Global.Curtime(); 
		return;
		}
		
		if (mode == 2) { //say_team
		Global.ExecuteCommand("say_team \u2029" + queue.shift());
		curtime = Global.Curtime(); 
		return;
		}

}

function reset() {
	localplayer = Entity.GetLocalPlayer();
	userid = Event.GetInt("userid");
	if (Entity.GetEntityFromUserID(userid) == localplayer) {
	curtime = 0;
	}
	
}

Global.RegisterCallback("vote_options", "vote_options");
Global.RegisterCallback("vote_cast", "vote_cast");
Global.RegisterCallback("FrameStageNotify", "queue_main");
Global.RegisterCallback("player_connect_full", "reset");