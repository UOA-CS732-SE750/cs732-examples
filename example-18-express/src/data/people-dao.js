/** ChatGPT genned array of people. */
const people = [
  {
    id: 1,
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com"
  },
  {
    id: 2,
    firstName: "Jane",
    lastName: "Smith",
    email: "jane.smith@example.com"
  },
  {
    id: 3,
    firstName: "Bob",
    lastName: "Johnson",
    email: "bob.johnson@example.com"
  },
  {
    id: 4,
    firstName: "Alice",
    lastName: "Williams",
    email: "alice.williams@example.com"
  },
  {
    id: 5,
    firstName: "Charlie",
    lastName: "Brown",
    email: "charlie.brown@example.com"
  },
  {
    id: 6,
    firstName: "Alice",
    lastName: "Stephens",
    email: "alice.stephens@example.com"
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
