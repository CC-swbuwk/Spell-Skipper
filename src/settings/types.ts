import type { Settings } from "./settings";

type BooleanSettingKey = {
  [K in keyof Settings]: Settings[K] extends boolean ? K : never;
}[keyof Settings];

type SwitchSettingKey = {
  [K in keyof Settings]: Settings[K] extends string ? K : never;
}[keyof Settings];

type SettingsOptionBase<K extends keyof Settings> = {
  id: K;
  name: string;
  description?: string;
  default: Settings[K];
  onChange?: (val: Settings[K]) => void;
};

export type SettingsOptionSwitch<
  K extends SwitchSettingKey = SwitchSettingKey,
> = SettingsOptionBase<K> & {
  type: "switch";
  values: string[];
};

export type SettingsOptionBoolean<
  K extends BooleanSettingKey = BooleanSettingKey,
> = SettingsOptionBase<K> & {
  type: "boolean";
};

export type SettingsOptionFor<K extends keyof Settings> =
  Settings[K] extends boolean
    ? SettingsOptionBoolean<Extract<K, BooleanSettingKey>>
    : SettingsOptionSwitch<Extract<K, SwitchSettingKey>>;

export type SettingsOptions = {
  [K in keyof Settings]: SettingsOptionFor<K>;
};

export type SettingsOption = SettingsOptions[keyof Settings];
