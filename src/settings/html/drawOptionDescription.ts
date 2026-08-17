export const drawOptionDescription = (
  parent: HTMLElement,
  description: string | undefined,
  style?: Partial<CSSStyleDeclaration>,
) => {
  if (!description) return;

  const descriptionEl = document.createElement("label");
  if (style) Object.assign(descriptionEl.style, style);
  descriptionEl.innerHTML = description;
  parent.appendChild(descriptionEl);
};
