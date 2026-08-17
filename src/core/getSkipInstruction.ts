import { TOWER_TABLE } from "../constants";
import { settings } from "../settings";
import { SkipInstruction, SkipperData, TowerData } from "../types";

const buffsWarning = `You have active buffs. Wait for them to run out before skipping.`;
const gpocWarning = `Grandmapocalypse is active. Turn it off before skipping.`;
const manaWarning = `You should have exactly 25 magic before skipping.`;
const neededMana = 25;

const validateVars = (...vars: (number | null)[]): boolean => {
  return vars.every((v) => v !== null);
};

const getTowerData = (towerLevel: number) => {
  const levelIndex = Math.min(Math.max(towerLevel - 1, 0), 9);
  return TOWER_TABLE[levelIndex];
};

const castX = (data: TowerData) =>
  data.tealX
    ? `Slot Supreme Intellect, cast GFD with ${data.x} towers, unslot SI`
    : `Cast GFD with ${data.x} towers`;

const step2 = (state: SkipperData): SkipInstruction => {
  const {
    nextSpellName: spell,
    hasActiveBuffs,
    gpocActive,
    towerLevel,
    mana,
  } = state;

  const data = getTowerData(towerLevel);

  let warning: string | undefined;
  if (mana !== neededMana) warning = manaWarning;
  if (["CBG", "FtHoF", "ST"].includes(spell) && hasActiveBuffs)
    warning = buffsWarning;
  if (["RA", "HC", "SCP"].includes(spell) && gpocActive) warning = gpocWarning;

  if (spell === "ST" || spell === "RA") {
    return {
      instruction: `${castX(data)} and let resolve.`,
      warning,
    };
  }

  if (["CBG", "FtHoF", "HC", "SCP"].includes(spell)) {
    return {
      instruction: `Cast GFD with ${data.y} towers and let resolve.`,
      warning,
    };
  }

  return {
    instruction: `Unknown spell: ${spell}`,
    warning,
  };
};

const step2a = (state: SkipperData): SkipInstruction => {
  const { nextGfdRandomSeed: nextRs, towerLevel, mana } = state;
  const levelIndex = Math.min(Math.max(towerLevel - 1, 0), 9);
  const data = TOWER_TABLE[levelIndex];

  let instruction: string | undefined;

  if (settings.difficulty !== "pro") return step3(state);

  if (nextRs <= 0.33333 && validateVars(data.e1, data.n1)) {
    instruction = `Cast GFD with ${data.e1} towers, sell to ${data.n1} towers, and cast GFD again within 1s.`;
  } else if (
    nextRs > 0.33333 &&
    nextRs < 0.4 &&
    validateVars(data.e1, data.n2)
  ) {
    instruction = `Cast GFD with ${data.e1} towers, sell to ${data.n2} towers, and cast GFD again within 1s.`;
  } else if (
    nextRs >= 0.4 &&
    nextRs < 0.42857 &&
    validateVars(data.e2, data.n4)
  ) {
    instruction = `Cast GFD with ${data.e2} towers, sell to ${data.n4} towers, and cast GFD again within 1s.`;
    if (towerLevel === 3 || towerLevel === 4) {
      instruction +=
        " (After first resolve but before second, buy at least 100 Wizard Towers).";
    }
  } else if (
    nextRs >= 0.66667 &&
    nextRs < 0.83333 &&
    validateVars(data.e3, data.n3)
  ) {
    instruction = `Cast GFD with ${data.e3} towers, sell to ${data.n3} towers, and cast GFD again within 1s.`;
  } else if (
    nextRs >= 0.83333 &&
    nextRs < 0.85714 &&
    validateVars(data.e2, data.n4)
  ) {
    instruction = `Cast GFD with ${data.e2} towers, sell to ${data.n4} towers, and cast GFD again within 1s.`;
    if (towerLevel === 3 || towerLevel === 4) {
      instruction +=
        " (After first resolve but before second, buy at least 100 Wizard Towers).";
    }
  } else {
    return step3(state);
  }

  let warning: string | undefined;
  if (mana !== neededMana) warning = manaWarning;

  return {
    instruction,
    warning,
  };
};

