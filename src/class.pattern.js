class Pattern {

    constructor(pattern) {
        this.base_pattern = pattern;
    }

    permute() {
        let randomized_1 = this.base_pattern.randomize();
        let randomized_2 = this.base_pattern.randomize();
        this.pattern_1 = new Pattern(randomized_1);
        this.pattern_2 = new Pattern(randomized_2);
    }

}
