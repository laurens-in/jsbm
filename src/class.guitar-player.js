class GuitarPlayer {

    guitarIndex = 0;
    playingNote = 0;


    constructor(sampler, start = 0) {
        this.sampler = sampler;
        this.guitarIndex = start;
    }

    playGuitar = (note, length, time, velocity) => {
        if (note == this.playingNote) {
            this.guitarIndex += 1;
        }
        let currentCount = this.guitarIndex % 5;

        switch (Math.floor(Math.random() * 5)) {
            case 0:
                this.sampler.guitar1.triggerAttackRelease(note, length, time, velocity);
                break;
            
            case 1:
                this.sampler.guitar2.triggerAttackRelease(note, length, time, velocity);
                break;
            
            case 2:
                this.sampler.guitar3.triggerAttackRelease(note, length, time, velocity);
                break;
            
            case 3:
                this.sampler.guitar4.triggerAttackRelease(note, length, time, velocity);
                break;
    
            case 4:
                this.sampler.guitar5.triggerAttackRelease(note, length, time, velocity);
                break;

        }
        this.playingNote = note;
    };
}