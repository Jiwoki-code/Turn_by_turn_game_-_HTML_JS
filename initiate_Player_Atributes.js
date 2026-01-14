// Instantiate player attributes
let startHabilite = 0;
let startEndurence = 0;
let startChance = 0;
let startDamage = 0;
let currentHabilite = 0;
let currentEndurence = 0;
let currentChance = 0;
let currentDamage = 0;
let playerPassion = "swordFighting";

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function initiatePlayerAtributes(_startHabilite, _startEndurence, _startChance, _startDamage) {
        console.log("Initiate Player Atributes ..");

        _startHabilite = getRandomIntInclusive(1, 6) + 6;
        _startEndurence = getRandomIntInclusive(1, 6) + getRandomIntInclusive(1, 6) + 12;
        _startChance = getRandomIntInclusive(1, 6) + getRandomIntInclusive(1 ,6) + getRandomIntInclusive(1 ,6) - 3;
        _startDamage = 2;

        startHabilite = _startHabilite;
        startEndurence = _startEndurence;
        startChance = _startChance;
        startDamage = _startDamage;
        console.log("Starting Habilite: " + startHabilite);
        console.log("Starting Endurence: " + startEndurence);
        console.log("Starting Chance: " + startChance);
        console.log("Starting Damage: " + startDamage);

        if (playerPassion == "swordFighting") startDamage += 1;
        if (playerPassion == "survivalism") startEndurence += 4;

        currentHabilite = startHabilite;
        currentEndurence = startEndurence;
        currentChance = startChance;
        currentDamage = startDamage;
        console.log("Current Habilite: " + currentHabilite);
        console.log("Current Endurence: " + currentEndurence);
        console.log("Current Chance: " + currentChance);
        console.log("Current Damage: " + currentDamage);
}

initiatePlayerAtributes(startHabilite, startEndurence, startChance, startDamage)


