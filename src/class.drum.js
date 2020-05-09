class Drum {

    kit;

    constructor() {

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
}