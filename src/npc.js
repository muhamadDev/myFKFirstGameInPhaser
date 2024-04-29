import { createTextBox, content} from './talk.js';

export default class Npc {
    constructor(options, scene) {
        this.id = options.id;
        this.key = options.key;
        this.x = options.x;
        this.y = options.y
        this.scale = options.scale || 1;
        
        
        this.scene = scene;
        this.spawn();
        
        
        this.secondTime = false;
        this.firstTimeTalk = true;
    }
    
    spawn() {
        this.npc = this.scene.physics.add.sprite(this.x, this.y, this.key);
        this.npc.setScale(this.scale);
        this.scene.anims.create({
            key: `npcIdle`,
            frames: this.scene.anims.generateFrameNumbers('npc'),
            frameRate: 10,
            repeat: -1
        });
        this.npc.play('npcIdle')
    }
    
    openShopMenu() {
        this.menuGroup = this.scene.physics.add.group();
        this.scene.physics.pause();
        
        let rectangle = this.scene.add.rectangle(0, 0, 1280, 720, 0x000000);
        rectangle.setOrigin(0)
        .setDepth(120)
        .setScrollFactor(0)
        .alpha = 0.7;
        
        let container = this.menuGroup.create(640, 360, 'GUIContainer')
        .setScale(9)
        .setDepth(125)
        .setScrollFactor(0);
        
        let closeBtn = this.menuGroup.create(520, 140, "AttackBtn");
        closeBtn.setDepth(126)
        .setScale(4)
        .setScrollFactor(0)
        .setInteractive();
        
        
        closeBtn.on('pointerdown', () => {
            this.scene.physics.resume();
            container.destroy();
            rectangle.destroy();
            closeBtn.destroy();
            rangeToHealth.destroy();
            this.update();
        });
        
        let rangeToHealth = this.menuGroup.create(640, 300, "RangeTohealth");
        rangeToHealth.setDepth(126)
        .setScale(5)
        .setScrollFactor(0)
        .setInteractive();
        
        rangeToHealth.on('pointerdown', () => {
            if (this.scene.Dude.data.values.health == 100) return;
            if (this.scene.Dude.data.values.energy < 50) return;
            
            this.scene.Dude.data.values.health = 100;
            this.scene.Dude.data.values.energy = 0;
            this.scene.status.updateEnergy();
            this.scene.status.updateHealth();
        })
        
        
        
    }
    
    
    update() {
        const distance = Phaser.Math.Distance.BetweenPoints(this.scene.Dude, this.npc);
        
        if(distance > 50) {
            if(this.secondTime) {
                this.btn.destroy();
                this.btn = null
                this.secondTime = false;
                return
            }
            return
            
        };
        
        if(this.firstTimeTalk) {
            createTextBox(this.scene, 220, 500, {
                wrapWidth: 800,
            }).start(content, 40);
            
            this.firstTimeTalk = false;
        }
        
        
        this.secondTime = true;
        
        if(this.btn) return;
        
        
        this.btn = this.scene.physics.add.sprite(640, 650, "openMenu");
        this.btn.setInteractive()
        .setScrollFactor(0)
        .setDepth(100)
        .setScale(4)

        this.btn.on('pointerdown', (pointer) => {
            this.openShopMenu();
            this.btn.destroy();
        });
        
    }
    
}