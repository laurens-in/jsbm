// functions for generating drum base pattern
drumfast = [
    [
        [0,2],
        [1]
    ],
    [
        [1,2],
        [0]
    ]
]

drumslow = [
    [
        [0, 2],
        [2],
        [2],
        [2],
        [2],
        [2],
        [2],
        [2],
    ],
    [
        [1, 2],
        [2],
        [2],
        [2],
        [2],
        [2],
        [2],
        [2], 
    ]
];

function fastDrum(length) {
    let beat = [];
    let style = Math.floor(Math.random() * 2)
    for(let i = 0; i < length; i++){
        beat[i] = drumfast[style][i%2];
    }
    return beat;
}

function slowDrum(length){
    length1 = Math.ceil(length/2);
    length2 = length - length1;
    let beat = [];
    for(let x = 0; x < length1; x++){
        beat.push(drumslow[0][x]);
    }
    for (let y = 0; y < length2; y++){
        beat.push(drumslow[1][y])
    }
    let result = beat.flatMap((e) => [e, [],[],[]]);
    return result;
}

permute_pattern = (input) => {
    return input += 1;
}

// let tree = new Pattern(slowDrum(8));

// tree.permute()

// console.log('first iteration looks like this: ');
// console.dir(tree);


// console.log('second iteration looks like this: ');
// tree.pattern_1.permute();
// console.dir(tree);

// ---------------- redefine patterns as instance of PolyphoneSequence

let polytree = new Pattern(new PolyphoneSequence(slowDrum(8)))

console.log('same with poly seq');
console.dir(polytree);

console.log('second iter with poly seq');
console.dir(polytree.permute());