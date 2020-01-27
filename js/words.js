//52AH0I85

const word = (function(callback, error) {
  const words = [];
  let firsttime = true;

  newRequest(10);

  function newRequest(numberOfWords = 5) {
    const apiURL =
      "https://random-word-api.herokuapp.com/word?key=52AH0I85&number=" +
      numberOfWords;

    const api = new XMLHttpRequest();
    api.open("GET", apiURL, true);
    api.onload = function() {
      words.push(...JSON.parse(this.responseText));
      if (firsttime) {
        callback();
        firsttime = false;
      }
    };

    api.onerror = function() {
      console.log("Something went wrong", api);
      error(true);
    };

    api.send(null);
  }

  function getArray() {
    console.log(words);
  }

  function get() {
    const toReturn = words[0];
    words.splice(0, 1);
    if (words.length <= 5) {
      this.newRequest();
      console.log("Words requested", words);
    } else {
      console.log("Words length", words.length);
    }

    return toReturn;
  }

  return {
    newRequest: newRequest,
    getArray: getArray,
    get: get
  };
})(game, game);
