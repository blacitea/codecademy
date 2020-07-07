class Media {
  constructor(title) {
    this._title = title;
    this._isCheckedOut = false;
    this._ratings = [];
  }

  get title() {
    return this._title;
  }

  get isCheckedOut() {
    return this._isCheckedOut;
  }

  get ratings() {
    return this._ratings;
  }

  set isCheckedOut(checkedOut) {
    this._isCheckedOut = checkedOut;
  }

  toggleCheckOutStatus() {
    this._isCheckedOut = !this._isCheckedOut;
  }

  getAverageRating() {
    let avgRating = (this._ratings.reduce(function(accum, currV) { return accum + currV }, 0)) / (this.ratings.length);
    return avgRating;
  }

  addRating(rating) {
    if (rating >= 1 && rating <= 5) {
      this.ratings.push(rating);
    } else {
      console.log('Invalid, please input rating between 1 - 5.')
    }
  }
};

class Book extends Media{
  constructor(author, title, pages) {
    super(title);
    this._title = title;
    this._pages = pages;
  }
  get title() {
    return this._title;
  }
  get pages() {
    return this._pages;
  }
};

class Movie extends Media {
  constructor(director, title, runTime) {
    super(title);
    this._director = director;
    this._runTime = runTime;
  }
  get director() {
    return this._director;
  }
  get runTime() {
    return this._runTime;
  }
};

/* Step 15  - 19 
const historyOfEverything = new Book('Bill Bryson', 'A Short History of Nearly Everything', 544);
historyOfEverything.toggleCheckOutStatus();
console.log(historyOfEverything.isCheckedOut);
historyOfEverything.addRating(4);
historyOfEverything.addRating(5);
historyOfEverything.addRating(5);
console.log(historyOfEverything.ratings);
console.log(historyOfEverything.getAverageRating());
*/

/* Step 20 - 24
const speed = new Movie('Jan de Bont', 'Speed', 116);
console.log(speed.isCheckedOut);
speed.toggleCheckOutStatus();
console.log(speed.isCheckedOut);
speed.addRating(1);
speed.addRating(1);
speed.addRating(5);
console.log(speed.getAverageRating());
*/

class CD extends Media{
  constructor(title, singer, numOfSongs){
    super(title);
    this._singer = singer;
    this._numOfSongs = numOfSongs;
    this._songTitles = [];
  }

  get singer() {
    return this._singer;
  }

  get numOfSongs() {
    return this._numOfSongs;
  }

  get songTitles() {
    return this._songTitles;
  }

  set songTitles(songTitle) {
    this._songTitles.push(songTitle); 
  }

  shuffle() {
    return this._songTitles.sort((a, b) => Math.random() - 0.5);
  }
};

const jayChow = new CD('Jay Chow Best 20', 20);
jayChow.songTitles = 'Happy Face';
jayChow.songTitles = 'Rainy Day';
jayChow.songTitles = 'Never Again';
console.log(jayChow.songTitles);
jayChow.addRating(4);
jayChow.addRating(0);
jayChow.addRating(5);
jayChow.addRating(3);
console.log(jayChow.getAverageRating());
console.log(jayChow.songTitles);
console.log(jayChow.shuffle());
console.log(jayChow.shuffle());
