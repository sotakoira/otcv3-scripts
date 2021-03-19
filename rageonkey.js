//https://github.com/sotakoira/otcv3-scripts
UI.AddHotkey("Rage key");

var ragekey = "";
var shouldchange = false;

function main() {
var ragekey = UI.IsHotkeyActive("Misc", "JAVASCRIPT", "Script items", "Rage key").toString();
if (ragekey == 1 ) {
UI.SetValue("Rage", "General", "Enabled", 1);
shouldchange = true;
}
else if (ragekey == 0 && shouldchange) {
UI.SetValue("Legit", "General", "Enabled", 1);
UI.SetValue("Rage", "General", "Enabled", 0);
shouldchange = false;
}
}


Global.RegisterCallback("Draw", "main");
