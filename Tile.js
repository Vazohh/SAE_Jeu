
class Tile {
    constructor(i, j) {
        this.position = [i, j]
        this.background = ''
        this.imgsrc=0
        this.image=''
        this.character = ''
        this.item = null
        this.monster = null
        this.walkable = true
    }

    

    isEmpty() {
        return this.character === null && this.item === null && this.monster === null
    }

    hasItem() {
        return this.item !== null
    }

    hasMonster() {
        return this.monster !== null
    }
}