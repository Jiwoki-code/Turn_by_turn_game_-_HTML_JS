// Paragraph
const headerPara = document.getElementById("headerPara");
const mainPara = document.getElementById("mainPara");
const footerPara = document.getElementById("footerPara");
const combatLog = document.getElementById("combatLog");

const playerName = document.getElementById("name");
playerName.value = "Renault";
const playerDesc = document.getElementById("playerDesc");
const playerHUD = document.getElementById("playerHUD");

// all button
const btnName = document.getElementById("btnName");
const btnPassion = document.getElementById("btnPassion");
btnPassion.style.display = "none";
const btnContinue = document.getElementById("btnContinue");
btnContinue.style.display = "none";
const btnStart = document.getElementById("btnStart");
btnStart.style.display = "none";
const btnAttack = document.getElementById("btnAttack");
const btnChance = document.getElementById("btnChance");
btnChance.style.display = "none";
const btnQuestion = document.getElementById("btnQuestion");
btnQuestion.style.display = "none";
const btnGoNext = document.getElementById("btnGoNext");
btnGoNext.style.display = "none";
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
let monsters = [];
let monsterId = 0;
let monsterName = 0;
let monsterHabilite = 0;
let monsterEndurence = 0;
let monsterDamage = 0;
const monsterWidth = [55, 64, 50, 70, 64, 80];
const monsterSprite = [
        "https://pixeljoint.com/files/icons/blob__r132928521.gif", //  0 - slime
        "https://pixeljoint.com/files/icons/mature_skeletroid_standing.gif", // 1 - demon
        "https://pixeljoint.com/files/icons/zoooo.gif", // 2 - zombie
        "https://pixeljoint.com/files/icons/skeletonattack.gif", // 3 - skeleton
        "https://pixeljoint.com/files/icons/finaltrans.gif", // 4 - shrimp
        "https://pixeljoint.com/files/icons/full/toxicsonic_boss_idle.gif" // 5 - boss
];

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

// combat var
let combatLogPara = "";
let getHit = false;
let isLucky = true;

// initiate targeting tools
let target = 0;
let actualMonster = [];
let futureMonster = [];
let futureMonsterName = "";

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
        console.log("Getting player name ..");
        const name = playerName.value.trim();

        if (!playerNameIsCorrect(name)) {
                headerPara.innerHTML = introductionText[0] + "<br> Chose a name between four and ten characters long!";
                return;
        }
        headerPara.innerHTML = `You chose the name of "${name}".`;
        console.log("Player name: " + name);

        playerName.style.display = "none";
        order.style.display = "none";
        btnName.style.display = "none";
        btnPassion.style.display = "inline";
        playerPassionQuestion.style.display = "block";
        footerPara.innerHTML = introductionText[1];
}

function getPlayerPassion() {
        console.log("Getting player passion ..");
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
        console.log("Passion: " + playerPassion);
}

