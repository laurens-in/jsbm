class GuitarPlayer {

    guitarIndex = 0;
    playingNote = 0;


    constructor(sampler) {
        this.sampler = sampler;
    }

    playGuitar = (note, length, time, velocity) => {
        if (note == this.playingNote) {
            this.guitarIndex += 1;
        }
        let currentCount = this.guitarIndex % 5;

        switch (currentCount) {
            case 0:
                this.sampler.guitar1.triggerAttackRelease(note, length, time, velocity);
                //console.log("git1 playing");
                break;
            
            case 1:
                this.sampler.guitar2.triggerAttackRelease(note, length, time, velocity);
                //console.log("git2 playing");
                break;
            
            case 2:
                this.sampler.guitar3.triggerAttackRelease(note, length, time, velocity);
                //console.log("git3 playing");
                break;
            
            case 3:
                this.sampler.guitar4.triggerAttackRelease(note, length, time, velocity);
                //console.log("git4 playing");
                break;
    
            case 4:
                this.sampler.guitar5.triggerAttackRelease(note, length, time, velocity);
                //console.log("git5 playing");
                break;
        }
        this.playingNote = note;
    };
}