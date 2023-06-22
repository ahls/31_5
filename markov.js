/** Textual markov chain generator */


class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    this.chainTable = {};
    for (let i = 0; i < this.words.length; i++) {
      const word = this.words[i];
      let nextWord;
      let current2Word;
      let next2Words;
      if(i < this.words.length-2)
      {
        next2Words = `${this.words[i+1]} ${this.words[i+2]}`
      }
      if(i == this.words.length-1)
      {
        nextWord = null;
      }
      else
      {
        nextWord = this.words[i+1];
        current2Word = `${word} ${this.words[i+1]}`;
      }

      if(!this.chainTable[word])
      {
        this.chainTable[word] = new Set()
      }
      this.chainTable[word].add(nextWord)
      if(next2Words)
        this.chainTable[word].add(next2Words)
      
        if(current2Word)
        {
        if(!this.chainTable[current2Word])
          {
            this.chainTable[current2Word] = new Set()
          }
        if(i < this.words.length-2)
        {
          next2Words = `${this.words[i+2]} ${this.words[i+3]}`
        }
        else
        {
          this.chainTable[current2Word].add(null);
        }
        nextWord = this.words[i+2];
          this.chainTable[current2Word].add(nextWord)
          if(next2Words)
            this.chainTable[current2Word].add(next2Words)
        
      }
    }
  }

  pickRandomFromList(givenList)
  {
    return givenList[Math.floor(Math.random() * givenList.length)]
  }
  /** return random text from chains */

  makeText(numWords = 100) {
    let currentWord = this.pickRandomFromList(Object.keys(this.chainTable))
    let returnString = currentWord;
    for (let i = 0; i < numWords; i++) {
      currentWord = this.pickRandomFromList(Array.from(this.chainTable[currentWord]));
      if(currentWord == null) break;
      returnString += ` ${currentWord}`;
    }
    return returnString;
  }
}

module.exports = 
{
  Markov: MarkovMachine
}