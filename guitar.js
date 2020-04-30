//-------------- General Functions -----------------//

// get random integer function
function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }


function randomNote(min, max) {
    return noteMap.get((Math.floor(Math.random() * Math.floor(max)) + min));
}

let noteArray = [
    [24, "C1"], 
    [25, "C#1"], 
    [26, "D1"], 
    [27, "D#1"], 
    [28, "E1"], 
    [29, "F1"], 
    [30, "F#1"], 
    [31, "G1"], 
    [32, "G#1"], 
    [33, "A1" ], 
    [34, "A#1"], 
    [35, "B1"], 
    [36, "C2"], 
    [37, "C#2"], 
    [38, "D2"], 
    [39, "D#2"], 
    [40, "E2"], 
    [41, "F2"], 
    [42, "F#2"], 
    [43, "G2"], 
    [44, "G#2"], 
    [45, "A2"], 
    [46, "A#2"], 
    [47, "B2"],
    [48, "C3"],
    [49, "C#3"],
    [50, "D3"],
    [51, "D#3"],
    [52, "E3"],
    [53, "F3"],
    [54, "F#3"],
    [55, "G3"],
    [56, "G#3"],
    [57, "A3"],
    [58, "A#3"],
    [59, "B3"],

];
let noteMap = new Map(noteArray);

// kick = 0, snare = 1, closed hihat = 2, open hihat = 3,
function getDrum(note){
    if (note == 0){
        return randomNote(24, 12);
    }
    else if (note == 1){
        return randomNote(36, 12);
    }
    else if (note == 2){
        return randomNote(48, 12);
    }
}

//-------------------Transport----------------------//
// Tone.Transport.start(0);
// Tone.Transport.bpm.value = 100;

//------------------- drumkit ----------------------//
class Drum {

    patternGenerator;
    sequencer;
    kit;

    constructor(patternGenerator) {

        this.patternGenerator = patternGenerator;
        //this.sequencer = new Tone.Loop(this.sequencePlayer, '8n');
        //this.sequencer.loop = true;

        this.kit = new Tone.Sampler({
            'C1' : "Kick/Kick1.opus",
            'C#1' : "Kick/Kick2.opus",
            'D1' : "Kick/Kick3.opus",
            'D#1' : "Kick/Kick4.opus",
            'E1' : "Kick/Kick5.opus",
            'F1' : "Kick/Kick6.opus",
            'F#1' : "Kick/Kick7.opus",
            'G1' : "Kick/Kick8.opus",
            'G#1' : "Kick/Kick9.opus",
            'A1' : "Kick/Kick10.opus",
            'A#1' : "Kick/Kick11.opus",
            'B1' : "Kick/Kick12.opus",
            'C2' : "Snare/Snare1.opus",
            'C#2' : "Snare/Snare2.opus",
            'D2' : "Snare/Snare3.opus",
            'D#2' : "Snare/Snare4.opus",
            'E2' : "Snare/Snare5.opus",
            'F2' : "Snare/Snare6.opus",
            'F#2' : "Snare/Snare7.opus",
            'G2' : "Snare/Snare8.opus",
            'G#2' : "Snare/Snare9.opus",
            'A2' : "Snare/Snare10.opus",
            'A#2' : "Snare/Snare11.opus",
            'B2' : "Snare/Snare12.opus",
            'C3' : "Hat/openhat1.opus",
            'C#3' : "Hat/openhat2.opus",
            'D3' : "Hat/openhat3.opus",
            'D#3' : "Hat/openhat4.opus",
            'E3' : "Hat/openhat5.opus",
            'F3' : "Hat/openhat6.opus",
            'F#3' : "Hat/openhat7.opus",
            'G3' : "Hat/openhat8.opus",
            'G#3' : "Hat/openhat9.opus",
            'A3' : "Hat/openhat10.opus",
            'A#3' : "Hat/openhat11.opus",
            'B3' : "Hat/openhat12.opus",
           
        }, () => {
        
            this.kit.chain(Tone.Master);

        }, "./assets/samples/");

    };

    sequencePlayer = (time) => {
        // TODO: loop over amount of notes returned by gen()
        let notes = this.patternGenerator.generateDrum();
        let noteNames = notes.map(function mapper(note) {
            if (Array.isArray(note)) {
              return note.map(mapper);
            }
            else {
                let val = getDrum(note);
                return val;
            }
          })
        this.kit.triggerAttackRelease(noteNames, '4n', time);
        
    };
    
}

//---------- round-robin guitar sampler ------------//
class GuitarSampler {

    guitarLoaded = 0;
    dist;
    guitarOut;
    guitar1;
    guitar2;
    guitar3;
    guitar4;
    guitar5;

