class BassSampler {
    
    dist;
    pan;
    bassOut;
    bass1;
    bass2;
    bass3;
    bass4;
    bass5;
    bass6;
    bass7;
    bass8;
    bass9;
    bass10;

    constructor(volume, distortion, panning, baseurl = "./assets/samples/") {
        this.dist = new Tone.Distortion(distortion);
        this.bassOut = new Tone.Gain(1);
        this.volume = new Tone.Gain(volume);
        this.pan = new Tone.Panner(panning);
        this.bassOut.chain(this.dist, this.volume, this.pan, reverb, Tone.Master);

        this.bass1 = new Tone.Sampler({
            'E1' : "Bass/Bass_E1_-_1.opus",
            'E2' : "Bass/Bass_E2_-_1.opus",
            'E3' : "Bass/Bass_E3_-_1.opus" 
        }, () => {
            this.bass1.connect(this.bassOut);
        }, baseurl);

        this.bass2 = new Tone.Sampler({
            'E1' : "Bass/Bass_E1_-_2.opus",
            'E2' : "Bass/Bass_E2_-_2.opus",
            'E3' : "Bass/Bass_E3_-_2.opus" 
        }, () => {
            this.bass2.connect(this.bassOut);
        }, baseurl);

        this.bass3 = new Tone.Sampler({
            'E1' : "Bass/Bass_E1_-_3.opus",
            'E2' : "Bass/Bass_E2_-_3.opus",
            'E3' : "Bass/Bass_E3_-_3.opus" 
        }, () => {
            this.bass3.connect(this.bassOut);
        }, baseurl);

        this.bass4 = new Tone.Sampler({
            'E1' : "Bass/Bass_E1_-_4.opus",
            'E2' : "Bass/Bass_E2_-_4.opus",
            'E3' : "Bass/Bass_E3_-_4.opus" 
        }, () => {
            this.bass4.connect(this.bassOut);
        }, baseurl);

        this.bass5 = new Tone.Sampler({
            'E1' : "Bass/Bass_E1_-_5.opus",
            'E2' : "Bass/Bass_E2_-_5.opus",
            'E3' : "Bass/Bass_E3_-_5.opus" 
        }, () => {
            this.bass5.connect(this.bassOut);
        }, baseurl);

        this.bass6 = new Tone.Sampler({
            'E1' : "Bass/Bass_E1_-_6.opus",
            'E2' : "Bass/Bass_E2_-_6.opus",
            'E3' : "Bass/Bass_E3_-_6.opus" 
        }, () => {
            this.bass6.connect(this.bassOut);
        }, baseurl);

        this.bass7 = new Tone.Sampler({
            'E1' : "Bass/Bass_E1_-_7.opus",
            'E2' : "Bass/Bass_E2_-_7.opus",
            'E3' : "Bass/Bass_E3_-_7.opus" 
        }, () => {
            this.bass7.connect(this.bassOut);
        }, baseurl);

        this.bass8 = new Tone.Sampler({
            'E1' : "Bass/Bass_E1_-_8.opus",
            'E2' : "Bass/Bass_E2_-_8.opus",
            'E3' : "Bass/Bass_E3_-_8.opus" 
        }, () => {
            this.bass8.connect(this.bassOut);
        }, baseurl);

        this.bass9 = new Tone.Sampler({
            'E1' : "Bass/Bass_E1_-_9.opus",
            'E2' : "Bass/Bass_E2_-_9.opus",
            'E3' : "Bass/Bass_E3_-_9.opus" 
        }, () => {
            this.bass9.connect(this.bassOut);
        }, baseurl);

        this.bass10 = new Tone.Sampler({
            'E1' : "Bass/Bass_E1_-_10.opus",
            'E2' : "Bass/Bass_E2_-_10.opus",
            'E3' : "Bass/Bass_E3_-_10.opus" 
        }, () => {
            this.bass10.connect(this.bassOut);
        }, baseurl);
        
    }
}