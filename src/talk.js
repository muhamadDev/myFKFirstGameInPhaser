const COLOR_MAIN = 0x4e342e;
const COLOR_LIGHT = 0x7b5e57;
const COLOR_DARK = 0x260e04;

export let content = `hello stranger do you want a health-postion, you can buy it from me!
I can give it to you in exchange you give me your Enegry-potion`;


export function createTextBox(scene, x, y, config) {
    const wrapWidth = config.wrapWidth;
    let textBox = scene.rexUI.add.textBox({
        x,
        y,
        width: 0,
        height: 0,
        background:
          scene.rexUI.add.roundRectangle({ 
            radius: 20,
            color: COLOR_MAIN,
            strokeColor: COLOR_LIGHT,
            strokeWidth: 2,
        }),
        icon: scene.add.sprite(0,0,'npc').setScale(3.5),
        text: getBBcodeText(scene, wrapWidth),
        action: scene.add.image(0, 0, 'nextPage').setTint(COLOR_LIGHT).setVisible(false),
        space: {
            left: 20,
            right: 20,
            top: 20,
            bottom: 20,
            icon: 20,
            text: 10,
            separator: 6
        }
    
    }).setOrigin(0).layout().setDepth(150).setScrollFactor(0)
    
    
    textBox.setInteractive();
      
    textBox.on('pointerdown', function()  {
        var icon = this.getElement('action').setVisible(false);
        this.resetChildVisibleState(icon);
        
        if (this.isTyping) {
            this.stop(true);
        } else if (!this.isLastPage) {
            this.typeNextPage();
        } else {
            // last Page
            textBox.destroy()
        }
        
      }, textBox);
      
      textBox.on('pageend', function () {
        if (this.isLastPage) {
          return;
        }
    
        var icon = this.getElement('action').setVisible(true);
        this.resetChildVisibleState(icon);
        icon.y -= 30;
        scene.tweens.add({
            targets: icon,
            y: '+=30', 
            ease: 'bounce', 
            duration: 500,
            repeat: 0,
        });
    
      }, textBox);
      
      textBox.on('complete',  () => {
        console.log('all pages typing complete');
      });
      return textBox;
};

function getBBcodeText(scene, wrapWidth) {
    let a = scene.rexUI.add.BBCodeText(0, 0, '', {
        fixedWidth: 0,
        fixedHeight: 0,
        fontSize: '35px',
        wrap: {
            mode: 'word',
            width: wrapWidth
        },
        maxLines: 3
    });
    
    return a;

}
