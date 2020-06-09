class GuitarSampler {
    
    dist;
    pan;
    guitarOut;
    guitar1;
    guitar2;
    guitar3;
    guitar4;
    guitar5;

    constructor(volume, distortion, panning, baseurl = "./assets/samples/") {
        this.dist = new Tone.Distortion(distortion);
        this.guitarOut = new Tone.Gain(1);
        this.volume = new Tone.Gain(volume);
        this.pan = new Tone.Panner(panning);
        this.guitarOut.chain(this.dist, this.volume, this.pan, reverb, Tone.Master);

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