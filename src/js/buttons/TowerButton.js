import * as me from "melonjs";
import { params } from "../params";
import applicationState from "../applicationState";
import AllyTasks from "../renderables/allies/AllyTasks.js";
import ChildEntity from "../renderables/allies/child.js";


class TowerButton extends me.Draggable {

    constructor(x, y, name, settings) {
        // call the super constructor
        super(x, y, settings.width, settings.height);
        // set the color to white
        this.color = "white";
        // set the font we want to use
        this.font = new me.Text(0, 0, {font:"Verdana", size:15, fillStyle:"black"});
        this.font.bold();
        // set the text
        this.text = name;
        this.initialX = x;
        this.initialY = y;
        this.isDraggable = true;
        this.settings = settings
        this.tasks = new AllyTasks();
    }
    /**
     * update function
     */
    update(dt) {
        super.update(dt);
        return true;
    }
    /**
     * draw the TowerButton
     */
    draw(renderer) {
        renderer.setColor(this.color);
        renderer.fillRect(this.pos.x, this.pos.y, this.width, this.height);
        this.font.draw(renderer, this.text, this.pos.x, this.pos.y);
    }
    /**
     * dragStart overwrite function
     */
    dragStart(e) {
        if(!this.isDraggable){
            return
        }
        const towerDrag = new TowerButton(this.initialX, this.initialY, this.text, this.settings)
        this.ancestor.addChild(towerDrag)
        this.isDraggable = false;
        // call the super function
        super.dragStart(e);
        // set the color to blue
        //this.color = "blue";
    }

    dragMove(e){
        super.dragMove(e);
        // Check if the error is valid for placement. This cannot be dropped on game menu.
        if(this.dragging && e.x > me.game.viewport.width * 5/6) {
            this.color = 'red'
        } else{
            this.color = 'white'
        }
    }

    dragEnd(e) {
        // call the super function
        super.dragEnd(e);
        // TODO - Incorporate valid tower dropping check - still destroy entity
        
        if (this.color == 'white' && applicationState.data.currency >= 10) {
            applicationState.data.currency -= 10
            this.ancestor.updateCurrency();
            this.tasks.createAlly(this.text, (me.game.viewport.width * 5 / 6) + this.pos.x, this.pos.y)
        }
        this.ancestor.removeChild(this)
    }

};

export default TowerButton;