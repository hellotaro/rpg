import { Scene } from 'phaser';
import { Field } from "../resource/field/field"
import { Character } from "../resource/living/character"
import { Npc } from "../resource/living/npc"

export class Game extends Scene
{
    constructor ()
    {
        super('Game')
    }

    preload() {
        this.gameConfig = {
            fieldX: 6,
            fieldY: 6,
            fieldOffsetX: 100,
            fieldOffsetY: 100,
        }
        this.field = new Field(this.gameConfig.fieldX, this.gameConfig.fieldY, 1)
        this.character = new Character("player", 0, 0, this.gameConfig)
        this.npc1 = new Npc("npc1", 5, 2, this.gameConfig)
        this.npc2 = new Npc("npc2", 5, 3, this.gameConfig)
    }

    create () {
        this.DrawAllField()
        this.DrawPlayer()
    }

    update () {
        this.MoveNpcs()
        this.Manipulate()
        this.DrawField()
        this.DrawPlayer()
    }

    Manipulate() {
        const cursors = this.input.keyboard.createCursorKeys()
        let moveX = 0
        let moveY = 0
        if(cursors.up.isDown) moveY -= 1
        if(cursors.down.isDown) moveY += 1
        if(cursors.left.isDown) moveX -= 1
        if(cursors.right.isDown) moveX += 1
        if(cursors.space.isDown) {}

        const updateDirection = this.character.move(this.field, [moveX, moveY])
        return updateDirection
    }

    MoveNpcs() {
        this.npc1.walkAround(this.field)
        this.npc2.walkAround(this.field)
    }

    DrawField() {
        const drawFieldCharacter = (character) => {
            const gameConfig = this.gameConfig
            const field = this.field
            if(character.moving) {
                this.add.sprite(gameConfig.fieldOffsetX + character.playerX * 40, gameConfig.fieldOffsetY + character.playerY * 40, "fieldscene", field.ground[character.playerY][character.playerX])
                this.add.sprite(gameConfig.fieldOffsetX + character.movingFinalX * 40, gameConfig.fieldOffsetY + character.movingFinalY * 40, "fieldscene", field.ground[character.movingFinalY][character.movingFinalX])
            }
        }
        drawFieldCharacter(this.character)
        drawFieldCharacter(this.npc1)
        drawFieldCharacter(this.npc2)
    }
    DrawAllField() {
        const gameConfig = this.gameConfig
        const field = this.field
        for(let y=0;y<field.ground.length;y++) {
            for(let x=0;x<field.ground[y].length;x++) {
                this.add.sprite(gameConfig.fieldOffsetX + x * 40, gameConfig.fieldOffsetY + y * 40, field.groundAsset, field.ground[y][x]);
            }
        }
        for(let y=0;y<field.field.length;y++) {
            for(let x=0;x<field.field[y].length;x++) {
                this.add.sprite(gameConfig.fieldOffsetX + x * 40, gameConfig.fieldOffsetY + y * 40, field.groundAsset, field.field[y][x]);
            }
        }
    }
    DrawPlayer() {
        const drawCharacter = (character) => {
            if(character.moving) {
                let movingImages = [0]
                if(character.movingDirection == "up") movingImages = character.movingPlayerUp
                if(character.movingDirection == "down") movingImages = character.movingPlayerDown
                if(character.movingDirection == "left") movingImages = character.movingPlayerLeft
                if(character.movingDirection == "right") movingImages = character.movingPlayerRight

                let posX = this.gameConfig.fieldOffsetX + 2 + character.playerX * 40
                let posY = this.gameConfig.fieldOffsetY + 2 + character.playerY * 40
                let movingCountMax = character.movingCountMax - 1
                if(character.movingDirection == "up") posY -= 40 * (character.movingCounter / movingCountMax)
                if(character.movingDirection == "down") posY += 40 * (character.movingCounter / movingCountMax)
                if(character.movingDirection == "left") posX -= 40 * (character.movingCounter / movingCountMax)
                if(character.movingDirection == "right") posX += 40 * (character.movingCounter / movingCountMax)
                let playerNo = Math.floor(movingImages.length * (character.movingCounter / character.movingCountMax))
                this.add.sprite(posX, posY, character.playerAsset, movingImages[playerNo]);
            } else {
                this.add.sprite(this.gameConfig.fieldOffsetX + 2 + character.playerX * 40, this.gameConfig.fieldOffsetY + 2 + character.playerY * 40, character.playerAsset, character.playerImage);
            }
        }
        
        drawCharacter(this.character)
        drawCharacter(this.npc1)
        drawCharacter(this.npc2)
    }
}
