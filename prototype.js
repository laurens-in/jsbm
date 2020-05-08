permute_pattern = (input) => {
    return input += 1;
}

let tree = new Pattern([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ]);

tree.permute()

console.log('first iteration looks like this: ');
console.dir(tree);


console.log('second iteration looks like this: ');
tree.pattern_1.permute();
console.dir(tree);

// ---------------- redefine patterns as instance of PolyphoneSequence

let polytree = new Pattern(new PolyphoneSequence([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ]))

console.log('same with poly seq');
console.dir(polytree);

console.log('second iter with poly seq');
console.dir(polytree.permute());