// https://github.com/sotakoira/otcv3-scripts
UI.AddDropdown("Nuker - Type", ["none", "say", "say_team","say_party"]);

var curtime = Global.Curtime();
var delay = 0.7
var nuker = "﷽﷽﷽ ﷽﷽﷽ ﷽﷽﷽ ﷽﷽﷽ ﷽﷽﷽ ﷽﷽﷽ ﷽﷽﷽ ﷽﷽﷽ ﷽﷽﷽ ﷽﷽﷽ ﷽﷽﷽ ﷽﷽﷽ ﷽﷽﷽"

function main() {
var type = UI.GetValue("MISC", "JAVASCRIPT", "Script items", "Nuker - Type")

if (type == 0) { // none
    return;
}

if (Global.Curtime() < curtime + delay) {
    return;
}

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

if (type == 3 ) { //say_party
Global.ExecuteCommand("say_party " + nuker);
curtime = Global.Curtime(); 
    return;
}

}
function reset() {
	curtime = 0;
}

Global.RegisterCallback("FrameStageNotify", "main");
Global.RegisterCallback("player_connect_full", "reset");
