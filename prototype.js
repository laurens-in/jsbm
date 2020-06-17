// arrays & objects

// config object, holds all parameters
const config = {
    // how to progress in the tree, 'linear' = follow one branch, 'random' = alternate between branches
    traverse_mode: 'linear',
    // when to create a new tree
    explode_at: 10,
    // speed
    BPM: 120,
    // make blast beat?
    blast_beat: false,
    // length of the initial pattern
    base_pattern_length: 6,
    // how many root notes in inital guitar pattern
    base_root_notes: 1,
    // chord range
    chord_range: [0, 3],

    rhythm_guitar: true,
    melody_guitar: true,
    bass: true,
    drums: true,

    distortion: true,

    length_multi: 2,

    guitar_rhythm_prob: 0.4,

    make_ride: true,
    make_toms: false,



}

function change_configs(){
    //change BPM
    config.BPM = Math.floor(Math.random() * 90) + 80;
    Tone.Transport.bpm.value = config.BPM;

    //decide if blast beat
    if (config.BPM > 130){
        Math.random() < 0.5 ? config.blast_beat = true : config.blast_beat = false;
    } else {
        config.blast_beat = false;
    }

    //decide traverse mode
    if (config.BPM > 130){
        Math.random() < 0.5 ? config.traverse_mode = 'random' : config.traverse_mode = 'linear'
    } else {
        Math.random() < 0.35 ? config.traverse_mode = 'random' : config.traverse_mode = 'linear'
    }

    //decide length
    if (config.BPM > 130){
        config.base_pattern_length = Math.floor(Math.random() * 5) + 11;
    } else {
        config.base_pattern_length = Math.floor(Math.random() * 7) + 3;
    }

    //set explode
    if (config.BPM > 130){
        config.traverse_mode == 'random' ? config.explode_at = Math.floor(Math.random() * 4) + 4 : config.explode_at = Math.floor(Math.random() * 12) + 5;
    } else {
        config.traverse_mode == 'random' ? config.explode_at = Math.floor(Math.random() * 2) + 4 : config.explode_at = Math.floor(Math.random() * 10) + 5;
    }

    //set chord range
    config.chord_range[0] = Math.floor(Math.random() * 4)
    if (config.chord_range[0] == 0){
        config.chord_range[1] = Math.floor(Math.random() * 4);
    } else if (config.chord_range[0] == 1){
        config.chord_range[1] = 2;
    } else if (config.chord_range[0] == 2){
        config.chord_range[1] = Math.floor(Math.random() * 2) + 2;
    } else if (config.chord_range[0] == 3) {
        config.chord_range[1] = 3;
    }

    //decide how many root notes
    config.base_root_notes = Math.floor(Math.random() * (config.base_root_notes / 2)) + 1;

    //decide if distortion
    if (!config.blast_beat && Math.random() < 0.4){
        config.distortion = false;
    } else {
        config.distortion = true;
    }

    //choose which instruments to play
    if (config.distortion){
        config.bass = true;
        config.drums = true;
        //reset toms
        config.make_toms = false;
        //decide if ride or hihat
        Math.random() < 0.5 ? config.make_ride = true : config.make_ride = false;
        config.rhythm_guitar = true;
        //decide if guitar melody
        Math.random() < 0.65 ? config.melody_guitar = true : config.melody_guitar = false;

        //set instrument values
        guitarSamplerLead.volume.gain.value = 0.5;
        guitarSamplerLead.dist.distortion = 0.8;
        guitarSamplerLeft.volume.gain.value = 0.4;
        guitarSamplerLeft.dist.distortion = 0.8;
        guitarSamplerRight.volume.gain.value = 0.4;
        guitarSamplerRight.dist.distortion = 0.8;

    } else {
        Math.random() < 0.5? config.drums = true : config.drums = false;
        if (config.drums = true){
            Math.random() < 0.5 ? config.make_toms = true : config.make_toms = false;
            config.bass = true;
            //decide if rhythm guitar
            Math.random() < 0.6 ? config.rhythm_guitar = true : config.rhythm_guitar = false;
            config.melody_guitar = true;
        }

        //set instrument values
        guitarSamplerLead.volume.gain.value = 1.2;
        guitarSamplerLead.dist.distortion = 0;
        guitarSamplerLeft.volume.gain.value = 0.9;
        guitarSamplerLeft.dist.distortion = 0;
        guitarSamplerRight.volume.gain.value = 0.9;
        guitarSamplerRight.dist.distortion = 0;
    }

    //continue...
};

// array to generate blast beat
const blast_beat_array = [
    [
        [0,2],
        [1]
    ],
    [
        [1,2],
        [0]
    ]
]

// array to generate straight beat
const straight_beat_array = [
    [
        [0, 2],
        [2],
        [2],
        [2],
        [2],
        [2],
        [2],
        [2],
    ],
    [
        [1, 2],
        [2],
        [2],
        [2],
        [2],
        [2],
        [2],
        [2], 
    ]
];

