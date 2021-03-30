//https://github.com/sotakoira/otcv3-scripts
UI.AddCheckbox("Disconnect on match end");
UI.AddCheckbox("Timeout on match end");

var match_done = false;

function on_match_end() {
match_done = true;
}

function buttoncheck() {
	
if (!match_done) {
	return;
}
	
if (Input.IsKeyPressed(0x01) || Input.IsKeyPressed(0x02) || Input.IsKeyPressed(0x04) || Input.IsKeyPressed(0x10) || Input.IsKeyPressed(0x11) || Input.IsKeyPressed(0x20) || Input.IsKeyPressed(0x57) || Input.IsKeyPressed(0x41) || Input.IsKeyPressed(0x53) || Input.IsKeyPressed(0x44)) {
	// LMB RMB MMB SHIFT CTRL SPACE W A S D
	return;
}
dc_active = UI.GetValue("Disconnect on match end");
to_active = UI.GetValue("Timeout on match end");
if (to_active) {
Global.ExecuteCommand("callvote starttimeout");
}
if (dc_active) {
Global.ExecuteCommand("disconnect");
}
match_done = false;
}



Cheat.RegisterCallback("cs_win_panel_match", "on_match_end");
Global.RegisterCallback("Draw", "buttoncheck");

