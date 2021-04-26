// https://github.com/sotakoira/otcv3-scripts

function check_rage() {
game_mode = Convar.GetInt("game_mode");
game_type = Convar.GetInt("game_type");
if (game_mode == 1 && game_type == 0) {
gamerules = Entity.GetGameRulesProxy();	
// https://github.com/perilouswithadollarsign/cstrike15_src/blob/master/game/server/cstrike15/cs_gamestats.cpp#L1572
match_start = Entity.GetProp(gamerules, "CCSGameRulesProxy", "m_iRoundTime") < 300;
rage = UI.GetValue("Rage", "General", "Enabled");
if (match_start && !rage) {
UI.SetValue("Rage", "General", "Enabled", 1);
UI.SetValue("Misc", "GENERAL", "Miscellaneous", "Extended backtracking", 1);
Cheat.PrintChat("Match has started: Ragebot has been \x07enabled!");
}
else if (!match_start) {
UI.SetValue("Rage", "General", "Enabled", 0);
UI.SetValue("Misc", "GENERAL", "Miscellaneous", "Extended backtracking", 0);
Cheat.PrintChat("Match hasn't started yet: Ragebot has been \x04disabled!");
}
}	
	
}

function freeze() {
check_rage();
}

function connect() {
localplayer = Entity.GetLocalPlayer();
userid = Event.GetInt("userid");
if (Entity.GetEntityFromUserID(userid) == localplayer) {
	check_rage();
}

}

function spawn() {
localplayer = Entity.GetLocalPlayer();
userid = Event.GetInt("userid");
if (Entity.GetEntityFromUserID(userid) == localplayer) {
	check_rage();
}

}

check_rage();

Cheat.RegisterCallback("round_freeze_end", "freeze");
Cheat.RegisterCallback("player_connect_full", "connect");
Cheat.RegisterCallback("player_spawned", "spawn");