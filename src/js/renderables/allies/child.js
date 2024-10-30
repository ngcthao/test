import * as me from 'melonjs';
import AllyEntity from './ally.js';
// import HitBoxEntity from './hitbox.js';

class ChildEntity extends AllyEntity {

    constructor(x, y, settings) {
        // call the parent constructor
        super(x, y, settings);

        // set default stats of child unit
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
            this.allyCost = 50;
            this.allyATK = 5;
            this.allyASPD = 2;
            this.allyRange = 1;
        }
        else if (this.tier == 2) {
            this.allyCost = 100;
            this.allyATK = 10;
            this.allyASPD = 2.5;
            this.allyRange = 1.1;
        }
        else if (this.tier == 3) {
            this.allyCost = 100;
            this.allyATK = 30;
            this.allyASPD = 3;
            this.allyRange = 1.2
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

export default ChildEntity;
