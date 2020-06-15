const DRUMTYPES = {
    BD: 0,
    SD: 1,
    HH: 2
}

class PolyphoneSequence {
    constructor(drum_pattern) {
        const clone = (items) => {
            return items.map((item) => {
                return Array.isArray(item) ? clone(item) : item;
            });
        };
        this.drums = clone(drum_pattern);
        
        // how many notes does the guitar pattern have?
        // 2 params: count of notes, diversity in notes
        // how to generate rhythmical structure?
        // length of notes?
        // tremolo picking?
        
        this.guitar = [];
        this.guitar_lengths = [];
        this.bass = [];
        this.guitar_melody = [];
        this.guitar_melody_lengths = [];
    }

    // dosomethinginterestingwith(input) {
    //     let chords = input.map(function mapper(s){
    //         if (Array.isArray(s)) {
    //             return s.flatMap(mapper);
    //         } else {
    //             return getChord(s)
    //         }
    //     })
    //     return chords
    // }

    // harmonize guitar root note pattern
    generate_guitar() {
        // 1. generate base pattern
        let base_pattern = [[45], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], []];
        
        // 2. harmonize base pattern
        let chords = base_pattern.map(function mapper(root_note) {
            if (Array.isArray(root_note)) {
                // unpack array
                return root_note.flatMap(mapper);
            } else {
                // choose chord type
                const ctypes = ['power', 'dyad', 'triad', 'barre'];
                let type = ctypes[Math.floor(Math.random() * ctypes.length)];

                // generate array of all chords matching the type
                let chordtypes = make_chords(root_note, type);
                return chordtypes[Math.floor(Math.random() * chordtypes.length)];
            }
        })
        this.guitar = chords;
    }

    // TODO: implement permuteGuitar()
    generate_rhythm() {
        // 1. change rhythmical structure
        // 2. replace chord types
        let selected_chord_set;
        let generated_chords;
        let last_change = 0;

        this.guitar.forEach((chord_set, i) => {

            if (chord_set.length > 0) {
                selected_chord_set = chord_set[0];
                generated_chords = make_chords(selected_chord_set.chord[0], chord_set[0].type);
            }

            if ((this.drums[i].includes(0) || this.drums[i].includes(1)) && Math.random() < 0.4) {
                if (i - last_change > 4) {
                    this.guitar[i] =  Math.random() < 0.2 ? [selected_chord_set] : [generated_chords[Math.floor(Math.random() * generated_chords.length)]];
                }
                last_change = i;
            }

            if (this.drums[i].length > 0 && Math.random() < 0.1) {
                if (i - last_change > 2) {
                    this.guitar[i] = Math.random() < 0.6 ?  [selected_chord_set] : [generated_chords[Math.floor(Math.random() * generated_chords.length)]];
                }

                last_change = i;
            }
        });
    }

    // TODO: implement melody generator
    // how to generate melody from harmonic structure? -> select from chord, and generte rhythmical structure, repeating the set of notes if necessary
    generate_melody() {
        const base_chord = [0, 7, 12, 15];
        let melody = [];
        let melody_pattern = [0, 6, 5, 2, 4, 5];
        let melody_index = 0;
        let selected_chord_set = base_chord;
        let last_change = 0;
        let last_note = [];
        this.guitar.forEach((chord_set, i) => {
            if (chord_set.length > 0) {
                // there is a new set of chords
                // select one of the chords in the chord set
                //selected_chord_set = chord_set[Math.floor(Math.random() * chord_set.length)];
                
                //use the same chord as rhythm guitar --> arpeggiate
                
                if (Math.random() < 0.5) {
                    selected_chord_set = chord_set[0].chord
                } else {
                    let melody_barre = make_chords(chord_set[0].chord[0], 'barre');
                    let melody_dyad = make_chords(chord_set[0].chord[0], 'dyad');
                    selected_chord_set = mergeArrays(melody_barre[Math.floor(Math.random() * melody_barre.length)].chord, melody_dyad[Math.floor(Math.random() * melody_dyad.length)].chord, melody_dyad[Math.floor(Math.random() * melody_dyad.length)].chord);
                }

            }
            // use the chords from a previous selection
            // TODO: think about adding Tone.js Notes including length and dynamics instead if MIDI note numbers

            // if (i % 6 == 0 && Math.random() < 0.9) {
            //     melody[i] = [selected_chord_set[melody_pattern[melody_index % melody_pattern.length] % selected_chord_set.length]];
            //     Math.random() < 0.99 ? melody_index += 1 : melody_index += 2;
            // } else if (i % 8 == 2 && Math.random() < 0){
            //     //melody[i] = [selected_chord_set[Math.floor(Math.random() * selected_chord_set.length)]];
            //     melody[i] = [selected_chord_set[melody_pattern[melody_index % melody_pattern.length] % selected_chord_set.length]];
            //     melody_index += 1;
            // } else if (i % 7 == 3 && Math.random() < 0){
            //     melody[i] = [selected_chord_set[melody_pattern[melody_index % melody_pattern.length] % selected_chord_set.length]];
            //     melody_index += 1;
            // } else {
            //     melody[i] = [];
            // }


            // other approach
            if ((this.drums[i].length >= 2) && Math.random() < 0.4 && i % 2 == 0) {   
                melody[i] = [selected_chord_set[melody_pattern[melody_index % melody_pattern.length] % selected_chord_set.length]];
                if (i - last_change > 4) {
                    Math.random() < 0.5 ? melody_index += 1 : melody_index += 2;
                    last_change = i;
                } else {
                    Math.random() < 0.1 ? melody_index += 1 : undefined;
                }
                last_note = melody[i];

            } else if ((this.drums[i].length > 0) && Math.random() < 0.8 && i % 2 == 0){
                melody[i] = [selected_chord_set[melody_pattern[melody_index % melody_pattern.length] % selected_chord_set.length]];
                if (i - last_change > 2) {
                    melody_index += 1;
                    last_change = i; 
                }
                last_note = melody[i];

            } else {
                melody[i] = [];
            }

        })
        this.guitar_melody = melody;
        // or
        // this.guitar_melody = melody_pattern;
    }

    generate_lengths() {
        let rhythm_length_counter = 0;
        let rhythm_last_index = 0;
        let melody_length_counter = 0;
        let melody_last_index;
        this.guitar.forEach((chord_set, i) => {
            if (chord_set.length > 0) {
                rhythm_last_index = i;
                rhythm_length_counter = 1;
                this.guitar_lengths[rhythm_last_index] = [rhythm_length_counter];
            } else {
                rhythm_length_counter += 1;
                this.guitar_lengths[rhythm_last_index] = [rhythm_length_counter];
                this.guitar_lengths[i] = [];
                this.guitar[i] = [{chord: []}];
            }
        });
        this.guitar_melody.forEach((chord_set, i) => {
            if (chord_set.length > 0) {
                melody_last_index = i;
                melody_length_counter = 1;
                this.guitar_melody_lengths[melody_last_index] = [melody_length_counter];
            } else {
                melody_length_counter += 1;
                this.guitar_melody_lengths[melody_last_index] = [melody_length_counter];
                this.guitar_melody_lengths[i] = [];
            }
        });
    }

    generate_bass() {
        this.bass = this.dosomethinginterestingwith(this.drums);
    }

    mod = (x, n) => (x % n + n) % n;

    add_instr(step, instr) {
        this.drums[this.mod((step-2),this.drums.length)].push(instr);
        this.drums[this.mod((step-2),this.drums.length)] = [... new Set(this.drums[this.mod((step-2),this.drums.length)])];
    }

    remove_instr(step, instr) {
        this.drums[step] = this.drums[step].filter((inst) => inst != instr);
    }



    permuteDrum() {

        const bd_add = 0.4;
        const bd_remove = 0.2;
        const sd_add = 0.3; 
        const sd_remove = 0.2; 
        const hh_add = 0.2; 
        const hh_remove = 0.2; 

        for (const step of this.drums.keys()) {
            if (step % 8 == 0) {
                (Math.random() < bd_remove)? this.remove_instr(step, DRUMTYPES.BD) : undefined;
                (Math.random() < bd_add)? this.add_instr(step, DRUMTYPES.BD) : undefined;
                (Math.random() < sd_remove)? this.remove_instr(step, DRUMTYPES.SD) : undefined;
                (Math.random() < sd_add)? this.add_instr(step, DRUMTYPES.SD) : undefined;
                //(Math.random() > sd_add_remove )? this.remove_instr(step, DRUMTYPES.SD) : this.add_instr(step, DRUMTYPES.SD);
                //(Math.random() > hh_add_remove )? this.remove_instr(step, DRUMTYPES.HH) : this.add_instr(step, DRUMTYPES.HH);
            }
        }

        if (Math.random() < 0.5) {
            for (const step of this.drums.keys()) {
                if (step % 3 == 0) {
                    this.add_instr(step, DRUMTYPES.BD)
                }
            }
        }
        if (Math.random() < 0.5) {
            for (const step of this.drums.keys()) {
                if (step % 8 == 4) {
                    this.remove_instr(step, DRUMTYPES.HH)
                }
            }
        }

        let randomIndex = Math.floor(Math.random() * this.drums.length)

        //                       1 1 1 1 1 1   1 1 1 1 2 2 2 2    
        // 0 1 2 3 4 5 6 7   8 9 0 1 2 3 4 5   6 7 8 9 0 1 2 3
        // x x x x x x x x | x x x x x x x x | x x x x x x x x  
        // B - - -   - - -     - - -   - - -     - - - B - - -
        // H - - - H - - -   H - - - H - - -   H - - - H - - - 
        //   - - -   - - -     - - - S - - -     - - -   - - -

        // ^                          

        //
        // x   o   x   o   | x   o   x   o   | x   o   x   o    l1
        //   o x o     x   |   o x o     x   |   o x o     x    l2
        //                                             ^

        if (randomIndex % 4 == 0){
            //first level (downbeat)
            // if hihat make crash
            // if bassdrum add bassdrum 2 before or 2 after
            // if snare add bassdrum 2 before or 2 after
            if (this.drums[randomIndex].includes(DRUMTYPES.BD) || this.drums[randomIndex].includes(DRUMTYPES.SD)){
                if (Math.random() < 0.6){
                    // TODO: use this.add_instr(step, DRUMTYPE.X)
                    this.add_instr(randomIndex - 2, DRUMTYPES.BD)
                } else {
                    this.add_instr(randomIndex + 2, DRUMTYPES.BD)
                }
            }
            // add cymbal 2 before or 2 after
            if (this.drums[randomIndex].includes(2)){
                if (Math.random() < 0.6){
                    this.add_instr(randomIndex - 2, DRUMTYPES.HH)
                } else {
                    this.add_instr(randomIndex - 2, DRUMTYPES.HH)
                }
            }

        } else if (randomIndex % 4 == 2){
            //second level (upbeat)
            // if bassdrum add bassdrum 1 after
            // if snare add bassdrum 1 after
            if (this.drums[randomIndex].includes(0) || this.drums[randomIndex].includes(1)){
                this.drums[this.mod((randomIndex+1),this.drums.length)].push(DRUMTYPES.BD);
                this.drums[this.mod((randomIndex+1),this.drums.length)] = [... new Set(this.drums[this.mod((randomIndex+1),this.drums.length)])];
            }
            // if cymbal add cymbal 1 before or 1 after
            if (this.drums[randomIndex].includes(2)){
                this.drums[this.mod((randomIndex+1),this.drums.length)].push(DRUMTYPES.BD);
                this.drums[this.mod((randomIndex+1),this.drums.length)] = [... new Set(this.drums[this.mod((randomIndex+1),this.drums.length)])];
            }

        } else {
            //third level
            // if cymbal add cymbal +/- 1

        }
    }

    // think about posibility to permute single instruments

    randomize() {
        const next = new PolyphoneSequence(this.drums);
        next.generate_guitar();
        next.generate_melody();
        //next.generate_bass();
        next.permuteDrum();
        next.generate_rhythm();
        next.generate_lengths();
        return next;
    }
}
