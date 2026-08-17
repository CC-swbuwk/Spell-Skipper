import { drawOption, settingsOptions } from "../settings";
import { beautifyName } from "../util/beautifyName";

const addCustomSettings = () => {
  if (!l("menu")?.childNodes?.length) return;
  if (Game.onMenu !== "prefs") return;

  const settingsEl = document.createElement("div");
  settingsEl.id = `${process.env.APP_NAME}ModSettings`;
  settingsEl.className = "subsection";

  const settingsTitle = document.createElement("div");
  settingsTitle.className = "title";
  settingsTitle.innerHTML = `${beautifyName(process.env.APP_NAME!)} Settings`;

  const settingsListing = document.createElement("div");
  settingsListing.className = "listing";

  Object.values(settingsOptions).forEach((settingsOption) => {
    drawOption(settingsListing, settingsOption);
  });

  settingsEl.appendChild(settingsTitle);
  settingsEl.appendChild(settingsListing);

  l("menu")?.insertBefore(settingsEl, l("menu")?.childNodes[3] || null);
};

export const replaceNativeHandlers = () => {
  const initUpdateMenu = Game.UpdateMenu;
  Game.UpdateMenu = () => {
    initUpdateMenu();
    addCustomSettings();
  };
};
