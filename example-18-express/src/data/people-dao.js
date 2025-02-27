/** Array of people from the Pokémon franchise. */
const people = [
  {
    id: 1,
    firstName: "Ash",
    lastName: "Ketchum",
    email: "ash.ketchum@pokemon.com"
  },
  {
    id: 2,
    firstName: "Misty",
    lastName: "Williams",
    email: "misty.williams@pokemon.com"
  },
  {
    id: 3,
    firstName: "Brock",
    lastName: "Harrison",
    email: "brock.harrison@pokemon.com"
  },
  {
    id: 4,
    firstName: "Serena",
    lastName: "Gabena",
    email: "serena.gabena@pokemon.com"
  },
  {
    id: 5,
    firstName: "Dawn",
    lastName: "Berlitz",
    email: "dawn.berlitz@pokemon.com"
  },
  {
    id: 6,
    firstName: "Gary",
    lastName: "Oak",
    email: "gary.oak@pokemon.com"
  }
];

/**
 * Retrieves an array of all people.
 *
 * @returns an array of all people
 */
export function retrievePeople() {
  return people;
}

/**
 * Retrieves an array of all people whose firstName match the given name.
 * @param {string} firstName the firstName to match
 * @returns an array of matching people (an empty array if no matches)
 */
export function retrievePeopleByFirstName(firstName) {
  return people.filter((p) => p.firstName === firstName);
}

/**
 * Retrieves a person with the matching id. Returns undefined if no match.
 * @param {*} id the id to match
 * @returns a person, or undefined.
 */
export function retrievePersonById(id) {
  return people.find((p) => p.id == id);
}

/**
 * Adds new person with the given details to the database and returns it.
 *
 * @param {string} firstName the new person's first name
 * @param {string} lastName the new person's last name
 * @param {string} email the new person's email address
 */
export function createPerson(firstName, lastName, email) {
  const newPerson = {
    id: people.length + 1,
    firstName,
    lastName,
    email
  };
  people.push(newPerson);
  return newPerson;
}
