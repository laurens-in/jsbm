class GuitarSampler {
    
    dist;
    guitarOut;
    guitar1;
    guitar2;
    guitar3;
    guitar4;
    guitar5;

    constructor(baseurl = "./assets/samples/") {
        this.dist = new Tone.Distortion(1.5);
        this.guitarOut = new Tone.Gain(0.9);
        this.guitarOut.chain(this.dist, Tone.Master);

        this.guitar1 = new Tone.Sampler({
            'C1' : "Guitar/guitar10.opus",  
        }, () => {
            this.guitar1.connect(this.guitarOut);
        }, baseurl);
        
        this.guitar2 = new Tone.Sampler({
            'C1' : "Guitar/guitar11.opus",  
        }, () => {
            this.guitar2.connect(this.guitarOut);
        }, baseurl);
        
        this.guitar3 = new Tone.Sampler({
            'C1' : "Guitar/guitar12.opus",  
        }, () => {
            this.guitar3.connect(this.guitarOut);
        }, baseurl);
        
        this.guitar4 = new Tone.Sampler({
            'C1' : "Guitar/guitar13.opus",  
        }, () => {
            this.guitar4.connect(this.guitarOut);
        }, baseurl);
        
        this.guitar5 = new Tone.Sampler({
            'C1' : "Guitar/guitar14.opus",  
        }, () => {
            this.guitar5.connect(this.guitarOut);
        }, baseurl);
    }
}