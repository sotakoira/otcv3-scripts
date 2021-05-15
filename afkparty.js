// https://github.com/sotakoira/otcv3-scripts

UI.AddDropdown("Autobuy weapon", ["none", "AK-47/M4A4", "SG553/AUG", "Galil AR/FAMAS", "SSG08", "AWP", "G3SG1/SCAR20", "MAC10/MP9", "PP-Bizon", "P90", "M249", "Negev", "XM1014"]);
UI.AddCheckbox("Autodrop weapon");
UI.AddCheckbox("Autodrop bomb");
UI.AddCheckbox("AntiAFK");
UI.AddCheckbox("Call surrender");
UI.AddCheckbox("Call timeout");
UI.AddCheckbox("Kick on teamkill");
UI.AddCheckbox("Sound on team damage");
UI.AddCheckbox("Loopback");
UI.AddLabel("Relative to csgo/sound/");
UI.AddTextbox("File name");
UI.AddSliderFloat("Sound length", 0.0, 10.0);
UI.AddCheckbox("Reduce rate and FPS");
UI.AddCheckbox("Radio spammer");

var weapons_buying = [
"ak47",
"sg556",
"galilar",
"ssg08",
"awp",
"g3sg1",
"mp9",
"bizon",
"p90",
"m249",
"negev",
"xm1014",
];

var radio_colors = [
"\u0001",	//white
"\u0002",	//darkred
"\u0004",	//green
"\u0005",	//lightgreen
"\u0006",	//lime
"\u0007",	//palered
"\u0008",	//grey
"\u000E",	//orchid
"\u000F",	//lightred
"\u0010",	//gold
"", 		//empty
];

var rclength = radio_colors.length;

var forward = 0;
var side = 0;

var rate_cache = Convar.GetFloat("rate");
var fps_cache = Convar.GetFloat("fps_max");
var shouldchange = false;

var v_curtime = 0;
var rs_curtime = 0;

var in_attack2 = false;

function generate_cmd() {
	
afk_active = UI.GetValue("Misc", "JAVASCRIPT", "Script Items", "AntiAFK");
if (afk_active) {
forward = Math.ceil(Math.random() * 450) * (Math.round(Math.random()) ? 1 : -1);
side = Math.ceil(Math.random() * 450) * (Math.round(Math.random()) ? 1 : -1);

}
}
	
function call_surrender() {

cs_active = UI.GetValue("Misc", "JAVASCRIPT", "Script Items", "Call surrender");
if (cs_active) {
players = Entity.GetTeammates().length;

if (players < 5) {Cheat.ExecuteCommand("callvote surrender"); }
}
}
	
function call_timeout() {
to_active = UI.GetValue("Misc", "JAVASCRIPT", "Script Items", "Call timeout");
if (to_active) {
local = Entity.GetLocalPlayer();
team = Entity.GetProp(local, "DT_BaseEntity", "m_iTeamNum");
gamerules = Entity.GetGameRulesProxy();
t_to = Entity.GetProp(gamerules, "CCSGameRulesProxy", "m_nTerroristTimeOuts");
ct_to = Entity.GetProp(gamerules, "CCSGameRulesProxy", "m_nCTTimeOuts");
if (team == 2) { timeouts = t_to; }
else if (team == 3) { timeouts = ct_to; }
else return;

if (timeouts > 0) {Cheat.ExecuteCommand("callvote starttimeout"); }
}
}

function autodrop_bomb() {
ab_active = UI.GetValue("Misc", "JAVASCRIPT", "Script Items", "Autodrop bomb");
userid = Event.GetInt("userid");
userid_index = Entity.GetEntityFromUserID(userid);
is_localplayer = Entity.IsLocalPlayer(userid_index);

if (ab_active && is_localplayer) {	
Cheat.ExecuteCommand("use weapon_c4");	
Cheat.ExecuteCommand("drop");	
}

}

function autobuy_weapon() {
abw = UI.GetValue("Misc", "JAVASCRIPT", "Script Items", "Autobuy weapon");
adw_active = UI.GetValue("Misc", "JAVASCRIPT", "Script Items", "Autodrop weapon");
local = Entity.GetLocalPlayer();
in_buyzone = Entity.GetProp(local, "DT_CSPlayer", "m_bInBuyZone");

if (in_buyzone && abw != 0) {
Cheat.ExecuteCommand("buy " + weapons_buying[abw - 1]);

}

}

