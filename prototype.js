// utility functions

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

function getNote(note){
    return noteMap.get(note);
}


// defining instruments
let drum = new Drum();
let guitarSampler = new GuitarSampler();
let guitarPlayer = new GuitarPlayer(guitarSampler);

drumfast = [
    [
        [0,2],
        [1]
    ],
    [
        [1,2],
        [0]
    ]
]

drumslow = [
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

const chords = [[0, 7], [0, 8], [0, 5], [0, 6], [0, 7, 12, 15], [0, 7, 14]]

function getChord(note){
    let random = Math.floor(Math.random()* chords.length)
    return chords[random].map(x => (x + note))
}

function firstDrum(length){
    let random = Math.floor(Math.random() * 2);
    if (random == 0){
        return slowDrum(length)
    } else {
        return fastDrum(length * 4)
    }
}

function fastDrum(length) {
    let beat = [];
    let style = Math.floor(Math.random() * 2)
    for(let i = 0; i < length; i++){
        beat[i] = drumfast[style][i%2];
    }
    return beat;
}

function slowDrum(length){
    length1 = Math.ceil(length/2);
    length2 = length - length1;
    let beat = [];
    for(let x = 0; x < length1; x++){
        beat.push(drumslow[0][x]);
    }
    for (let y = 0; y < length2; y++){
        beat.push(drumslow[1][y])
    }
    let result = beat.flatMap((e) => [e, [],[],[]]);
    return result;
}

// let tree = new Pattern(slowDrum(8));

// tree.permute()

// console.log('first iteration looks like this: ');
// console.dir(tree);


// console.log('second iteration looks like this: ');
// tree.pattern_1.permute();
// console.dir(tree);

// ---------------- redefine patterns as instance of PolyphoneSequence

let polytree = new Pattern(new PolyphoneSequence(firstDrum(6)));

console.log('same with poly seq');
console.dir(polytree);

console.log('second iter with poly seq');

polytree.base_pattern.generate_guitar();
polytree.permute();
polytree.pattern_1.permute();
polytree.pattern_2.permute();



drumPatterns = [
    polytree.base_pattern.drums,
    polytree.pattern_1.base_pattern.drums,
    polytree.base_pattern.drums,
    polytree.pattern_2.base_pattern.drums,
    polytree.pattern_1.pattern_2.base_pattern.drums,
    polytree.pattern_1.pattern_1.base_pattern.drums,
    polytree.pattern_2.pattern_1.base_pattern.drums,
    polytree.pattern_2.pattern_2.base_pattern.drums
]

guitarPatterns = [
    polytree.base_pattern.guitar,
    polytree.pattern_1.base_pattern.guitar,
    polytree.base_pattern.guitar,
    polytree.pattern_2.base_pattern.guitar,
    polytree.pattern_1.pattern_2.base_pattern.guitar,
    polytree.pattern_1.pattern_1.base_pattern.guitar,
    polytree.pattern_2.pattern_1.base_pattern.guitar,
    polytree.pattern_2.pattern_2.base_pattern.guitar
]


let patterncount = 0;
let stepcount = 0;

let drumpat = polytree.base_pattern.drums;
let guitarpat = polytree.base_pattern.guitar;

Tone.Transport.start();
Tone.Transport.bpm.value = 70;

var drumloop = new Tone.Loop(function(time){
    guitarPlayer.playGuitar(guitarpat[stepcount%guitarpat.length].flatMap(x => getNote(x)), '2n', time);
    console.log(guitarpat[stepcount%guitarpat.length]);
    drum.kit.triggerAttackRelease(drumpat[stepcount%drumpat.length].flatMap(x => getDrum(x)), '4n', time);
    stepcount++;
    if (stepcount%polytree.base_pattern.drums.length == 0){
        patterncount++;
        drumpat = drumPatterns[patterncount%drumPatterns.length];
        guitarpat = guitarPatterns[patterncount%guitarPatterns.length]
    }
}, "32n");