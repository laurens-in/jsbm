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
            //'E2' : "Guitar_ESP_E2_-_1.opus",
            //'E3' : "Guitar_ESP_E3_-_1.opus",
            //'E4' : "Guitar_ESP_E4_-_1.opus"
            'D2' : "guitar_-_10.opus"
        }, () => {
            this.guitar1.connect(this.guitarOut);
        }, baseurl);

        this.guitar2 = new Tone.Sampler({
            //'E2' : "Guitar_ESP_E2_-_2.opus",
            //'E3' : "Guitar_ESP_E3_-_2.opus",
            //'E4' : "Guitar_ESP_E4_-_2.opus"
            'D2' : "guitar_-_10.opus"
        }, () => {
            this.guitar2.connect(this.guitarOut);
        }, baseurl);

        this.guitar3 = new Tone.Sampler({
            //'E2' : "Guitar_ESP_E2_-_3.opus",
            //'E3' : "Guitar_ESP_E3_-_3.opus",
            //'E4' : "Guitar_ESP_E4_-_3.opus"
            'D2' : "guitar_-_10.opus"
        }, () => {
            this.guitar3.connect(this.guitarOut);
        }, baseurl);

        this.guitar4 = new Tone.Sampler({
            //'E2' : "Guitar_ESP_E2_-_4.opus",
            //'E3' : "Guitar_ESP_E3_-_4.opus",
            //'E4' : "Guitar_ESP_E4_-_4.opus"
            'D2' : "guitar_-_10.opus"
        }, () => {
            this.guitar4.connect(this.guitarOut);
        }, baseurl);

        this.guitar5 = new Tone.Sampler({
            //'E2' : "Guitar_ESP_E2_-_5.opus",
            //'E3' : "Guitar_ESP_E3_-_5.opus",
            //'E4' : "Guitar_ESP_E4_-_5.opus"
            'D2' : "guitar_-_10.opus"
        }, () => {
            this.guitar5.connect(this.guitarOut);
        }, baseurl);

        this.guitar6 = new Tone.Sampler({
            //'E2' : "Guitar_ESP_E2_-_6.opus",
            'E3' : "Guitar_ESP_E3_-_6.opus",
            //'E4' : "Guitar_ESP_E4_-_6.opus"
        }, () => {
            this.guitar6.connect(this.guitarOut);
        }, baseurl);

        this.guitar7 = new Tone.Sampler({
            //'E2' : "Guitar_ESP_E2_-_7.opus",
            'E3' : "Guitar_ESP_E3_-_7.opus",
            //'E4' : "Guitar_ESP_E4_-_7.opus"
        }, () => {
            this.guitar7.connect(this.guitarOut);
        }, baseurl);

        this.guitar8 = new Tone.Sampler({
            //'E2' : "Guitar_ESP_E2_-_8.opus",
            'E3' : "Guitar_ESP_E3_-_8.opus",
            //'E4' : "Guitar_ESP_E4_-_8.opus"
        }, () => {
            this.guitar8.connect(this.guitarOut);
        }, baseurl);


        // //'E2' : "Guitar_E2_-_8.opus",
        // #2': "Guitar_AS2_-_8.opus",
        // 'C#3': "Guitar_CS3_-_8.opus",
        // //'E3' : "Guitar_E3_-_8.opus",
        // //'A#3': "Guitar_AS3_-_8.opus",
        // 'E4' : "Guitar_E4_-_8.opus",
        // 'A#4': "Guitar_AS4_-_8.opus",
        // 'E5' : "Guitar_E5_-_8.opus"

        
        
    }
}