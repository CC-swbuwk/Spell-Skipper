import { settings } from "../settings";
import { SettingsOptionSwitch } from "../types";
import { drawOptionDescription } from "./drawOptionDescription";

export const drawStringOption = (
  parent: HTMLElement,
  option: SettingsOptionSwitch,
) => {
  const currentOptionValue = settings[option.id];

  const optionEl = document.createElement("a");
  optionEl.classList.add("smallFancyButton", "prefButton", "option");
  optionEl.innerHTML = `${option.name}: ${currentOptionValue}`;

  const setValue = (val: string) => {
    (settings[option.id] as string) = val;
    optionEl.innerHTML = `${option.name}: ${val}`;
  };

  optionEl.onclick = () => {
    const currentValue = settings[option.id];
    const currentIndex = option.values.indexOf(currentValue);
    const newValue = option.values[
      (currentIndex + 1) % option.values.length
    ] as typeof currentValue;

    setValue(newValue);
    PlaySound("snd/tick.mp3");
    option.onChange?.(newValue);
  };

  parent.appendChild(optionEl);

  drawOptionDescription(parent, option.description);

  parent.appendChild(document.createElement("br"));
};
