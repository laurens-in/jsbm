let reverb = new Tone.Convolver("./assets/samples/IR.wav");
reverb.wet.value = 0.3;

let acoustic = new Tone.Convolver("./assets/samples/acoustic_ir.wav");
acoustic.wet.value = 0.9;