//https://github.com/sotakoira/otcv3-scripts
 UI.AddHotkey("Radar key");
 
 var original = UI.GetValue("Visual", "ENEMIES", "HUD", "Radar reveal");
 var radar = false;
 var radarkey = "";
 var shouldchange = false;
 
function main() {
var radarkey = UI.IsHotkeyActive("Misc", "JAVASCRIPT", "Script items", "Radar key").toString();
if (radarkey == 1 ) {
UI.SetValue("Visual", "ENEMIES", "HUD", "Radar reveal", 1);
shouldchange = true;
}
else if (radarkey == 0 && shouldchange) {
UI.SetValue("Visual", "ENEMIES", "HUD", "Radar reveal", 0);
shouldchange = false;
}
}


function unload() {
UI.SetValue("Visual", "ENEMIES", "HUD", "Radar reveal", original);	
}

Global.RegisterCallback("Draw", "main");
Global.RegisterCallback("Unload", "unload");