const DRUMTYPES = {
    BD: 0,
    SD: 1,
    HH: 2,
    RD: 3,
    CC: 4,
    TM: 5
}

class PolyphoneSequence {
    constructor(drum_pattern, guitar_pattern) {
        const clone = (items) => {
            return items.map((item) => {
                return Array.isArray(item) ? clone(item) : item;
            });
        };

        this.drums = clone(drum_pattern);      
        this.guitar = [];
        this.guitar_base_pattern = clone(guitar_pattern);
        this.guitar_lengths = [];
        this.bass = [];
        this.bass_lengths = [];
        this.guitar_melody = [];
        this.guitar_melody_lengths = [];
    }

    //harmonize guitar root note pattern
    generate_guitar() {
        //set base pattern
        let base_pattern = this.guitar_base_pattern;
        
        //unfold root notes
        let chords = base_pattern.map(function mapper(root_note) {
            if (Array.isArray(root_note)) {
                //unpack array
                return root_note.flatMap(mapper);
            } else {
                //choose chord types
                const ctypes = ['power', 'dyad', 'triad', 'barre'];
                let type = ctypes[Math.floor(Math.random() * (config.chord_range[1] - config.chord_range[0] + 1)) + config.chord_range[0]]; //param lower upper chord range

                //generate array of all chords matching the type
                let chordtypes = make_chords(root_note, type);
                //chose one of the chords
                return chordtypes[Math.floor(Math.random() * chordtypes.length)];
            }
        })
        this.guitar = chords;
    }

    generate_rhythm() {
        let selected_chord_set;
        let generated_chords;
        let last_change = 0;

        this.guitar.forEach((chord_set, i) => {
            //loop over this.guitar and check if there is a chord
            if (chord_set.length > 0) {
                //set selected chord 
                selected_chord_set = chord_set[0];
                //generate variations from same type
                if (chord_set[0].type !== 'power') {
                    generated_chords = make_chords(selected_chord_set.chord[0], chord_set[0].type);
                } 
                //generate dyads if type = power
                else {
                    generated_chords = make_chords(selected_chord_set.chord[0], 'dyad');
                }
            }

            //if there is a bass drum or a kick -> chance to add chord
            if ((this.drums[i].includes(0) || this.drums[i].includes(1)) && config.guitar_rhythm_prob) { //param guitar_rhythm_prob
                if (i - last_change > config.guitar_rhythm_min_gap) { //param guitar_rhythm_change smallest gap to add new chord
                    this.guitar[i] =  Math.random() < config.guitar_chord_repetition ? [selected_chord_set] : [generated_chords[Math.floor(Math.random() * generated_chords.length)]];
                    last_change = i;
                }
            }
            //if there is anything else on drums -> smaller chance to add chord
            else if (this.drums[i].length > 0 && Math.random() < (config.guitar_rhythm_prob / 2)) { //param guitar rhythm_prob / 2 ?
                if (i - last_change > config.guitar_rhythm_min_gap) {
                    this.guitar[i] = Math.random() < config.guitar_chord_repetition ?  [selected_chord_set] : [generated_chords[Math.floor(Math.random() * generated_chords.length)]];
                    last_change = i;
                }

            }
        });
    }

