import { areaArray } from './info.js';

let gridWidth = 15; 
let  gridHeight = 15;
let cellSize = 200;

export function placeTreesInGrid() {
    this.trees = this.physics.add.staticGroup();
    
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
                // Randomly decide whether to place a tree in this grid cell
                if (Math.random() < 0.5) { // Adjust probability as needed
                    this.add.image(gridX, gridY + 52, 'objectshadow').setScale(1.6);
                    let tree = this.trees.create(gridX, gridY, 'tree1');
                    tree.setScale(1.8)
                    .setSize(40, 15)
                    .setOffset(15, 75)
                    .setDepth(0);
                    
                }
            }
        }
    }
    
    this.physics.add.collider(this.trees, this.Dude);
}

export function calculateRowAndColumn(x, y, cellSize = 200) {
    var col = Math.floor(x / cellSize); // Calculate the column index
    var row = Math.floor(y / cellSize); // Calculate the row index
    // console.log(`row: ${row}, column: ${col}`)
    return { row: row, col: col };
}

export function playerGetHit(player = this.Dude) {
    if (player.data.values.health < 1) {
        this.isDead = true;
        
        this.cameras.main.fadeOut(350, 0, 0, 0);

        this.cameras.main.on(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, () => {
            this.scene.start('SceneLost');
        });
        
    } else {
        player.data.values.health -= 1;
        this.status.updateHealth();
    }
    
}

export function kill(enemy,duration = 850) {
    this.tweens.add({
        targets: enemy,
        alpha: 0,
        duration: duration,
        ease: 'Linear',
        onComplete: () => { enemy.destroy(); }
    });
}

export function spawnRange(x,y) {
    
    const particles = this.add.particles(0,0, 'red', {
        speed: 50,
        scale: { start: 0.3, end: 0 },
        blendMode: 'ADD'
    });
    particles.startFollow(this.Dude);
    
    particles.followOffset.y -= 60
    
    this.tweens.add({
        targets: particles.followOffset,
        y: -50,
        x: -40,
        delay: 300,
        duration: 450,
        ease: 'Cubic.easeOut',
        onComplete: () => {
            this.tweens.add({
                targets: particles.followOffset,
                y: 0,
                x: 0,
                delay: 300,
                duration: 450,
                ease: 'Cubic.easeOut',
                onComplete: () => {
                    particles.destroy();
                    if(this.Dude.data.values.energy == 100) return;
                    this.Dude.data.values.energy += 50
                    this.status.updateEnergy();
                }
            });
        }
    });
    
}
