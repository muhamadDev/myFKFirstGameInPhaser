import { playerGetHit, kill } from './Utilities.js';
import Status from './dudeStatus.js'

export default class Enemy {
    constructor(options, scene) {
        this.key = options.key;
        this.id = options.id;
        this.group = options.group;
        this.name = options.name;
        this.scale = options.scale || 1;
        this.position = {
            x: options.position.x,
            y: options.position.y
        };
        this.speed = options.speed;
        this.count = options.count;
        this.animimation = false;
        this.scene = scene;
    }

    anims() {
        this.animimation = true

        this.scene.anims.create({
            key: `${this.key}_front`,
            frames: this.scene.anims.generateFrameNumbers(this.key, { start: 0, end: 5 }),
            frameRate: 6,
            repeat: -1
        });

        this.scene.anims.create({
            key: `${this.key}_left`,
            frames: this.scene.anims.generateFrameNumbers(this.key, { start: 6, end: 11 }),
            frameRate: 6,
            repeat: -1
        });

        this.scene.anims.create({
            key: `${this.key}_right`,
            frames: this.scene.anims.generateFrameNumbers(this.key, { start: 12, end: 17 }),
            frameRate: 6,
            repeat: -1
        });

        this.scene.anims.create({
            key: `${this.key}_back`,
            frames: this.scene.anims.generateFrameNumbers(this.key, { start: 18, end: 23 }),
            frameRate: 6,
            repeat: -1
        });



    }

    spawn() {
        for (var i = 0; i < this.count; i++) {
            const x = Phaser.Math.Between(this.position.x - 120, this.position.x + 120);
            const y = Phaser.Math.Between(this.position.y - 120, this.position.y + 120);

            let enemy = this.group.create(x, y, this.key);
            enemy.setScale(this.scale)
            enemy.setData('health', 100)
            enemy.setData('isPushedBack', false);
            enemy.body.pushable = false;
            
            if (!this.animimation) return;
            enemy.play(`${this.key}_front`)
        }
        
        
        return this.group
        

    }

    followPlayer() {
        this.group.getChildren().forEach((enemy) => {

            const distance = Phaser.Math.Distance.BetweenPoints(this.scene.Dude, enemy);
            if (distance > 200) {
                enemy.setVelocity(0);
                return;
            }

            if (distance > 170) return;

            let dx = this.scene.Dude.x - enemy.x;
            let dy = this.scene.Dude.y - enemy.y;
            let angle = Math.atan2(dy, dx);

            enemy.setVelocityX(Math.cos(angle) * this.speed);
            enemy.setVelocityY(Math.sin(angle) * this.speed);
            // enemy.rotation = angle + Math.PI / 2;

            if (!this.anims) return;

            // Determine the relative direction based on the distances
            if (Math.abs(dx) > Math.abs(dy)) {
                // Enemy is more horizontally aligned with the player
                if (dx > 0) {
                    // Enemy is on the right side of the player
                    enemy.play(`${this.key}_right`)
                } else {
                    // Enemy is on the left side of the player
                    enemy.play(`${this.key}_left`)
                }
            } else {
                // Enemy is more vertically aligned with the player
                if (dy > 0) {
                    // Enemy is below the player
                    enemy.play(`${this.key}_front`)
                } else {
                    // Enemy is above the player
                    enemy.play(`${this.key}_back`)
                }
            }



        });
    }

    kill(index) {
        this.group.getChildren()[index].destroy()

    }

    clear() {
        this.group.clear();
    }

    collide() {

        this.scene.physics.add.collider(this.group, this.scene.Dude, (dude, enemy) => {
            if (this.scene.Dude.data.values.onAttack == 'true') {
                // if you hit enemy
                if (enemy.data.values.health < 1) {
                    kill.call(this.scene, enemy, 500)
                    if (this.scene.Dude.data.values.health > 90) {
                        this.scene.Dude.data.values.health = 100
                        this.scene.status.updateHealth();
                        return
                    };
                    
                    this.scene.Dude.data.values.health += 5;
                    this.scene.status.updateHealth();
                    
                    return;
                }
                enemy.data.values.health -= 10
                this.pushBackEnemy(enemy);
                return;
            }
            // if enemy hit you 
            if (this.scene.isDead) return
            playerGetHit.call(this.scene, dude)
        });



    }
    
    pushBackEnemy(enemy) {
        let newXY = {}
        
        let dx = this.scene.Dude.x - enemy.x;
        let dy = this.scene.Dude.y - enemy.y;
        
        if (Math.abs(dx) > Math.abs(dy)) {
            // Enemy is more horizontally aligned with the player
            if (dx > 0) {
                // Enemy is on the right side of the player
                newXY = {x: -40, y: 0}
            } else {
                // Enemy is on the left side of the player
                newXY = {x: 40, y: 0}
            }
        } else {
            // Enemy is more vertically aligned with the player
            if (dy > 0) {
                // Enemy is below the player
                newXY = {x: 0, y: -40}
            } else {
                // Enemy is above the player
                newXY = {x: 0, y: +40}
            }
        }
        
        this.scene.tweens.add({
        targets:enemy,
            y: enemy.y  + newXY.y,
            x: enemy.x + newXY.x,
            duration: 450,
            ease: 'linear',
        });
    }
}
