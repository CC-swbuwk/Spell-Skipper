import { settings, settingsOptions } from "./settings";

export const applySettings = () => {
  for (const option of Object.values(settingsOptions)) {
    if (!option.onChange) continue;

    if (option.type === "switch") {
      option.onChange(settings[option.id]);
    } else {
      option.onChange(settings[option.id]);
    }
  }
};
