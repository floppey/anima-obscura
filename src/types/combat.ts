import { Creature, Ability } from "../classes/Creature";

export interface CombatLogEntry {
  turn: number;
  source: Creature;
  target: Creature;
  abilityUsed: Ability;
  damageDealt: number;
  wasCritical: boolean;
  // Extend as needed (status effects, misses, etc.)
}

export interface CombatContext {
  source: Creature;
  target: Creature;
  log: CombatLogEntry[];
  turn: number;
}
