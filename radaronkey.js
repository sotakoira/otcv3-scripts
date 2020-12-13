//https://github.com/sotakoira/otcv3-scripts
 UI.AddHotkey("Radar key");
 
 var original = UI.GetValue("Visual", "ENEMIES", "HUD", "Radar reveal");
 var radar = false;
 var radarkey = "";
 
function main() {
var radar = UI.GetValue("Visual", "ENEMIES", "HUD", "Radar reveal");
var radarkey = UI.IsHotkeyActive("Misc", "JAVASCRIPT", "Script items", "Radar key").toString();
if (!radar && radarkey == 1 ) {
UI.SetValue("Visual", "ENEMIES", "HUD", "Radar reveal", 1);
}
else if (radar && radarkey == 0) {
UI.SetValue("Visual", "ENEMIES", "HUD", "Radar reveal", 0);
}
}


function unload() {
UI.SetValue("Visual", "ENEMIES", "HUD", "Radar reveal", original);	
}

Global.RegisterCallback("FrameStageNotify", "main");
Global.RegisterCallback("Unload", "unload");