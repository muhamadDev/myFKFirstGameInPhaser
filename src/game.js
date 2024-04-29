import SceneMenu from './SceneMenu.js';
import  Scene  from '../src/Scene.js';
import SceneLost from '../src/sceneLost.js';


let config = {
    type: Phaser.CANVAS,
    width: 1280,
    height: 720,
    backgroundColor:0x000000,
    scene: [SceneMenu, Scene, SceneLost],
    pixelArt: true,
    physics: {
        default: 'arcade',
        arcade: {
            debug: true
        }
    },
    scale: {
        // mode: Phaser.Scale.FIT,
        // autoCenter: Phaser.Scale.CENTER_BOTH
    }
}

let game = new Phaser.Game(config);