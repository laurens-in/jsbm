class PolyphoneSequence {
    constructor(drum_pattern) {
        const clone = (items) => {
            return items.map((item) => {
                return Array.isArray(item) ? clone(item) : item;
            });
        };
        this.drums = clone(drum_pattern);
        this.guitar = [];
        this.bass = [];
    }

    dosomethinginterestingwith(input) {
        return input;
    }

    generate_guitar = () =>  {
        this.guitar = this.dosomethinginterestingwith(this.drums);
    }

    generate_bass = () =>  {
        this.bass = this.dosomethinginterestingwith(this.drums);
    }

    mod = (x, n) => (x % n + n) % n;

    permuteDrum(value = 0) {
        let randomIndex = Math.floor(Math.random() * this.drums.length)
        if (this.drums[randomIndex].includes(0) || this.drums[randomIndex].includes(1) || this.drums[randomIndex].includes(2)){
            //this.drums[mod((randomIndex-4),this.drums.length)].push(value);
            this.drums[this.mod((randomIndex-3),this.drums.length)].push(value);
            this.drums[this.mod((randomIndex-3),this.drums.length)] = [... new Set(this.drums[this.mod((randomIndex-3),this.drums.length)])];
        } else {
            this.permuteDrum(value);
        }
    }

    // think about posibility to permute single instruments

    randomize() {
        const next = new PolyphoneSequence(this.drums);
        next.generate_guitar();
        next.generate_bass();
        next.permuteDrum(2);
        return next;
    }
}
