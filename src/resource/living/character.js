
export class Character {
    constructor(playerAsset, playerInitX, playerInitY, gameConfig) {
        this.gameConfig = gameConfig
        
        this.playerAsset = playerAsset
        this.playerNoInField = 2
        this.playerX = playerInitX
        this.playerY = playerInitY
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
    }

    move(field, moving) {
        if(!this.moving) {
            let direction = this.moveCheck(field, moving)
            if(direction != null) {
                this.movingDirection = direction
                this.moving = true
                field.field[this.playerY][this.playerX] = field.fieldNone
                field.field[this.movingFinalY][this.movingFinalX] = this.playerNoInField
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
    moveCheck(field, moving) {
        let updateDirection = null
        let playerX = this.playerX + moving[0]
        let playerY = this.playerY + moving[1]
        if(playerX < 0) playerX = 0
        if(playerX >= this.gameConfig.fieldX) playerX = this.gameConfig.fieldX - 1
        if(playerY < 0) playerY = 0
        if(playerY >= this.gameConfig.fieldY) playerY = this.gameConfig.fieldY - 1

        if(field.field[playerY][playerX] != field.fieldNone) {
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
}
