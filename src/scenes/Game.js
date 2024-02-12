import { Scene } from 'phaser';

export class Game extends Scene
{
    constructor ()
    {
        super('Game');
    }

    preload() {
        this.gameX = 7
        this.gameY = 7
        this.gameOffsetX = 100
        this.gameOffsetY = 100
        this.playerX = 0
        this.playerY = 0
        this.playerImage = 0

        this.moving = false
        this.movingDirection = null
        this.movingCounter = 0
        this.movingCountMax = 20
        this.movingPlayerUp = [9,10,11]
        this.movingPlayerDown = [0,1,2]
        this.movingPlayerLeft = [3,4,5]
        this.movingPlayerRight = [6,7,8]
        this.movingFinalX = -1
        this.movingFinalY = -1

        this.fieldNone = 1
        this.ground = [
            [ 0, 0, 0, 0, 0, 0, 0],
            [ 0, 0, 0, 0, 0, 0, 0],
            [ 0, 0, 0, 0, 0, 0, 0],
            [ 0, 0, 0, 0, 0, 0, 0],
            [ 0, 0, 0, 0, 0, 0, 0],
            [ 0, 0, 0, 0, 0, 0, 0],
            [ 0, 0, 0, 0, 0, 0, 0],
        ]
        this.field = []
        for(let y = 0; y < this.gameY; y++) {
            this.field.push([])
            for(let x = 0; x < this.gameX; x++) {
                this.field[y].push(this.fieldNone)
            }
        }
        this.field[2][2] = 10
        this.field[2][3] = 10
        this.field[3][3] = 10
        this.field[3][4] = 10
    }

    create () {
        this.DrawAllField()
        this.DrawPlayer()
    }

    update () {
        this.Manipulate()
        this.DrawField()
        this.DrawPlayer()
    }

    Manipulate() {
        if(!this.moving) {
            let direction = this._Manipulate()
            if(direction != null) {
                this.movingDirection = direction
                this.moving = true
            }
        } else {
            this.movingCounter += 1
            if(this.movingCounter >= this.movingCountMax) {
                this.moving = false
                this.movingCounter = 0
                this.playerX = this.movingFinalX
                this.playerY = this.movingFinalY
                if(this.movingDirection == "up") this.playerImage = this.movingPlayerUp[0]
                if(this.movingDirection == "down") this.playerImage = this.movingPlayerDown[0]
                if(this.movingDirection == "left") this.playerImage = this.movingPlayerLeft[0]
                if(this.movingDirection == "right") this.playerImage = this.movingPlayerRight[0]
            }
        }
    }
    _Manipulate() {
        let updateDirection = null
        const cursors = this.input.keyboard.createCursorKeys();
        let playerX = this.playerX
        let playerY = this.playerY
        if(cursors.up.isDown) playerY -= 1
        if(cursors.down.isDown) playerY += 1
        if(cursors.left.isDown) playerX -= 1
        if(cursors.right.isDown) playerX += 1
        if(cursors.space.isDown) {}

        if(playerX < 0) playerX = 0
        if(playerX >= this.gameX) playerX = this.gameX - 1
        if(playerY < 0) playerY = 0
        if(playerY >= this.gameY) playerY = this.gameY - 1

        if(this.field[playerY][playerX] != 1) {
            playerX = this.playerX
            playerY = this.playerY
        }

        if(playerX != this.playerX) {
            updateDirection = (playerX < this.playerX ? "left" : "right")
        }
        if(playerY != this.playerY) {
            updateDirection = (playerY < this.playerY ? "up" : "down")
        }

        this.movingFinalX = playerX
        this.movingFinalY = playerY

        return updateDirection
    }
    DrawField() {
        if(this.moving) {
            this.add.sprite(this.gameOffsetX + this.playerX * 40, this.gameOffsetY + this.playerY * 40, "fieldscene", this.ground[this.playerY][this.playerX])
            this.add.sprite(this.gameOffsetX + this.movingFinalX * 40, this.gameOffsetY + this.movingFinalY * 40, "fieldscene", this.ground[this.movingFinalY][this.movingFinalX])
        }
    }
    DrawAllField() {
        for(let y=0;y<this.ground.length;y++) {
            for(let x=0;x<this.ground[y].length;x++) {
                this.add.sprite(this.gameOffsetX + x * 40, this.gameOffsetY + y * 40, "fieldscene", this.ground[y][x]);
            }
        }
        for(let y=0;y<this.field.length;y++) {
            for(let x=0;x<this.field[y].length;x++) {
                this.add.sprite(this.gameOffsetX + x * 40, this.gameOffsetY + y * 40, "fieldscene", this.field[y][x]);
            }
        }
    }
    DrawPlayer() {
        if(this.moving) {
            let movingImages = [0]
            if(this.movingDirection == "up") movingImages = this.movingPlayerUp
            if(this.movingDirection == "down") movingImages = this.movingPlayerDown
            if(this.movingDirection == "left") movingImages = this.movingPlayerLeft
            if(this.movingDirection == "right") movingImages = this.movingPlayerRight

            let posX = this.gameOffsetX + 2 + this.playerX * 40
            let posY = this.gameOffsetY + 2 + this.playerY * 40
            let movingCountMax = this.movingCountMax - 1
            if(this.movingDirection == "up") posY -= 40 * (this.movingCounter / movingCountMax)
            if(this.movingDirection == "down") posY += 40 * (this.movingCounter / movingCountMax)
            if(this.movingDirection == "left") posX -= 40 * (this.movingCounter / movingCountMax)
            if(this.movingDirection == "right") posX += 40 * (this.movingCounter / movingCountMax)
            let playerNo = Math.floor(movingImages.length * (this.movingCounter / this.movingCountMax))
            this.add.sprite(posX, posY, "player", movingImages[playerNo]);
        } else {
            this.add.sprite(this.gameOffsetX + 2 + this.playerX * 40, this.gameOffsetY + 2 + this.playerY * 40, "player", this.playerImage);
        }
    }
}
