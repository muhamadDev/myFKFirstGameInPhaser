import { spawnRange, kill} from './Utilities.js'

export default class Chest {
    constructor (opions,scene) {
        this.key = opions.key;
        this.id = opions.id;
        this.group = opions.group;
        this.positions = opions.positions; // {positions: [{x,y}, {x,y}]}
        
        this.scene = scene;
        this.secondTime = false
    }
    
    create() {
        
        this.scene.anims.create({
            key: "chestOpen",
            frames: this.scene.anims.generateFrameNumbers(this.key),
            frameRate: 8,
            repeat: 0
        });
        
        this.positions.forEach(item => {
            this.group.create(item.x, item.y, this.key)
            .setScale(2)
            .setSize(12, 12)
            .setOffset(0, 2)
            .body.pushable = false;
            
        
           this.scene.physics.add.collider(this.scene.Dude, this.group);
            
        });
        
        
    }
    
    openChest(nearestChest) {
        nearestChest.play('chestOpen');
        
        nearestChest.on('animationcomplete', (a,b,c) => {
            spawnRange.call(this.scene, nearestChest.x, nearestChest.y);
            kill.call(this.scene,c)
            
        });
        
    }
    
}