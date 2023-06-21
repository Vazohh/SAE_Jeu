class Player {
    constructor(name) {
        this.name = name;
        this.health = 100;
        this.items = [];
        this.position = [11, 10];
        this.hasKey = false;
        this.hasOpenedChest = false;
        this.mobDeath = false;
    }
    
    moveLeft() {
        if(this.position[1]>0){
             this.position[1] = this.position[1]-1;
            console.log(this.position)
        }
        else{

        }
        // À implémenter : mettre à jour la position du joueur et gérer les interactions avec les objets/monstres
    }
    moveRight(){
        if(this.position[1]<75){
            this.position[1] = this.position[1]+1;
            console.log(this.position)
        }
        else{

        }
    }
    moveUp(){
        if(this.position[0]>0){
            this.position[0] = this.position[0]-1;
            console.log(this.position)
        }
        else{

        }
    }

    moveDown(){
        if(this.position[0]<40){
            this.position[0] = this.position[0]+1;
            console.log(this.position)
        }
        else{

        }
    }
      
    attack(target) {
        // À implémenter : attaquer un monstre
    }

    defend() {
        // À implémenter : se défendre contre une attaque
    }

    useItem(item) {

    }
}