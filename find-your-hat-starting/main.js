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
    let randomSpot = function (num) {
      return Math.floor(Math.random() * num);
    }

    // generate hat's location
    let hatX = randomSpot(width);
    let hatY = randomSpot(height);

    // change the symbol of hat's location
    map[hatY][hatX] = hat;
    
    // array.flat() or array.reduce((acc, val) => acc.concat(val), [])
    const flattened = map => [].concat(...map);

    // while the hole : field ratio less than 30%, keep generating holes
    
    let ocurrance = (arr, value) =>
      flattened(arr).reduce((a, v) =>
        v === value ? a + 1 : a, 0);
    
    let holeRatio = 0;
    
    while (holeRatio < 0.3) {
      let holeX = randomSpot(width);
      let holeY = randomSpot(height);
      if (!(holeX === hatX && holeY === hatY)) {
        map[holeY][holeX] = hole;
        holeRatio = ocurrance(map, hole)/flattened(map).length;
      }
    };
    
    // create a new Field instance with the map generated
      return new Field(map);
    }
}



// Game code 

let fieldwidth = prompt('How wide is the field?'); // ask user to design field size
let fieldheight = prompt('How long is the field?');
let playField = Field.generateField(fieldheight, fieldwidth); // generate field with user input
let positionX = Math.floor(Math.random() * fieldwidth);
let positionY = Math.floor(Math.random() * fieldheight); // starting position
let counter = 0; 
let startTime = Date.now();

while (playField._map[positionY][positionX] === hat || playField._map[positionY][positionX] === hole) {
  positionX = Math.floor(Math.random() * fieldwidth);
  positionY = Math.floor(Math.random() * fieldheight);
};

while (playField._map[positionY][positionX] !== hat && playField._map[positionY][positionX] !== hole) {
  playField._map[positionY][positionX] = pathCharacter;
  playField.print();
  
  let instruction = prompt('Where to go? ')
  switch (instruction.toLowerCase()) {
    case 'w':
      positionY--;
      break;
    case 's':
      positionY++;
      break;
    case 'a':
      positionX--;
      break;
    case 'd':
      positionX++;
      break;
    default:
      console.log('Invaild input [w: up, s: down, a: left, d: right')
  };
  counter++;
  if (positionX >= playField._map.length || positionY >= playField._map.length || positionX < 0 || positionY < 0) {
    console.log('Oops! You left without finding the hat!');
    break;
  }
  switch (playField._map[positionY][positionX]) {
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