// array of midi numbers with their corresponding note names
let noteArray = [
    [12, "C0"], 
    [13, "C#0"], 
    [14, "D0"], 
    [15, "D#0"], 
    [16, "E0"], 
    [17, "F0"], 
    [18, "F#0"], 
    [19, "G0"], 
    [20, "G#0"], 
    [21, "A0" ], 
    [22, "A#0"], 
    [23, "B0"], 
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
    [60, "C4"],
    [61, "C#4"],
    [62, "D4"],
    [63, "D#4"],
    [64, "E4"],
    [65, "F4"],
    [66, "F#4"],
    [67, "G4"],
    [68, "G#4"],
    [69, "A4"],
    [70, "A#4"],
    [71, "B4"],
    [72, "C5"],
    [73, "C#5"],
    [74, "D5"],
    [75, "D#5"],
    [76, "E5"],
    [77, "F5"],
    [78, "F#5"],
    [79, "G5"],
    [80, "G#5"],
    [81, "A5"],
    [82, "A#5"],
    [83, "B5"],
    [84, "C6"],
    [85, "C#6"],
    [86, "D6"],
    [87, "D#6"],
    [88, "E6"],
    [89, "F6"],
    [90, "F#6"],
    [91, "G6"],
    [92, "G#6"],
    [93, "A6"],
    [94, "A#6"],
    [95, "B6"],
    [96, "C7"],
    [97, "C#7"],
    [98, "D7"],
    [99, "D#7"],
    [100, "E7"],
    [101, "F7"],
    [102, "F#7"],
    [103, "G7"],
    [104, "G#7"],
    [105, "A7"],
    [106, "A#7"],
    [107, "B7"]

];

// object containing all chord shapes with their type
const chord_templates = Array(
    { type: 'power', shape: [0, 7] },
    { type: 'dyad', shape: [0, 8] },
    { type: 'dyad', shape: [0, 5] },
    { type: 'dyad', shape: [0, 3] },
    { type: 'dyad', shape: [0, 2] },
    { type: 'dyad', shape: [0, 1] },
    { type: 'dyad', shape: [0, 10] },
    { type: 'triad', shape: [0, 7, 14] },
    { type: 'triad', shape: [0, 7, 15] },
    { type: 'triad', shape: [0, 8, 15] },
    { type: 'triad', shape: [0, 7, 14, 15] },
    { type: 'barre', shape: [0, 7, 12, 15, 19, 24] },
    { type: 'barre', shape: [0, 7, 12, 14, 15, 24] },
    { type: 'barre', shape: [0, 7, 12, 14, 17, 24] }
);

// utility functions

// get a random integer
function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

// get a random integer in a certain range (used for choosing drum notes)
function randomNote(min, max) {
    return noteMap.get((Math.floor(Math.random() * Math.floor(max)) + min));
}

// create a map of noteArray
let noteMap = new Map(noteArray);

// convert drum numbers to note names
function getDrumNoteName(note){
    if (note == 0){
        return randomNote(24, 12);
    }
    else if (note == 1){
        return randomNote(36, 12);
    }
    else if (note == 2){
        return randomNote(48, 12);
    }
    else if (note == 3){
        return randomNote(60, 12);
    }
    else if (note == 4){
        return randomNote(72, 12);
    }
    else if (note == 5){
        return randomNote(84, 12);
    }
    else if (note == 6){
        return randomNote(96, 12);
    }
}

// convert midi numbers to note names
function getNoteName(note){
    return noteMap.get(note);
}

// convert raltive length values into seconds
function getLength(length, multi = 1){
    let base_length = (60 / config.BPM) / 4;
    return length * base_length * multi;
}

// generate a chord from a root note and type
function make_chords(note, type) {
    // template can contain multiple chords of a type
    const template = chord_templates.filter(t => t.type === type);
    const chords = template.map(t => {
        return Object.assign({type: type}, {chord: t.shape.map(n => n + note)});
    })
    return chords;
}

// merge arrays, used to create scales from different chords
function mergeArrays(...arrays) {
    let jointArray = []

    arrays.forEach(array => {
        jointArray = [...jointArray, ...array]
    });
    let numbers = [...new Set([...jointArray])];
    numbers.sort(function(a, b) {
        return a - b;
    });
    return numbers; 
}

// function for generating initial drum beat
function initialize_drum(length){
    if (config.blast_beat){
        return blast_beat(length * 4)
    } else {
        return straight_beat(length)
    }
}

function initialize_guitar(length, root_notes){
    let notes = [];
    let root_note_counter = 1;
    notes[0] = [Math.floor((Math.random() * 12) + 40)];
    for(let i = 1; i < length; i++){
        notes[i] = [];
    }
    while (root_note_counter < root_notes){
        notes[(Math.floor(Math.random() * length - 1) + 1)] = [Math.floor((Math.random() * 12) + 40)];
        root_note_counter += 1;
    }
    let result = notes.flatMap((e) => [e, [],[],[]]);
    return result;

}

