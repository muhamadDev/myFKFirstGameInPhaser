export default function preload() {
    this.load.setBaseURL('https://github.com/muhamadDev/myFKFirstGameInPhaser');
    
    this.load.image('map', '/assets/sprite/map.jpeg');

    this.load.image('bush1', '/assets/tiles/bush1.png');
    this.load.image('shadow4', '/assets/shadow/4.png');

    this.load.image('objectshadow', '/assets/shadow/6.png');
    this.load.image("tree1", '/assets/tiles/Tree1.png');

    this.load.image('dialogSmall', '/assets/ui/dialogBox.png');
    
    this.load.image('red', '/assets/sprite/red.png');
    
    this.load.image('towerPlce', '/assets/sprite/towerPlce.png');
    
    this.load.spritesheet("eyeEnemy", "/assets/spriteSheet/eye1.png", {
        frameWidth: 20,
        frameHeight: 20,
        frameRate: 1
    });
    
    // sprites 

    // front
    this.load.spritesheet("dude", "/assets/spriteSheet/playerFrontIdle.png", {
        frameWidth: 64,
        frameHeight: 64,
        frameRate: 1
    });

    this.load.spritesheet("dudeWalkFront", "/assets/spriteSheet/PlayerFrontWalk.png", {
        frameWidth: 64,
        frameHeight: 64,
        frameRate: 1
    });

    this.load.spritesheet("dudeAttackFront", "/assets/spriteSheet/playerFrontAttack.png", {
        frameWidth: 64,
        frameHeight: 64,
        frameRate: 1
    });

    // back 
    this.load.spritesheet("dudeIdleBack", "/assets/spriteSheet/playerBackIdle.png", {
        frameWidth: 64,
        frameHeight: 64,
        frameRate: 1
    });

    this.load.spritesheet("dudeWalkBack", "/assets/spriteSheet/playerBackWalk.png", {
        frameWidth: 64,
        frameHeight: 64,
        frameRate: 1
    });

    this.load.spritesheet("dudeAttackBack", "/assets/spriteSheet/playerBackAttack.png", {
        frameWidth: 64,
        frameHeight: 64,
        frameRate: 1
    });

    // Right 

    this.load.spritesheet("dudeIdleRight", "/assets/spriteSheet/playerRightIdle.png", {
        frameWidth: 64,
        frameHeight: 64,
        frameRate: 1
    });

    this.load.spritesheet("dudeWalkRight", "/assets/spriteSheet/playerRightWalk.png", {
        frameWidth: 64,
        frameHeight: 64,
        frameRate: 1
    });

    this.load.spritesheet("dudeAttackRight", "/assets/spriteSheet/playerRightAttack.png", {
        frameWidth: 64,
        frameHeight: 64,
        frameRate: 1
    });

    // left
    this.load.spritesheet("dudeIdleLeft", "/assets/spriteSheet/playerLeftIdle.png", {
        frameWidth: 64,
        frameHeight: 64,
        frameRate: 1
    });

    this.load.spritesheet("dudeWalkLeft", "/assets/spriteSheet/playerLeftWalk.png", {
        frameWidth: 64,
        frameHeight: 64,
        frameRate: 1
    });

    this.load.spritesheet("dudeAttackLeft", "/assets/spriteSheet/playerLeftAttack.png", {
        frameWidth: 64,
        frameHeight: 64,
        frameRate: 1
    });

    this.load.spritesheet("bee", "/assets/spriteSheet/Bee.png", {
        frameWidth: 48,
        frameHeight: 48,
        frameRate: 1
    });

    this.load.spritesheet("chestSmail", "/assets/spriteSheet/chestSmail.png", {
        frameWidth: 16,
        frameHeight: 21,
        frameRate: 1
    });
    
    this.load.spritesheet("campfire", "/assets/spriteSheet/campfire.png", {
        frameWidth: 32,
        frameHeight: 32,
        frameRate: 1
    });

    this.load.spritesheet("npc", "/assets/spriteSheet/npc.png", {
        frameWidth: 32,
        frameHeight: 32,
        frameRate: 1
    });
    
    
    for (let i = 1; i < 8; i++) {
        this.load.spritesheet(`tower${i}`, `/assets/spriteSheet/tower/${i}.png`, {
            frameWidth: 280 / 4,
            frameHeight: 130,
            frameRate: 1
        });
    }
    
    for (let i = 1; i < 8; i++) {
        this.load.spritesheet(`upgrade${i}`, `/assets/upgrade/${i}.png`, {
            frameWidth: 280 / 4,
            frameHeight: 130,
            frameRate: 1
        });
    }
    
    for (let i = 1; i < 19; i++) {
        this.load.image(`grass${i}`, `/assets/grass&Flawer/${i}.png`);
    }
    
    for (let i = 0; i < 63; i++) {
        this.load.image(`food${i}`, `/assets/food/${i}.png`);
    }
    
    this.load.image('dudeStatus', '/assets/ui/dudeStatusV1.png');
    this.load.image('health', '/assets/ui/health.png');
    this.load.image('energy', '/assets/ui/energy.png');
    
    this.load.image(`GUIContainer`, `/assets/ui/GUIContainer.png`);
    this.load.image('pauseBtn', '/assets/ui/Pause.png');
    this.load.image('playBtn', '/assets/ui/NewPlayBtn.png');
    
    this.load.image('AttackBtn', '/assets/ui/AttackBtn.png');
    
    this.load.image('openMenu', '/assets/ui/openMenu.png');
    this.load.image('RangeTohealth', '/assets/ui/RangeTohealth.png');
    
    this.load.image('upgrade', '/assets/ui/upgrade.png');
    
    this.load.spritesheet("mevementBtns", "/assets/ui/movemontsBtn.png", {
        frameWidth: 16,
        frameHeight: 16,
        frameRate: 1
    });


    
    this.load.audio('swosh', ['/assets/audio/swosh.ogg', '/assets/audio/swosh.mp3']);
    
    for (let i = 0; i < 11; i++) {
        this.load.image(`rock${i}`, `/assets/rocks/${i}.png`);
    }
}
