const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

class Field {
  constructor(map) {
    this._map = map;
  }
  print() {
    console.log(this._map.join("\n"));
  }
  static generateField(height, width) {
    let map = [];
    for (let y = 0; y < height; y++) {
      map.push([]);
      for (let x = 0; x < width; x++) {
        map[y].push(fieldCharacter);
      };
    };
    let randomLocation = function () {
      return [Math.floor(Math.random() * width), Math.floor(Math.random() * height)];
    }
    let hatLocation = [0, 0];
    while (hatLocation[0] === 0 && hatLocation[1] === 0) {
      hatLocation = randomLocation();
    };
    let hatX = hatLocation[0];
    let hatY = hatLocation[1];
    map[hatY][hatX] = hat;

    let holeLocation = [];
    while (holeLocation.length / (width * height) < 0.3) {
      let potentialHole = randomLocation();
      let stringPotentialHole = potentialHole.toString();
        if (stringPotentialHole !== '0,0' && stringPotentialHole !== hatLocation.toString() && ! holeLocation.toString().includes(stringPotentialHole)) {
          holeLocation.push(potentialHole);
        }
    };
    console.log('Number of holes:', holeLocation.length);
    for (let i = 0; i < holeLocation.length; i++) {
      let holeX = holeLocation[i][0];
      let holeY = holeLocation[i][1];
      map[holeY][holeX] = hole;
      }
      return new Field(map);
    }
}



/* Game code */
let fieldwidth = prompt('How wide is the field?');
let fieldheight = prompt('How long is the field?');
let playField = Field.generateField(fieldheight, fieldwidth);
let position = [0, 0];
let counter = 0;
let startTime = Date.now();

while (playField._map[position[1]][position[0]] !== hat && playField._map[position[1]][position[0]] !== hole) {
  playField._map[position[1]][position[0]] = pathCharacter;
  playField.print();
  
  let instruction = prompt('Where to go? ')
  switch (instruction.toLowerCase()) {
    case 'u':
      position[1]--;
      break;
    case 'd':
      position[1]++;
      break;
    case 'l':
      position[0]--;
      break;
    case 'r':
      position[0]++;
      break;
    default:
      console.log('Invaild input [u: up, d: down, l: left, r: right')
  };
  counter++;
  if (position[0] > playField._map.length || position[1] > playField._map.length || position[0] < 0 || position[1] < 0) {
    console.log('Oops! You left without finding the hat!');
    break;
  }
  switch (playField._map[position[1]][position[0]]) {
    case hat:
      let finishTime = Date.now()
      let secSpent = (finishTime - startTime)/1000;
      console.log("Congrats! You found your hat!");
      console.log(`You spent ${secSpent} seconds in total!`)
      break;
    case hole:
      console.log("Oh no! You fall into a hole!")
      break;
    case fieldCharacter:
      break;
  }
}

