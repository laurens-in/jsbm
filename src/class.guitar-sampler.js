class GuitarSampler {
    
    dist;
    doubledist;
    pan;
    limiter;
    guitarOut;
    guitar1;
    guitar2;
    guitar3;
    guitar4;
    guitar5;
    guitar6;
    guitar7;
    guitar8;

    constructor(volume, distortion, panning, baseurl = "./assets/samples/Guitar/") {
        this.dist = new Tone.Distortion(distortion);
        this.doubledist = new Tone.Distortion(distortion/2);
        this.guitarOut = new Tone.Gain(1);
        this.volume = new Tone.Gain(volume);
        this.pan = new Tone.Panner(panning);
        this.comp = new Tone.Compressor(-7, 7);
        this.eq = new Tone.EQ3(-1.5,-1.5,1);
        this.guitarOut.chain(this.eq, this.comp, this.dist, this.doubledist, this.volume, this.pan, reverb, Tone.Master);

        this.guitar1 = new Tone.Sampler({
            'D2' : "guitar_-_10.opus"
        }, () => {
            this.guitar1.connect(this.guitarOut);
        }, baseurl);

        this.guitar2 = new Tone.Sampler({
            'D2' : "guitar_-_11.opus"
        }, () => {
            this.guitar2.connect(this.guitarOut);
        }, baseurl);

        this.guitar3 = new Tone.Sampler({
            'D2' : "guitar_-_12.opus"
        }, () => {
            this.guitar3.connect(this.guitarOut);
        }, baseurl);

        this.guitar4 = new Tone.Sampler({
            'D2' : "guitar_-_13.opus"
        }, () => {
            this.guitar4.connect(this.guitarOut);
        }, baseurl);

        this.guitar5 = new Tone.Sampler({
            'D2' : "guitar_-_14.opus"
        }, () => {
            this.guitar5.connect(this.guitarOut);
        }, baseurl);
        
        
    }
}