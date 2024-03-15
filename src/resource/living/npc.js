import { Character } from "./character"

export class Npc extends Character {
    constructor(playerAsset, playerInitX, playerInitY, gameConfig) {
        super(playerAsset, playerInitX, playerInitY, gameConfig)
        this.randomCri = 0.99
    }

    walkAround(field) {
        let moveX = 0
        if(Math.random() > this.randomCri) moveX = (Math.random() > 0.5 ? 1 : -1)
        let moveY = 0
        if(Math.random() > this.randomCri) moveY = (Math.random() > 0.5 ? 1 : -1)
        this.move(field, [moveX, moveY])
    }

}
