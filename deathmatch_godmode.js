//https://github.com/sotakoira/otcv3-scripts
//https://github.com/danielkrupinski/Osiris/pull/2736/

UI.AddCheckbox("Enable deathmatch godmode");
var every = 250 //delay between commands

function godmode() {

if (Cheat.FrameStage() != 2) {
    return;
}

gm_active = UI.GetValue("Enable deathmatch godmode");
if (!gm_active) {
	return;
}

game_mode = Convar.GetInt("game_mode");
game_type = Convar.GetInt("game_type");
if (game_mode != 2 && game_type != 1) {
	return;
}

localplayer = Entity.GetLocalPlayer();
localplayer_isalive = Entity.IsAlive(localplayer);
localplayer_isimmune = Entity.GetProp(localplayer, "DT_CSPlayer", "m_bGunGameImmunity")
if (!localplayer_isalive || !localplayer_isimmune) {
	return;
}

if (Global.Curtime() < curtime + (every / 1000)) {
	return;
}

Cheat.ExecuteCommand("open_buymenu");
curtime = Global.Curtime(); 
}

function reset() {
	localplayer = Entity.GetLocalPlayer();
	userid = Event.GetInt("userid");
	if (Entity.GetEntityFromUserID(userid) == localplayer) {
	curtime = 0;
	}
}

Global.RegisterCallback("FrameStageNotify", "godmode");
Global.RegisterCallback("player_connect_full", "reset");