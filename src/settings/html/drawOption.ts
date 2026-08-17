import { SettingsOption } from "../types";
import { drawBooleanOption } from "./drawBooleanOption";
import { drawStringOption } from "./drawSwitchOption";

export const drawOption = (parent: HTMLElement, option: SettingsOption) => {
  if (option.type === "switch") {
    drawStringOption(parent, option);
  } else {
    drawBooleanOption(parent, option);
  }
};
