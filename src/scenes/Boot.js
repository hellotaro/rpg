import { Scene } from 'phaser';

export class Boot extends Scene
{
    constructor ()
    {
        super('Boot');
    }

    preload () {
        this.load.spritesheet('fieldscene', 'assets/sprites/pipo-map001.png', { frameWidth: 40, frameHeight: 40 })
        this.load.spritesheet('player', 'assets/sprites/pipo-charachip001.png', { frameWidth: 32, frameHeight: 32 })
        this.load.spritesheet('npc1', 'assets/sprites/pipo-charachip001a.png', { frameWidth: 32, frameHeight: 32 })
        this.load.spritesheet('npc2', 'assets/sprites/pipo-charachip001b.png', { frameWidth: 32, frameHeight: 32 })
    }

    create () {
        this.scene.start('Game');
    }
}