function autodrop_weapon() {
adw_active = UI.GetValue("Misc", "JAVASCRIPT", "Script Items", "Autodrop weapon");
if (adw_active) {
userid = Event.GetInt("userid");
item = Event.GetString("item");
userid_index = Entity.GetEntityFromUserID(userid);
userid_localplayer = Entity.IsLocalPlayer(userid_index);
if (userid_localplayer && item != "c4") {	
Cheat.ExecuteCommand("drop");	
}
}

}

function autoequip_weapon() {
adw_active = UI.GetValue("Misc", "JAVASCRIPT", "Script Items", "Autodrop weapon");
if (adw_active) {
userid = Event.GetInt("userid");
item = Event.GetString("item");
userid_index = Entity.GetEntityFromUserID(userid);
userid_localplayer = Entity.IsLocalPlayer(userid_index);
if (userid_localplayer && item != "c4") {
Cheat.ExecuteCommand("slot2");
Cheat.ExecuteCommand("slot1");
}
}

}

function kick_on_tk() {
tkk_active = UI.GetValue("Misc", "JAVASCRIPT", "Script Items", "Kick on teamkill");	
if (tkk_active) {
	attacker = Event.GetInt("attacker");
    userid = Event.GetInt("userid");
    attacker_index = Entity.GetEntityFromUserID(attacker);
    userid_index = Entity.GetEntityFromUserID(userid);
	userid_localplayer = Entity.IsLocalPlayer(userid_index);
    attacker_isteammate = Entity.IsTeammate(attacker_index);
	
if (attacker_isteammate && userid_localplayer) {
	Cheat.ExecuteCommand("callvote kick " + attacker);
}
}

}

function antiafk() {
afk_active = UI.GetValue("Misc", "JAVASCRIPT", "Script Items", "AntiAFK");
local = Entity.GetLocalPlayer();
gamerules = Entity.GetGameRulesProxy();
hasmoved = Entity.GetProp(local, "DT_CSPlayer", "m_bHasMovedSinceSpawn");
in_freeze = Entity.GetProp(gamerules, "CCSGameRulesProxy", "m_bFreezePeriod");
t_timeout = Entity.GetProp(gamerules, "CCSGameRulesProxy", "m_bTerroristTimeOutActive");
ct_timeout = Entity.GetProp(gamerules, "CCSGameRulesProxy", "m_bCTTimeOutActive");

if (afk_active) {
if (!hasmoved) { UserCMD.SetMovement( [ forward, side, 0 ] ); }
if ((t_timeout || ct_timeout) && in_freeze) {
Cheat.ExecuteCommand("+attack2");
in_attack2 = true;
}

if (!(t_timeout || ct_timeout) && in_attack2) {
Cheat.ExecuteCommand("-attack2");
in_attack2 = false;
}

}
}

function reduceusage() {
if (UI.IsMenuOpen()) {	
reduce_active = UI.GetValue("Misc", "JAVASCRIPT", "Script Items", "Reduce rate and FPS");
if (reduce_active && !shouldchange) {
Convar.SetFloat("rate", 20480);
Convar.SetFloat("fps_max", 49);
shouldchange = true;
}

else if (!reduce_active && shouldchange) {
Convar.SetFloat("rate", rate_cache);
Convar.SetFloat("fps_max", fps_cache);
shouldchange = false;
}

}
	
}

function vischeck() {
if (UI.IsMenuOpen()) {
sotd_active = UI.GetValue("Misc", "JAVASCRIPT", "Script Items", "Sound on team damage");
if (sotd_active) {
	UI.SetEnabled("Misc", "JAVASCRIPT", "Script Items", "Loopback", true)
	UI.SetEnabled("Misc", "JAVASCRIPT", "Script Items", "Sound length", true)
	UI.SetEnabled("Misc", "JAVASCRIPT", "Script Items", "Relative to csgo/sound/", true)
	UI.SetEnabled("Misc", "JAVASCRIPT", "Script Items", "File name", true)

} else {
	UI.SetEnabled("Misc", "JAVASCRIPT", "Script Items", "Loopback", false)
	UI.SetEnabled("Misc", "JAVASCRIPT", "Script Items", "Sound length", false)
	UI.SetEnabled("Misc", "JAVASCRIPT", "Script Items", "Relative to csgo/sound/", false)
	UI.SetEnabled("Misc", "JAVASCRIPT", "Script Items", "File name", false)
}

}
}

