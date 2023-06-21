class Monster {
    constructor(espece, sante, degats, posX, posY) {
      this.espece = espece;
      this.sante = sante;
      this.degats = degats;
      this.posX = posX;
      this.posY = posY;
      this.alive = true;
    

      this.IsDead = function() {
        if(alive==false)
            this.board.rows[Cyclop.posX][Cyclop.posY]=''
        }

    }
} 

const Cyclop = new Monster("Cyclop", 100, 20, 20, 60);
const Cyclop2 = new Monster("Cyclop", 100, 20, 28, 67);
console.log("Cyclop")
const Ghost = new Monster("Ghost", 50, 10, 19, 64);