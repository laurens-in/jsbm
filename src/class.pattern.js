class Pattern {

    status = 0;
    level = 0;

    base_pattern;
    pattern_1;
    pattern_2;

    constructor(pattern) {
        this.base_pattern = pattern;
    }

    permute() {
        let randomized_1 = this.base_pattern.randomize();
        let randomized_2 = this.base_pattern.randomize();
        this.pattern_1 = new Pattern(randomized_1);
        this.pattern_1.level = this.level + 1;
        this.pattern_2 = new Pattern(randomized_2);
        this.pattern_2.level = this.level + 1;
    }

    next() {
        console.log('level', this.level, ' status: ', this.status );
        
        switch(this.status) {
            case 0:
                console.log('returning base_pattern');
                this.status++;
                return this.base_pattern;
                break;

            case 1:
                this.permute();
                console.log('returning pattern_1.base_pattern');
                this.status++;
                return this.pattern_1.base_pattern;
                break;

            case 2:
                console.log('returning pattern_2.base_pattern');
                this.status++;
                return this.pattern_2.base_pattern;
                break;

            case 3:
                console.log('returning random pattern of next level');

                explosion_probability = this.level;
                
                if (config.traverse_mode == 'random') {
                    if (Math.random() > 0.5) {
                        return this.pattern_1.next();
                    } else {
                        return this.pattern_2.next();
                    }
                } else {
                    return this.pattern_1.next();
                }
                
        
            default:
                break;

        }
        
    }

}
