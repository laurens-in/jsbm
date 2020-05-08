// there are basically two kinds of black metal beats, a fast one and a slow one
// the slow one looks like this:
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
    
]

// it's basically just a kick drum followed by a snare drum filled up with hihats
// there are different combinations of this beat, 2, 3, 4, 6 or 8 from each array.
// i also found variations with 3 from the first array followed by 1 from the second (eg.: Exercises in Futility I)
// and also 2 from the first and 1 from the second (eg.: Freezing Moon)
// note: most black metal beats are either 4/4 or 6/4, there is very little tripplet beats, so i will ignore this.

// to allow for most of the variations i found in different drumbeats one would need at maximum 3 spaces between each beat
// this means i will basically notate everything in 16th notes.

// for permutations there is a rule to follow: "New elements gravitate towards existing ones with the same importance."
// lets imagine we have the following beat (which is basically the Freezing Moon intro beat):

beat = [[0, 2], [], [], [], [2], [], [], [], [1, 2], [], [], []]

// first level permutations would be on the 4th notes, this could mean a cymbal hit on the kick or snare or a kick or snare on the hihat.
// i would argue that these first level permutations are less common, since the main beat stays roughly the same during most parts. Or it changes completely.

// so if we add a "second level" (8th note) permutation it is going to fall either around the snare, kick or hihat.
// the kick is the most common and can basically go with everything but it usually it precedes an element to emphasize it. so if it goes before the kick drum it will be wrapped around to the end,
// this means it will emphasize the first beat, which is of course very common. And if we imagine our beat with that tweak it would sound pretty dope.

// let's imagine our kick falls before our snare, we would almost have the original freezing moon beat.

// if we would do the same thing with a snare it would sound a bit odd, but it could be possible.

// cymbals could basically go everywhere, but this sounds better on faster beats i would argue.$

// there could also be things like: kick goes on every beat or cymbal goes on every beat (8th beats that is) to double time the beat.

//... thinking about it on some occasions there is the cymbal beat behind the beat and an offbeat emphasis. super cool. like blashyrkh.


// on the third level it makes sense for me to follow the second level, meaning if we had put a kick in front of the snare drum on the 8th we would add another kick on the 16th before the snare, leading to the classic freezing moon beat.
// 16th note out of context sound a bit too swingey for black metal.

// now i think there could be multiple versions of this depending on speed: on super slow beats you might have 4 levels. on medium slow 3, moderate beats 2, and fast beats only 1.
// or maybe also length, longer beats tend to be faster of course.

// fills behave usually like this: you take the last beat and fill it up until the last level 1 element. with fills elements should probably be overwritten. They are on the highest 2 levels at least.


// of course this doesn't need to be that strict all the time. if the logic is there, we can mix things up and create more progressive stuff, fills that land on 1 level beats, alternating lengths and shit like that.

// these also don't have to progress: permutations can start on the 4th level for example.

// there can also be no permutations: listen to Dunkelheit, there's the same fucking beat for 7 minutes.


// so there's actually not so many options to change up things, but the experimental combination of these things could be interesting

//------//

// fast beats are just blast beats.
// there are two kinds, kick first and the way cooler snare first.

// there you have little options, often if riffs change they also change the cymbal, hihat to ride and vice versa.
// and of course one can always add cymbal hits as accents.


// first decision: fast or slow
// second decision: duration --> different depending on first choice, slow needs 2 values
// third decision: permutation --> different depending on first choice, fast doesn't really permutate that much, more fills and cymbals

function fastDrum(length, style = 1) {
    let beat = [];
    for(let i = 0; i < length; i++){
        beat[i] = drumfast[style][i%2];
    }
    return beat;
}

function slowDrum(length){
    let beat = [];
    for(let i = 0; i < 2; i++){
        for(let x = 0; x < length; x++){
            beat.push(drumslow[i][x]);
        }
    }
    let result = beat.flatMap((e) => [e, [],[],[]]);
    return result;
}

function permuteDrum(beat, value = 0){
    let randomIndex = Math.floor(Math.random() * beat.length)
    if (beat[randomIndex].includes(0) || beat[randomIndex].includes(1) || beat[randomIndex].includes(2)){
        //beat[mod((randomIndex-4),beat.length)].push(value);
        beat[mod((randomIndex-8),beat.length)].push(value);
    } else {
        permuteDrum(beat, value);
    }
}
const mod = (x, n) => (x % n + n) % n
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

let comp = slowDrum(4);
let counterDrum = 0;

var drumloop = new Tone.Loop(function(time){
    drum.kit.triggerAttackRelease(comp[counterDrum%comp.length].flatMap(x => getDrum(x)), '4n', time);
    counterDrum++;
}, "32n").start();