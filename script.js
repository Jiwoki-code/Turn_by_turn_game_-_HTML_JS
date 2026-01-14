// Paragraph
const headerPara = document.getElementById("headerPara");
const mainPara = document.getElementById("mainPara");
const footerPara = document.getElementById("footerPara");

const playerName = document.getElementById("name");
playerName.value = "Renault";

// all button
const btnName = document.getElementById("btnName");
const btnPassion = document.getElementById("btnPassion");
btnPassion.style.display = "none";
const btnContinue = document.getElementById("btnContinue");
btnContinue.style.display = "none";
const btnStart = document.getElementById("btnStart");
btnStart.style.display = "none";

// all checkbox
const swordFightCheckbox = document.getElementById("swordFight");
const survivalismCheckbox = document.getElementById("survivalism");

const order = document.getElementById("order");
const playerPassionQuestion = document.getElementById("playerPassionQuestion");
playerPassionQuestion.style.display = "none";
const divHeader = document.getElementById("header");

const monstersGalleryDiv = document.getElementById("monstersGalleryDiv");
monstersGalleryDiv.style.display = "none";

const combatDiv = document.getElementById("combatDiv");
combatDiv.style.display = "none";

const introductionText = [
        `Like many newborns, you were abandoned at the Temple of Lost Souls.
        <br>The monks took you in and cared for you during your early years.
        <br>As you were an orphan, at the age of six, when you learned to read and write, you were given the opportunity to choose your name.`, // first part
        `Until your adolescence, you receive a strict but fair education. In addition to general knowledge, you receive various training courses such as combat and survival skills.
        <br>You will develop a passion for one of the skills that will stay with you throughout your life.`, // second part
        `You know how the temple works: Once they reach adulthood, orphans either leave the temple forever or stay for the rest of their lives to help lost souls.
        <br>Since you're not considering the second option, you're preparing for your departure.` // last part
];

// Instantiate monsters attributes
const monsterSprites = [
        "https://pixeljoint.com/files/icons/blob__r132928521.gif", //  0 - slime
        "https://pixeljoint.com/files/icons/mature_skeletroid_standing.gif", // 1 - demon
        "https://pixeljoint.com/files/icons/zoooo.gif", // 2 - zombie
        "https://pixeljoint.com/files/icons/skeletonattack.gif", // 3 - skeleton
        "https://pixeljoint.com/files/icons/finaltrans.gif", // 4 - shrimp
        "https://pixeljoint.com/files/icons/full/toxicsonic_boss_idle.gif" // 5 - boss
];
const monsterWidth = [55, 64, 50, 70, 64, 80];
let monsters = [];
let monsterName;
let monsterEndurence;
let monsterHabilite;
let monsterDamage;

// Instantiate player attributes
let startHabilite = 0;
let startEndurence = 0;
let startChance = 0;
let startDamage = 0;
let currentHabilite = 0;
let currentEndurence = 0;
let currentChance = 0;
let currentDamage = 0;
let playerPassion = "";

function getRandomIntInclusive(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
}

function playerNameIsCorrect(name) {
        if (name.length >= 4 && name.length <= 10) {
                return true;
        } else {
                return false;
        }
}

function getPlayerName() {
        const name = playerName.value.trim();

        if (!playerNameIsCorrect(name)) {
                headerPara.innerHTML = introductionText[0] + "<br> Chose a name between four and ten characters long!";
                return;
        }
        headerPara.innerHTML = `You chose the name of "${name}".`;
        playerName.style.display = "none";
        order.style.display = "none";
        btnName.style.display = "none";
        btnPassion.style.display = "inline";
        playerPassionQuestion.style.display = "block";
        footerPara.innerHTML = introductionText[1];
}

function getPlayerPassion() {
        mainPara.innerHTML = introductionText[1];

        if (swordFightCheckbox.checked) {
                playerPassion = "swordFighting";
                footerPara.innerHTML = "You are passionate about <strong>sword fighting</strong> and you spend hours practicing your swordplay in the courtyard at such a young age.";
        } else {
                playerPassion = "survivalism";
                footerPara.innerHTML = "You are passionate about <strong>survivalism</strong> and you spent your childhood wandering in nature and observing animals.";
        }

        btnPassion.style.display = "none";
        playerPassionQuestion.style.display = "none";
        btnContinue.style.display = "inline";
}

