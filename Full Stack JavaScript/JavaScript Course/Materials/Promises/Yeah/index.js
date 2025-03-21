const server = {
  data: {
    people: [
      {
        name: 'Odin',
        age: 20,
      },
      {
        name: 'Thor',
        age: 35,
      },
      {
        name: 'Freyja',
        age: 29,
      },
    ],

    getPeople() {
      return new Promise((resolve, _) => {
        // Simulating a delayed network call to the server
        setTimeout(() => {
          resolve(this.people);
        }, 2000);
      });
    },
  },
};

// async function getPersonInfo(name) {
//   const people = await server.data.getPeople();
//   const person = people.find((person) => person.name === name);

//   return person;
// }

function getPersonInfo(name) {
    return server.data.getPeople().then((people) => {
        const result = people.find((person) => person.name === name);
        if (result == null) throw new Error(`A person with name: ${name} was not found!`);
        else return result;
    }).catch((reason) => {
        console.error(reason);
    }).finally(() => {
        console.log('%c Completed!', 'color: yellow');
    });
}

console.log(getPersonInfo('Odin'));

console.log('This is running while the code waits for the "server" (not an actual server) to return a value');
