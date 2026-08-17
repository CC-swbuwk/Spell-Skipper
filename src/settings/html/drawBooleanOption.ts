import { settings } from "../settings";
import { SettingsOptionBoolean } from "../types";
import { drawOptionDescription } from "./drawOptionDescription";

export const drawBooleanOption = (
  parent: HTMLElement,
  option: SettingsOptionBoolean,
) => {
  const currentOptionValue = settings[option.id];

  const optionEl = document.createElement("a");
  optionEl.classList.add("smallFancyButton", "prefButton", "option");
  if (!currentOptionValue) optionEl.classList.add("off");
  optionEl.innerHTML = `${option.name} ${currentOptionValue ? "ON" : "OFF"}`;

  const setValue = (val: boolean) => {
    (settings[option.id] as boolean) = val;
    optionEl.innerHTML = `${option.name} ${val ? "ON" : "OFF"}`;
    optionEl.classList.toggle("off", !val);
  };

  optionEl.onclick = () => {
    const newValue = !settings[option.id];
    setValue(newValue);
    PlaySound("snd/tick.mp3");
    option.onChange?.(newValue);
  };

  parent.appendChild(optionEl);

  drawOptionDescription(parent, option.description);

  parent.appendChild(document.createElement("br"));
};