function sound_on_td() {
sot_active = UI.GetValue("Misc", "JAVASCRIPT", "Script Items", "Sound on team damage");
if (sot_active) {
userid = Event.GetInt("userid");
attacker = Event.GetInt("attacker");

attacker_index = Entity.GetEntityFromUserID(attacker);
userid_index = Entity.GetEntityFromUserID(userid);
attacker_name = Entity.GetName(attacker_index);
userid_name = Entity.GetName(userid_index);
attacker_teammate = Entity.IsTeammate(attacker_index);
userid_teammate = Entity.IsTeammate(userid_index);
isuseridlocal = Entity.IsLocalPlayer(userid_index);

if (attacker_teammate && userid_teammate) {
	if ((isuseridlocal && attacker_teammate) && (userid != attacker)) {
	loopback = UI.GetValue("Misc", "JAVASCRIPT", "Script Items", "Loopback");
	if (loopback) {Cheat.ExecuteCommand("voice_loopback 1");}
	filename = UI.GetString("Misc", "JAVASCRIPT", "Script Items", "File name");	
	Sound.PlayMicrophone("csgo//sound//" + filename + ".wav");
	v_curtime = Global.Curtime();
	}
}
}
}

function soundcheck() {
if (Cheat.FrameStage() != 1) {return;}
sot_active = UI.GetValue("Misc", "JAVASCRIPT", "Script Items", "Sound on team damage");
if (sot_active) {

s_length = UI.GetValue("Misc", "JAVASCRIPT", "Script Items", "Sound length");	
if (Global.Curtime() > v_curtime + s_length) {
if (loopback) {Cheat.ExecuteCommand("voice_loopback 0");}
Sound.StopMicrophone();
}
}
}

function radiospammer() {
if (Cheat.FrameStage() != 1) {return;}
rs_active = UI.GetValue("Misc", "JAVASCRIPT", "Script Items", "Radio spammer");
if (rs_active) {
if (Global.Curtime() > rs_curtime + 10.2) {

for (i =1; i <= 3; i++) {
Cheat.ExecuteCommand("playerchatwheel . " + radio_colors[Math.floor(Math.random() * rclength)] + "afkparty.js");
}
rs_curtime = Global.Curtime(); 
}
}
}

function reset() {
localplayer = Entity.GetLocalPlayer();
userid = Event.GetInt("userid");
if (Entity.GetEntityFromUserID(userid) == localplayer) {
	v_curtime = 0;
	rs_curtime = 0;
}
	

}

function unload() {
reduce_active = UI.GetValue("Misc", "JAVASCRIPT", "Script Items", "Reduce rate and FPS");
if (reduce_active) {
Convar.SetFloat("rate", rate_cache);
Convar.SetFloat("fps_max", fps_cache);
shouldchange = false;
}
if (in_attack2) {
Cheat.ExecuteCommand("-attack2");
in_attack2 = false;
}
}


Cheat.RegisterCallback("round_start", "generate_cmd");
Cheat.RegisterCallback("round_start", "call_surrender");

Cheat.RegisterCallback("round_freeze_end", "autobuy_weapon");
Cheat.RegisterCallback("round_freeze_end", "call_timeout");

Cheat.RegisterCallback("item_pickup", "autoequip_weapon");

Cheat.RegisterCallback("item_equip", "autodrop_weapon");

Cheat.RegisterCallback("bomb_pickup", "autodrop_bomb");

Cheat.RegisterCallback("player_death", "kick_on_tk");

Cheat.RegisterCallback("player_hurt", "sound_on_td");

Cheat.RegisterCallback("player_connect_full", "reset");

Cheat.RegisterCallback("CreateMove", "antiafk");

Cheat.RegisterCallback("Draw", "reduceusage");
Cheat.RegisterCallback("Draw", "vischeck");

Cheat.RegisterCallback("FrameStageNotify", "radiospammer");
Cheat.RegisterCallback("FrameStageNotify", "soundcheck");

Cheat.RegisterCallback("Unload", "unload");