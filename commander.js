// https://github.com/sotakoira/otcv3-scripts
UI.AddLabel("Don't change the command");
UI.AddLabel("without deactivating first.");
UI.AddCheckbox("Active");
UI.AddCheckbox("Disable if menu open");
UI.AddCheckbox("Disable if dead");
UI.AddTextbox("Command");
UI.AddSliderInt("Every", 100, 3000);

var curtime = Global.Curtime();

function main() {
var command = UI.GetString("Command");
var every = UI.GetValue("Every");
var active = UI.GetValue("Active");
var menu = UI.GetValue("Disable if menu open");
var isdead = UI.GetValue("Disable if dead");
var menuopen = UI.IsMenuOpen();
var isdeadcheck = !Entity.IsAlive(Entity.GetLocalPlayer())

if (!active) {
	return;
}

if ((menu && menuopen) || (isdead && isdeadcheck)) {
	return;
}
		
if (Cheat.FrameStage() != 2) {
    return;
}
 
 if (Global.Curtime() < curtime + (every / 1000)) {
	 return;
}
	Global.ExecuteCommand(command);
curtime = Global.Curtime(); 
}
function reset() {
	curtime = 0;
}

Global.RegisterCallback("FrameStageNotify", "main");
Global.RegisterCallback("player_connect_full", "reset");