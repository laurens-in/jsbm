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
            'E2' : "Guitar/Guitar E2 - 1.opus",
            'A#2': "Guitar/Guitar A#2 - 1.opus",
            'C#3': "Guitar/Guitar C#2 - 1.opus",
            'E3' : "Guitar/Guitar E3 - 1.opus",
            'A#3': "Guitar/Guitar A#3 - 1.opus",
            'E4' : "Guitar/Guitar E4 - 1.opus",
            'A#4': "Guitar/Guitar A#4 - 1.opus",
            'E5' : "Guitar/Guitar E5 - 1.opus"
        }, () => {
            this.guitar1.connect(this.guitarOut);
        }, baseurl);

        this.guitar2 = new Tone.Sampler({
            'E2' : "Guitar/Guitar E2 - 2.opus",
            'A#2': "Guitar/Guitar A#2 - 2.opus",
            'C#3': "Guitar/Guitar C#2 - 2.opus",
            'E3' : "Guitar/Guitar E3 - 2.opus",
            'A#3': "Guitar/Guitar A#3 - 2.opus",
            'E4' : "Guitar/Guitar E4 - 2.opus",
            'A#4': "Guitar/Guitar A#4 - 2.opus",
            'E5' : "Guitar/Guitar E5 - 2.opus"
        }, () => {
            this.guitar2.connect(this.guitarOut);
        }, baseurl);

        this.guitar3 = new Tone.Sampler({
            'E2' : "Guitar/Guitar E2 - 3.opus",
            'A#2': "Guitar/Guitar A#2 - 3.opus",
            'C#3': "Guitar/Guitar C#2 - 3.opus",
            'E3' : "Guitar/Guitar E3 - 3.opus",
            'A#3': "Guitar/Guitar A#3 - 3.opus",
            'E4' : "Guitar/Guitar E4 - 3.opus",
            'A#4': "Guitar/Guitar A#4 - 3.opus",
            'E5' : "Guitar/Guitar E5 - 3.opus"
        }, () => {
            this.guitar3.connect(this.guitarOut);
        }, baseurl);

        this.guitar4 = new Tone.Sampler({
            'E2' : "Guitar/Guitar E2 - 4.opus",
            'A#2': "Guitar/Guitar A#2 - 4.opus",
            'C#3': "Guitar/Guitar C#2 - 4.opus",
            'E3' : "Guitar/Guitar E3 - 4.opus",
            'A#3': "Guitar/Guitar A#3 - 4.opus",
            'E4' : "Guitar/Guitar E4 - 4.opus",
            'A#4': "Guitar/Guitar A#4 - 4.opus",
            'E5' : "Guitar/Guitar E5 - 4.opus"
        }, () => {
            this.guitar4.connect(this.guitarOut);
        }, baseurl);

        this.guitar5 = new Tone.Sampler({
            'E2' : "Guitar/Guitar E2 - 5.opus",
            'A#2': "Guitar/Guitar A#2 - 5.opus",
            'C#3': "Guitar/Guitar C#2 - 5.opus",
            'E3' : "Guitar/Guitar E3 - 5.opus",
            'A#3': "Guitar/Guitar A#3 - 5.opus",
            'E4' : "Guitar/Guitar E4 - 5.opus",
            'A#4': "Guitar/Guitar A#4 - 5.opus",
            'E5' : "Guitar/Guitar E5 - 5.opus"
        }, () => {
            this.guitar5.connect(this.guitarOut);
        }, baseurl);

        this.guitar6 = new Tone.Sampler({
            'E2' : "Guitar/Guitar E2 - 6.opus",
            'A#2': "Guitar/Guitar A#2 - 6.opus",
            'C#3': "Guitar/Guitar C#2 - 6.opus",
            'E3' : "Guitar/Guitar E3 - 6.opus",
            'A#3': "Guitar/Guitar A#3 - 6.opus",
            'E4' : "Guitar/Guitar E4 - 6.opus",
            'A#4': "Guitar/Guitar A#4 - 6.opus",
            'E5' : "Guitar/Guitar E5 - 6.opus"
        }, () => {
            this.guitar6.connect(this.guitarOut);
        }, baseurl);

        this.guitar7 = new Tone.Sampler({
            'E2' : "Guitar/Guitar E2 - 7.opus",
            'A#2': "Guitar/Guitar A#2 - 7.opus",
            'C#3': "Guitar/Guitar C#2 - 7.opus",
            'E3' : "Guitar/Guitar E3 - 7.opus",
            'A#3': "Guitar/Guitar A#3 - 7.opus",
            'E4' : "Guitar/Guitar E4 - 7.opus",
            'A#4': "Guitar/Guitar A#4 - 7.opus",
            'E5' : "Guitar/Guitar E5 - 7.opus"
        }, () => {
            this.guitar7.connect(this.guitarOut);
        }, baseurl);

        this.guitar8 = new Tone.Sampler({
            'E2' : "Guitar/Guitar E2 - 8.opus",
            'A#2': "Guitar/Guitar A#2 - 8.opus",
            'C#3': "Guitar/Guitar C#2 - 8.opus",
            'E3' : "Guitar/Guitar E3 - 8.opus",
            'A#3': "Guitar/Guitar A#3 - 8.opus",
            'E4' : "Guitar/Guitar E4 - 8.opus",
            'A#4': "Guitar/Guitar A#4 - 8.opus",
            'E5' : "Guitar/Guitar E5 - 8.opus"
        }, () => {
            this.guitar8.connect(this.guitarOut);
        }, baseurl);

        
        
    }
}