import * as me from 'melonjs';
import game from '../../game';

// a Panel type container
class GameHUD extends me.UIBaseElement {

    constructor(x, y, width, height) {
        // call the constructor
        super(x, y, width, height);

        // [0, 0] as origin
        this.anchorPoint.set(0, 0);

        // give a name
        this.name = "GameHUD";

        this.addChild(new me.Text(this.width / 24, this.height / 24, {
            font: "PressStart2P",
            size: 20,
            fillStyle: "white",
            textAlign: "left",
            textBaseline: "top",
            bold: true,
            text: `Lives: ${game.data.playerHealth}`
        }));

        this.addChild(new me.Text(this.width * 22 / 24, this.height / 24, {
            font: "PressStart2P",
            size: 20,
            fillStyle: "white",
            textAlign: "left",
            textBaseline: "top",
            bold: true,
            text: `Wave: ${game.data.wave}`
        }));

        this.addChild(new me.Text(this.width * 27/32, this.height / 12, {
            font: "PressStart2P",
            size: 20,
            fillStyle: "white",
            textAlign: "left",
            textBaseline: "top",
            bold: true,
            text: `Enemies Left: ${game.data.enemies}`
        }));
    }
};
export default GameHUD;