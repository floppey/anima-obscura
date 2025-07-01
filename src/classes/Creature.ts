import { CombatContext, CombatLogEntry } from "../types/combat";

export enum CreatureType {
  Fire = "Fire",
  Water = "Water",
  Grass = "Grass",
  Electric = "Electric",
  Rock = "Rock",
  Ghost = "Ghost",
  Physical = "Physical",
  // Add more as needed
}

export interface Ability {
  name: string;
  description: string;
  type: CreatureType;
  pp: number; // Power Points (uses)
  speedMod?: number; // +/- value that modifies initiative
  damageRange?: [number, number];
  critChance?: number;
  effect?: (context: CombatContext) => void;
}

export interface PassiveAbility {
  name: string;
  description: string;
  type: CreatureType;
  effect?: (creature: Creature) => void; // Function to apply the effect
}

// New interface
interface Evolution {
  evolvesTo: string; // name of next creature
  requiredLevel?: number;
  requiredItem?: string;
  condition?: (creature: Creature) => boolean;
}

interface LearnableAbility {
  level: number;
  ability: Ability;
}

// Creature species definition (template)
export class CreatureTemplate {
  name: string;
  types: [CreatureType, CreatureType?];
  baseStats: { attack: number; defense: number; speed: number };
  weightRange: [number, number];
  heightRange: [number, number];
  activeAbilities: Ability[]; // starting moves
  learnableAbilities: LearnableAbility[];
  passiveAbility: PassiveAbility;
  evolution?: Evolution;
  lore: string;

  constructor({
    name,
    types,
    baseStats,
    weightRange,
    heightRange,
    activeAbilities = [],
    learnableAbilities = [],
    passiveAbility,
    evolution,
    lore = "",
  }: {
    name: string;
    types: [CreatureType, CreatureType?];
    baseStats: { attack: number; defense: number; speed: number };
    weightRange: [number, number];
    heightRange: [number, number];
    activeAbilities?: Ability[];
    learnableAbilities?: LearnableAbility[];
    passiveAbility: PassiveAbility;
    evolution?: Evolution;
    lore?: string;
  }) {
    this.name = name;
    this.types = types;
    this.baseStats = baseStats;
    this.weightRange = weightRange;
    this.heightRange = heightRange;
    this.activeAbilities = activeAbilities;
    this.learnableAbilities = learnableAbilities;
    this.passiveAbility = passiveAbility;
    this.evolution = evolution;
    this.lore = lore;
  }
}

export class Creature {
  template: CreatureTemplate;
  level: number;
  currentXP: number;
  knownAbilities: Ability[];
  weight: number;
  height: number;
  name: string;
  defense: number;
  speed: number;
  attack: number;
  passiveAbility: PassiveAbility;
  health: number; // Current health
  maxHealth: number; // Maximum health, can be derived from base stats

  constructor({
    name,
    defense,
    speed,
    attack,
    passiveAbility,
    knownAbilities,
    currentXP = 0,
    level = 1,
    template,
  }: {
    name: string;
    defense: number;
    speed: number;
    attack: number;
    passiveAbility: PassiveAbility;
    knownAbilities: Ability[];
    currentXP?: number;
    level?: number;
    template: CreatureTemplate;
  }) {
    this.template = template;
    this.level = level;
    this.currentXP = currentXP;
    this.knownAbilities = knownAbilities.slice(0, 6); // Limit to 6 known abilities
    const { weightRange, heightRange } = template;
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

    this.defense = defense;
    this.speed = speed;
    this.attack = attack;
    this.passiveAbility = passiveAbility;

    // Calculate max health based on base stats
    this.maxHealth = Math.floor(20 + this.defense * 2 + this.level * 5);
    this.health = this.maxHealth; // Start with full health
  }

  // Method to take damage
  takeDamage(amount: number, ability: Ability) {
    // Type effectiveness chart (simplified example)
    const effectiveness: Record<
      CreatureType,
      Partial<Record<CreatureType, number>>
    > = {
      [CreatureType.Fire]: {
        [CreatureType.Grass]: 2,
        [CreatureType.Water]: 0.5,
        [CreatureType.Rock]: 0.5,
      },
      [CreatureType.Water]: {
        [CreatureType.Fire]: 2,
        [CreatureType.Grass]: 0.5,
        [CreatureType.Rock]: 2,
        [CreatureType.Ghost]: 0.75,
      },
      [CreatureType.Grass]: {
        [CreatureType.Water]: 2,
        [CreatureType.Fire]: 0.5,
        [CreatureType.Rock]: 2,
        [CreatureType.Ghost]: 0.75,
      },
      [CreatureType.Electric]: {
        [CreatureType.Water]: 2,
        [CreatureType.Grass]: 0.5,
        [CreatureType.Ghost]: 0.75,
      },
      [CreatureType.Rock]: {
        [CreatureType.Fire]: 2,
        [CreatureType.Water]: 0.5,
        [CreatureType.Ghost]: 0.5,
      },
      [CreatureType.Ghost]: {},
      [CreatureType.Physical]: {
        [CreatureType.Rock]: 0.5,
        [CreatureType.Ghost]: 0,
      },
    };

    // Calculate type effectiveness
    let typeEffectiveness = 1;
    for (const targetType of this.template.types) {
      if (targetType) {
        const eff = effectiveness[ability.type]?.[targetType];
        if (eff !== undefined) {
          typeEffectiveness *= eff;
        }
      }
    }

    // Apply type effectiveness
    const finalDamage = Math.floor(amount * typeEffectiveness);
    this.health = Math.max(0, this.health - finalDamage);
  }

  attackCreature(
    ability: Ability,
    target: Creature,
    turn: number,
    log: CombatLogEntry[]
  ) {
    if (ability.pp <= 0) {
      console.warn(`${this.name} has no PP left for ${ability.name}`);
      return;
    }

    // Reduce PP
    ability.pp--;

    // Calculate damage
    const baseDamage = this.calculateBaseDamage(ability);
    let critMultiplier = 1;
    let wasCritical = false;
    if (Math.random() < (ability.critChance || 0)) {
      critMultiplier = 1.5 + Math.random() * 2.5; // 1.5x to 4x
      wasCritical = true;
    }
    const damage = Math.floor(baseDamage * critMultiplier + this.attack);

    // Apply damage to target
    target.takeDamage(damage, ability);

    // Apply any effects from the ability
    if (ability.effect) {
      ability.effect({
        log,
        turn,
        source: this,
        target,
      });
    }
  }

  heal(amount: number) {
    this.health = Math.min(this.maxHealth, this.health + amount);
  }

  private calculateBaseDamage(ability: Ability): number {
    if (!ability.damageRange) {
      return 0;
    }
    const [min, max] = ability.damageRange;
    if (typeof min !== "number" || typeof max !== "number" || min > max) {
      return 0;
    }
    return Math.floor(Math.random() * (max - min) + min);
  }
}
