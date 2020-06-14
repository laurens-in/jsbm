class BassPlayer {

    bassIndex = 0;
    playingNote = 0;


    constructor(sampler, start = 0) {
        this.sampler = sampler;
        this.bassIndex = start;
    }

    playBass = (note, length, time, velocity) => {
        if (note == this.playingNote) {
            this.bassIndex += 1;
        }
        let currentCount = this.bassIndex % 10;

        switch (this.bassIndex) {
            case 0:
                this.sampler.bass1.triggerAttackRelease(note, length, time, velocity);
                break;
            
            case 1:
                this.sampler.bass2.triggerAttackRelease(note, length, time, velocity);
                break;
            
            case 2:
                this.sampler.bass3.triggerAttackRelease(note, length, time, velocity);
                break;
            
            case 3:
                this.sampler.bass4.triggerAttackRelease(note, length, time, velocity);
                break;
    
            case 4:
                this.sampler.bass5.triggerAttackRelease(note, length, time, velocity);
                break;
            
            case 5:
                this.sampler.bass6.triggerAttackRelease(note, length, time, velocity);
                break;

            case 6:
                this.sampler.bass7.triggerAttackRelease(note, length, time, velocity);
                break;
            
            case 7:
                this.sampler.bass8.triggerAttackRelease(note, length, time, velocity);
                break;
            
            case 8:
                this.sampler.bass9.triggerAttackRelease(note, length, time, velocity);
                break;
            
            case 9:
                this.sampler.bass10.triggerAttackRelease(note, length, time, velocity);
                break;
            
        }
        this.playingNote = note;
    };
}