function initiatePlayerAttributes() {
        startHabilite = getRandomIntInclusive(1, 6) + 6;
        startEndurence = getRandomIntInclusive(1, 6) + getRandomIntInclusive(1, 6) + 12;
        startChance = getRandomIntInclusive(1, 6) + getRandomIntInclusive(1, 6) + getRandomIntInclusive(1, 6) - 2;
        startDamage = 2;

        console.log("Starting Habilite: " + startHabilite);
        console.log("Starting Endurence: " + startEndurence);
        console.log("Starting Chance: " + startChance);
        console.log("Starting Damage: " + startDamage);
        console.log("Passion: " + playerPassion);

        if (playerPassion === "swordFighting") {
                startHabilite += 2;
        }
        if (playerPassion === "survivalism") {
                startEndurence += 4;
        }

        currentHabilite = startHabilite;
        currentEndurence = startEndurence;
        currentChance = startChance;
        currentDamage = startDamage;
        console.log("Current Habilite: " + currentHabilite);
        console.log("Current Endurence: " + currentEndurence);
        console.log("Current Chance: " + currentChance);
        console.log("Current Damage: " + currentDamage);
}

function creatMonster(monsterNmbr) {

        for (let i = 0; i < 6; i++) {
                let monsterFigure = document.getElementById(`monster${i + 1}`);
                monsterFigure.innerHTML = "";
        }


        for (let i = 0; i < monsterNmbr; i++) {
                let x = getRandomIntInclusive(1, 6);
                let monsterFigure = document.getElementById(`monster${i + 1}`);
                console.log(`monster${i}`);
                switch (x) {
                        case 1:
                                console.log("A SLIME appears!");
                                monsterName = "SLIME";
                                monsterHabilite = getRandomIntInclusive(6, 8);
                                monsterEndurence = getRandomIntInclusive(3, 5);
                                monsterDamage = 1;

                                break;
                        case 2:
                                console.log("A DEMON appears!");
                                monsterName = "DEMON";
                                monsterHabilite = getRandomIntInclusive(7, 9);
                                monsterEndurence = getRandomIntInclusive(4, 6);
                                monsterDamage = 2;
                                break;
                        case 3:
                                console.log("A ZOMBIE appears!");
                                monsterName = "ZOMBIE";
                                monsterHabilite = getRandomIntInclusive(6, 8);
                                monsterEndurence = getRandomIntInclusive(5, 7);
                                monsterDamage = 2;
                                break;
                        case 4:
                                console.log("A SKELETON appears!");
                                monsterName = "SKELETON";
                                monsterHabilite = getRandomIntInclusive(8, 10);
                                monsterEndurence = getRandomIntInclusive(2, 4);
                                monsterDamage = 2;
                                break;
                        case 5:
                                console.log("A SHRIMP appears!");
                                monsterName = "SHRIMP";
                                monsterHabilite = getRandomIntInclusive(10, 12);
                                monsterEndurence = 1;
                                monsterDamage = 0;
                                break;
                        case 6:
                                console.log("A BOSS appears!");
                                monsterName = "BOSS";
                                monsterHabilite = getRandomIntInclusive(10, 12);
                                monsterEndurence = 7;
                                monsterDamage = 3;
                                break;
                        default:
                                console.log("No monster appears!");
                }
                monsterFigure.innerHTML = `<figcaption><strong>${monsterName}</strong><br><em>HABILITE: </em>${monsterHabilite}<br><em>ENDURENCE: </em>${monsterEndurence}<br><em>DAMAGE: </em>${monsterDamage}</figcaption>
                <img id="img1" src=${monsterSprites[x - 1]} width="${monsterWidth[x - 1]}"></img>`;
                monsters[i] = [monsterHabilite, monsterEndurence, monsterDamage]
        }
}

headerPara.innerHTML = introductionText[0];
console.log("Getting player name ..");
btnName.addEventListener("click", getPlayerName);
console.log("Getting player passion ..");
btnPassion.addEventListener("click", getPlayerPassion);
console.log("Passion: " + playerPassion);
console.log("Initiate Player Attributes ..");
btnContinue.addEventListener("click", function () {
        initiatePlayerAttributes();
        mainPara.innerHTML = `One day, you take to the road. You present yourself as <strong>${playerName.value}</strong>, claiming to be a <strong>${playerPassion} expert</strong> to who wants to hear it.`;
        headerPara.innerHTML = introductionText[2];
        footerPara.innerHTML = "Habitilite: " + currentHabilite + "<br>Endurence: " + currentEndurence + "<br>Chance: " + currentChance + "<br>Damage: " + currentDamage;
        btnContinue.style.display = "none";
        btnStart.style.display = "inline";
});
btnStart.addEventListener("click", function () {
        console.log("Starting the game ..");
        combatDiv.style.display = "inline";
        creatMonster(getRandomIntInclusive(1, 6));
        mainPara.innerHTML = "";
        headerPara.innerHTML = "";
        footerPara.innerHTML = "";
        monstersGalleryDiv.style.display = "block";
});