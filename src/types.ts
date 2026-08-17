export type TowerData = {
  level: number;
  x: number;
  y: number;
  z: number | null;
  c: number | null;
  d1: number | null;
  d2: number | null;
  s: number | null;
  e1: number | null;
  e2: number | null;
  e3: number | null;
  n1: number | null;
  n2: number | null;
  n3: number | null;
  n4: number | null;
  tealX: boolean;
};

export type SpellName =
  | "ST"
  | "RA"
  | "CBG"
  | "FtHoF"
  | "HC"
  | "SCP"
  | "DI"
  | "SE";

export type SkipperData = {
  towerLevel: number;
  nextSpellName: SpellName;
  gfdRandomSeed: number;
  nextGfdRandomSeed: number;
  canAffordS: boolean;
  nextGfdWillBackfire: boolean;
  isWebPlayer: boolean;
  hasActiveBuffs: boolean;
  gpocActive: boolean;
  mana: number;
};

export type SkipInstruction = {
  instruction: string;
  warning?: string;
};
