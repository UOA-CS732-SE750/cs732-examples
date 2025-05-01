import dayjs from "dayjs";

const todos = [
  {
    id: 1,
    title: "Catch Pikachu",
    description: "Head to Viridian Forest and catch a Pikachu.",
    isComplete: false,
    dueDate: dayjs().add(2, "day").format()
  },
  {
    id: 2,
    title: "Train Charmander",
    description: "Level up Charmander to learn Flamethrower.",
    isComplete: false,
    dueDate: dayjs().add(5, "day").format()
  },
  {
    id: 3,
    title: "Defeat Brock",
    description: "Challenge the Pewter City Gym Leader and earn the Boulder Badge.",
    isComplete: true,
    dueDate: dayjs().subtract(10, "day").format()
  },
  {
    id: 4,
    title: "Evolve Bulbasaur",
    description: "Evolve Bulbasaur into Ivysaur by reaching level 16.",
    isComplete: false,
    dueDate: dayjs().add(7, "day").format()
  },
  {
    id: 5,
    title: "Catch a Water-Type Pokémon",
    description: "Find and catch a Squirtle or another water-type Pokémon.",
    isComplete: false,
    dueDate: dayjs().subtract(3, "day").format()
  },
  {
    id: 6,
    title: "Collect Rare Candies",
    description: "Find at least 3 rare candies to boost Pokémon levels.",
    isComplete: false,
    dueDate: dayjs().add(1, "day").format()
  },
  {
    id: 7,
    title: "Visit Professor Oak",
    description: "Return to Pallet Town and report progress to Professor Oak.",
    isComplete: true,
    dueDate: dayjs().subtract(15, "day").format()
  },
  {
    id: 8,
    title: "Catch a Legendary Pokémon",
    description: "Attempt to catch Articuno in the Seafoam Islands.",
    isComplete: false,
    dueDate: dayjs().add(30, "day").format()
  },
  {
    id: 9,
    title: "Win a Pokémon Contest",
    description: "Enter and win a Pokémon beauty contest with Jigglypuff.",
    isComplete: false,
    dueDate: dayjs().add(14, "day").format()
  },
  {
    id: 10,
    title: "Complete Pokédex Entry for Pidgey",
    description: "Catch and evolve Pidgey to complete its Pokédex entry.",
    isComplete: true,
    dueDate: dayjs().subtract(1, "day").format()
  }
];

export default todos;
