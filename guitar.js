// round-robin guitar sampler
class GuitarSampler {

    guitarLoaded = 0;
    dist;
    guitarOut;
    guitar1;
    guitar2;
    guitar3;
    guitar4;
    guitar5;

    constructor() {
        this.dist = new Tone.Distortion(2);
        this.guitarOut = new Tone.Gain(0.8);
        this.guitarOut.chain(dist, Tone.Master);

        this.guitar1 = new Tone.Sampler({
            'C1' : "Guitar/guitar10.opus",  
        }, () => {
            this.guitar1.connect(this.guitarOut);
            this.guitarLoaded += 1;
        }, "./assets/samples/");
        
        this.guitar2 = new Tone.Sampler({
            'C1' : "Guitar/guitar11.opus",  
        }, () => {
            this.guitar2.connect(this.guitarOut);
            this.guitarLoaded += 1;
        }, "./assets/samples/");
        
        this.guitar3 = new Tone.Sampler({
            'C1' : "Guitar/guitar12.opus",  
        }, () => {
            this.guitar3.connect(this.guitarOut);
            this.guitarLoaded += 1;
        }, "./assets/samples/");
        
        this.guitar4 = new Tone.Sampler({
            'C1' : "Guitar/guitar13.opus",  
        }, () => {
            this.guitar4.connect(this.guitarOut);
            this.guitarLoaded += 1;
        }, "./assets/samples/");
        
        this.guitar5 = new Tone.Sampler({
            'C1' : "Guitar/guitar14.opus",  
        }, () => {
            this.guitar5.connect(this.guitarOut);
            this.guitarLoaded += 1;
        }, "./assets/samples/");
    }
}
class GuitarPlayer {

    guitarIndex = 0;
    playingNote = 0;
    patternGenerator;

    sequencer;

    constructor(patternGenerator) {
        this.patternGenerator = patternGenerator;
        this.sequencer = new Tone.Loop(this.sequencePlayer, '8n');
        this.sequencer.loop = true;
    }

    sequencePlayer = (time) => {
        this.playGuitar(this.patternGenerator.gen(), "2n", time);
    };

    playGuitar = (note, length, time, velocity) => {
        if (note == this.playingNote) {
            this.guitarIndex += 1;
        }
        let currentCount = this.guitarIndex % 5;

        switch (currentCount) {
            case 0:
                guitarSampler.guitar1.triggerAttackRelease(note, length, time, velocity);
                console.log("git1 playing");
                break;
            
            case 1:
                guitarSampler.guitar2.triggerAttackRelease(note, length, time, velocity);
                console.log("git2 playing");
                break;
            
            case 2:
                guitarSampler.guitar3.triggerAttackRelease(note, length, time, velocity);
                console.log("git3 playing");
                break;
            
            case 3:
                guitarSampler.guitar4.triggerAttackRelease(note, length, time, velocity);
                console.log("git4 playing");
                break;
    
            case 4:
                guitarSampler.guitar5.triggerAttackRelease(note, length, time, velocity);
                console.log("git5 playing");
                break;
        }
        this.playingNote = note;
    };
}

// The "Pattern Service"
class PatternGenerator {
    notes = ["C1", "D#1", "E1", "F1", "F#1", "G1", "C2", "C#2"];
    step = 0;

    gen = () => {
        if (this.step % 8 == 0) {
            // generate new notes array here
            console.log('generating new notes array');
        }
        this.step++;
        return this.notes[Math.floor(Math.random() * this.notes.length)];
    }
}

let patternGenerator = new PatternGenerator();

let guitarSampler = new GuitarSampler();
let guitarPlayer = new GuitarPlayer(patternGenerator);
guitarPlayer.sequencer.start(0);
