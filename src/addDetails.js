import { areaArray } from './info.js';

export default class Details {
    
    constructor(options, scene) {
        
        this.scene = scene;
    }
    
    addRock() {
        this.details = this.scene.physics.add.staticGroup();
        let gridWidth = 15; 
        let  gridHeight = 15;
        let cellSize = 200;

        for (let row = 0; row < gridHeight; row++) {
            for (let col = 0; col < gridWidth; col++) {
                let gridX = col * cellSize + cellSize / 2; // Center X of the grid cell
                let gridY = row * cellSize + cellSize / 2; // Center Y of the grid cell
    
                let isExcluded = false;
                // Check if the current grid cell is in the areaArray
                for (let i = 0; i < areaArray.length; i++) {
                    if (areaArray[i][0] === row && areaArray[i][1] === col) {
                        isExcluded = true;
                        break;
                    }
                }
    
                if (!isExcluded) {
                    let randomKey = Phaser.Math.Between(0,10);
                    
                    if (Math.random() < 0.5) {
                        let tree = this.details.create(gridX, gridY, `rock${randomKey}`);
                        tree.setScale(1.8)
                        .setSize(40, 15)
                        .setOffset(15, 75)
                        .setDepth(0);
                        areaArray.push([gridX, gridY])
                    }
                }
            }
        }
        
        // this.physics.add.collider(this.trees, this.Dude);
    }
    
    addCampfire(x = 200, y = 500) {
        let addCampfire =  this.scene.physics.add.sprite(x, y, 'campfire');
        addCampfire.setScale(2)
        .setSize(20,15)
        .setOffset(6,17)
        .body.pushable = false;
        
        
        this.scene.anims.create({
            key: "campfire",
            frames: this.scene.anims.generateFrameNumbers("campfire"),
            frameRate: 6,
            repeat: -1
        });
        
        addCampfire.play("campfire");
        
        this.scene.physics.add.collider(addCampfire, this.scene.Dude);
    }
    
    
}