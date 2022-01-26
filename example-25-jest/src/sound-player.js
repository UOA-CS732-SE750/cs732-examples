/**
 * A pretendy class for demonstration purposes.
 */
export default class SoundPlayer {

    constructor(config) {
        this.config = config;
        console.log('Constructing SoundPlayer', config);
    }

    playSoundFile(fileName) {
        console.log(`Playing ${fileName}`);
    }

}