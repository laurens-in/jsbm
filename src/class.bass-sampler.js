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

    constructor(panning, baseurl = "./assets/samples/") {
        this.dist = new Tone.Distortion(0.15);
        this.bassOut = new Tone.Gain(0.9);
        this.pan = new Tone.Panner(panning);
        this.bassOut.chain(this.dist, this.pan, reverb, Tone.Master);

        this.bass1 = new Tone.Sampler({
            'E1' : "Bass/Bass E1 - 1.opus",
            'E2' : "Bass/Bass E2 - 1.opus",
            'E3' : "Bass/Bass E3 - 1.opus" 
        }, () => {
            this.bass1.connect(this.bassOut);
        }, baseurl);

        this.bass2 = new Tone.Sampler({
            'E1' : "Bass/Bass E1 - 2.opus",
            'E2' : "Bass/Bass E2 - 2.opus",
            'E3' : "Bass/Bass E3 - 2.opus" 
        }, () => {
            this.bass2.connect(this.bassOut);
        }, baseurl);

        this.bass3 = new Tone.Sampler({
            'E1' : "Bass/Bass E1 - 3.opus",
            'E2' : "Bass/Bass E2 - 3.opus",
            'E3' : "Bass/Bass E3 - 3.opus" 
        }, () => {
            this.bass3.connect(this.bassOut);
        }, baseurl);

        this.bass4 = new Tone.Sampler({
            'E1' : "Bass/Bass E1 - 4.opus",
            'E2' : "Bass/Bass E2 - 4.opus",
            'E3' : "Bass/Bass E3 - 4.opus" 
        }, () => {
            this.bass4.connect(this.bassOut);
        }, baseurl);

        this.bass5 = new Tone.Sampler({
            'E1' : "Bass/Bass E1 - 5.opus",
            'E2' : "Bass/Bass E2 - 5.opus",
            'E3' : "Bass/Bass E3 - 5.opus" 
        }, () => {
            this.bass5.connect(this.bassOut);
        }, baseurl);

        this.bass6 = new Tone.Sampler({
            'E1' : "Bass/Bass E1 - 6.opus",
            'E2' : "Bass/Bass E2 - 6.opus",
            'E3' : "Bass/Bass E3 - 6.opus" 
        }, () => {
            this.bass6.connect(this.bassOut);
        }, baseurl);

        this.bass7 = new Tone.Sampler({
            'E1' : "Bass/Bass E1 - 7.opus",
            'E2' : "Bass/Bass E2 - 7.opus",
            'E3' : "Bass/Bass E3 - 7.opus" 
        }, () => {
            this.bass7.connect(this.bassOut);
        }, baseurl);

        this.bass8 = new Tone.Sampler({
            'E1' : "Bass/Bass E1 - 8.opus",
            'E2' : "Bass/Bass E2 - 8.opus",
            'E3' : "Bass/Bass E3 - 8.opus" 
        }, () => {
            this.bass8.connect(this.bassOut);
        }, baseurl);

        this.bass9 = new Tone.Sampler({
            'E1' : "Bass/Bass E1 - 9.opus",
            'E2' : "Bass/Bass E2 - 9.opus",
            'E3' : "Bass/Bass E3 - 9.opus" 
        }, () => {
            this.bass9.connect(this.bassOut);
        }, baseurl);

        this.bass10 = new Tone.Sampler({
            'E1' : "Bass/Bass E1 - 10.opus",
            'E2' : "Bass/Bass E2 - 10.opus",
            'E3' : "Bass/Bass E3 - 10.opus" 
        }, () => {
            this.bass10.connect(this.bassOut);
        }, baseurl);
        
    }
}