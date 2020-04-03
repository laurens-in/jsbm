// round-robin guitar sampler
let guitarLoaded = 0;
let guitarIndex = 0;
var dist = new Tone.Distortion(2);
var guitar = new Tone.Gain(0.8);

guitar.chain(dist, Tone.Master);

//seqGuitar.start(0);
//seqGuitar.loop = true;

var part = new Tone.Pattern(function(time, note){
	//the notes given as the second element in the array
	//will be passed in as the second argument
    playGuitar(note, "2n", time);
    console.log(time);
}, ["C1", "D#1", "E1", "F1", "F#1", "G1", "C2", "C#2"], "randomOnce");

part.start(0);
part.loop = true;

var guitar1 = new Tone.Sampler({
    'C1' : "Guitar/guitar10.opus",  
}, function(){
    guitar1.connect(guitar);
    guitarLoaded += 1;
}, "./assets/samples/");

var guitar2 = new Tone.Sampler({
    'C1' : "Guitar/guitar11.opus",  
}, function(){
    guitar2.connect(guitar);
    guitarLoaded += 1;
}, "./assets/samples/");

var guitar3 = new Tone.Sampler({
    'C1' : "Guitar/guitar12.opus",  
}, function(){
    guitar3.connect(guitar);
    guitarLoaded += 1;
}, "./assets/samples/");

var guitar4 = new Tone.Sampler({
    'C1' : "Guitar/guitar13.opus",  
}, function(){
    guitar4.connect(guitar);
    guitarLoaded += 1;
}, "./assets/samples/");

var guitar5 = new Tone.Sampler({
    'C1' : "Guitar/guitar14.opus",  
}, function(){
    guitar5.connect(guitar);
    guitarLoaded += 1;
}, "./assets/samples/");



function playGuitar(note, length, time, velocity){
    let currentCount = guitarIndex % 5;
    switch (currentCount){
        case 0:
            guitar1.triggerAttackRelease(note, length, time, velocity);
            console.log("git1 playing");
            break;
        
        case 1:
            guitar2.triggerAttackRelease(note, length, time, velocity);
            console.log("git2 playing");
            break;
        
        case 2:
            guitar3.triggerAttackRelease(note, length, time, velocity);
            console.log("git3 playing");
            break;
        
        case 3:
            guitar4.triggerAttackRelease(note, length, time, velocity);
            console.log("git4 playing");
            break;

        case 4:
            guitar5.triggerAttackRelease(note, length, time, velocity);
            console.log("git5 playing");
            break;
    }

    guitarIndex += 1;

}