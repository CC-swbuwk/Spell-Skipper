import { getSkipState } from "./core/getSkipState";
import { getSkipInstruction } from "./core/getSkipInstruction";
import { replaceNativeHandlers } from "./handlers/replaceNativeHandlers";
import { applySettings, Settings, settings } from "./settings";

const init = () => {
  replaceNativeHandlers();

  const grimoireUI = l("grimoireContent");
  const uiBlock = document.createElement("div");
  uiBlock.id = "SPSKBLock";
  uiBlock.style.marginTop = "10px";
  uiBlock.style.marginBottom = "10px";
  uiBlock.style.display = "flex";
  uiBlock.style.flexDirection = "column";
  uiBlock.style.gap = "4px";
  uiBlock.style.color = "rgba(255,255,255,0.75)";
  uiBlock.style.textAlign = "center";
  uiBlock.style.fontSize = "11px";

  if (grimoireUI) grimoireUI.appendChild(uiBlock);

  Game.registerHook("draw", () => {
    if (Game.drawT % 15 == 0) {
      const block = l("SPSKBLock");
      if (!block) return;

      const wizardTower = Game.Objects["Wizard tower"];
      if (!wizardTower || !wizardTower.minigame) return;

      const skipState = getSkipState(Game.Objects["Wizard tower"]);
      const instruction = getSkipInstruction(skipState);

      const isBackfireDisplay = skipState?.nextGfdWillBackfire
        ? "red"
        : "green";

      const nextSpell = settings.showNextSpell
        ? `<span>Next spell: <span class="${isBackfireDisplay}" style="margin: 0 4px;"><b>${skipState?.nextSpellName}</b></span></span>`
        : "";

      const randomSeeds = settings.showSeeds
        ? `<span>Random Seed: ${skipState?.gfdRandomSeed.toFixed(5)} | Next Random Seed: ${skipState?.nextGfdRandomSeed.toFixed(5)}</span>`
        : "";

      const strategy = `<b>${instruction.instruction}</b>`;

      const warnings = settings.showWarnings
        ? `<span class="warning">${instruction.warning ? `${instruction.warning}` : ""}</span>`
        : "";

      block.innerHTML = `${nextSpell}${randomSeeds}${strategy}${warnings}`;
    }
  });
};

const save = () => JSON.stringify(settings);

const load = (dataStr: string) => {
  const data = JSON.parse(dataStr) as Partial<Settings>;

  (Object.keys(data) as (keyof Settings)[]).forEach((key) => {
    if (key in settings && data[key] !== undefined) {
      (settings[key] as Settings[typeof key]) = data[
        key
      ] as Settings[typeof key];
    }
  });

  applySettings();
};

const SpellSkipperMod = {
  init,
  save,
  load,
};

if (!process.env.APP_NAME) {
  console.error("Failed to initialize the mod (app name missing)");
}

if (typeof Steam !== "undefined") {
  setTimeout(() => {
    Game.registerMod(process.env.APP_NAME!, SpellSkipperMod);
  }, 2000);
} else {
  Game.registerMod(process.env.APP_NAME!, SpellSkipperMod);
}