    //TODO: implement melody generator
    //how to generate melody from harmonic structure? -> select from chord, and generte rhythmical structure, repeating the set of notes if necessary
    generate_melody() {
        const base_chord = [0, 7, 12, 15];
        let selected_chord_set = base_chord;
        let melody = [[]];
        let melody_pattern = config.melody_pattern //[0, 6, 5, 0, 5, 6]; //param melody_pattern
        let melody_index = 0;
        let last_change = 0;
        let last_note = [];
        let which_melody = 0 //Math.random();
        this.guitar.forEach((chord_set, i) => {
            if (chord_set.length > 0) {

                //use the same chord as rhythm guitar --> arpeggiate or create a new set from 3 chords
                if (Math.random() < 0.3) { //param arpeggiate --> the bigger the more arpeggio
                    selected_chord_set = chord_set[0].chord
                } else {
                    let melody_barre = make_chords(chord_set[0].chord[0], 'barre');
                    let melody_dyad = make_chords(chord_set[0].chord[0], 'dyad');
                    selected_chord_set = mergeArrays(melody_barre[Math.floor(Math.random() * melody_barre.length)].chord, melody_dyad[Math.floor(Math.random() * melody_dyad.length)].chord, melody_dyad[Math.floor(Math.random() * melody_dyad.length)].chord);
                }
                if (melody[0].length == 0) {
                    melody[i] = [selected_chord_set[melody_pattern[melody_index % melody_pattern.length] % selected_chord_set.length]];
                }

            }

            if (which_melody < 0.5) {
                if (i % config.melody1_level1_step == 0 && Math.random() < config.melody1_prob) { //param melody1_level1_step
                    melody[i] = [selected_chord_set[melody_pattern[melody_index % melody_pattern.length] % selected_chord_set.length]];
                    Math.random() < 0.99 ? melody_index += 1 : melody_index += 2;
                } else if (i % config.melody1_level1_step == config.melody1_level2_step && Math.random() < config.melody1_prob * 0.9){
                    melody[i] = [selected_chord_set[melody_pattern[melody_index % melody_pattern.length] % selected_chord_set.length]];
                    melody_index += 1;
                } else if (i % config.melody1_level1_step == config.melody1_level3_step && Math.random() < config.melody1_prob * 0.8){
                    melody[i] = [selected_chord_set[melody_pattern[melody_index % melody_pattern.length] % selected_chord_set.length]];
                    melody_index += 1;
                } else {
                    melody[i] = [];
                }
            } else {
                if ((this.drums[i].length >= 2) && Math.random() < config.melody2_prob && i % 2 == 0) {
                    melody[i] = [selected_chord_set[melody_pattern[melody_index % melody_pattern.length] % selected_chord_set.length]];
                    if (i - last_change > config.melody2_min_gap) {
                        Math.random() < 0.5 ? melody_index += 1 : melody_index += 2;
                        last_change = i;
                    } else {
                        Math.random() < 0.1 ? melody_index += 1 : undefined;
                    }
                    last_note = melody[i];

                } else if ((this.drums[i].length > 0) && Math.random() < 0.8 && i % 2 == 0){
                    melody[i] = [selected_chord_set[melody_pattern[melody_index % melody_pattern.length] % selected_chord_set.length]];
                    if (i - last_change > config.melody2_min_gap) {
                        melody_index += 1;
                        last_change = i; 
                    }
                    last_note = melody[i];

                } else {
                    melody[i] = [];
                }
            }

        })
        this.guitar_melody = melody;
    }

    generate_tremolo() {
        if (config.rhythm_tremolo) {
            this.guitar.forEach((chord_set, i) => {
                if (this.guitar[i].length == 0 && i > 0) {
                    this.guitar[i] = this.guitar[i - 1];
                }
            })
        }

        if (config.melody_tremolo) {
            this.guitar_melody.forEach((chord_set, i) => {
                if (this.guitar_melody[i].length == 0 && i > 0) {
                    this.guitar_melody[i] = this.guitar_melody[i - 1];
                }
            })
        }
    }

    generate_bass() {
        let bass = [[]];
        let selected_chord_set;

        this.guitar.forEach((chord_set, i) => {
            if (chord_set.length > 0) {
                //use the same chord as rhythm guitar --> arpeggiate or create a new set from 3 chords
                if (Math.random() < 0.5) {
                    selected_chord_set = chord_set[0].chord.flatMap(x => x - 12);
                } else {
                    let bass_triad = make_chords((chord_set[0].chord[0] - 12), 'triad');
                    let bass_dyad = make_chords((chord_set[0].chord[0] - 12), 'dyad');
                    selected_chord_set = mergeArrays(bass_triad[Math.floor(Math.random() * bass_triad.length)].chord, bass_dyad[Math.floor(Math.random() * bass_dyad.length)].chord, bass_dyad[Math.floor(Math.random() * bass_dyad.length)].chord);
                }
                if (bass[0].length == 0){
                    bass[0] = [selected_chord_set[Math.floor(Math.random() * selected_chord_set.length)]];
                }

            }

            if ((this.drums[i].length >= 2) && Math.random() < config.bass_prob && i % 2 == 0) { 
                bass[i] = [selected_chord_set[Math.floor(Math.random() * selected_chord_set.length)]];

            } else if ((this.drums[i].length > 0) && Math.random() < (config.bass_prob * 0.6) && i % 2 == 0){
                bass[i] = [selected_chord_set[Math.floor(Math.random() * selected_chord_set.length)]];

            } else {
                bass[i] = [];
            }
        })

        this.bass = bass;
    }

