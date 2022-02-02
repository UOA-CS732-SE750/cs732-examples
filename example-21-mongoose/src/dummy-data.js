import dummyjson from 'dummy-json';
import fs from 'fs';
import dayjs from 'dayjs';

const PET_NAMES = [
    'Waldo',
    'Sterling',
    'Fuzzy',
    'Fonzie',
    'Thelma',
    'Homer',
    'Flower',
    'Roxanne',
    'Tuffy',
    'Flint',
    'Ruffer',
    'Summer',
    'Fido',
    'Thumper',
    'Chico',
    'JJ',
    'Blast',
    'Molly',
    'Prissy',
    'Maximus',
    'Patty',
    'Pippy',
    'Piper',
    'Minnie',
    'Nibbles',
    'Ming',
    'Stella',
    'Rascal',
    'Chessie',
    'Elwood',
    'Bosco',
    'Birdie',
    'Buster',
    'Skipper',
    'Heather',
    'Jasmine',
    'Skippy',
    'Scruffy',
    'Dots',
    'Susie',
    'Sage',
    'Star',
    'Gypsy',
    'Justice',
    'Cotton',
    'Cyrus',
    'Maggie',
    'Sly',
    'Napoleon',
    'Baby Doll',
    'Pugsley',
    'Dakota',
    'Tiger',
    'Oakley',
    'Bodie',
    'Audi',
    'Penny',
    'Rebel',
    'Gringo',
    'Giant',
    'Gretel',
    'Rosa',
    'Smudge',
    'Peanuts',
    'Pogo',
    'Maddie',
    'Taz',
    'Claire',
    'Bridgett',
    'Beaux',
    'Sumo',
    'Mandi',
    'Missie',
    'Carley',
    'Kato',
    'Mercedes',
    'Bully',
    'Dempsey',
    'Ralph',
    'Simone',
    'Michael',
    'Kenya',
    'Precious',
    'Austin',
    'Big Foot',
    'Gracie',
    'Dottie',
    'Mitch',
    'Emily',
    'Kirby',
    'Bernie',
    'Violet',
    'Rosie',
    'Mercle',
    'Lefty',
    'Ginger',
    'Happy',
    'Sweetie-pie',
    'Zeus',
    'Bugsy'
];

const myHelpers = {
    date(min, max) {
        const minTime = dayjs(min).toDate().getTime();
        const maxTime = dayjs(max).toDate().getTime();
        const newTime = dummyjson.utils.randomInt(minTime, maxTime);
        return dayjs(new Date(newTime)).format();
    },
    petname() {
        return dummyjson.utils.randomArrayItem(PET_NAMES);
    }
}

const template = fs.readFileSync('./src/dummy-data.hbs', { encoding: 'utf-8' });
const dummyDataString = dummyjson.parse(template, { helpers: myHelpers });
const dummyData = JSON.parse(dummyDataString);

export {
    dummyData
};