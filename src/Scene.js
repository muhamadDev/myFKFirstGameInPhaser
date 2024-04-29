import {
    placeTreesInGrid,
    calculateRowAndColumn,
    spawnRange,
    kill,
    playerGetHit,
} from './Utilities.js';

import Enemy from './enemy.js';
import Chest from './chests.js';
import  preload  from './preload.js';

import Details from './addDetails.js';
import Status from './dudeStatus.js';
import Npc from './npc.js'
import Tower from './tower.js'

import { createTextBox, content} from './talk.js';

export default class Scene extends Phaser.Scene {
    constructor() {
        super({ key: 'SceneA' });
        this.speed = 140;
        this.playerDamage = 10;
        this.isDead = false;
    }

    preload() {
        preload.call(this);
        
        this.load.scenePlugin({
            key: 'rexuiplugin',
            url: 'https://muhamaddev.github.io/myFKFirstGameInPhaser/src/plugin/rexuiplugin.min.js',
            sceneKey: 'rexUI'
        });
    
        this.load.image('nextPage', 'https://muhamaddev.github.io/myFKFirstGameInPhaser/assets/ui/arrow-down-left.png');
    }

    create() {
        this.cameras.main.fadeIn(500, 0, 0, 0);
        this.map = this.add.image(0, 0, 'map')
        .setOrigin(0, 0)

        this.physics.world.setBounds(0, 0, 1890, 1798);
        this.cameras.main.setBounds(0, 0, 1890, 1798);
        
        
        this.loadGrass();
        
        placeTreesInGrid.call(this);

        this.DudeMothode();
        
        this.attackBtn();
        
        this.loadTower();
        
        this.loadEnemy();
        
        this.loadChest();
        
        // this.toNextScene();
        
        this.dialog('hello', 1500);
        
        this.physics.add.collider(this.trees, this.Dude);
        
        let details = new Details({},this);
        details.addRock();
        details.addCampfire();
    
        this.loadState();
        
        this.addPauseBtn();
        
        this.npc = new Npc({
            id: 1,
            key: 'npc',
            x: 300,
            y: 800,
            scale: 3,
            
        }, this) 
        
        
    }
    
    
    
    
    update() {
        this.trees.children.entries.forEach((item) => {
            if (item.y +50 > this.Dude.y) {
                item.setDepth(90)
            } else {
                item.setDepth(2)
            }
        });
        
        this.bee.followPlayer();
        this.eyeEnemy.followPlayer();
        this.npc.update();
        
        this.isNearChest = false;
        this.nearestChest;
        
        this.tower.update()
        
        this.chests.getChildren().forEach((chest) => {
            const distance = Phaser.Math.Distance.BetweenPoints(this.Dude, chest);
            if (distance < 30) {
                this.isNearChest = true;
                this.nearestChest = chest;
            }
        
        });
        
    }
    
    DudeMothode() {
        this.Dude = this.physics.add.sprite(200, 333, 'dude');
        
        this.Dude.setScale(2)
        .setSize(12, 20)
        .setOffset(25, 25)
        .setDepth(4)
        .setCollideWorldBounds(true)
        .body.pushable = false;
        
        
        this.Dude.setData('health', 100);
        this.Dude.setData('energy', 0);
        this.Dude.setData('facing', 'Front');
        this.Dude.setData('onAttack', 'false');
        
        this.Dude.setInteractive();
        
        this.Dude.on('pointerdown', (pointer) => {
            let data = calculateRowAndColumn(this.Dude.x,this.Dude.y);
            console.log(`row: ${data.row}, col: ${data.col}`);
        });
        
        this.cameras.main.startFollow(this.Dude);
        
        // front 
        
        this.anims.create({
            key: "dudeIdleFront",
            frames: this.anims.generateFrameNumbers("dude"),
            frameRate: 6,
            repeat: -1
        });
        
        this.anims.create({
            key: "dudeWalkFront",
            frames: this.anims.generateFrameNumbers("dudeWalkFront"),
            frameRate: 8,
            repeat: -1
        });
        
        this.anims.create({
            key: "dudeAttackFront",
            frames: this.anims.generateFrameNumbers("dudeAttackFront"),
            frameRate: 8,
            repeat: 0
        });
        
        
        // right
        
        this.anims.create({
            key: "dudeIdleRight",
            frames: this.anims.generateFrameNumbers("dudeIdleRight"),
            frameRate: 6,
            repeat: -1
        });
        
        this.anims.create({
            key: "dudeWalkRight",
            frames: this.anims.generateFrameNumbers("dudeWalkRight"),
            frameRate: 8,
            repeat: -1
        });
        
        this.anims.create({
            key: "dudeAttackRight",
            frames: this.anims.generateFrameNames('dudeAttackRight', {
                start: 6, end: 0 // I reversed this animation
            }),
            frameRate: 8,
            repeat: 0
        });
        
        
        // back
        this.anims.create({
            key: "dudeIdleBack",
            frames: this.anims.generateFrameNumbers("dudeIdleBack"),
            frameRate: 6,
            repeat: -1
        });
        
        this.anims.create({
            key: "dudeWalkBack",
            frames: this.anims.generateFrameNumbers("dudeWalkBack"),
            frameRate: 8,
            repeat: -1
        });
        
        this.anims.create({
            key: "dudeAttackBack",
            frames: this.anims.generateFrameNumbers("dudeAttackBack"),
            frameRate: 8,
            repeat: 0
        });
        
        // left
        this.anims.create({
            key: "dudeIdleLeft",
            frames: this.anims.generateFrameNumbers("dudeIdleLeft"),
            frameRate: 6,
            repeat: -1
        });
        
        this.anims.create({
            key: "dudeWalkLeft",
            frames: this.anims.generateFrameNumbers("dudeWalkLeft"),
            frameRate: 8,
            repeat: -1
        });

        this.anims.create({
            key: "dudeAttackLeft",
            frames: this.anims.generateFrameNumbers("dudeAttackLeft"),
            frameRate: 8,
            repeat: 0
        });
    
        this.moveMent();
        this.Dude.play('dudeIdleFront');
        
    }

    moveMent() {
        let btnY = 620;
        
        // left
        let left = this.add.sprite(35, btnY, 'mevementBtns', 1);
        left.setOrigin(0, 1)
        .setScale(6)
        .setInteractive()
        .setScrollFactor(0)
        .setDepth(100);

        left.on('pointerdown', (pointer) => {
            this.Dude.setVelocityX(-this.speed);
            this.Dude.play('dudeWalkLeft');
            this.Dude.data.values.facing = 'Left';
        });


        left.on('pointerup', (pointer) => {
            this.Dude.setVelocityX(0);
            this.Dude.play('dudeIdleLeft');
        });


        // right

        let right = this.add.image(220, btnY, 'mevementBtns', 2);
        right.setOrigin(0, 1)
        .setScale(6)
        .setInteractive()
        .setDepth(100)
        .setScrollFactor(0);

        right.on('pointerdown', (pointer) => {
            this.Dude.setVelocityX(this.speed)
            this.Dude.play('dudeWalkRight');
            this.Dude.data.values.facing = 'Right';
        });


        right.on('pointerup', (pointer) => {
            this.Dude.setVelocityX(0);
            this.Dude.play('dudeIdleRight');
        });


        // top
        let top = this.add.sprite(173, btnY - 130, 'mevementBtns',3); // 73.5 
        top.setOrigin(0.5, 0.5)
        .setScale(6)
        .setInteractive()
        .setScrollFactor(0)
        .setDepth(100);


        top.on('pointerdown', (pointer) => {
            this.Dude.setVelocityY(-this.speed)
            this.Dude.play('dudeWalkBack');
            this.Dude.data.values.facing = 'Back';
        });


        top.on('pointerup', (pointer) => {
            this.Dude.setVelocityY(0);
            this.Dude.play('dudeIdleBack');
        });


        let bottom = this.add.sprite(173, btnY + 40, 'mevementBtns',0); //. 73.5
        bottom.setOrigin(0.5, 0.5)
            .setScale(6)
            .setDepth(100)
            .setScrollFactor(0)
            .setInteractive();


        bottom.on('pointerdown', (pointer) => {
            this.Dude.setVelocityY(this.speed);
            this.Dude.play('dudeWalkFront');
            this.Dude.data.values.facing = 'Front';
        });


        bottom.on('pointerup', (pointer) => {
            this.Dude.setVelocityY(0)
            this.Dude.play('dudeIdleFront');
        });


    }
    
    attackBtn() {
        let btnY = 620;
        this.arrowSet = this.physics.add.group();
        
        let attackBtn = this.add.image(1170, btnY, 'AttackBtn');
        attackBtn.setOrigin(1, 1)
        .setScale(6)
        .setInteractive()
        .setScrollFactor(0)
        .setDepth(100);
        
        
        attackBtn.on('pointerdown', (pointer) => {
            if(this.isNearChest)  {
                this.chest1.openChest(this.nearestChest);
            }
            
            this.attack(pointer);
            return
            
        }, this);

        attackBtn.on('pointerup', (pointer) => {
            this.time.addEvent({
                delay:1500,
                callback: () => {
                    this.Dude.data.values.onAttack = 'false';
                },
                callbackScope: this,
                loop: false 
            });
            
        });
        
    }
    
    attack(pointer) {
        this.Dude.data.values.onAttack = 'true';
        let swosh = this.sound.add('swosh');
        swosh.play({
            mute: false,
            volume: 0.05,
            rate: 1,
            detune: 0,
            seek: 0,
            loop: false,
            delay: 0
        })
        
        
        if(this.Dude.data.values.facing == 'Front') {
            this.Dude.play('dudeAttackFront');
        }
        
        if (this.Dude.data.values.facing == 'Back') {
            this.Dude.play('dudeAttackBack');
        }
        
        if (this.Dude.data.values.facing == 'Right') {
            this.Dude.play('dudeAttackRight');
        }
        
        if (this.Dude.data.values.facing == 'Left') {
            this.Dude.play('dudeAttackLeft');
        }

    }
    
