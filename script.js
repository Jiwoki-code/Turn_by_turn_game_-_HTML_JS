const headerPara = document.getElementById("headerPara");
const mainPara = document.getElementById("mainPara");
const footerPara = document.getElementById("footerPara");

const playerName = document.getElementById("name");
playerName.value = "Renault";

const btnName = document.getElementById("btnName");
const btnPassion = document.getElementById("btnPassion");
btnPassion.style.display = "none";
const btnContinue = document.getElementById("btnContinue");
btnContinue.style.display = "none";

const order = document.getElementById("order");
const playerPassionQuestion = document.getElementById("playerPassionQuestion");
playerPassionQuestion.style.display = "none";
const divHeader = document.getElementById("header");

const introductionText = [`You were quietly abandoned by your ungrateful parents at the gate of a temple on a freezing winter night. Fortunately, you were taken in by a kind soul. A master and instructor, who lived near the temple, found you by chance. He takes great care of you during your early years.
During this time, you learned to read and write, but you were orphan and didn't know your name. When you turned six, he offered you the chance to choose one you liked.
\"Come on buddy..\" He said to you one day \"It's time for you to tell me the name you chose. How should I call you? What is your name, hum?\"`,
        `During your adolescence, he provides you with a strict, fair, and consistent education. In addition to your general knowledge, you are trained in 
the art of sword fighting and survivalism. You will miss this teaching forever because you will develop a passion for one of the skills that will stay with you throughout your life.`];


function playerNameIsCorrect(name) {
        if (name.length >= 4 && name.length <= 10) {
                return true;
        } else {
                return false;
        }
}

const swordFightCheckbox = document.getElementById("swordFight");
const survivalismCheckbox = document.getElementById("survivalism");
let playerPassion = "";

function getPlayerPassion() {
        if (swordFightCheckbox.checked) {
                playerPassion = "swordFighting";
                footerPara.innerHTML = "You are passionate about <strong>sword fighting</strong> and you spend hours practicing your swordplay in the courtyard at such a young age.";
        } else {
                playerPassion = "survivalism";
                footerPara.innerHTML = "You are passionate about <strong>survivalism</strong> and you spent your childhood wandering in nature and observing animals.";
        }

        btnPassion.style.display = "none";
        playerPassionQuestion.style.display = "none";
        mainPara.innerHTML = introductionText[1];
        btnContinue.style.display = "inline";
}

function getPlayerName() {
        const name = playerName.value.trim();

        if (!playerNameIsCorrect(name)) {
                mainPara.innerHTML = "Le nom doit contenir entre 4 et 10 caractères.";
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

headerPara.innerHTML = introductionText[0];
btnName.addEventListener("click", getPlayerName);
btnPassion.addEventListener("click", getPlayerPassion);
// btnContinue.addEventListener("click", )