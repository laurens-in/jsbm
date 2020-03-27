// round-robin guitar sampler
let guitarIndex = 0;
var dist = new Tone.Distortion(0);
var guitar = new Tone.Gain(1);

guitar.chain(dist, Tone.Master);

Tone.Transport.start(0);
Tone.Transport.bpm.value = 120;


var guitar1 = new Tone.Sampler({
    'C1' : "Guitar/guitar10.opus",  

}, function(){
    guitar1.connect(guitar);
}, "./assets/samples/");

var guitar2 = new Tone.Sampler({
    'C1' : "Guitar/guitar11.opus",  
}, function(){
    guitar2.connect(guitar);
}, "./assets/samples/");

var guitar3 = new Tone.Sampler({
    'C1' : "Guitar/guitar12.opus",  

}, function(){
    guitar3.connect(guitar);
}, "./assets/samples/");

var guitar4 = new Tone.Sampler({
    'C1' : "Guitar/guitar13.opus",  

}, function(){
    guitar4.connect(guitar);
}, "./assets/samples/");

var guitar5 = new Tone.Sampler({
    'C1' : "Guitar/guitar14.opus",  

}, function(){
    guitar5.connect(guitar);
}, "./assets/samples/");


var seqGuitar = new Tone.Sequence(function(time, note){
    playGuitar(note, "4n", time, (Math.random() * 0.3) + 0.7);
//subdivisions are given as subarrays
}, ["C0", "C0", ["C0", "C0"], "C#0", "C#0", ["C#0", "E0"]]);

seqGuitar.start(0);
seqGuitar.loop = true;



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