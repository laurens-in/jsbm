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
        this.bass = [];
    }

    dosomethinginterestingwith(input) {
        let chords = input.map(function mapper(s){
            if (Array.isArray(s)) {
                return s.flatMap(mapper);
            } else {
                return getChord(s)
            }
        })
        return chords
    }

    // harmonize guitar root note pattern
    generate_guitar = () =>  {
        let root_notes = [24, 32];
        // 1. generate base pattern
        let base_pattern = [[24, 32], [], [], [], [], [], [], [], [], [], [], [], [25, 33], [], [], [], [], [], [], [], [], [], [], []];
        
        // 2. harmonize base pattern
        let chords = base_pattern.map(function mapper(root_note) {
            if (Array.isArray(root_note)) {
                // unpack array
                return s.flatMap(mapper);
            } else {
                // choose chord type
                let type = Math.random() > 0.5 ? 'power' : 'dyade';

                // generate array of all chords matching the type
                let chordtypes = make_chords(root_note, type);
                return chordtypes[Math.floor(Math.random() * chordtypes.length)];
            }
        })
        this.guitar = chords;
    }

    // TODO: implement permuteGuitar()
    permuteGuitar() {
        // 1. change rhythmical structure
        // 2. replace chord types
    }

    // TODO: implement melody generator
    // how to generate melody from harmonic structure? -> select from chord, and generte rhythmical structure, repeating the set of notes if necessary
    generate_melody() {
        const base_chord = [0, 7, 12, 15];
        let melody_pattern = [];

        this.guitar.forEach(chord_set => {
            let selected_chord_set = base_chord;
            if (chord_set.length > 0) {
                // there is a new set of chords
                // select one of the chords in the chord set
                selected_chord_set = chord_set[Math.floor(Math.random() * chord_set.length)];
            }
            // use the chords from a previous selection
            // TODO: think about adding Tone.js Notes including length and dynamics instead if MIDI note numbers
            if (Math.random() > chance_of_melody) {
                melody_pattern.push(selected_chord_set[Math.floor(Math.random() * selected_chord_set.length)]);
            } else {
                melody_pattern.push(null);
            }
        })
        return melody_pattern;
        // or
        // this.guitar_melody = melody_pattern;
    }

    generate_bass = () =>  {
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

    permuteDrum(value = 0) {

        const bd_add = 0.4; // 0 ... 1 probability 0 = remove, 1 = add
        const bd_remove = 0.1; // 0 ... 1 probability 0 = remove, 1 = add
        const sd_add = 0.3; // 0 ... 1 probability
        const sd_remove = 0.1; // 0 ... 1 probability
        const hh_add = 0.2; // 0 ... 1 probability
        const hh_remove = 0.2; // 0 ... 1 probability

        // remove
        for (const step of this.drums.keys()) {
            // work on quarter notes
            if (step % 7 == 0) {
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
                if (step % 5 == 0) {
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
                console.log('first level bass drum')
                if (Math.random() < 0.6){
                    // TODO: use this.add_instr(step, DRUMTYPE.X)
                    this.drums[this.mod((randomIndex-2),this.drums.length)].push(DRUMTYPES.BD);
                    this.drums[this.mod((randomIndex-2),this.drums.length)] = [... new Set(this.drums[this.mod((randomIndex-2),this.drums.length)])];
                } else {
                    this.drums[this.mod((randomIndex+2),this.drums.length)].push(DRUMTYPES.BD);
                    this.drums[this.mod((randomIndex+2),this.drums.length)] = [... new Set(this.drums[this.mod((randomIndex+2),this.drums.length)])];
                }
            }
            // add cymbal 2 before or 2 after
            if (this.drums[randomIndex].includes(2)){
                console.log('first level bass drum')
                if (Math.random() < 0.6){
                    this.drums[this.mod((randomIndex-2),this.drums.length)].push(2);
                    this.drums[this.mod((randomIndex-2),this.drums.length)] = [... new Set(this.drums[this.mod((randomIndex-2),this.drums.length)])];
                } else {
                    this.drums[this.mod((randomIndex+2),this.drums.length)].push(2);
                    this.drums[this.mod((randomIndex+2),this.drums.length)] = [... new Set(this.drums[this.mod((randomIndex+2),this.drums.length)])];
                }
            }

        } else if (randomIndex % 4 == 2){
            //second level (upbeat)
            // if bassdrum add bassdrum 1 after
            // if snare add bassdrum 1 after
            if (this.drums[randomIndex].includes(0) || this.drums[randomIndex].includes(1)){
                console.log('second level bass drum')
                this.drums[this.mod((randomIndex+1),this.drums.length)].push(DRUMTYPES.BD);
                this.drums[this.mod((randomIndex+1),this.drums.length)] = [... new Set(this.drums[this.mod((randomIndex+1),this.drums.length)])];
            }
            // if cymbal add cymbal 1 before or 1 after
            if (this.drums[randomIndex].includes(2)){
                console.log('second level bass drum')
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
        //next.generate_bass();
        next.permuteDrum();
        return next;
    }
}
