import { User, Pet } from "./schema.js";

const users = [
  {
    username: "ashketchum",
    firstName: "Ash",
    lastName: "Ketchum",
    dateOfBirth: new Date("1990-05-22"),
    address: {
      number: "123",
      street: "Pallet Town",
      city: "Kanto",
      postcode: 12345
    },
    creditCards: [
      { lastFourDigits: "1234", encryptedInfo: "encryptedInfo1" },
      { lastFourDigits: "5678", encryptedInfo: "encryptedInfo2" }
    ],
    registeredPets: []
  },
  {
    username: "mistywilliams",
    firstName: "Misty",
    lastName: "Williams",
    dateOfBirth: new Date("1992-07-01"),
    address: {
      number: "456",
      street: "Cerulean City",
      city: "Kanto",
      postcode: 67890
    },
    creditCards: [{ lastFourDigits: "2345", encryptedInfo: "encryptedInfo3" }],
    registeredPets: []
  },
  {
    username: "brockharrison",
    firstName: "Brock",
    lastName: "Harrison",
    dateOfBirth: new Date("1988-08-15"),
    address: {
      number: "789",
      street: "Pewter City",
      city: "Kanto",
      postcode: 11223
    },
    creditCards: [{ lastFourDigits: "3456", encryptedInfo: "encryptedInfo4" }],
    registeredPets: []
  },
  {
    username: "serenagabena",
    firstName: "Serena",
    lastName: "Gabena",
    dateOfBirth: new Date("1993-04-12"),
    address: {
      number: "101",
      street: "Vaniville Town",
      city: "Kalos",
      postcode: 33445
    },
    creditCards: [{ lastFourDigits: "4567", encryptedInfo: "encryptedInfo5" }],
    registeredPets: []
  },
  {
    username: "dawnberlitz",
    firstName: "Dawn",
    lastName: "Berlitz",
    dateOfBirth: new Date("1994-10-30"),
    address: {
      number: "202",
      street: "Twinleaf Town",
      city: "Sinnoh",
      postcode: 55667
    },
    creditCards: [{ lastFourDigits: "5678", encryptedInfo: "encryptedInfo6" }],
    registeredPets: []
  }
];

const pets = [
  {
    number: "001",
    name: "Pikachu",
    species: "Electric",
    breed: "Mouse",
    initialRegistrationDate: new Date("2020-01-01"),
    expiryDate: new Date("2025-01-01"),
    isNeutered: true,
    notes: [{ date: new Date("2021-01-01"), content: "Very energetic" }],
    owner: null
  },
  {
    number: "002",
    name: "Charizard",
    species: "Fire",
    breed: "Dragon",
    initialRegistrationDate: new Date("2020-02-01"),
    expiryDate: new Date("2025-02-01"),
    isNeutered: false,
    notes: [{ date: new Date("2021-02-01"), content: "Loves to fly" }],
    owner: null
  },
  {
    number: "003",
    name: "Squirtle",
    species: "Water",
    breed: "Turtle",
    initialRegistrationDate: new Date("2020-03-01"),
    expiryDate: new Date("2025-03-01"),
    isNeutered: true,
    notes: [{ date: new Date("2021-03-01"), content: "Enjoys swimming" }],
    owner: null
  },
  {
    number: "004",
    name: "Bulbasaur",
    species: "Grass",
    breed: "Seed",
    initialRegistrationDate: new Date("2020-04-01"),
    expiryDate: new Date("2025-04-01"),
    isNeutered: false,
    notes: [{ date: new Date("2021-04-01"), content: "Loves sunlight" }],
    owner: null
  },
  {
    number: "005",
    name: "Jigglypuff",
    species: "Fairy",
    breed: "Balloon",
    initialRegistrationDate: new Date("2020-05-01"),
    expiryDate: new Date("2025-05-01"),
    isNeutered: true,
    notes: [{ date: new Date("2021-05-01"), content: "Sings beautifully" }],
    owner: null
  },
  {
    number: "006",
    name: "Eevee",
    species: "Normal",
    breed: "Evolution",
    initialRegistrationDate: new Date("2020-06-01"),
    expiryDate: new Date("2025-06-01"),
    isNeutered: false,
    notes: [{ date: new Date("2021-06-01"), content: "Very adaptable" }],
    owner: null
  },
  {
    number: "007",
    name: "Snorlax",
    species: "Normal",
    breed: "Sleeping",
    initialRegistrationDate: new Date("2020-07-01"),
    expiryDate: new Date("2025-07-01"),
    isNeutered: true,
    notes: [{ date: new Date("2021-07-01"), content: "Loves to sleep" }],
    owner: null
  },
  {
    number: "008",
    name: "Gengar",
    species: "Ghost",
    breed: "Shadow",
    initialRegistrationDate: new Date("2020-08-01"),
    expiryDate: new Date("2025-08-01"),
    isNeutered: false,
    notes: [{ date: new Date("2021-08-01"), content: "Very mischievous" }],
    owner: null
  },
  {
    number: "009",
    name: "Lucario",
    species: "Fighting",
    breed: "Aura",
    initialRegistrationDate: new Date("2020-09-01"),
    expiryDate: new Date("2025-09-01"),
    isNeutered: true,
    notes: [{ date: new Date("2021-09-01"), content: "Very loyal" }],
    owner: null
  },
  {
    number: "010",
    name: "Gardevoir",
    species: "Psychic",
    breed: "Embrace",
    initialRegistrationDate: new Date("2020-10-01"),
    expiryDate: new Date("2025-10-01"),
    isNeutered: false,
    notes: [{ date: new Date("2021-10-01"), content: "Very graceful" }],
    owner: null
  }
];

export const dummyData = { users, pets };

/**
 * Adds the dummy data above to the database.
 */
export async function seedDatabase() {
  await User.deleteMany({});
  await Pet.deleteMany({});

  const createdUsers = await User.insertMany(users);
  for (const user of createdUsers) {
    console.log(`User saved! _id = ${user._id}, name = ${user.fullName}`);
  }

  pets[0].owner = createdUsers[0]._id;
  pets[1].owner = createdUsers[0]._id;
  pets[2].owner = createdUsers[1]._id;
  pets[3].owner = createdUsers[1]._id;
  pets[4].owner = createdUsers[2]._id;
  pets[5].owner = createdUsers[2]._id;
  pets[6].owner = createdUsers[3]._id;
  pets[7].owner = createdUsers[3]._id;
  pets[8].owner = createdUsers[4]._id;
  pets[9].owner = createdUsers[4]._id;

  const createdPets = await Pet.insertMany(pets);

  createdUsers[0].registeredPets.push(createdPets[0]._id, createdPets[1]._id);
  createdUsers[1].registeredPets.push(createdPets[2]._id, createdPets[3]._id);
  createdUsers[2].registeredPets.push(createdPets[4]._id, createdPets[5]._id);
  createdUsers[3].registeredPets.push(createdPets[6]._id, createdPets[7]._id);
  createdUsers[4].registeredPets.push(createdPets[8]._id, createdPets[9]._id);

  await Promise.all(createdUsers.map((user) => user.save()));

  for (const pet of createdPets) {
    // This lets us get the owner's full name, rather than just their id
    await pet.populate("owner");
    console.log(`Pet saved! _id = ${pet._id}, name = ${pet.name}, owner = ${pet.owner.fullName}`);
  }

  console.log("Database seeded successfully");
}