function initiatePlayerAttributes() {
        console.log("Initiate Player Attributes ..");
        startHabilite = getRandomIntInclusive(1, 6) + 6;
        startEndurence = getRandomIntInclusive(1, 6) + getRandomIntInclusive(1, 6) + 12;
        startChance = getRandomIntInclusive(1, 6) + getRandomIntInclusive(1, 6) + getRandomIntInclusive(1, 6) - 2;
        startDamage = 2;

        console.log("Starting Habilite: " + startHabilite);
        console.log("Starting Endurence: " + startEndurence);
        console.log("Starting Chance: " + startChance);
        console.log("Starting Damage: " + startDamage);

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
        console.log("Getting monsters ..");
        for (let i = 0; i < 6; i++) {
                let monsterFigure = document.getElementById(`monster${i + 1}`);
                monsterFigure.innerHTML = "";

        }
        for (let i = 0; i < monsterNmbr; i++) {
                let x = getRandomIntInclusive(1, 6);
                switch (x) {
                        case 1:
                                console.log("A SLIME appears!");
                                monsterName = `${i + 1} - SLIME`;
                                monsterHabilite = getRandomIntInclusive(6, 10);
                                monsterEndurence = getRandomIntInclusive(3, 5);
                                monsterDamage = 1;
                                break;
                        case 2:
                                console.log("A DEMON appears!");
                                monsterName = `${i + 1} - DEMON`;
                                monsterHabilite = getRandomIntInclusive(7, 11);
                                monsterEndurence = getRandomIntInclusive(4, 6);
                                monsterDamage = 2;
                                break;
                        case 3:
                                console.log("A ZOMBIE appears!");
                                monsterName = `${i + 1} - ZOMBIE`;
                                monsterHabilite = getRandomIntInclusive(6, 10);
                                monsterEndurence = getRandomIntInclusive(5, 7);
                                monsterDamage = 2;
                                break;
                        case 4:
                                console.log("A SKELETON appears!");
                                monsterName = `${i + 1} - SKELETON`;
                                monsterHabilite = getRandomIntInclusive(8, 12);
                                monsterEndurence = getRandomIntInclusive(2, 4);
                                monsterDamage = 2;
                                break;
                        case 5:
                                console.log("A SHRIMP appears!");
                                monsterName = `${i + 1} - SHRIMP`;
                                monsterHabilite = getRandomIntInclusive(10, 14);
                                monsterEndurence = 1;
                                monsterDamage = 0;
                                break;
                        case 6:
                                console.log("A BOSS appears!");
                                monsterName = `${i + 1} - BOSS`;
                                monsterHabilite = getRandomIntInclusive(10, 14);
                                monsterEndurence = 7;
                                monsterDamage = 3;
                                break;
                        default:
                                console.log("No monster appears!");
                }
                monsterId = i;
                monsters[i] = [monsterId, monsterName, monsterHabilite, monsterEndurence, monsterDamage, monsterWidth[x - 1], monsterSprite[x - 1]];
        }
        console.log(monsters.length + " monsters appears");
        actualMonster = monsters[0];
}

// monsters[monster[0 - id, 1 - name, 2 - habilite, 3 - endurence, 4 - damage, 5 - width, 6 - sprite], monster[1], ect..]
function battleResult(monster) {

        combatLogPara = monster[1] + " ";
        let monsterAttackForce = monster[2] + getRandomIntInclusive(1, 6);
        let playerAttackForce = currentHabilite + getRandomIntInclusive(1, 6);
        if (playerAttackForce > monsterAttackForce) {
                combatLogPara += `You gained the upper hand in the exchange `;
                getHit = false;
        } else if (playerAttackForce === monsterAttackForce) {
                combatLogPara += `You don't touch each other`;
                btnChance.style.display = "none";
                btnQuestion.style.display = "none";
                btnGoNext.innerHTML = "Go next";
                getHit = false;
        } else if (playerAttackForce < monsterAttackForce) {
                combatLogPara += ` gained the upper hand in the exchange `;
                getHit = true;
        }
        combatLog.innerHTML = combatLogPara;
}

function setATarget() {
        if (!monsters.length) return;
        if (target >= monsters.length) {
                target = 0;
        }
        //récupère le monstre actuel
        actualMonster = monsters[target];

        const nextIndex = (target + 1) % monsters.length;
        futureMonsterName = monsters[nextIndex][1];
        btnAttack.innerHTML = `Attack ${futureMonsterName}`;
        battleResult(actualMonster);
        console.log(target);
}

function newTarget() {
        if (monsters.length <= 1) {
                target = 0;
        } else if (monsters.length !== 1 && target < monsters.length - 1) {
                target++;
        } else {
                target = 0;
        }
}

function useLuck() {
        currentChance--;
        console.log(currentChance);
        let drawing = getRandomIntInclusive(1, 6) + getRandomIntInclusive(1, 6);
        if (currentChance <= drawing) {
                isLucky = true;
        } else {
                isLucky = false;
        }

}

function isUsingLuck() {
        useLuck();
        if (getHit) {
                if (isLucky) {
                        currentEndurence -= actualMonster[4] - 1;
                        combatLog.innerHTML += `but you're lucky and the monster only gives you a scratch.`;
                } else {
                        currentEndurence -= actualMonster[4] + 1;
                        combatLog.innerHTML += `you're not lucky and the injury is serious.`;
                }

        } else if (!getHit) {
                if (isLucky) {
                        actualMonster[3] -= currentDamage + 1;
                        combatLog.innerHTML += `you're lucky and the blow is devastating.`;
                } else {
                        actualMonster[3] -= currentDamage - 1;
                        combatLog.innerHTML += `you're out of luck and you're only scratching of the monster.`;
                }

        }

        update();
        killMonster();
        console.log("currentEndurence" + currentEndurence);
        console.log("actualMonsterEndurence" + actualMonster[3]);
}

