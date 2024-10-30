import * as me from 'melonjs';
import AllyEntity from './ally.js';
// import HitBoxEntity from './hitbox.js';

class AdultEntity extends AllyEntity {

    constructor(x, y, settings) {
        // call the parent constructor
        super(x, y, settings);

        // set default stats of adult unit
        this.updateAllyStats()
        // this.hitbox = new HitBoxEntity(x, y, this.allyRange);
        // me.game.world.addChild(this.hitbox);
    }

    getAllyStats() {
        // Return ally statistics
        return {
            allyTier: this.tier,
            allyCost: this.allyCost,
            allyATK: this.allyATK,
            allyASPD: this.allyASPD,
            allyRange: this.allyRange
        }
    }

    updateAllyStats() {
        // Update ally statistics based on this.tier value
        if (this.tier == 1) {
            this.allyCost = 200;
            this.allyATK = 40;
            this.allyASPD = 2;
            this.allyRange = 1.1;
        }
        else if (this.tier == 2) {
            this.allyCost = 300;
            this.allyATK = 80;
            this.allyASPD = 2.5;
            this.allyRange = 1.2
        }
        else if (this.tier == 3) {
            this.allyCost = 400;
            this.allyATK = 100;
            this.allyASPD = 3;
            this.allyRange = 1.3
        }
    }

    upgradeTier() {
        // Increments this.tier value up until 3
        if (this.tier < 3) {
            this.tier++
            this.updateAllyStats()
            // this.hitbox.updateHitbox(this.allyRange)
        }
    }
};

export default AdultEntity;
