import { Creature, CreatureType } from "../classes/Creature";

// 🌱 Verdling
export const Verdling = new Creature({
  name: "Verdling",
  weightRange: [5.5, 8],
  heightRange: [0.6, 1],
  types: [CreatureType.Grass],
  defense: 12,
  speed: 6,
  attack: 8,
  activeAbilities: [
    {
      name: "Rot Lash",
      description: "Whips the foe with decaying vines, leeching vitality.",
      type: CreatureType.Grass,
      pp: 20,
      damageRange: [8, 14],
      critChance: 0.1,
    },
    {
      name: "Sap Ward",
      description:
        "Envelops the user in thick sap, slightly reducing damage taken for a few turns.",
      type: CreatureType.Grass,
      pp: 10,
    },
  ],
  passiveAbility: {
    name: "Overgrowth",
    description:
      "Restores a small amount of health each turn when below half HP.",
    type: CreatureType.Grass,
  },
  lore: "Verdlings are born from roots that fed too long on buried bones. They twitch when moonlight touches them.",
});

// 🔥 Cindren
export const Cindren = new Creature({
  name: "Cindren",
  weightRange: [12, 18],
  heightRange: [0.8, 1.2],
  types: [CreatureType.Fire],
  defense: 8,
  speed: 10,
  attack: 12,
  activeAbilities: [
    {
      name: "Singe Bite",
      description: "Bites the foe with searing jaws, with a chance to burn.",
      type: CreatureType.Fire,
      pp: 15,
      damageRange: [10, 16],
      critChance: 0.15,
    },
    {
      name: "Ash Veil",
      description:
        "Shrouds the field in smoke, slightly lowering enemy accuracy.",
      type: CreatureType.Fire,
      pp: 5,
    },
  ],
  passiveAbility: {
    name: "Smolder",
    description:
      "Inflicts minor Fire-type damage to foes who strike it with physical attacks.",
    type: CreatureType.Fire,
  },
  lore: "Cindren were first found roaming ember fields where battle pyres once smoldered. Their breath always smells of soot.",
});

// 💧 Mirelit
export const Mirelit = new Creature({
  name: "Mirelit",
  weightRange: [8, 12],
  heightRange: [0.5, 0.9],
  types: [CreatureType.Water, CreatureType.Ghost],
  defense: 9,
  speed: 9,
  attack: 9,
  activeAbilities: [
    {
      name: "Drown Pulse",
      description: "Unleashes a pulse of cursed water that chills and harms.",
      type: CreatureType.Water,
      pp: 10,
      damageRange: [12, 18],
    },
    {
      name: "Phantom Current",
      description: "Creates an illusionary stream, confusing the target.",
      type: CreatureType.Ghost,
      pp: 10,
      damageRange: [4, 8],
    },
  ],
  passiveAbility: {
    name: "Sloughskin",
    description:
      "When struck by a super-effective attack, Mirelit sheds and regains some health.",
    type: CreatureType.Water,
  },
  lore: "Sailors whisper of lantern-lights under the swamp that lead to death. Mirelit is what watches from below.",
});
