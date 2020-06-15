class GuitarSampler {
    
    dist;
    pan;
    guitarOut;
    guitar1;
    guitar2;
    guitar3;
    guitar4;
    guitar5;
    guitar6;
    guitar7;
    guitar8;

    constructor(volume, distortion, panning, baseurl = "./assets/samples/") {
        this.dist = new Tone.Distortion(distortion);
        this.guitarOut = new Tone.Gain(1);
        this.volume = new Tone.Gain(volume);
        this.pan = new Tone.Panner(panning);
        this.guitarOut.chain(this.dist, this.volume, this.pan, reverb, Tone.Master);

        this.guitar1 = new Tone.Sampler({
            'E2' : "Guitar/Guitar_E2_-_1.opus",
            'AS2': "Guitar/Guitar_AS2_-_1.opus",
            'CS3': "Guitar/Guitar_CS3_-_1.opus",
            'E3' : "Guitar/Guitar_E3_-_1.opus",
            'AS3': "Guitar/Guitar_AS3_-_1.opus",
            'E4' : "Guitar/Guitar_E4_-_1.opus",
            'AS4': "Guitar/Guitar_AS4_-_1.opus",
            'E5' : "Guitar/Guitar_E5_-_1.opus"
        }, () => {
            this.guitar1.connect(this.guitarOut);
        }, baseurl);

        this.guitar2 = new Tone.Sampler({
            'E2' : "Guitar/Guitar_E2_-_2.opus",
            'AS2': "Guitar/Guitar_AS2_-_2.opus",
            'CS3': "Guitar/Guitar_CS3_-_2.opus",
            'E3' : "Guitar/Guitar_E3_-_2.opus",
            'AS3': "Guitar/Guitar_AS3_-_2.opus",
            'E4' : "Guitar/Guitar_E4_-_2.opus",
            'AS4': "Guitar/Guitar_AS4_-_2.opus",
            'E5' : "Guitar/Guitar_E5_-_2.opus"
        }, () => {
            this.guitar2.connect(this.guitarOut);
        }, baseurl);

        this.guitar3 = new Tone.Sampler({
            'E2' : "Guitar/Guitar_E2_-_3.opus",
            'AS2': "Guitar/Guitar_AS2_-_3.opus",
            'CS3': "Guitar/Guitar_CS3_-_3.opus",
            'E3' : "Guitar/Guitar_E3_-_3.opus",
            'AS3': "Guitar/Guitar_AS3_-_3.opus",
            'E4' : "Guitar/Guitar_E4_-_3.opus",
            'AS4': "Guitar/Guitar_AS4_-_3.opus",
            'E5' : "Guitar/Guitar_E5_-_3.opus"
        }, () => {
            this.guitar3.connect(this.guitarOut);
        }, baseurl);

        this.guitar4 = new Tone.Sampler({
            'E2' : "Guitar/Guitar_E2_-_4.opus",
            'AS2': "Guitar/Guitar_AS2_-_4.opus",
            'CS3': "Guitar/Guitar_CS3_-_4.opus",
            'E3' : "Guitar/Guitar_E3_-_4.opus",
            'AS3': "Guitar/Guitar_AS3_-_4.opus",
            'E4' : "Guitar/Guitar_E4_-_4.opus",
            'AS4': "Guitar/Guitar_AS4_-_4.opus",
            'E5' : "Guitar/Guitar_E5_-_4.opus"
        }, () => {
            this.guitar4.connect(this.guitarOut);
        }, baseurl);

        this.guitar5 = new Tone.Sampler({
            'E2' : "Guitar/Guitar_E2_-_5.opus",
            'AS2': "Guitar/Guitar_AS2_-_5.opus",
            'CS3': "Guitar/Guitar_CS3_-_5.opus",
            'E3' : "Guitar/Guitar_E3_-_5.opus",
            'AS3': "Guitar/Guitar_AS3_-_5.opus",
            'E4' : "Guitar/Guitar_E4_-_5.opus",
            'AS4': "Guitar/Guitar_AS4_-_5.opus",
            'E5' : "Guitar/Guitar_E5_-_5.opus"
        }, () => {
            this.guitar5.connect(this.guitarOut);
        }, baseurl);

        this.guitar6 = new Tone.Sampler({
            'E2' : "Guitar/Guitar_E2_-_6.opus",
            'AS2': "Guitar/Guitar_AS2_-_6.opus",
            'CS3': "Guitar/Guitar_CS3_-_6.opus",
            'E3' : "Guitar/Guitar_E3_-_6.opus",
            'AS3': "Guitar/Guitar_AS3_-_6.opus",
            'E4' : "Guitar/Guitar_E4_-_6.opus",
            'AS4': "Guitar/Guitar_AS4_-_6.opus",
            'E5' : "Guitar/Guitar_E5_-_6.opus"
        }, () => {
            this.guitar6.connect(this.guitarOut);
        }, baseurl);

        this.guitar7 = new Tone.Sampler({
            'E2' : "Guitar/Guitar_E2_-_7.opus",
            'AS2': "Guitar/Guitar_AS2_-_7.opus",
            'CS3': "Guitar/Guitar_CS3_-_7.opus",
            'E3' : "Guitar/Guitar_E3_-_7.opus",
            'AS3': "Guitar/Guitar_AS3_-_7.opus",
            'E4' : "Guitar/Guitar_E4_-_7.opus",
            'AS4': "Guitar/Guitar_AS4_-_7.opus",
            'E5' : "Guitar/Guitar_E5_-_7.opus"
        }, () => {
            this.guitar7.connect(this.guitarOut);
        }, baseurl);

        this.guitar8 = new Tone.Sampler({
            'E2' : "Guitar/Guitar_E2_-_8.opus",
            'AS2': "Guitar/Guitar_AS2_-_8.opus",
            'CS3': "Guitar/Guitar_CS3_-_8.opus",
            'E3' : "Guitar/Guitar_E3_-_8.opus",
            'AS3': "Guitar/Guitar_AS3_-_8.opus",
            'E4' : "Guitar/Guitar_E4_-_8.opus",
            'AS4': "Guitar/Guitar_AS4_-_8.opus",
            'E5' : "Guitar/Guitar_E5_-_8.opus"
        }, () => {
            this.guitar8.connect(this.guitarOut);
        }, baseurl);

        
        
    }
}