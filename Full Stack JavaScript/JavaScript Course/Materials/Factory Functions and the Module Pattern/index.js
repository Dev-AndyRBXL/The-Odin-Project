/*
const name = "Bob";
const age = 28;
const color = "red";

const obj1 = { name: name, age: age, color: color };
const obj2 = { name, age, color };

console.log(obj1, obj2);
*/

function createUser(name) {
  const discordName = "@" + name + Math.floor(Math.random() * 9999).toString();

  let reputation = Math.floor(Math.random() * 30);
  const getReputation = () => reputation;
  const giveReputation = () => reputation++;

  return { name, discordName, getReputation, giveReputation };
}

const josh = createUser("Josh");
josh.giveReputation();

console.log({
  name: josh.name,
  discordName: josh.discordName,
  reputation: josh.getReputation(),
});

/*
function createUser2(name) {
  let reputation = Math.floor(Math.random() * 30);
  this.name = name;
  this.discordName = "@" + name + Math.floor(Math.random() * 9999).toString();

  this.getReputation = () => reputation;
  this.giveReputation = () => reputation++;
}

const mike = new createUser2("Mike");
mike.giveReputation();

console.log({
  name: mike.name,
  discordName: mike.discordName,
  reputation: mike.getReputation(),
});
*/

function createPlayer(name, level) {
  const user = createUser(name);

  const increaseLevel = () => level++;
  return Object.assign({}, user, { increaseLevel });
}

const joshua = createPlayer("Joshua", Math.floor(Math.random() * 100));
joshua.increaseLevel();

console.log(joshua);
