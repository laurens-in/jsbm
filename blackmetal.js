Tone.Transport.start(0);
Tone.Transport.bpm.value = 100;

var today = new Date();
var time = today.getHours() + ":" + today.getMinutes()
console.log(time);

var dist = new Tone.Distortion(0.1);

var reverb = new Tone.Freeverb(0.5, 3000);
reverb.wet.value = 0.5;

// Drumkit
var Drumkit = new Tone.Sampler({
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
   
}, function(){

    Drumkit.chain(Tone.Master);  

}, "./assets/samples/");


let beat = [];


// var seqKick = new Tone.Sequence(function(time, note){
//     Drumkit.triggerAttackRelease(getDrum(note), "1n", time, (Math.random() * 0.3) + 0.7);
// }, beat);
// seqKick.loop = true;

generateBeat(16);


Tone.Transport.schedule(function(time){
	generateBeat(4);
}, 10);





function generateBeat(length){
    for (let step = 0; step < length; step++) {
        beat[step] = gRInt(3)

      }
    console.log(beat);
    var seqKick = new Tone.Sequence(function(time, note){
        Drumkit.triggerAttackRelease(getDrum(note), "1n", time, (Math.random() * 0.3) + 0.7);
    }, beat);
    seqKick.loop = true;
    seqKick.start(0);
}


let seqIndex = 0
function newSequence(){
    let 
}



// get random integer function
function gRInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }


function rNote(min, max) {
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
        return rNote(24, 12);
    }
    else if (note == 1){
        return rNote(36, 12);
    }
    else if (note == 2){
        return rNote(48, 12);
    }
}