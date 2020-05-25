const chords = [[0, 7], [0, 8], [0, 5], [0, 6], [0, 7, 12, 15], [0, 7, 14]]

function getChord(note){
    let random = Math.floor(Math.random()* chords.length)
    console.log(chords[random]);
    return chords[random].map(x => x + note)
}

let chord = getChord(36);

console.log(chord);