

/*
                                                                              --------[next-comp]------>permute()-----etc...
                                                                            /
                                   --------[next-comp]------>permute()-----
                   next()        /                                          \
[basis-comp]------>permute()-----                                             --------[next-comp]
                                 \
                                   --------[next-comp]------>permute()-----

*/

permute_pattern = (input) => {
    return input += 1;
}

class Pattern {

    constructor(handwritten) {
        this.base_pattern = handwritten;
    }

    permute() {
        // let randomized = this.base_pattern.randomize(); // in case of base_pattern being an instance of PolyphoneSequence
        let randomized_1 = permute_pattern(this.base_pattern);
        let randomized_2 = permute_pattern(this.base_pattern);
        this.pattern_1 = new Pattern(randomized_1);
        this.pattern_2 = new Pattern(randomized_2);
    }

}

let composer = new Pattern(1);

composer.permute(); // this internally generates two new nodes.
composer.pattern_1.permute()
composer.pattern_1.pattern_2;

// =============================================

class PolyphoneSequence {
    constructor(bass_pattern) {
        this.bass = bass_pattern;
        this.guitar = [];
        this.drums = [];
    }

    generate_guitar = () =>  {
        this.guitar = dosomethinginterestingwith(this.bass);
    }

    generate_drums = () =>  {
        this.drums = dosomethinginterestingwith(this.bass);
    }

    randomized() {
        const next = new PolyphoneSequence(this.bass);
        next.generate_guitar();
        next.generate_drums();
        return next;
    }
}

// // EXAMPLE 
// permute_pattern = (input) => {
//     return input.randomized();
// }

// 1 5 1 5 1 5 1 4 5 1
// 1 1 1 1 5 5 5 5 6 1

composition = [
    [['C1', 'G1'], ['32n', '4n']],
    [],
    [['C2'], ['32n']],
    [],
    [['C1', 'G1'], ['32n', '4n']],
    [],
    [['C2'], ['32n']],
    []
];

// use map to apply transformation to individual event
composition.map(
    (event) => {
        if (event.length > 0) {
            let copy = event;
            copy[0].push(event[0][0]);
            return copy;
        } else {
            return event;
        }
    }
)

for (let index = 0; index < composition.length; index++) {
    const previous = composition[index-1]; // check if index in bounds (0 <= index < max), or wrap to end
    const current = composition[index];
}
