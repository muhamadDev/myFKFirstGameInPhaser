export default class Status {
    
    constructor(scene) {
        this.scene = scene;
    }
    
    create(x = 50,y = 50) {
        let status = this.scene.add.image(x,y, 'dudeStatus');
        status.setScale(2)
        .setScrollFactor(0)
        .setDepth(100);
        
        
        this.healthLine = [];
        this.energyLine = [];
        
        this.updateHealth();
        this.updateEnergy();
    }
    
    updateEnergy() {
        let energy = this.scene.Dude.data.values.energy;
        let newEnergy = Math.floor(energy / 9);
        
        this.energyLine.forEach(line => {
            line.destroy();
        });
        this.energyLine = []
             
        for (var i = 0; i < newEnergy; i++) {
            let x = 50;
   
            let line = this.scene.add.image(x + (i * 8), 25, 'energy')
            .setScale(2)
            .setOrigin(0, 0)
            .setScrollFactor(0)
            .setDepth(140); 
            this.energyLine.push(line)
        }
        
    }
    
    updateHealth() {
        //energySlice
        let health = this.scene.Dude.data.values.health;
        let newHealth = Math.floor(health / 10);
        
        this.healthLine.forEach(line => {
            line.destroy();
        });
        
        this.healthLine = [];
        
        for (var i = 0; i < newHealth; i++) {
            let x = 47;
        
            let line = this.scene.add.image(x + (i * 8), 41, 'health')
                .setScale(2)
                .setOrigin(0, 0)
                .setScrollFactor(0)
                .setDepth(150);
                this.healthLine.push(line)
        }

    }
}