import mongoose from 'mongoose';
import { User, Pet } from './schema';
import { dummyData } from './dummy-data';
console.log("Generated dummy data using dummy-json");

main();

async function main() {
    // Connect to database
    // For more extra options, see: https://mongoosejs.com/docs/connections.html
    await mongoose.connect('mongodb://localhost:27017/petRegistry', {
        useNewUrlParser: true
    });
    console.log('Connected to database!');
    console.log();

    await clearDatabase();
    console.log();

    await addUsers();
    console.log();
    await addPets();
    console.log();

    await logSummary();
    console.log();

    await runQueries();
    console.log();

    // Disconnect when complete
    await mongoose.disconnect();
    console.log('Disconnected from database!');
}

/**
 * Clears the database
 */
async function clearDatabase() {
    const petsDeleted = await Pet.deleteMany({});
    const usersDeleted = await User.deleteMany({});
    console.log(`Cleared database (removed ${petsDeleted.deletedCount} pets and ${usersDeleted.deletedCount} users).`);
}

/**
 * Adds all dummy user data to the database
 */
async function addUsers() {
    for (let dummyUser of dummyData.users) {

        // Create the DB user object, initialized with the dummy user data.
        const dbUser = new User(dummyUser);

        // Save it to the DB
        await dbUser.save();
        console.log(`User saved! _id = ${dbUser._id}, name = ${dbUser.fullName}`);

    }
}

/**
 * Adds all dummy pet data to the database
 */
async function addPets() {

    // Grab all users, so we can randomly assign the pets to them.
    const allUsers = await User.find();

    for (let dummyPet of dummyData.pets) {

        // Pick a random owner
        const ownerIndex = Math.floor(Math.random() * allUsers.length);
        const owner = allUsers[ownerIndex];

        // Create the pet in the database
        const dbPet = new Pet(dummyPet);

        // Assign its owner and save
        dbPet.owner = owner._id;
        await dbPet.save();
        console.log(`Pet saved! _id = ${dbPet._id}, name = ${dbPet.name}, owner = ${owner.fullName}`);

        // Also add this pet to the owner's registered pets and save
        owner.registeredPets.push(dbPet._id);
        await owner.save();

    }
}

/**
 * Logs a summary of all the users and pets in the DB.
 */
async function logSummary() {

    // Grab all users, AND their pets.
    // With the populate() method, each user's registered pets will be the actual Pet objects,
    // rather than just their ids.
    const allUsers = await User.find().populate('registeredPets');

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
    await User.populate(user, 'registeredPets');
    console.log(`User ${user.fullName} has ${user.registeredPets.length} pets.`);
    for (let userPet of user.registeredPets) {
        console.log(` - ${userPet.name} the ${userPet.species}`);
    }

    // Get a Pet with a particular registration number
    const petNumberToFind = getRandomPetRegNumber();
    const pet = await Pet.findOne({ number: petNumberToFind });
    console.log(`The pet with reg# '${petNumberToFind}' is ${pet.name} the ${pet.species}.`);

    // Get the User who owns a particular Pet
    await Pet.populate(pet, 'owner');
    console.log(`${pet.name} the ${pet.species} is owned by ${pet.owner.fullName} (username = '${pet.owner.username}').`);
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