    generate_lengths() {
        let rhythm_length_counter = 0;
        let rhythm_last_index = 0;
        let melody_length_counter = 0;
        let melody_last_index;
        let bass_length_counter = 0;
        let bass_last_index;
        this.guitar.forEach((chord_set, i) => {
            if (chord_set.length > 0) {
                rhythm_last_index = i;
                rhythm_length_counter = 1;
                this.guitar_lengths[rhythm_last_index] = [rhythm_length_counter];
                this.guitar[i] = this.guitar[i][0].chord
            } else {
                rhythm_length_counter += 1;
                this.guitar_lengths[rhythm_last_index] = [rhythm_length_counter];
                this.guitar_lengths[i] = [];
                this.guitar[i] = [];
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

        this.bass.forEach((chord_set, i) => {
            if (chord_set.length > 0) {
                bass_last_index = i;
                bass_length_counter = 1;
                this.bass_lengths[bass_last_index] = [bass_length_counter];
            } else {
                bass_length_counter += 1;
                this.bass_lengths[bass_last_index] = [bass_length_counter];
                this.bass_lengths[i] = [];
            }
        });
    }

    mod = (x, n) => (x % n + n) % n;

    add_instr(step, instr) {
        this.drums[this.mod((step),this.drums.length)].push(instr);
        this.drums[this.mod((step),this.drums.length)] = [... new Set(this.drums[this.mod((step),this.drums.length)])];
    }

    remove_instr(step, instr) {
        this.drums[step] = this.drums[step].filter((inst) => inst != instr);
    }



    permute_drum() {

        const bd_add = config.bd_add;
        const bd_remove = config.bd_remove;
        const sd_add = config.sd_add;
        const sd_remove = config.sd_remove;
        const cc_add = config.cc_add;

        for (const step of this.drums.keys()) {
            if (step % config.drum_level0_step == 0) {
                (Math.random() < bd_remove)? this.remove_instr(step, DRUMTYPES.BD) : undefined;
                (Math.random() < bd_add)? this.add_instr(step, DRUMTYPES.BD) : undefined;
                (Math.random() < sd_remove)? this.remove_instr(step, DRUMTYPES.SD) : undefined;
                (Math.random() < sd_add)? this.add_instr(step, DRUMTYPES.SD) : undefined;
                (Math.random() < cc_add)? this.add_instr(step, DRUMTYPES.CC) : undefined;
            }
        }

        if (Math.random() < config.drum_doublebass_prob) {
            for (const step of this.drums.keys()) {
                if (step % 2 == 0) {
                    this.add_instr(step, DRUMTYPES.BD)
                }
            }
        }
        if (Math.random() < config.drum_halftime_prob) {
            for (const step of this.drums.keys()) {
                if (step % 8 == 4) {
                    this.remove_instr(step, DRUMTYPES.HH)
                }
            }
        }

        if (Math.random() < config.drum_doubletime_prob) {
            for (const step of this.drums.keys()) {
                if (step % 2 == 0) {
                    this.add_instr(step, DRUMTYPES.HH)
                }
            }
        }



        let randomIndex = Math.floor(Math.random() * this.drums.length)

        //                      1 1 1 1 1 1   1 1 1 1 2 2 2 2    
        //0 1 2 3 4 5 6 7   8 9 0 1 2 3 4 5   6 7 8 9 0 1 2 3
        //x x x x x x x x | x x x x x x x x | x x x x x x x x  
        //B - - -   - - -     - - -   - - -     - - - B - - -
        //H - - - H - - -   H - - - H - - -   H - - - H - - - 
        //  - - -   - - -     - - - S - - -     - - -   - - -

        //^                          

        //
        //x   o   x   o   | x   o   x   o   | x   o   x   o    l1
        //  o x o     x   |   o x o     x   |   o x o     x    l2
        //                                            ^

        if (randomIndex % 4 == 0){
            //first level (downbeat)
            //if hihat make crash
            if ((this.drums[randomIndex].includes(DRUMTYPES.HH) || this.drums[randomIndex].includes(DRUMTYPES.RD)) && Math.random() < 0.5){
                this.remove_instr(randomIndex, DRUMTYPES.HH);
                this.remove_instr(randomIndex, DRUMTYPES.RD);
                this.add_instr(randomIndex, DRUMTYPES.CC);
            }
            //if bassdrum add bassdrum 2 before or 2 after
            //if snare add bassdrum 2 before or 2 after
            if (this.drums[randomIndex].includes(DRUMTYPES.BD) || this.drums[randomIndex].includes(DRUMTYPES.SD)){
                if (Math.random() < 0.6){
                    //TODO: use this.add_instr(step, DRUMTYPE.X)
                    this.add_instr(randomIndex - 2, DRUMTYPES.BD)
                } else {
                    this.add_instr(randomIndex + 2, DRUMTYPES.BD)
                }
            }
            //add hihat 2 before or 2 after
            if (this.drums[randomIndex].includes(DRUMTYPES.HH)){
                if (Math.random() < 0.6){
                    this.add_instr(randomIndex - 2, DRUMTYPES.HH)
                } else {
                    this.add_instr(randomIndex - 2, DRUMTYPES.HH)
                }
            }

            if (this.drums[randomIndex].includes(DRUMTYPES.RD)){
                if (Math.random() < 0.6){
                    this.add_instr(randomIndex - 2, DRUMTYPES.RD)
                } else {
                    this.add_instr(randomIndex - 2, DRUMTYPES.RD)
                }
            }

        } else if (randomIndex % 4 == 2){
            //second level (upbeat)
            //if bassdrum add bassdrum 1 after
            //if snare add bassdrum 1 after
            if (this.drums[randomIndex].includes(0) || this.drums[randomIndex].includes(1)){
                this.add_instr(randomIndex+1, DRUMTYPES.BD);
            }
            //if cymbal add cymbal 1 before or 1 after
            if (this.drums[randomIndex].includes(DRUMTYPES.HH)){
                this.add_instr(randomIndex+1, DRUMTYPES.HH);
            }

            if (this.drums[randomIndex].includes(DRUMTYPES.RD)){
                this.add_instr(randomIndex+1, DRUMTYPES.RD);
            }

            if (this.drums.length == 0){
                this.add_instr(randomIndex, DRUMTYPES.HH);
            }

        } else {
            //third level
            //if cymbal add cymbal +/- 1
            //if (this.drums.length == 0 && Math.random() < 0.4){
            //    this.add_instr(randomIndex, DRUMTYPES.HH);
            //}

        }

        if (config.make_ride) { //param prob_make_ride
            for (const step of this.drums.keys()) {
                if (this.drums[step].includes(2)) {
                    this.remove_instr(step, DRUMTYPES.HH)
                    this.add_instr(step, DRUMTYPES.RD)
                }

            }
        }

        if (config.make_toms) { //param prob_make_toms
            for (const step of this.drums.keys()) {
                if (this.drums[step].length > 0) {
                    this.drums[step] = [DRUMTYPES.TM];
                }
            }
        } else {
            for (const step of this.drums.keys()) {
                this.remove_instr(step, DRUMTYPES.TM)
            }
        }
    }

    randomize() {
        const next = new PolyphoneSequence(this.drums, this.guitar_base_pattern);
        next.generate_guitar();
        next.generate_melody();
        next.permute_drum();
        next.generate_rhythm();
        next.generate_bass();
        next.generate_tremolo();
        next.generate_lengths();
        return next;
    }
}
