class Drum {

    gain;
    kit;

    constructor(volume) {

        this.gain = new Tone.Gain(volume);

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
            'C4' : "Ride/Ride_-_1.opus",
            'C#4' : "Ride/Ride_-_2.opus",
            'D4' : "Ride/Ride_-_3.opus",
            'D#4' : "Ride/Ride_-_4.opus",
            'E4' : "Ride/Ride_-_5.opus",
            'F4' : "Ride/Ride_-_6.opus",
            'F#4' : "Ride/Ride_-_7.opus",
            'G4' : "Ride/Ride_-_8.opus",
            'G#4' : "Ride/Ride_-_9.opus",
            'A4' : "Ride/Ride_-_10.opus",
            'A#4' : "Ride/Ride_-_11.opus",
            'B4' : "Ride/Ride_-_12.opus",
            'C5' : "Crash/Crash1__-_1.opus",
            'C#5' : "Crash/Crash1__-_2.opus",
            'D5' : "Crash/Crash1__-_3.opus",
            'D#5' : "Crash/Crash1__-_4.opus",
            'E5' : "Crash/Crash2__-_1.opus",
            'F5' : "Crash/Crash2__-_2.opus",
            'F#5' : "Crash/Crash2__-_3.opus",
            'G5' : "Crash/Crash2__-_4.opus",
            'G#5' : "Crash/Crash3__-_1.opus",
            'A5' : "Crash/Crash3__-_2.opus",
            'A#5' : "Crash/Crash3__-_3.opus",
            'B5' : "Crash/Crash3__-_4.opus",
            'C6' : "Tom/Tom__-_1.opus",
            'C#6' : "Tom/Tom__-_2.opus",
            'D6' : "Tom/Tom__-_3.opus",
            'D#6' : "Tom/Tom__-_4.opus",
            'E6' : "Tom/Tom__-_5.opus",
            'F6' : "Tom/Tom__-_6.opus",
            'F#6' : "Tom/Tom__-_7.opus",
            'G6' : "Tom/Tom__-_8.opus",
            'G#6' : "Tom/Tom__-_9.opus",
            'A6' : "Tom/Tom__-_10.opus",
            'A#6' : "Tom/Tom__-_11.opus",
            'B6' : "Tom/Tom__-_12.opus",
           
        }, () => {
        
            this.kit.chain(this.gain, reverb, Tone.Master);

        }, "./assets/samples/");
    };   
}