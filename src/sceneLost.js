export default class SceneLost extends Phaser.Scene {
    constructor() {
        super({ key: 'SceneLost' });
        this.speed = 500;
        this.arrowDamage = 10;
        this.enemyDamage = 10
    }
    
    preload() {
        this.load.image('loseText', '../assets/ui/loseText.png')
    }
    
    create() {
        
        let text = this.add.image(1280 / 2, 720 / 2, 'loseText');
        text.setScale(0.5)
        text.setOrigin(0.5); // Center the text
        text.setAlpha(0);
        
        this.tweens.add({
            targets: text,
            alpha: 1,
            duration: 700,
            ease: 'Linear',
            delay: 500,
            onComplete: function() {
            }
        });
    }
    
    update() {}

}