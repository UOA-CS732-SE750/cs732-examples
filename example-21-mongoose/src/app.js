import "dotenv/config";

import mongoose from "mongoose";
import { User, Pet } from "./schema.js";
import { seedDatabase, dummyData } from "./dummy-data.js";

mongoose.set("strictQuery", false);

// Connect to database
// For more extra options, see: https://mongoosejs.com/docs/connections.html
// We're reading in the DB URL from the .env file using the dotenv package.
await mongoose.connect(process.env.DB_URL);
console.log("Connected to database!");
console.log();

await clearDatabase();
console.log();

await seedDatabase();
console.log();

await logSummary();
console.log();

await runQueries();
console.log();

// Disconnect when complete
await mongoose.disconnect();
console.log("Disconnected from database!");

/**
 * Clears the database
 */
async function clearDatabase() {
  const petsDeleted = await Pet.deleteMany({});
  const usersDeleted = await User.deleteMany({});
  console.log(
    `Cleared database (removed ${petsDeleted.deletedCount} pets and ${usersDeleted.deletedCount} users).`
  );
}

/**
 * Logs a summary of all the users and pets in the DB.
 */
async function logSummary() {
  // Grab all users, AND their pets.
  // With the populate() method, each user's registered pets will be the actual Pet objects,
  // rather than just their ids.
  const allUsers = await User.find().populate("registeredPets");

  console.log(`There are ${allUsers.length} users in the database.`);
  console.log();

  for (let user of allUsers) {
    console.log(`User ${user.fullName} (${user.username}) has ${user.registeredPets.length} pets.`);

    for (let pet of user.registeredPets) {
      console.log(` - ${pet.name} the ${pet.species}`);
    }

    console.log();
  }
}

/**
 * Runs some queries and prints their output
 */
async function runQueries() {
  // Get all users
  const allUsers = await User.find();
  console.log(`There are ${allUsers.length} users in the database.`);

  // Get all pets
  const allPets = await Pet.find();
  console.log(`There are ${allPets.length} pets in the database.`);

  // Get a User with a particular username
  const usernameToFind = getRandomUsername();
  const user = await User.findOne({ username: usernameToFind });
  console.log(`The user with username '${usernameToFind}' is ${user.fullName}.`);

  // Get all Pets owned by a particular User
  await User.populate(user, "registeredPets");
  console.log(`User ${user.fullName} has ${user.registeredPets.length} pets.`);
  for (let userPet of user.registeredPets) {
    console.log(` - ${userPet.name} the ${userPet.species}`);
  }

  // Get a Pet with a particular registration number
  const petNumberToFind = getRandomPetRegNumber();
  const pet = await Pet.findOne({ number: petNumberToFind });
  console.log(`The pet with reg# '${petNumberToFind}' is ${pet.name} the ${pet.species}.`);

  // Get the User who owns a particular Pet
  await Pet.populate(pet, "owner");
  console.log(
    `${pet.name} the ${pet.species} is owned by ${pet.owner.fullName} (username = '${pet.owner.username}').`
  );
}

function getRandomUsername() {
  const { users } = dummyData;
  const rndIndex = Math.floor(Math.random() * users.length);
  const rndDummyUser = users[rndIndex];
  return rndDummyUser.username;
}

function getRandomPetRegNumber() {
  const { pets } = dummyData;
  const rndIndex = Math.floor(Math.random() * pets.length);
  const rndDummyPet = pets[rndIndex];
  return rndDummyPet.number;
}
