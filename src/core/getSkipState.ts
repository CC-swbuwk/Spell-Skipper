import { spellNameMap, TOWER_TABLE } from "../constants";
import { Math2 } from "./math";

export const getSkipState = (
  wizardTower: Game.MinigameObject<Game.GrimoireMinigame>,
) => {
  const minigame = wizardTower.minigame;

  const towerLevel = wizardTower.level;
  const spellsCastTotal = minigame.spellsCastTotal;

  // Current cast
  Math2.seedrandom(Game.seed + "/" + spellsCastTotal);
  const gfdRandomSeed = Math2.random();

  // Collect available spells
  const availableSpells = [];
  for (const i in minigame.spells) {
    if (i !== "gambler's fever dream") {
      availableSpells.push(minigame.spells[i]);
    }
  }

  // Manual index calculation
  const spellIndex = Math.floor(gfdRandomSeed * availableSpells.length);
  const chosenSpell = availableSpells[spellIndex];
  const nextSpellName =
    spellNameMap[chosenSpell.name.toLowerCase()] || chosenSpell.name;

  // Next cast (+1) (Needed for steps 2a and 2b)
  Math2.seedrandom(Game.seed + "/" + (spellsCastTotal + 1));
  const nextGfdRandomSeed = Math2.random();

  // Check if next spell will backfire (base chance is 0.5)
  Math2.seedrandom(Game.seed + "/" + (spellsCastTotal + 2));
  const nextGfdBackfireRoll = Math2.random();
  const nextGfdWillBackfire = nextGfdBackfireRoll < 0.5;

  // Check if the player can afford the spell
  let canAffordS = false;
  const levelIndex = Math.min(Math.max(towerLevel - 1, 0), 9);
  const sValue = TOWER_TABLE[levelIndex].s;

  if (sValue !== null) {
    const currentTowers = wizardTower.amount;
    if (currentTowers >= sValue) {
      canAffordS = true;
    } else {
      const priceForS = wizardTower.getSumPrice(sValue - currentTowers);
      canAffordS = Game.cookies >= priceForS;
    }
  }

  // Check if the player has active buffs
  const hasActiveBuffs = Object.keys(Game.buffs)?.length > 0;

  // Check if the player has Grandmapocalypse active
  const gpocActive = Game.elderWrath > 0;

  const mana = Math.floor(minigame.magic);

  const isWebPlayer = typeof Steam === "undefined";

  return {
    towerLevel,
    nextSpellName,
    gfdRandomSeed,
    canAffordS,
    nextGfdWillBackfire,
    nextGfdRandomSeed,
    isWebPlayer,
    hasActiveBuffs,
    gpocActive,
    mana,
  };
};