const step2b = (state: SkipperData): SkipInstruction => {
  const {
    nextGfdRandomSeed: nextRs,
    towerLevel,
    isWebPlayer,
    nextGfdWillBackfire,
    mana,
  } = state;
  const levelIndex = Math.min(Math.max(towerLevel - 1, 0), 9);
  const data = TOWER_TABLE[levelIndex];

  if (settings.difficulty !== "pro") return step3(state);

  let instruction: string | undefined;

  if (nextRs >= 0 && nextRs < 0.5) {
    instruction = `${castX(data)}, and before resolving, buy at least 400 Wizard towers.`;
  } else if (nextRs >= 0.5 && nextRs < 0.6 && validateVars(data.y)) {
    instruction = `Slot Supreme Intellect (if not already), cast GFD with ${data.x} towers, then within 1s buy to ${data.y} towers and cast GFD. Afterwards, unslot SI.`;
  } else if (nextRs >= 0.6 && nextRs < 0.71428 && validateVars(data.c)) {
    instruction = `${castX(data)}, then within 1s buy to ${data.c} towers and cast GFD.`;
  } else if (nextRs >= 0.71428 && nextRs < 0.85714) {
    instruction = `${castX(data)}, twice in quick succession (within 1s).`;
  } else if (nextRs >= 0.85714 && nextRs < 0.875) {
    if (towerLevel < 6) {
      instruction = `Cast GFD with ${data.x} towers, slot SI, cast GFD again. Afterwards, unslot SI.`;
    } else {
      return step3(state);
    }
  } else if (nextRs >= 0.875) {
    const reloadStr = isWebPlayer
      ? "save and reload (Ctrl+S -> Reload)"
      : "save and reload (Export -> Import)";

    if (nextGfdWillBackfire) {
      if (!validateVars(data.d1)) return step3(state);
      instruction = `Have ${data.d1} towers and full magic. Cast GFD, slot SI, cast GFD again. After 1st resolves but before 2nd, ${reloadStr}. Afterwards, unslot SI.`;
    } else {
      if (!validateVars(data.d2)) return step3(state);
      instruction = `Have ${data.d2} towers and full magic. Cast GFD twice in quick succession, then buy >=400 Wizard towers (all within 1s). After 1st resolves but before 2nd, ${reloadStr}.`;
    }
  } else {
    return step3(state);
  }

  let warning: string | undefined;
  if (mana !== neededMana) warning = manaWarning;

  return {
    instruction,
    warning,
  };
};

const step3 = (state: SkipperData): SkipInstruction => {
  const { towerLevel, isWebPlayer } = state;
  const rbString = towerLevel === 8 ? " (And Reality Bending)" : "";
  const auraString = ` Slot Supreme Intellect${rbString}.`;

  const isAdvanced = ["advanced", "pro"].includes(settings.difficulty);

  const reloadStr = isWebPlayer
    ? "Save using Ctrl + S, then immediately reload browser"
    : "Immediately export save, then import save";

  if (settings.difficulty === "standard") {
    return {
      instruction: `Wait for exactly 25 magic. Have minimum towers. Cast GFD. Before it resolves: ${reloadStr}.`,
    };
  }

  return {
    instruction: `Wait for exactly 28 magic. Have minimum towers.${isAdvanced ? auraString : ""} Cast GFD. Before it resolves: ${reloadStr}.`,
  };
};

/**
 * Returns the exact GFDSS strategy instruction based on current seed, magic state and mode in the settings.
 */
export function getSkipInstruction(state: SkipperData): SkipInstruction {
  const {
    nextSpellName: spell,
    gfdRandomSeed: rs,
    towerLevel,
    canAffordS,
    hasActiveBuffs,
    gpocActive,
  } = state;

  const data = getTowerData(towerLevel);

  if (["ST", "RA", "CBG", "FtHoF", "HC", "SCP"].includes(spell))
    return step2(state);

  // Following steps are only viable via advanced or pro difficulty
  if (settings.difficulty === "standard") return step3(state);

  // Only viable via pro difficulty
  if (spell === "DI") {
    return step2a(state);
  }

  if (rs >= 0.375 && rs < 0.42857 && validateVars(data.z)) {
    return {
      instruction: `Cast GFD with ${data.z} towers and let resolve.`,
      warning: hasActiveBuffs ? buffsWarning : undefined,
    };
  }

  if (canAffordS && validateVars(data.s)) {
    return {
      instruction: `Cast GFD with ${data.s} towers and let resolve.`,
      warning: gpocActive ? gpocWarning : undefined,
    };
  }

  // Only viable via pro difficulty
  if (spell === "SE") {
    return step2b(state);
  }

  return step3(state);
}
