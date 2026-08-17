import type { SettingsOptions } from "./types";

export type Settings = {
  difficulty: "standard" | "advanced" | "pro";
  showNextSpell: boolean;
  showSeeds: boolean;
  showWarnings: boolean;
};

export const settingsOptions: SettingsOptions = {
  difficulty: {
    id: "difficulty",
    name: "Mode",
    description:
      "Changes strategy based on chosen difficulty level. Higher difficulty - more complex strategy and more spells skipped per hour. Consider lowering difficulty if you're having trouble executing some strategies",
    type: "switch",
    default: "standard",
    values: ["standard", "advanced", "pro"],
  },
  showNextSpell: {
    id: "showNextSpell",
    name: "Show next spell",
    description: "Show next GFD spell",
    type: "boolean",
    default: true,
  },
  showSeeds: {
    id: "showSeeds",
    name: "Show seeds",
    description: "(technical) Show 2 next random seeds",
    type: "boolean",
    default: false,
  },
  showWarnings: {
    id: "showWarnings",
    name: "Show warnings",
    description: "Show simple warnings to not mess up the strategy",
    type: "boolean",
    default: true,
  },
};

export const settings = Object.fromEntries(
  Object.values(settingsOptions).map((option) => [option.id, option.default]),
) as Settings;
