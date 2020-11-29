// https://github.com/sotakoira/otcv3-scripts
// https://github.com/TheRatCode/RatPoison/blob/beta/settings/Data/MusicKits.txt
UI.AddDropdown("Music kit", [
"none",
"CS:GO",
"CS:GO 2",
"Daniel Sadowski, Crimson Assault",
"Noisia, Sharpened",
"Robert Allaire, Insurgency",
"Sean Murray, AD8",
"Feed Me, High Moon",
"Dern, Death's Head Demolition",
"Austin Wintory, Desert Fire",
"Sasha, LNOE",
"Skog, Metal",
"Midnight Riders, All I Want for Christmas",
"Matt Lange, IsoRhythm",
"Mateo Messina, For No Mankind",
"Various Artists, Hotline Miami",
"Daniel Sadowski, Total Domination",
"Damjan Mravunac, The Talos Principle",
"Proxy, Battlepack",
"Ki:Theroy, MOLOTOV",
"Troels Folmann, Uber Blasto Phone",
"Kelly Bailey, Hazardous Environments",
"Skog. II-Headshot",
"Daniel Sadowski, The 8-Bit Kit",
"AWOLNATION, I Am",
"Mord Fustang, Diamonds",
"Michael Bross, Invasion!",
"Ian Hultquist, Lion's Mouth",
"New Beat Fund, Sponge Fingerz",
"Beartooth, Disgusting",
"Lennie Moore, Java Havana Funkaloo",
"Darude, Moments CSGO",
"Beartooth, Aggressive",
"Blitz Kids,  The Good Youth",
"Hundredth, FREE",
"Neck Deep, Life's Not Out to Get You",
"Roam, Backbone",
"Twin Atlantic, GLA",
"Skog, III-Arena",
"The Verkkars, EZ4ENCE",
"Halo, The Master Chief Collection",
"Scarlxrd: King, Scar",
"Half-Life: Alyx, Anti-Citizen",
"Austin Wintory, Bachram",
"Dren, Gunman Taco Truck",
"Daniel Sadowski, Eye of the Dragon",
"Tree Adams and Ben Bromfield, M.U.D.D. FORCE",
"Tim Huling, Neo Noir",
"Sam Marshall, Bodacious",
"Matt Levine, Drifter",
"Amon Tobin, All for Dust"
]);

var original = Entity.GetProp(Entity.GetLocalPlayer(), "CCSPlayerResource", "m_nMusicID");

function main() {
var musickit = UI.GetValue("Music kit");

if (musickit == 0) {// none
Entity.SetProp(Entity.GetLocalPlayer(), "CCSPlayerResource", "m_nMusicID", original);
    return;
}
Entity.SetProp(Entity.GetLocalPlayer(), "CCSPlayerResource", "m_nMusicID", musickit);

}

Global.RegisterCallback("FrameStageNotify", "main");
