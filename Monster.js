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
const Cyclop2 = new Monster("Cyclop ", 100, 20, 28, 67);
const Ghost = new Monster("Ghost", 50, 10, 13, 65);

const Farmer = new Monster("Farmer", 100, 0, 12, 15);
const Mom = new Monster("Mom", 100, 0, 18, 7);
const Boy = new Monster("Boy", 100, 0, 12, 6);
const Knight = new Monster("Knight", 100, 0, 27, 46);
const Wizard = new Monster("Wizard", 100, 0, 17, 23);