// generate a blast beat
function blast_beat(length) {
    let beat = [];
    let style = Math.floor(Math.random() * 2)
    for(let i = 0; i < length; i++){
        beat[i] = blast_beat_array[style][i%2];
    }
    return beat;
}

// generate a straight beat
function straight_beat(length){
    const length1 = Math.ceil(length/2);
    const length2 = length - length1;
    let beat = [];
    for(let x = 0; x < length1; x++){
        beat.push(straight_beat_array[0][x]);
    }
    for (let y = 0; y < length2; y++){
        beat.push(straight_beat_array[1][y])
    }
    let result = beat.flatMap((e) => [e, [],[],[]]);
    return result;
}

// defining samplers & players
let drum = new Drum(0.6);
let guitarSamplerLeft = new GuitarSampler(0.4, 0.8, -1);
let guitarPlayerLeft = new GuitarPlayer(guitarSamplerLeft);
let guitarSamplerRight = new GuitarSampler(0.4, 0.8, 1);
let guitarPlayerRight = new GuitarPlayer(guitarSamplerRight, 3);
let guitarSamplerLead = new GuitarSampler(0.5, 0.8, -0.2);
let guitarPlayerLead = new GuitarPlayer(guitarSamplerLead, 4);
let bassSampler = new BassSampler(1.5, 0.25, 0);
let bassPlayer = new BassPlayer(bassSampler);
change_configs();
// instantiate polytree object and apply first permutations
let polytree = new Pattern(new PolyphoneSequence(initialize_drum(config.base_pattern_length), initialize_guitar(config.base_pattern_length, config.base_root_notes)));

polytree.base_pattern.generate_guitar();
polytree.base_pattern.generate_melody();
polytree.base_pattern.permute_drum();
polytree.base_pattern.generate_rhythm();
polytree.base_pattern.generate_bass();
//polytree.base_pattern.generate_tremolo();
polytree.base_pattern.generate_lengths();
let sequence_part = polytree.next();

// start Tone.Transport and set tempo
Tone.Transport.start();
Tone.Transport.bpm.value = config.BPM;

// define variables for counting through patterns
let patterncount = 0;
let stepcount = 0;
const s_len = config.base_pattern_length * 4;
let explosion_probability = 0;

// define the sequencer and its player functions
var sequencer = new Tone.Loop(function(time) {

    // current step
    const step = stepcount%s_len;

    // player functions for all instruments
    if (config.rhythm_guitar){
        guitarPlayerLeft.playGuitar(
            //sequence_part.guitar[step][0].chord.flatMap(x => getNoteName(x)),
            sequence_part.guitar[step].flatMap(x => getNoteName(x)),
            sequence_part.guitar_lengths[step].flatMap(x => getLength(x)),
            time
        );

        guitarPlayerRight.playGuitar(
            //sequence_part.guitar[step][0].chord.flatMap(x => getNoteName(x)),
            sequence_part.guitar[step].flatMap(x => getNoteName(x)),
            sequence_part.guitar_lengths[step].flatMap(x => getLength(x)),
            time
        );
    }

    if (config.melody_guitar){
        guitarPlayerLead.playGuitar(
            sequence_part.guitar_melody[step].flatMap(x => getNoteName(x)),
            sequence_part.guitar_melody_lengths[step].flatMap(x => getLength(x, config.length_multi)),
            time
        );
    }

    if (config.bass){
        bassPlayer.playBass(
            sequence_part.bass[step].flatMap(x => getNoteName(x)),
            sequence_part.bass_lengths[step].flatMap(x => getLength(x)),
            time
        );
    }
    
    if (config.drums){
        drum.kit.triggerAttackRelease(
            sequence_part.drums[step].flatMap(x => getDrumNoteName(x)),
            '1n', time
        );
    }

    // increase step
    stepcount++;

    // functions that get called at the end of a sequence_part
    if (stepcount%polytree.base_pattern.drums.length == 0) {

        if (explosion_probability > config.explode_at) {
            change_configs();
            polytree = new Pattern(new PolyphoneSequence(initialize_drum(config.base_pattern_length), initialize_guitar(config.base_pattern_length, config.base_root_notes)));
            polytree.base_pattern.generate_guitar();
            polytree.base_pattern.generate_melody();
            polytree.base_pattern.permute_drum();
            polytree.base_pattern.generate_rhythm();
            polytree.base_pattern.generate_bass();
            polytree.base_pattern.generate_tremolo();
            polytree.base_pattern.generate_lengths();
            explosion_probability = 0;
            console.log('generating new tree');
        }
        sequence_part = polytree.next();
        patterncount++;
    }
}, "16n");
