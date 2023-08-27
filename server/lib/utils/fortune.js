const fortuneCookies = [
  "Conquer your fears or they will conquer you",
  "Rivers always need springs",
  "Do not fear what you don't know",
  "You will have a pleasant surprise",
  "Whenever possible, keep it simple",
  "Fortune favours the Prepared",
  "When in doubt, don't",
  "A goal not written is only a wish!",
  "Whatever you can do or dream, you can begin it!",
  "Boldness has genius, power and magic in it!",
  "Caterpillars were always meant to fly!",
  "Never despised the aesthetic of minimalism"
];

exports.getFortune = () => {
   let idx = Math.floor(Math.random() * fortuneCookies.length);
   return fortuneCookies[idx];
};
