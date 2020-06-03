class PolyphoneSequence {
    constructor(drum_pattern) {
        const clone = (items) => {
            return items.map((item) => {
                return Array.isArray(item) ? clone(item) : item;
            });
        };
        this.drums = clone(drum_pattern);
        this.guitar = [[24, 32], [], [], [], [], [], [], [], [], [], [], [], [25, 33], [], [], [], [], [], [], [], [], [], [], []];
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

    generate_guitar = () =>  {
        this.guitar = this.dosomethinginterestingwith(this.guitar);
    }

    generate_bass = () =>  {
        this.bass = this.dosomethinginterestingwith(this.drums);
    }

    mod = (x, n) => (x % n + n) % n;

    permuteDrum(value = 0) {
        let randomIndex = Math.floor(Math.random() * this.drums.length)
        if (randomIndex % 4 == 0){
            //first level
            // if hihat make crash
            // if bassdrum add bassdrum 2 before or 2 after
            if (this.drums[randomIndex].includes(0)){
                console.log('first level bass drum')
                if (Math.random() < 0.6){
                    this.drums[this.mod((randomIndex-4),this.drums.length)].push(0);
                    this.drums[this.mod((randomIndex-4),this.drums.length)] = [... new Set(this.drums[this.mod((randomIndex-4),this.drums.length)])];
                } else {
                    this.drums[this.mod((randomIndex+4),this.drums.length)].push(0);
                    this.drums[this.mod((randomIndex+4),this.drums.length)] = [... new Set(this.drums[this.mod((randomIndex+4),this.drums.length)])];
                }
            }
            // if snare add bassdrum 2 before or 2 after
            // add cymbal 2 before or 2 after

        } else if (randomIndex % 4 == 2){
            //second level
            // if bassdrum add bassdrum 1 after
            if (this.drums[randomIndex].includes(0)){
                console.log('second level bass drum')
                this.drums[this.mod((randomIndex+2),this.drums.length)].push(0);
                this.drums[this.mod((randomIndex+2),this.drums.length)] = [... new Set(this.drums[this.mod((randomIndex-2),this.drums.length)])];
            }
            // if snare add bassdrum 1 after
            // if cymbal add cymbal 1 before or 1 after

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
        for (let i = 0; i < 10; i++){
            next.permuteDrum();
        }
        return next;
    }
}
