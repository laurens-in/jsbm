

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

var composition = [
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
function permutate(){
    for (let index = 0; index < composition.length; index++) {
        const previous = composition[index-1]; // check if index in bounds (0 <= index < max), or wrap to end
        const current = composition[index];
        if (current.length !== 0){
            composition[(index+1)%8] = current;
        }
        else {
            current = current;
        }
    }
}

//---- ideas ---//

// fill(); take an "empty" composition object and fill it. start with length (2,3,4,5,6,7,8) and have weights on lenghts and also on note positions.
// eg: Pattern.pattern_1 --> fill with length 4, note on first beat, Pattern.pattern_1.pattern_1 --> fill with length 6 with notes on 1 and 3.
// drum could filled by premade pattern eg.: fill drum part with blastbeat, fill drum part with (kick,hihat)(hihat...)
// this could be a way to start from very small structures.
// drum could be filled with going thru lists that involve probability 
// eg: [[kick 1, hihat 1], [hihat 1], [hihat 1, kick 0.5], [hihat 1], [hihat 1]]
// es braucht irgend eine Möglichkeit sinnvoll mit Wahrscheinlichkeiten umzugehen. evt auch ein Baumsystem...

// z.B. Liste könnte sein Kick + Hihat, Rest wird mit Hihat aufgefüllt, nächstes Segment, Snare + Hihat, Rest Hihat, falls Kick + Hihat und nächstes element auch Kick, dann überall Kick

// permute(); this could then permute multiple small objects at a time. eg.: change positions of notes, take chords and break them down into arpeggios
