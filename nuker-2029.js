// https://github.com/sotakoira/otcv3-scripts
// https://www.unknowncheats.me/forum/counterstrike-global-offensive/449696-line-breaks-csgo-chat.html
UI.AddLabel("Nuker - 2029 edition.");
UI.AddDropdown("Nuker - Type", ["none", "say", "say_team"]);
UI.AddLabel("Due to this method taking length");
UI.AddLabel("of username into accountability");
UI.AddLabel("and things like location offset could");
UI.AddLabel("be necessary to set.");
UI.AddSliderInt("Offset", 0, 10);
UI.AddTextbox("Message after commands");

var curtime = Global.Curtime();
var delay = 0.7;
var paragraph_separator = "\u2029";

var the = 84;

function main() {
type = UI.GetValue("MISC", "JAVASCRIPT", "Script items", "Nuker - Type")

if (type == 0 || Cheat.FrameStage() != 2) { // none
    return;
}

if (Global.Curtime() < curtime + delay) {
    return;
}
message = UI.GetString("MISC", "JAVASCRIPT", "Script items", "Message after commands");
username = Cheat.GetUsername();
offset = UI.GetValue("MISC", "JAVASCRIPT", "Script items", "Offset");


if (type == 1) { //say
local = Entity.GetLocalPlayer();
local_dead = !Entity.IsAlive(local);
dead = (local_dead) ? "*DEAD* " : "";

repeats = the - 1 - offset - Math.ceil(((message.length + username.length + dead.length) / 3));
nuker = paragraph_separator.repeat(repeats);
Global.ExecuteCommand("say " + nuker + message);
curtime = Global.Curtime(); 
    return;
}

if (type == 2) { //say_team
local = Entity.GetLocalPlayer();
local_dead = !Entity.IsAlive(local);
dead = (local_dead) ? "*DEAD* " : "";
location = Entity.GetProp(local, "CBasePlayer", "m_szLastPlaceName");
team = Entity.GetProp(local, "CBaseEntity", "m_iTeamNum");
switch (team) {
		case 2: team = "(Terrorist) @ "; break;
		case 3: team = "(Counter-Terrorist) @ "; break;
		default: team = "(Spectator) @ ";
		}
repeats = the - 1 - offset - Math.ceil(((message.length + username.length + location.length + team.length + dead.length) / 3));
nuker = paragraph_separator.repeat(repeats);
Global.ExecuteCommand("say_team " + nuker + message);
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