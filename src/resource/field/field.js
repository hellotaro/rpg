
export class Field {
    constructor(fieldX, fieldY, fieldNone) {
        this.groundAsset = "fieldscene"
        this.fieldX = fieldX
        this.fieldY = fieldY
        this.fieldNone = fieldNone
        this.ground = []
        for(let y = 0; y < fieldY; y++) {
            this.ground.push([])
            for(let x = 0; x < fieldX; x++) {
                this.ground[y].push(0)
            }
        }
        this.field = []
        for(let y = 0; y < fieldY; y++) {
            this.field.push([])
            for(let x = 0; x < fieldX; x++) {
                this.field[y].push(fieldNone)
            }
        }
        this.field[2][2] = 10
        this.field[2][3] = 10
        this.field[3][3] = 10
        this.field[3][4] = 10
    }
}
