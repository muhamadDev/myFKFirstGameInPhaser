export default class SceneMenu extends Phaser.Scene {
    constructor() {
        super({ key: 'layout' });
    }
    
    preload() {
        this.load.setBaseURL('https://muhamaddev.github.io/myFKFirstGameInPhaser/');
        
        for (var i = 1; i < 6; i++) {
            this.load.image(`bg${i}`, `assets/parallaxEffect/${i}.png`);
        }
        
        this.load.image(`GUIContainer`, `/assets/ui/GUIContainer.png`);
        
        this.load.spritesheet("GUI", "/assets/ui/GUI.png", {
            frameWidth: 49,
            frameHeight: 16 ,
            frameRate: 1
        });
        
        this.load.spritesheet("GUIText", "/assets/ui/GUIText.png", {
            frameWidth: 26,
            frameHeight: 9,
            frameRate: 1
        });
        
        this.load.audio('music', ['/assets/audio/music.ogg', '/assets/audio/music.mp3']);
        
    }
    
    create() {
        this.bg1 = this.add.tileSprite(0,0,1280,720,'bg1');
        
        let music = this.sound.add('music');
        music.play({
            mute: false,
            volume: 0.1,
            rate: 1,
            detune: 0,
            seek: 0,
            loop: true,
            delay: 0
        })
        
        this.bg1.setOrigin(0,0)
        .setScrollFactor(0)
        .setScale(5)
        
        this.bg2 = this.add.tileSprite(0, 80, 1270, 720, 'bg2');
        this.bg2.setOrigin(0, 0)
        .setScrollFactor(0)
        .setScale(4)
        
        this.bg3 = this.add.tileSprite(0, 80, 1260, 720, 'bg3');
        this.bg3.setOrigin(0, 0)
        .setScrollFactor(0)
        .setScale(4)
        
        this.bg4 = this.add.tileSprite(0, 80, 1280, 720, 'bg4');
        this.bg4.setOrigin(0, 0)
        .setScrollFactor(0)
        .setScale(4)
        
        this.bg5 = this.add.tileSprite(0, 80, 1280, 720, 'bg5');
        this.bg5.setOrigin(0, 0)
        .setScrollFactor(0)
        .setScale(4)
        
        
        this.add.image(645, 360, 'GUIContainer').setScale(5.6)
        
        this.btn1 = this.physics.add.sprite(640, 280, 'GUI', 1);
        this.btn1.setScale(4)
        .setInteractive();
        
        this.btn2 = this.physics.add.sprite(640, 370, 'GUI', 1);
        this.btn2.setScale(4)
        
        this.btn3 = this.physics.add.sprite(640, 460, 'GUI', 1);
        this.btn3.setScale(4)
        
        
        this.physics.add.sprite(655, 280, 'GUIText',0).setScale(4);
        
        this.physics.add.sprite(640, 370, 'GUIText',1).setScale(4);
        
        this.physics.add.sprite(660, 460, 'GUIText',2).setScale(4);

        this.btn1.on('pointerdown', (pointer) => {
            this.cameras.main.fadeOut(500, 0, 0, 0);

            this.cameras.main.on(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, () => {
                this.scene.start('SceneA');
            });
        });
    }
    
    update() {
        this.cameras.main.scrollX += 0.05;
        this.bg1.tilePositionX = this.cameras.main.scrollX * 5;
        this.bg2.tilePositionX = this.cameras.main.scrollX * 10;
        this.bg3.tilePositionX = this.cameras.main.scrollX * 15;
        this.bg4.tilePositionX = this.cameras.main.scrollX * 20;
        this.bg5.tilePositionX = this.cameras.main.scrollX * 25;

    }
}
