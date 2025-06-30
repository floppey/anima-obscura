// Creature.ts
// Represents a catchable/battlable creature in the game world

export enum CreatureType {
  Fire = "Fire",
  Water = "Water",
  Grass = "Grass",
  Electric = "Electric",
  Rock = "Rock",
  Ghost = "Ghost",
  // Add more as needed
}

export interface Ability {
  name: string;
  description: string;
  type: CreatureType;
  pp: number; // Power Points (uses)
  damageRange?: [number, number];
  critChance?: number; // Optional, use global default if not set
  effect?: (creature: Creature) => void; // Function to apply the effect
}

export interface PassiveAbility {
  name: string;
  description: string;
  type: CreatureType;
  effect?: (creature: Creature) => void; // Function to apply the effect
}

export class Creature {
  name: string;
  weight: number;
  height: number;
  weightRange: [number, number];
  heightRange: [number, number];
  types: [CreatureType, CreatureType?];
  defense: number;
  speed: number;
  attack: number;
  activeAbilities: Ability[]; // up to 6
  passiveAbility: PassiveAbility;
  lore: string;

  constructor({
    name,
    weightRange,
    heightRange,
    types,
    defense,
    speed,
    attack,
    activeAbilities,
    passiveAbility,
    lore,
  }: {
    name: string;
    weightRange: [number, number];
    heightRange: [number, number];
    types: [CreatureType, CreatureType?];
    defense: number;
    speed: number;
    attack: number;
    activeAbilities: Ability[];
    passiveAbility: PassiveAbility;
    lore: string;
  }) {
    this.name = name;
    this.weight =
      Math.round(
        (Math.random() * (weightRange[1] - weightRange[0]) + weightRange[0]) *
          100
      ) / 100;
    this.height =
      Math.round(
        (Math.random() * (heightRange[1] - heightRange[0]) + heightRange[0]) *
          100
      ) / 100;
    this.weightRange = weightRange;
    this.heightRange = heightRange;
    this.types = types;
    this.defense = defense;
    this.speed = speed;
    this.attack = attack;
    this.activeAbilities = activeAbilities.slice(0, 6);
    this.passiveAbility = passiveAbility;
    this.lore = lore;
  }
}
