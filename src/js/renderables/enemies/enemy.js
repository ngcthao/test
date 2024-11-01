import * as me from 'melonjs';
import applicationState from '../../applicationState';

class Enemy extends me.Entity {
    constructor(x, y, settings, health, speed, element, reward) {
        // Call parent constructor to initialize the position and settings
        super(x, y, settings);

        // Custom properties for the enemy
        this.health = health;         // Health of the enemy
        this.speed = speed;           // Movement speed of the enemy
        this.element = element;       // Type/Element (e.g., fire, water, etc.)
        this.reward = reward;         // Reward for kill enemy

        // Set the velocity for movement
        //this.body.setVelocity(this.speed, this.speed); // Movement speed in x and y directions

        // Disable gravity for the enemy
        this.body.gravity = 0;

        // Define the hitbox 
        this.body.addShape(new me.Rect(0, 0, this.width, this.height));

        // Ensure the enemy is always updated, even when off-screen
        this.alwaysUpdate = true;

        // Make the enemy collidable 
        this.isCollidable = true;
        
        // Collision Type
        this.body.collisionType = me.collision.types.ENEMY_OBJECT;

        // this.hitbox = new HitBoxEntity(this.pos.x, this.pos.y, 1.5); 
        // me.game.world.addChild(this.hitbox);

    }

    // Method to update the enemy's movement each frame
    update(dt) {
        if (this.currentWaypoint < this.waypoints.length) {
            this.moveToWaypoint(dt);
        } else {
            this.reachEnd();  // If no more waypoints, consider the path complete
        }

        this.body.update(dt);
        this.syncHitBox();
        return true;


    }

    moveToWaypoint(dt) {
        const target = this.waypoints[this.currentWaypoint];
        const dx = target.x - this.pos.x;
        const dy = target.y - this.pos.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance > 1) {
            this.pos.x += (dx / distance) * this._speed * dt / 1000;
            this.pos.y += (dy / distance) * this._speed * dt / 1000;
        } else {
            this.currentWaypoint++;
        }
    }

    syncHitBox() {
        this.hitbox.pos.x = this.pos.x;
        this.hitbox.pos.y = this.pos.y;
    }

    // Method to reduce the enemy's health when it takes damage
    takeDamage(damage) {
        this.health -= damage;

        // If the health drops to 0 or below, call the die method
        if (this.health <= 0) {
            this.die();
        }
    }

    // Method to handle enemy death
    die() {
        if(this.health <= 0) {

        // Remove the enemy from the game world when it dies
            this.onDestroy()

            this.rewardPlayer();

            console.log(`${this.element} enemy has been defeated!`);
        }
    }

    // Method to reward player on enemy death
    rewardPlayer(){
        applicationState.data.currency += this.reward;
        this.updateCurrency();

        console.log(`Player rewarded with ${this.reward} coins.`);
    }

    
    // Method to handle the collision with the Trash Can at end of path
    onCollideWithTrashCan() {
        console.log(`${this._type} collided with the Trash Can and will be removed.`);

        // Deduct a life from the player
        applicationState.data.lives -= 1;
        this.updateLives();

        // Check if lives reach zero to trigger game over
        if (applicationState.data.lives <= 0) {
            this.gameOver();
        }

        // Remove the enemy from the game world
        this.onDestroy();
    }

    
    onDestroy() {
        console.log(`${this._type} is being removed from the game world.`);
        me.game.world.removeChild(this);
        me.game.world.removeChild(this.hitbox);
    }

}

export default Enemy;
