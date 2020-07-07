// using prompt-sync
const prompt = require('prompt-sync')({ sigint: true });

// symbols used for game
const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

// Create a class to generate and print the map for game
class Field {
  constructor(map) {
    this._map = map;
  }
  // print map as string with each row in map seperate by new line \n
  print() {
    console.log(this._map.join("\n"));
  }
  // static method (only access by superClass), to create new field with 2 parameters
  static generateField(height, width) {
    let map = [];
    for (let y = 0; y < height; y++) {
      map.push([]);
      for (let x = 0; x < width; x++) {
        // create the field with fieldCharacters
        map[y].push(fieldCharacter);
      };
    };
    // new function to generate random location within the field
    let randomLocation = function () {
      return [Math.floor(Math.random() * width), Math.floor(Math.random() * height)];
    }
    // ensure hatLocation !== starting point
    let hatLocation = [0, 0];
    while (hatLocation[0] === 0 && hatLocation[1] === 0) {
      hatLocation = randomLocation();
    };
    let hatX = hatLocation[0];
    let hatY = hatLocation[1];
    // change the symbol of hat's location
    map[hatY][hatX] = hat;

    let holeLocation = [];
    // while the hole : field ratio less than 30%, keep generating holes
    while (holeLocation.length / (width * height) < 0.3) {
      let potentialHole = randomLocation();
      let stringPotentialHole = potentialHole.toString();
      if (stringPotentialHole !== '0,0' // hole !== starting poing
        && stringPotentialHole !== hatLocation.toString() // hole !== hatLocation
        && !holeLocation.toString().includes(stringPotentialHole)
        // new hole !== old hole, used array.toString() for includes as [1,3] === [1,3] return false
      ) {
        holeLocation.push(potentialHole);
      }
    };
    // change the symbol of hole's location
    for (let i = 0; i < holeLocation.length; i++) {
      let holeX = holeLocation[i][0];
      let holeY = holeLocation[i][1];
      map[holeY][holeX] = hole;
    }
    // create a new Field instance with the map generated
      return new Field(map);
    }
}



/* Game code */
let fieldwidth = prompt('How wide is the field?'); // ask user to design field size
let fieldheight = prompt('How long is the field?');
let playField = Field.generateField(fieldheight, fieldwidth); // generate field with user input
let position = [0, 0]; // starting position
let counter = 0; 
let startTime = Date.now();

while (playField._map[position[1]][position[0]] !== hat && playField._map[position[1]][position[0]] !== hole) {
  playField._map[position[1]][position[0]] = pathCharacter;
  playField.print();
  
  let instruction = prompt('Where to go? ')
  switch (instruction.toLowerCase()) {
    case 'w':
      position[1]--;
      break;
    case 's':
      position[1]++;
      break;
    case 'a':
      position[0]--;
      break;
    case 'd':
      position[0]++;
      break;
    default:
      console.log('Invaild input [W: up, S: down, A: left, D: right')
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
      console.log(`You walked ${counter} steps and spent ${secSpent} seconds in total!`)
      break;
    case hole:
      console.log("Oh no! You fall into a hole!")
      break;
    case fieldCharacter:
      break;
  }
}

