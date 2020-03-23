Tone.Transport.start(0);
Tone.Transport.bpm.value = 200;

// Drumkit
var Drumkit = new Tone.Sampler({
    36 : "Kick/Kick1.opus",
    37 : "Kick/Kick2.opus",
    38 : "Kick/Kick3.opus",
    39 : "Kick/Kick4.opus",
    40 : "Kick/Kick5.opus",
    41 : "Kick/Kick6.opus",
    42 : "Kick/Kick7.opus",
    43 : "Kick/Kick8.opus",
    44 : "Kick/Kick9.opus",
    45 : "Kick/Kick10.opus",
    46 : "Kick/Kick11.opus",
    47 : "Kick/Kick12.opus",
    48 : "Snare/Snare1.opus",
    49 : "Snare/Snare2.opus",
    50 : "Snare/Snare3.opus",
    51 : "Snare/Snare4.opus",
    52 : "Snare/Snare5.opus",
    53 : "Snare/Snare6.opus",
    54 : "Snare/Snare7.opus",
    55 : "Snare/Snare8.opus",
    56 : "Snare/Snare9.opus",
    57 : "Snare/Snare10.opus",
    58 : "Snare/Snare11.opus",
    59 : "Snare/Snare12.opus"
}, function(){
    Drumkit.sync();
    Drumkit.toMaster();
    seqSnare.start(0);
    seqSnare.loop = true;
}, "./assets/samples/");



// var seqKick = new Tone.Sequence(function(time, note){
//     sampler.triggerAttackRelease((note + gRInt(12)), "1n", time);
// //subdivisions are given as subarrays
// }, [12, [12, 12, 12], 12, [12, 12]]);

var seqSnare = new Tone.Sequence(function(time, note){
    Drumkit.triggerAttackRelease(note, "1n", time, (Math.random() * 0.2) + 0.8);
    console.log(note);
//subdivisions are given as subarrays
}, [58, [48, [48, 48], 48], 48, [48, 48, 48, 48]]);






// seqSnare.start(0);
// seqSnare.loop = true;
//seqKick.start(0);
//seqKick.loop = true;


// get random integer function
function gRInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }