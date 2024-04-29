import { sizeAndOffsetOfTower } from './info.js';

export default class Tower {
    
    constructor(options, scene) {
        this.x = options.x;
        this.y = options.y;
        this.level = options.level || 0;
        this.key = options.key || 'towerPlce';
        
        this.scene = scene;
        this.spawn();
        this.secondTime = false
        this.animation = '`tower1';
    }
    
    spawn() {
        this.tower = this.scene.physics.add.sprite(this.x, this.y, this.key);
        this.tower.setScale(1.6)
        .setSize(48, 42)
        .setDepth(0)
        .setOffset(8, 13);
        this.tower.body.setImmovable(true);
        this.scene.physics.add.collider(this.scene.Dude, this.tower);
    }
    
    update() {
        if (this.tower.y + 50 > this.scene.Dude.y) {
            this.tower.setDepth(90)
        } else {
            this.tower.setDepth(2)
        }
        
        const distance = Phaser.Math.Distance.BetweenPoints(this.scene.Dude, this.tower);
        if (distance > 80) {
            if (this.secondTime) {
                this.btn.destroy();
                this.btn = null
                this.secondTime = false;
                return
            }
            return
        }
        
        this.secondTime = true;
        if(this.btn) return;
        
        
        this.btn = this.scene.physics.add.sprite(640, 650, "openMenu");
        this.btn.setInteractive()
        .setScrollFactor(0)
        .setDepth(100)
        .setScale(4)
        
        this.btn.on('pointerdown', (pointer) => {
            this.openUpgradeMenu()
        });
        
        
        
    }
    
    openUpgradeMenu() {
        this.menuGroup = this.scene.physics.add.group();
        // this.scene.physics.pause();
        
        let rectangle = this.scene.add.rectangle(0, 0, 1280, 720, 0x000000);
        rectangle.setOrigin(0)
        .setDepth(120)
        .setScrollFactor(0)
        .alpha = 0.5;
        
        let container = this.menuGroup.create(340, 360, 'GUIContainer') // 640
        .setScale(9)
        .setDepth(125)
        .setScrollFactor(0);
        
        let closeBtn = this.menuGroup.create(220, 140, "AttackBtn"); // 320
        closeBtn.setDepth(126)
        .setScale(4)
        .setScrollFactor(0)
        .setInteractive();
        
        
        closeBtn.on('pointerdown', () => {
            this.scene.physics.resume();
            container.destroy();
            rectangle.destroy();
            closeBtn.destroy();
            upgrade.destroy();
            this.update();
        });
        
        
        let upgrade = this.menuGroup.create(340, 300, "upgrade") // 340
        .setDepth(126)
        .setScale(5)
        .setScrollFactor(0)
        .setInteractive();
        
        upgrade.on("pointerdown", () => {
            // if (this.scene.Dude.data.values.energy <= 90) return;
            if (this.level > 6) return;
            
            this.tower
            .setOffset(9,85)
            .setDepth(5)
            
            
            this.scene.Dude.data.values.energy = 0;
            this.level++
            
            
            this.scene.anims.create({
                key: `upgrade${this.level}`,
                frames: this.scene.anims.generateFrameNumbers(`upgrade${this.level}`),
                frameRate: 10,
                repeat: 0
            });
            
            this.scene.anims.create({
                key: `tower${this.level}`,
                frames: this.scene.anims.generateFrameNumbers(`tower${this.level}`),
                frameRate: 10,
                repeat: -1
            });
            
            this.tower.play(`upgrade${this.level}`);
            this.tower.on('animationcomplete', () => {
                this.tower.play(`tower${this.level}`);
            });
            
            
        });
        
        
    }
    
}