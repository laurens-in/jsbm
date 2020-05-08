class Pattern {

    constructor(handwritten) {
        this.base_pattern = handwritten;
    }

    permute() {
        // let randomized = this.base_pattern.randomize(); // in case of base_pattern being an instance of PolyphoneSequence
        let randomized_1 = this.base_pattern.randomize();
        let randomized_2 = this.base_pattern.randomize();
        this.pattern_1 = new Pattern(randomized_1);
        this.pattern_2 = new Pattern(randomized_2);
    }

}
