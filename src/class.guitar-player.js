class GuitarPlayer {

    guitarIndex = 0;
    playingNote = 0;
    patternGenerator;

    sequencer;

    constructor(patternGenerator, sampler) {
        this.patternGenerator = patternGenerator;
        this.sampler = sampler;
        //this.sequencer = new Tone.Loop(this.sequencePlayer, '8n');
        //this.sequencer.loop = true;
    }

    sequencePlayer = (time) => {
        // TODO: loop over amount of notes returned by gen()
        let [notes, lengths] = this.patternGenerator.gen();
        this.playGuitar(notes, lengths, time);
        
    };

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