function isNotUsingLuck() {
        if (getHit) {
                currentEndurence -= actualMonster[4];
        } else {
                actualMonster[3] -= currentDamage;
        }
        killMonster();
}

function killMonster() {
        if (actualMonster[3] <= 0) {
                monsters.splice(target, 1);
                console.log("Killed: " + actualMonster + "monsters.length: " + monsters.length);
                update();
                if (target >= monsters.length) {
                        target = 0;
                }
        } else {
                newTarget();
        }
        update();
}

function update() {
        for (let i = 0; i < 6; i++) {
                let monsterFigure = document.getElementById(`monster${i + 1}`);
                monsterFigure.innerHTML = "";
        }
        playerDesc.innerHTML =
                `<strong>${playerName.value}</strong><br>
                <em>HABILITE: ${currentHabilite}</em><br>
                <em>ENDURENCE: ${currentEndurence}</em><br>
                <em>CHANCE: ${currentChance}</em><br>
                <em>DAMAGE: ${currentDamage}</em>`;
        for (let i = 0; i < monsters.length; i++) {
                let monsterFigure = document.getElementById(`monster${i + 1}`);
                let temp = monsters[i];
                monsterFigure.innerHTML =
                        `<figcaption><strong>${temp[1]}</strong><br>
                        <em>HABILITE: </em>${temp[2]}<br>
                        <em>ENDURENCE: </em>${temp[3]}<br>
                        <em>DAMAGE: </em>${temp[4]}</figcaption>
                        <img id="img1" src=${temp[6]} width="${temp[5]}"></img>`;
        }
}

const actionsDiv = document.getElementById("actions");

function gameOver() {
        console.log(monsters.length)
        if (monsters.length == 0) {
                divHeader.innerHTML = "<header><h1>GAME OVER</h1></header>";
                headerPara.innerHTML = "Thanks for playing";
                mainPara.innerHTML = "";
                footerPara.innerHTML = "";
                // combatDiv.style.display = "none";
                actionsDiv.style.display = "none";
                combatLog.style.display = "none";
                btnGoNext.style.display = "none";    
        }
}

headerPara.innerHTML = introductionText[0];
btnName.addEventListener("click", getPlayerName);
btnPassion.addEventListener("click", getPlayerPassion);
btnContinue.addEventListener("click", function () {
        initiatePlayerAttributes();
        mainPara.innerHTML = `One day, you take to the road. You present yourself as <strong>${playerName.value}</strong>, claiming to be a <strong>${playerPassion} expert</strong> to who wants to hear it.`;
        headerPara.innerHTML = introductionText[2];
        footerPara.innerHTML = "";
        btnContinue.style.display = "none";
        btnStart.style.display = "inline";
        update();
});
btnStart.addEventListener("click", function () {
        monsters.length = 0;
        btnStart.style.display = "none";
        console.log("Starting the game ..");
        combatDiv.style.display = "inline";
        creatMonster(getRandomIntInclusive(3, 6));
        mainPara.innerHTML = "";
        headerPara.innerHTML = "";
        footerPara.innerHTML = "";
        update();
});
btnAttack.addEventListener("click", function () {
        btnAttack.style.display = "none";
        btnGoNext.style.display = "inline";
        btnChance.style.display = "inline";
        btnQuestion.style.display = "inline";
        setATarget();
        update();
});
btnGoNext.addEventListener("click", function () {
        btnGoNext.innerHTML = "Don't use your luck";
        btnAttack.style.display = "inline";
        btnGoNext.style.display = "none";
        btnChance.style.display = "none";
        btnQuestion.style.display = "none";
        isNotUsingLuck();
        update();
        gameOver();
});
btnChance.addEventListener("click", function () {
        btnAttack.style.display = "inline";
        btnGoNext.style.display = "none";
        btnChance.style.display = "none";
        btnQuestion.style.display = "none";
        isUsingLuck();
        update();
});
btnQuestion.addEventListener("click", function () {
        alert("You can use luck in combat to minimize the damage you take or deal more damage. You succeed at your luck roll if your total luck is less than or equal to a six-sided die plus a six-sided die. Each time you roll your luck, you deduct 1 from your total, and this continues for the rest of the game.");
});
