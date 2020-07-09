'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// using prompt-sync
var prompt = require('prompt-sync')({ sigint: true });

// symbols used for game
var hat = '^';
var hole = 'O';
var fieldCharacter = '░';
var pathCharacter = '*';

// Create a class to generate and print the map for game

var Field = function () {
  function Field(map) {
    _classCallCheck(this, Field);

    this._map = map;
  }
  // print map as string with each row in map seperate by new line \n


  _createClass(Field, [{
    key: 'print',
    value: function print() {
      console.log(this._map.join("\n"));
    }
    // static method (only access by superClass), to create new field with 2 parameters

  }], [{
    key: 'generateField',
    value: function generateField(height, width) {
      var map = [];
      for (var y = 0; y < height; y++) {
        map.push([]);
        for (var x = 0; x < width; x++) {
          // create the field with fieldCharacters
          map[y].push(fieldCharacter);
        };
      };

      // new function to generate random location within the field
      var randomSpot = function randomSpot(num) {
        return Math.floor(Math.random() * num);
      };

      // generate hat's location
      var hatX = randomSpot(width);
      var hatY = randomSpot(height);

      // change the symbol of hat's location
      map[hatY][hatX] = hat;

      // array.flat() or array.reduce((acc, val) => acc.concat(val), [])
      var flattened = function flattened(map) {
        var _ref;

        return (_ref = []).concat.apply(_ref, _toConsumableArray(map));
      };

      // while the hole : field ratio less than 30%, keep generating holes

      var ocurrance = function ocurrance(arr, value) {
        return flattened(arr).reduce(function (a, v) {
          return v === value ? a + 1 : a;
        }, 0);
      };

      var holeRatio = 0;

      while (holeRatio < 0.3) {
        var holeX = randomSpot(width);
        var holeY = randomSpot(height);
        if (!(holeX === hatX && holeY === hatY)) {
          map[holeY][holeX] = hole;
          holeRatio = ocurrance(map, hole) / flattened(map).length;
        }
      };

      // create a new Field instance with the map generated
      return new Field(map);
    }
  }]);

  return Field;
}();

// Game code 

var fieldwidth = prompt('How wide is the field?'); // ask user to design field size
var fieldheight = prompt('How long is the field?');
var playField = Field.generateField(fieldheight, fieldwidth); // generate field with user input
var positionX = Math.floor(Math.random() * fieldwidth);
var positionY = Math.floor(Math.random() * fieldheight); // starting position
var counter = 0;
var startTime = Date.now();

while (playField._map[positionY][positionX] === hat || playField._map[positionY][positionX] === hole) {
  positionX = Math.floor(Math.random() * fieldwidth);
  positionY = Math.floor(Math.random() * fieldheight);
};

while (playField._map[positionY][positionX] !== hat && playField._map[positionY][positionX] !== hole) {
  playField._map[positionY][positionX] = pathCharacter;
  playField.print();

  var instruction = prompt('Where to go? ');
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
      console.log('Invaild input [w: up, s: down, a: left, d: right');
  };
  counter++;
  if (positionX >= playField._map.length || positionY >= playField._map.length || positionX < 0 || positionY < 0) {
    console.log('Oops! You left without finding the hat!');
    break;
  }
  switch (playField._map[positionY][positionX]) {
    case hat:
      var finishTime = Date.now();
      var secSpent = (finishTime - startTime) / 1000;
      console.log("Congrats! You found your hat!");
      console.log('You walked ' + counter + ' steps and spent ' + secSpent + ' seconds in total!');
      break;
    case hole:
      console.log("Oh no! You fall into a hole!");
      break;
    case fieldCharacter:
      break;
  }
}