    constructor(baseurl = "./assets/samples/") {
        this.dist = new Tone.Distortion(0.7);
        this.guitarOut = new Tone.Gain(0.5);
        this.guitarOut.chain(this.dist, Tone.Master);

        this.guitar1 = new Tone.Sampler({
            'C1' : "Guitar/guitar10.opus",  
        }, () => {
            this.guitar1.connect(this.guitarOut);
        }, baseurl);
        
        this.guitar2 = new Tone.Sampler({
            'C1' : "Guitar/guitar11.opus",  
        }, () => {
            this.guitar2.connect(this.guitarOut);
        }, baseurl);
        
        this.guitar3 = new Tone.Sampler({
            'C1' : "Guitar/guitar12.opus",  
        }, () => {
            this.guitar3.connect(this.guitarOut);
        }, baseurl);
        
        this.guitar4 = new Tone.Sampler({
            'C1' : "Guitar/guitar13.opus",  
        }, () => {
            this.guitar4.connect(this.guitarOut);
        }, baseurl);
        
        this.guitar5 = new Tone.Sampler({
            'C1' : "Guitar/guitar14.opus",  
        }, () => {
            this.guitar5.connect(this.guitarOut);
        }, baseurl);
    }
}
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
                console.log("git1 playing");
                break;
            
            case 1:
                this.sampler.guitar2.triggerAttackRelease(note, length, time, velocity);
                console.log("git2 playing");
                break;
            
            case 2:
                this.sampler.guitar3.triggerAttackRelease(note, length, time, velocity);
                console.log("git3 playing");
                break;
            
            case 3:
                this.sampler.guitar4.triggerAttackRelease(note, length, time, velocity);
                console.log("git4 playing");
                break;
    
            case 4:
                this.sampler.guitar5.triggerAttackRelease(note, length, time, velocity);
                console.log("git5 playing");
                break;
        }
        this.playingNote = note;
    };
}

// The "Pattern Service"
class PatternGenerator {
    notes = ["C1", "D#1", "E1", "F1", "F#1", "G1", "C2", "C#2"];
    notes_2 = ["C3", "D#3", "E3", "F3", "F#3", "G3", "C4", "C#4"];

    drumslow = [
        [
            [0, 2],
            [0],
            [0, 2],
            [0],
            [0, 2],
            [0],
            [0, 2],
            [0],
        ],
        [
            [0, 1, 2],
            [0],
            [0, 2],
            [0],
            [0, 2],
            [0],
            [0, 2],
            [0], 
        ]
    ];
    step = 0;
    beat = [];
    variation = 0;

    slots = [1, 0, 1, 0, 1, 1, 1, 1, 0, 0, 1, 0];

    gen = () => {
        const step = this.step % 8;
        if (step == 0) {
            // generate new notes array here
        }
        const notes = [
            this.notes[Math.floor(Math.random() * this.notes.length)],
            this.notes_2[Math.floor(Math.random() * this.notes.length)]
        ];
        const lengths = ['32n', '8n'];
        this.step++;
        return composition[step];
        // TODO: properly handle the case of no notes returned.
        if(this.slots[step] === 1) {
            return this.composition[step];
        }
        
    }

    generateDrum = () => {
        const step = this.step % 8;
        const style = 0;
        const length = 8;
        //let variation = 0;
        let composition = [];
        if (step == 0){
            this.variation++;
            let variationCount = this.variation % 2;
            console.log(this.variation);
            if (style == 0){
                for (let i = 0; i < length; i++){
                    composition[i] = this.drumslow[variationCount][i];
                }
            }
            this.beat = composition; //this.generateDrum(0, 8, 0);
        }
        console.dir(this.beat);
        //this.step++;
        return this.beat[step];
    }

    next = () => {
        this.step++;
        console.log(this.step);
    }
}


// patterns
let patternGenerator = new PatternGenerator();

// guitar
let guitarSampler = new GuitarSampler();
let acousticSampler = new GuitarSampler("./assets/guitar/acoustic");
let guitarPlayer = new GuitarPlayer(patternGenerator, guitarSampler);

// drums
let drum = new Drum(patternGenerator);

async function samplesLoaded() {
    // Start 2 "jobs" in parallel and wait for both of them to complete
    await Promise.all([
        (console.log(await drum.kit.promise)),
        (console.log(await guitarSampler.guitar3.promise)),
        (console.log(await guitarSampler.guitar2.promise)),
        (console.log(await guitarSampler.guitar3.promise)),
        (console.log(await guitarSampler.guitar4.promise)),
        (console.log(await guitarSampler.guitar5.promise))
    ])
    console.log('starting transport');
    Tone.Transport.bpm.value = 100;
    
    //guitarPlayer.sequencer.start(0);
    //drum.sequencer.start(0);

    Tone.Transport.start();
}

samplesLoaded();

var loop = new Tone.Loop(function(time){
    drum.sequencePlayer();
    guitarPlayer.sequencePlayer();
    //patternGenerator.next();

}, "8n").start(0);