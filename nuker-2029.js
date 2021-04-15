// https://github.com/sotakoira/otcv3-scripts
// https://www.unknowncheats.me/forum/counterstrike-global-offensive/449696-line-breaks-csgo-chat.html
UI.AddLabel("Nuker - 2029 edition.");
UI.AddDropdown("Nuker - Type", ["none", "say", "say_team"]);
UI.AddSliderInt("Repeats", 1, 167);

var curtime = Global.Curtime();
var delay = 0.7
var paragraph_separator = "\u2029"

function main() {
type = UI.GetValue("MISC", "JAVASCRIPT", "Script items", "Nuker - Type")

if (type == 0) { // none
    return;
}

if (Global.Curtime() < curtime + delay) {
    return;
}

repeats = UI.GetValue("MISC", "JAVASCRIPT", "Script items", "Repeats");
nuker = paragraph_separator.repeat(repeats);

if (type == 1) { //say
Global.ExecuteCommand("say " + nuker);
curtime = Global.Curtime(); 
    return;
}

if (type == 2) { //say_team
Global.ExecuteCommand("say_team " + nuker);
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

Global.RegisterCallback("FrameStageNotify", "main");
Global.RegisterCallback("player_connect_full", "reset");
