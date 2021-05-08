// https://github.com/sotakoira/otcv3-scripts

UI.AddDropdown("Autobuy weapon", ["none", "AK-47/M4A4", "SG553/AUG", "Galil AR/FAMAS", "SSG08", "AWP", "G3SG1/SCAR20", "MAC10/MP9", "PP-Bizon", "P90", "M249", "Negev", "XM1014"]);
UI.AddCheckbox("Autodrop weapon");
UI.AddCheckbox("Autodrop bomb");
UI.AddCheckbox("AntiAFK");
UI.AddCheckbox("Call surrender");
UI.AddCheckbox("Call timeout");
UI.AddCheckbox("Kick on teamkill");
UI.AddCheckbox("Reduce rate and FPS");

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

var forward = 0;
var side = 0;

var rate_cache = Convar.GetFloat("rate");
var fps_cache = Convar.GetFloat("fps_max");
var shouldchange = false;

function generate_cmd() {
	
afk_active = UI.GetValue("AntiAFK");
if (afk_active) {
forward = Math.ceil(Math.random() * 450) * (Math.round(Math.random()) ? 1 : -1);
side = Math.ceil(Math.random() * 450) * (Math.round(Math.random()) ? 1 : -1);

}
}
	
function call_surrender() {

cs_active = UI.GetValue("Call surrender");
if (cs_active) {
players = Entity.GetTeammates().length;

if (players < 5) {Cheat.ExecuteCommand("callvote surrender"); }
}
}
	
function call_timeout() {
to_active = UI.GetValue("Call timeout");
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
ab_active = UI.GetValue("Autodrop bomb");
userid = Event.GetInt("userid");
userid_index = Entity.GetEntityFromUserID(userid);
is_localplayer = Entity.IsLocalPlayer(userid_index);

if (ab_active && is_localplayer) {	
Cheat.ExecuteCommand("use weapon_c4");	
Cheat.ExecuteCommand("drop");	
}

}

function autobuy_weapon() {
abw = UI.GetValue("Autobuy weapon");
adw_active = UI.GetValue("Autodrop weapon");
local = Entity.GetLocalPlayer();
in_buyzone = Entity.GetProp(local, "DT_CSPlayer", "m_bInBuyZone");

if (in_buyzone && abw != 0) {
Cheat.ExecuteCommand("buy " + weapons_buying[abw - 1]);

if (adw_active) {
Cheat.ExecuteCommand("drop");	
}
}

}

function kick_on_tk() {
tkk_active = UI.GetValue("Kick on teamkill");	
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
afk_active = UI.GetValue("AntiAFK");
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
reduce_active = UI.GetValue("Reduce rate and FPS");
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

function unload() {
reduce_active = UI.GetValue("Reduce rate and FPS");
if (reduce_active) {
Convar.SetFloat("rate", rate_cache);
Convar.SetFloat("fps_max", fps_cache);
shouldchange = false;
}
}


Cheat.RegisterCallback("round_start", "generate_cmd");
Cheat.RegisterCallback("round_start", "call_surrender");

Cheat.RegisterCallback("round_freeze_end", "autobuy_weapon");
Cheat.RegisterCallback("round_freeze_end", "call_timeout");

Cheat.RegisterCallback("bomb_pickup", "autodrop_bomb");

Cheat.RegisterCallback("player_death", "kick_on_tk");

Cheat.RegisterCallback("CreateMove", "antiafk");

Cheat.RegisterCallback("Draw", "reduceusage");

Cheat.RegisterCallback("Unload", "unload");