    loadEnemy() {
        this.beeGroup = this.physics.add.group();
        this.eyeGroup = this.physics.add.group();
        
        this.bee = new Enemy({
            key: 'bee',
            id: 0,
            name: 'bee',
            group: this.beeGroup,
            count: 5,
            position: {x: 560, y: 472},
            speed: 80,
        },this);
        
        this.bee.anims();
        this.bee.spawn();
        this.bee.collide();
        
        this.eyeEnemy = new Enemy({
            key: 'eyeEnemy',
            id: 0,
            name: 'eyeEnemy',
            group: this.eyeGroup,
            count: 8,
            scale: 2,
            position: { x: 1200, y: 1600 },
            speed: 80,
        }, this);
        
        this.eyeEnemy.spawn();
        this.eyeEnemy.collide();
        
    }
    
    loadGrass() {
        this.grassAndFlawer = this.physics.add.staticGroup();
        for (let i = 0; i < 705; i++) {
            let x = Phaser.Math.Between(0, 1890);
            let y = Phaser.Math.Between(0, 1798);
            let key = Phaser.Math.Between(1, 18);
            this.grassAndFlawer.create(x, y, `grass${key}`).setScale(2);
        }



        for (let i = 0; i < 14; i++) {
            let x = Phaser.Math.Between(0, 1267)
            let y = Phaser.Math.Between(0, 667);
            this.add.image(x, y + 6, 'shadow4').setScale(2);
            this.add.image(x, y, 'bush1').setScale(2);
        }
    }
    
    loadTower() {
        this.tower = new Tower({
            x: 932,
            y: 800,
            key: 'towerPlce',
            level: 0,
        }, this);
        
        
    }
    
    loadChest() {
        this.chests = this.physics.add.group();
        this.chest1 = new Chest({
            key: 'chestSmail',
            id: 1,
            group: this.chests,
            positions: [
                {x: 100, y: 100},
                {x: 500,y: 500},
                {x: 600,y: 250},
                {x: 750,y: 230},
                {x: 1850,y: 1785},
                {x: 1280,y: 34},
            ],
            
        },this);
        this.chest1.create();
    }
    
    loadState() {
        
        this.status = new Status(this);
        this.status.create(84,40);
        
    }
    
    addPauseBtn() {
        this.pauseBtn = this.physics.add.sprite(640, 40, 'pauseBtn');
        this.pauseBtn.setScale(4)
        .setDepth(110)
        .setScrollFactor(0)
        .setInteractive();
        
        
        this.pauseBtn.on('pointerdown', (pointer) => {
            this.physics.pause();
            
            this.rectangle = this.add.rectangle(0, 0, 1280, 720, 0x000000);
            this.rectangle.setOrigin(0)
            .setDepth(120)
            .setScrollFactor(0)
            .alpha = 0.7
            
            let container = this.add.image(645, 300, 'GUIContainer')
            .setScale(5)
            .setDepth(1225)
            .setScrollFactor(0);
            this.pauseBtn.alpha = 0;
            
            let playBtn = this.add.image(645, 240, 'playBtn')
            .setScale(5)
            .setDepth(1225)
            .setScrollFactor(0)
            .setInteractive();
            
            
            let rest = this.add.image(645, 360, 'playBtn');
            rest.setScale(5)
            .setDepth(1225)
            .setAngle(-90)
            .setScrollFactor(0)
            .setInteractive();
            
            
            playBtn.on("pointerdown", (pointer) => {
                this.physics.resume();
                container.destroy();
                this.rectangle.destroy();
                playBtn.destroy();
                rest.destroy();
                this.pauseBtn.alpha = 1;
                
            });
            
            rest.on("pointerdown", (pointer) => {
                
                this.scene.start('SceneA');
            })
            
        }) 
    }
    
    dialog(text, time = 1500) {
        const x = this.Dude.x + 80.04;
        const y = this.Dude.y - 6;
        this.dialogUi = this.add.image(x, y, 'dialogSmall')
            .setOrigin(0.5, 0.5)
            .setScale(0.7);
    
        this.textUi = this.add.text(x, y, text, {
            font: '15px Arial',
            fill: '#000000'
        }).setOrigin(0.5, 0.5);

        this.tweens.add({
            targets: [this.dialogUi, this.textUi],
            alpha: 0,
            duration: 650,
            delay: time,
            ease: 'Linear',
            onComplete: () => {
                this.dialogUi.destroy();
                this.textUi.destroy();
            }
        });


    }

    toNextScene() {
        this.tower.setInteractive();

        this.tower.on('pointerdown', (pointer) => {
            let distance = Phaser.Math.Distance.BetweenPoints(this.Dude, this.tower);

            if (distance > 200) return;
            this.cameras.main.fadeOut(500, 0, 0, 0);

            this.cameras.main.on(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, () => {
                this.scene.start('SceneA');

            });

        });
    }
    
}
