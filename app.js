let game = {
  round: 0,
  target: 0,
  userPrompt: "",
};

let uss = {
  name: "USS Schwartznegger",
  hull: 20,
  firePower: 5,
  accuracy: 0.7,
  attack: function () {
    let attackTurn = Math.random();
    if (attackTurn <= this.accuracy) {
      return true;
    } 
    else {
      return false;
    }
  },
};

class Alien {
  constructor(name, hull, firePower, accuracy) {
    this.name = name;
    this.hull = hull;
    this.firePower = firePower;
    this.accuracy = accuracy;
  }
  attack() {
    let attackTurn = Math.random();
    if (attackTurn <= this.accuracy) {
      return true;
    } 
    else {
      return false;
    }
  }
}

let alienShip = [];
let alienHull = [3,4,5,6];
let alienFirePower = [2,3,4];
let alienAccuracy = [0.6,0.7,0.6];

let createAlien = () => {
  for (let i = 0; i < 6; i++) {
    let name = "Alien " + (i + 1);
    let hull = alienHull[Math.floor(Math.random() * 4)];
    let firePower = alienFirePower[Math.floor(Math.random() * 3)];
    let accuracy = alienAccuracy[Math.floor(Math.random() * 3)];
    alienShip[i] = new Alien(name, hull, firePower, accuracy);
  }
};

let battle = (ship1, ship2) => {
  let ships = [ship1, ship2];
  let attack = false;
  let attacking = 0;
  let beingAttacked = 1;
  let temp;
  console.log("%c Attack Begins!!!", "font-size: 28px");
  while (ships[beingAttacked].hull > 0) {
    console.log(
      `\n%c ${ships[attacking].name} attacked ${ships[beingAttacked].name}`,
      "color: turquoise; border: 1px solid grey; font-size: 18px;"
    );
    
    attack = ships[attacking].attack();

    if (attack === true) {
      ships[beingAttacked].hull -= ships[attacking].firePower;
      console.log(
        `%c Attack Successful! ${ships[beingAttacked].name}'s Hull: ${ships[beingAttacked].hull}`,
        "color: lime; font-weight: bold; font-size: 16px;"
      );
    } 
    else {
      console.log(
        `%c Attack Unsuccessful! ${ships[beingAttacked].name}'s Hull: ${ships[beingAttacked].hull}`,
        "color: orange; font-size: 16px;"
      );
    }

    if (ships[beingAttacked].hull <= 0) {
      console.log(
        `%c ${ships[beingAttacked].name} has been destroyed!`,
        "color: orange; border: 1px solid grey; font-size: 16px;"
      );
      if (ships[beingAttacked] === uss) {
        alert("Game Over!!!");
      } 
      else if (
        ships[beingAttacked].name === alienShip[alienShip.length - 1].name
      ) {
        console.log(
          `%c ${ships[beingAttacked].name} destroyed!\nEnemy squad has been destroyed!\n`,
          "color: red; border: 1px solid white; font-size: 16px;"
        );
      } 
      else {
        game.userPrompt = prompt(
          `${alienShip[game.target].name} destroyed!!\n${uss.name}'s Hull: ${uss.hull}\nAttack or retreat?`
          );
        game.target += 1;
        checkUserPrompt();
        return;
      }
    } 
    else {
      temp = attacking;
      attacking = beingAttacked;
      beingAttacked = temp;
    }
  }
};

let checkUserPrompt = () => {
  let choice = game.userPrompt.toLowerCase();
  if (choice === "attack") {
    battle(uss, alienShip[game.target]);
  } 
  else if (choice === "retreat") {
    alert("Game Over!");
  }
};

let startGame = () => {
  createAlien();

  game.userPrompt = prompt(
    "Alien approaching! \nAttack or retreat?",
  );
  checkUserPrompt();
};

startGame(); 
