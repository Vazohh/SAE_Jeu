class Game {
    constructor(players, board, inventory) {
        this.players = players;
        this.board = board;
        this.currentPlayer = players[0];
        this.gameState = "not_started";
        this.inventory = inventory;
        this.Apparence=0;

        this.start()
    }

    start() {
        this.gameState = "in_progress";
        this.board.rows[this.currentPlayer.position[0]][this.currentPlayer.position[1]].character = "hero"
        this.board.generate();
        // À implémenter : afficher le plateau de jeu et les joueurs sur l'interface HTML
               
    }
    teleportToChateauInterieur() {
        if (this.currentPlayer.position[0] === 2 && this.currentPlayer.position[1] === 2) {
          this.gameState = "en_transition";
    
          // Téléportation vers la deuxième map (château intérieur)
          this.board = chateauInterieur.rows;
          const chateauInterieurStartingPositionX = 0;
          const chateauInterieurStartingPositionY = 0;
          this.currentPlayer.position = [chateauInterieurStartingPositionX, chateauInterieurStartingPositionY];
    
          // Mettre à jour l'état du jeu pour "en_cours" ou autre indication appropriée
          this.gameState = "en_cours";
        }
    }

    end() {
        this.gameState = "ended";
        var gameover = document.getElementById('gameover');
        gameover.style.display = 'block';
    }

    nextTurn() {
        // À implémenter : passer au joueur suivant et gérer le tour de jeu
    }

    update(){
        this.board.rows.forEach(ligne => ligne.forEach(tuile => tuile.character = ""))
        this.board.rows[this.currentPlayer.position[0]][this.currentPlayer.position[1]].character = "hero"
        updateUI(this)

    }

    checkPos() {

        if (this.currentPlayer.position[0] == 36 && this.currentPlayer.position[1] == 8 && this.currentPlayer.hasKey == false) {
            this.board.deleteKey(36, 8, this);
            this.currentPlayer.hasKey = true;
        }

        if (this.currentPlayer.position[0] == 28 && this.currentPlayer.position[1] == 46 || this.currentPlayer.position[0] == 29 && this.currentPlayer.position[1] == 46) {
            if (!this.currentPlayer.hasOpenedChest) {
                afficherDialog();
            }
        }

        if (this.currentPlayer.position[0] == 39 && this.currentPlayer.position[1] == 30 && !this.currentPlayer.hasOpenedChest) {
            if (this.currentPlayer.hasKey) {
                var bravo = document.getElementById('bravo');
                bravo.style.display = 'block';
                game.currentPlayer.items.splice(0, 1, sword);
                game.currentPlayer.items.splice(1, 1, bomb);
                //this.currentPlayer.items.splice(this.currentPlayer.items.findIndex(item => item instanceof Clef), 1);
                updateInventoryTest(this);
                this.currentPlayer.hasOpenedChest = true;
            } else {
                var erreur = document.getElementById('erreur');
                erreur.style.display = 'block'; 
            }
        }
        if(Ghost.alive) {
            if ((this.currentPlayer.position[0] == 14 && this.currentPlayer.position[1] == 65 && !this.currentPlayer.mobDeath) || (this.currentPlayer.position[0] == 14 && this.currentPlayer.position[1] == 64 && !this.currentPlayer.mobDeath) || (this.currentPlayer.position[0] == 13 && this.currentPlayer.position[1] == 64 && !this.currentPlayer.mobDeath) || (this.currentPlayer.position[0] == 14 && this.currentPlayer.position[1] == 66 && !this.currentPlayer.mobDeath) || (this.currentPlayer.position[0] == 13 && this.currentPlayer.position[1] == 66 && !this.currentPlayer.mobDeath)) {
                setHealthLevel(5);
            }
        }

        if(Cyclop.alive) {
            if ((this.currentPlayer.position[0] == 20 && this.currentPlayer.position[1] == 59 && !this.currentPlayer.mobDeath) || (this.currentPlayer.position[0] == 21 && this.currentPlayer.position[1] == 59 && !this.currentPlayer.mobDeath) || (this.currentPlayer.position[0] == 19 && this.currentPlayer.position[1] == 59 && !this.currentPlayer.mobDeath) || (this.currentPlayer.position[0] == 21 && this.currentPlayer.position[1] == 60 && !this.currentPlayer.mobDeath) || (this.currentPlayer.position[0] == 21 && this.currentPlayer.position[1] == 61 && !this.currentPlayer.mobDeath) || (this.currentPlayer.position[0] == 20 && this.currentPlayer.position[1] == 61 && !this.currentPlayer.mobDeath) || (this.currentPlayer.position[0] == 19 && this.currentPlayer.position[1] == 61 && !this.currentPlayer.mobDeath)) {
                setHealthLevel(2.5);
            }
        }

        if(Cyclop2.alive) {
            if ((this.currentPlayer.position[0] == 27 && this.currentPlayer.position[1] == 66 && !this.currentPlayer.mobDeath) || (this.currentPlayer.position[0] == 28 && this.currentPlayer.position[1] == 66 && !this.currentPlayer.mobDeath) || (this.currentPlayer.position[0] == 29 && this.currentPlayer.position[1] == 66 && !this.currentPlayer.mobDeath) || (this.currentPlayer.position[0] == 29 && this.currentPlayer.position[1] == 67 && !this.currentPlayer.mobDeath) || (this.currentPlayer.position[0] == 29 && this.currentPlayer.position[1] == 68 && !this.currentPlayer.mobDeath) || (this.currentPlayer.position[0] == 28 && this.currentPlayer.position[1] == 68 && !this.currentPlayer.mobDeath) || (this.currentPlayer.position[0] == 27 && this.currentPlayer.position[1] == 68 && !this.currentPlayer.mobDeath) || (this.currentPlayer.position[0] == 27 && this.currentPlayer.position[1] == 67 && !this.currentPlayer.mobDeath)) {
                setHealthLevel(2.5);
            }
        }

        if (!Ghost.alive) {
            this.board.rows[13][65].walkable = true;
        }

        if (!Cyclop.alive) {
            this.board.rows[20][60].walkable = true;
        }
        if (!Cyclop2.alive) {
            this.board.rows[28][67].walkable = true;
        }

        //end game
        if ((this.currentPlayer.position[0] == 12 && this.currentPlayer.position[1] == 65) || (this.currentPlayer.position[0] == 12 && this.currentPlayer.position[1] == 66)) {
            if (this.currentPlayer.hasOpenedChest && !Ghost.alive) {
                var fin = document.getElementById('fin');
                fin.style.display = 'block';
            } else {
                var erreur = document.getElementById('erreur');
                erreur.style.display = 'block'; 
            }
        }

        if (health <= 0) {
            this.end();
        }
    }
    

    keyboardControl(touche){
        if(touche == "ArrowLeft"){
            if(this.board.rows[this.currentPlayer.position[0]][ this.currentPlayer.position[1]-1].walkable){
                this.currentPlayer.moveLeft()
            }
        }
        if(touche == "ArrowRight"){
            if(this.board.rows[this.currentPlayer.position[0]][ this.currentPlayer.position[1]+1].walkable){
                this.currentPlayer.moveRight()
            }
        }
        if(touche == "ArrowUp"){
            if(this.board.rows[this.currentPlayer.position[0]-1][ this.currentPlayer.position[1]].walkable){
                this.currentPlayer.moveUp()
            }
        }
        if(touche == "ArrowDown"){
            if(this.board.rows[this.currentPlayer.position[0]+1][ this.currentPlayer.position[1]].walkable){
                this.currentPlayer.moveDown()
            }
        }
        if(touche == "1"){ //Epee
            if (game.currentPlayer.hasOpenedChest) {
                if(this.Apparence == 1){
                    this.Apparence = 0 
                }
                else{
                    this.Apparence = 1
                }
            }
        }
        if(touche == "2"){ //Bombe
            if (game.currentPlayer.hasOpenedChest) {
                if(this.Apparence == 2){
                    this.Apparence = 0
                }
                else{
                    this.Apparence = 2
                }
            }
        }
        if(touche == "3"){ //Clef
            if (game.currentPlayer.hasKey) {
                if(this.Apparence == 3){
                    this.Apparence = 0
                }
                else{
                    this.Apparence = 3
                }
            }
        }
        if(touche == "A" || touche == "a"){
            const playerPosX = this.currentPlayer.position[0];
            const playerPosY = this.currentPlayer.position[1];
            if(this.Apparence == 1){
                if(Cyclop.sante<=0){
                    Cyclop.alive=false;
                    game.board.rows[Cyclop.posX][Cyclop.posY].image=''
                }
                if(Cyclop2.sante<=0){
                    Cyclop2.alive=false;
                    game.board.rows[Cyclop2.posX][Cyclop2.posY].image=''
                }
                if(Ghost.sante<=0){
                    Ghost.alive=false;
                    game.board.rows[Ghost.posX][Ghost.posY].image=''
                }
                else {
                    console.log("Attaque sword!");
                    if(this.board.rows[playerPosX][playerPosY - 1] === game.board.rows[Cyclop.posX][Cyclop.posY]
                    || this.board.rows[playerPosX][playerPosY + 1] === game.board.rows[Cyclop.posX][Cyclop.posY]
                    || this.board.rows[playerPosX - 1][playerPosY] === game.board.rows[Cyclop.posX][Cyclop.posY]
                    || this.board.rows[playerPosX + 1][playerPosY] === game.board.rows[Cyclop.posX][Cyclop.posY]
                    || this.board.rows[playerPosX - 1][playerPosY - 1] === game.board.rows[Cyclop.posX][Cyclop.posY]
                    || this.board.rows[playerPosX + 1][playerPosY - 1] === game.board.rows[Cyclop.posX][Cyclop.posY]
                    || this.board.rows[playerPosX - 1][playerPosY + 1] === game.board.rows[Cyclop.posX][Cyclop.posY]
                    || this.board.rows[playerPosX + 1][playerPosY + 1] === game.board.rows[Cyclop.posX][Cyclop.posY]){
                        Cyclop.sante -= sword.damage;
                    }
                    if(this.board.rows[playerPosX][playerPosY - 1] === game.board.rows[Cyclop2.posX][Cyclop2.posY]
                        || this.board.rows[playerPosX][playerPosY + 1] === game.board.rows[Cyclop2.posX][Cyclop2.posY]
                        || this.board.rows[playerPosX - 1][playerPosY] === game.board.rows[Cyclop2.posX][Cyclop2.posY]
                        || this.board.rows[playerPosX + 1][playerPosY] === game.board.rows[Cyclop2.posX][Cyclop2.posY]
                        || this.board.rows[playerPosX - 1][playerPosY - 1] === game.board.rows[Cyclop2.posX][Cyclop2.posY]
                        || this.board.rows[playerPosX + 1][playerPosY - 1] === game.board.rows[Cyclop2.posX][Cyclop2.posY]
                        || this.board.rows[playerPosX - 1][playerPosY + 1] === game.board.rows[Cyclop2.posX][Cyclop2.posY]
                        || this.board.rows[playerPosX + 1][playerPosY + 1] === game.board.rows[Cyclop2.posX][Cyclop2.posY]){
                            Cyclop2.sante -= sword.damage;
                    }
                    if(this.board.rows[playerPosX][playerPosY - 1] === game.board.rows[Ghost.posX][Ghost.posY]
                        || this.board.rows[playerPosX][playerPosY + 1] === game.board.rows[Ghost.posX][Ghost.posY]
                        || this.board.rows[playerPosX - 1][playerPosY] === game.board.rows[Ghost.posX][Ghost.posY]
                        || this.board.rows[playerPosX + 1][playerPosY] === game.board.rows[Ghost.posX][Ghost.posY]
                        || this.board.rows[playerPosX - 1][playerPosY - 1] === game.board.rows[Ghost.posX][Ghost.posY]
                        || this.board.rows[playerPosX + 1][playerPosY - 1] === game.board.rows[Ghost.posX][Ghost.posY]
                        || this.board.rows[playerPosX - 1][playerPosY + 1] === game.board.rows[Ghost.posX][Ghost.posY]
                        || this.board.rows[playerPosX + 1][playerPosY + 1] === game.board.rows[Ghost.posX][Ghost.posY]){
                        Ghost.sante -= sword.damage;
                    }
                }
            }
            if(this.Apparence == 2){
                if(Cyclop.sante<=0){
                    Cyclop.alive=false;
                    game.board.rows[Cyclop.posX][Cyclop.posY].image=''
                }
                if(Cyclop2.sante<=0){
                    Cyclop2.alive=false;
                    game.board.rows[Cyclop2.posX][Cyclop2.posY].image=''
                }
                if(Ghost.sante<=0){
                    Ghost.alive=false;
                    game.board.rows[Ghost.posX][Ghost.posY].image=''
                }
                else {
                    console.log("Attaque sword!");
                    if(this.board.rows[playerPosX][playerPosY - 1] === game.board.rows[Cyclop.posX][Cyclop.posY]
                    || this.board.rows[playerPosX][playerPosY + 1] === game.board.rows[Cyclop.posX][Cyclop.posY]
                    || this.board.rows[playerPosX - 1][playerPosY] === game.board.rows[Cyclop.posX][Cyclop.posY]
                    || this.board.rows[playerPosX + 1][playerPosY] === game.board.rows[Cyclop.posX][Cyclop.posY]
                    || this.board.rows[playerPosX - 1][playerPosY - 1] === game.board.rows[Cyclop.posX][Cyclop.posY]
                    || this.board.rows[playerPosX + 1][playerPosY - 1] === game.board.rows[Cyclop.posX][Cyclop.posY]
                    || this.board.rows[playerPosX - 1][playerPosY + 1] === game.board.rows[Cyclop.posX][Cyclop.posY]
                    || this.board.rows[playerPosX + 1][playerPosY + 1] === game.board.rows[Cyclop.posX][Cyclop.posY]){
                        Cyclop.sante -= bomb.damage;
                    }
                    if(this.board.rows[playerPosX][playerPosY - 1] === game.board.rows[Cyclop2.posX][Cyclop2.posY]
                        || this.board.rows[playerPosX][playerPosY + 1] === game.board.rows[Cyclop2.posX][Cyclop2.posY]
                        || this.board.rows[playerPosX - 1][playerPosY] === game.board.rows[Cyclop2.posX][Cyclop2.posY]
                        || this.board.rows[playerPosX + 1][playerPosY] === game.board.rows[Cyclop2.posX][Cyclop2.posY]
                        || this.board.rows[playerPosX - 1][playerPosY - 1] === game.board.rows[Cyclop2.posX][Cyclop2.posY]
                        || this.board.rows[playerPosX + 1][playerPosY - 1] === game.board.rows[Cyclop2.posX][Cyclop2.posY]
                        || this.board.rows[playerPosX - 1][playerPosY + 1] === game.board.rows[Cyclop2.posX][Cyclop2.posY]
                        || this.board.rows[playerPosX + 1][playerPosY + 1] === game.board.rows[Cyclop2.posX][Cyclop2.posY]){
                            Cyclop2.sante -= bomb.damage;
                    }
                    if(this.board.rows[playerPosX][playerPosY - 1] === game.board.rows[Ghost.posX][Ghost.posY]
                        || this.board.rows[playerPosX][playerPosY + 1] === game.board.rows[Ghost.posX][Ghost.posY]
                        || this.board.rows[playerPosX - 1][playerPosY] === game.board.rows[Ghost.posX][Ghost.posY]
                        || this.board.rows[playerPosX + 1][playerPosY] === game.board.rows[Ghost.posX][Ghost.posY]
                        || this.board.rows[playerPosX - 1][playerPosY - 1] === game.board.rows[Ghost.posX][Ghost.posY]
                        || this.board.rows[playerPosX + 1][playerPosY - 1] === game.board.rows[Ghost.posX][Ghost.posY]
                        || this.board.rows[playerPosX - 1][playerPosY + 1] === game.board.rows[Ghost.posX][Ghost.posY]
                        || this.board.rows[playerPosX + 1][playerPosY + 1] === game.board.rows[Ghost.posX][Ghost.posY]){
                        Ghost.sante -= bomb.damage;
                    }
                }
            }
            else{
                if(Cyclop.sante<=0){
                    Cyclop.alive=false;
                    game.board.rows[Cyclop.posX][Cyclop.posY].image=''
                }
                if(Cyclop2.sante<=0){
                    Cyclop2.alive=false;
                    game.board.rows[Cyclop2.posX][Cyclop2.posY].image=''
                }
                if(Ghost.sante<=0){
                    Ghost.alive=false;
                    game.board.rows[Ghost.posX][Ghost.posY].image=''
                }
                else{
                    if(this.board.rows[playerPosX][playerPosY - 1] === game.board.rows[Cyclop.posX][Cyclop.posY]
                        || this.board.rows[playerPosX][playerPosY + 1] === game.board.rows[Cyclop.posX][Cyclop.posY]
                        || this.board.rows[playerPosX - 1][playerPosY] === game.board.rows[Cyclop.posX][Cyclop.posY]
                        || this.board.rows[playerPosX + 1][playerPosY] === game.board.rows[Cyclop.posX][Cyclop.posY]
                        || this.board.rows[playerPosX - 1][playerPosY - 1] === game.board.rows[Cyclop.posX][Cyclop.posY]
                        || this.board.rows[playerPosX + 1][playerPosY - 1] === game.board.rows[Cyclop.posX][Cyclop.posY]
                        || this.board.rows[playerPosX - 1][playerPosY + 1] === game.board.rows[Cyclop.posX][Cyclop.posY]
                        || this.board.rows[playerPosX + 1][playerPosY + 1] === game.board.rows[Cyclop.posX][Cyclop.posY]){
                            Cyclop.sante -= Hand.damage;
                    }
                    if(this.board.rows[playerPosX][playerPosY - 1] === game.board.rows[Cyclop2.posX][Cyclop2.posY]
                        || this.board.rows[playerPosX][playerPosY + 1] === game.board.rows[Cyclop2.posX][Cyclop2.posY]
                        || this.board.rows[playerPosX - 1][playerPosY] === game.board.rows[Cyclop2.posX][Cyclop2.posY]
                        || this.board.rows[playerPosX + 1][playerPosY] === game.board.rows[Cyclop2.posX][Cyclop2.posY]
                        || this.board.rows[playerPosX - 1][playerPosY - 1] === game.board.rows[Cyclop2.posX][Cyclop2.posY]
                        || this.board.rows[playerPosX + 1][playerPosY - 1] === game.board.rows[Cyclop2.posX][Cyclop2.posY]
                        || this.board.rows[playerPosX - 1][playerPosY + 1] === game.board.rows[Cyclop2.posX][Cyclop2.posY]
                        || this.board.rows[playerPosX + 1][playerPosY + 1] === game.board.rows[Cyclop2.posX][Cyclop2.posY]){
                            Cyclop2.sante -= Hand.damage;
                    }
                    if(this.board.rows[playerPosX][playerPosY - 1] === game.board.rows[Ghost.posX][Ghost.posY]
                        || this.board.rows[playerPosX][playerPosY + 1] === game.board.rows[Ghost.posX][Ghost.posY]
                        || this.board.rows[playerPosX - 1][playerPosY] === game.board.rows[Ghost.posX][Ghost.posY]
                        || this.board.rows[playerPosX + 1][playerPosY] === game.board.rows[Ghost.posX][Ghost.posY]
                        || this.board.rows[playerPosX - 1][playerPosY - 1] === game.board.rows[Ghost.posX][Ghost.posY]
                        || this.board.rows[playerPosX + 1][playerPosY - 1] === game.board.rows[Ghost.posX][Ghost.posY]
                        || this.board.rows[playerPosX - 1][playerPosY + 1] === game.board.rows[Ghost.posX][Ghost.posY]
                        || this.board.rows[playerPosX + 1][playerPosY + 1] === game.board.rows[Ghost.posX][Ghost.posY]){
                        Ghost.sante -= Hand.damage;
                    }
                }
            }
        }
        console.log(this)
        this.checkPos()
        this.update()
    }
}


function updateUI(game) {
    // Afficher les statistiques des personnages
    let playerStatsHTML = ``
        
    document.getElementById('player-stats').innerHTML = playerStatsHTML;

    // Afficher l'état du plateau de jeu
    let gameBoardHTML = '';
    for (let row of game.board.rows) {
        gameBoardHTML += `<div class="row">`; // Début de la ligne
        for(let tile of row){
            if(tile.image){
                if(tile.imgsrc==1){
                    gameBoardHTML += `
                        <div class="tile" id="drop-zone" >
                            <img id="Board" src=kenney_tiny-dungeon/Tiles/tile_${tile.image}.png></img>
                        </div>
                    `;
                }
                if(tile.imgsrc==2){
                    gameBoardHTML += `
                        <div class="tile" id="drop-zone">
                            <img id="Board" src=kenney_tiny-town/Tiles/tile_${tile.image}.png></img>
                        </div>
                    `;
                }
                if(tile.imgsrc==3){
                    gameBoardHTML += `
                        <div class="tile" id="drop-zone">
                            <img id="Board" src=water/Tiles/tile_${tile.image}.png></img>
                        </div>
                    `;
                }
                else{

                }
            }
            else {
                if(game.Apparence == 1){    
                    gameBoardHTML += `
                    <div class="tile ${tile.background}" id="drop-zone" >
                        ${tile.character ? `<img id="Player" src=kenney_tiny-dungeon/Tiles/tile_0132.png></img>` : ''}
                        ${tile.item ? tile.item.name : ''}
                        ${tile.monster ? tile.monster.name : ''}
                    </div>
                `;
               }
                if(game.Apparence  == 2){
                    gameBoardHTML += `
                    <div class="tile ${tile.background}" id="drop-zone" >
                        ${tile.character ? `<img id="Player" src=kenney_tiny-dungeon/Tiles/tile_0135.png></img>` : ''}
                        ${tile.item ? tile.item.name : ''}
                        ${tile.monster ? tile.monster.name : ''}
                    </div>
                `;
                }
                if(game.Apparence  == 3){
                    gameBoardHTML += `
                    <div class="tile ${tile.background}" id="drop-zone" >
                        ${tile.character ? `<img id="Player" src=kenney_tiny-dungeon/Tiles/tile_0134.png></img>` : ''}
                        ${tile.item ? tile.item.name : ''}
                        ${tile.monster ? tile.monster.name : ''}
                    </div>
                `;
                }
                if(game.Apparence == 0){
                    gameBoardHTML += `
                    <div class="tile ${tile.background}" id="drop-zone" >
                        ${tile.character ? `<img id="Player" src=kenney_tiny-dungeon/Tiles/tile_0085.png></img>` : ''}
                        ${tile.item ? tile.item.name : ''}
                        ${tile.monster ? tile.monster.name : ''}
                    </div>
                `;
                }
                else{
                   
                }
            }
            
        }
        gameBoardHTML += '</div>'; // Fin de la ligne
    }
    document.getElementById('game-board').innerHTML = gameBoardHTML;

    // Afficher le tour actuel
    document.getElementById('current-turn').textContent = ``;

}

let compteurClef = 0;
let game;
document.getElementById('start-game').addEventListener('click', () => {
    game = new Game([new Player("Joueur 1"), new Player("Joueur 2")], new Board(10), new Inventory(10));
    game.start();
    drawGameBoard(game.board);
    console.log(game.board)
    console.log(game.inventory)
    updateUI(game);
    game.currentPlayer.items.push(new Object());
    game.currentPlayer.items.push(new Object());
    game.currentPlayer.items.push(new Object());
    updateInventoryTest(game);

});
var e = document.getElementById('inventory-board');
document.getElementById('use-item-button').addEventListener('click', () => {
    // compteur = 0;
    // if (compteur == 0) {
    //     drawInventoryBoard(game.inventory);
    //     updateInventoryTest(game);
    //     compteur++;
    // }
    if(e.style.display == 'block')
        e.style.display = 'none';
    else
        e.style.display = 'block';

    let dragItem = document.querySelectorAll('#drag-item');
    let dropZone = document.querySelectorAll('#drop-zone');


    
    dragItem.forEach( (item, index) => {
        
        item.addEventListener('dragstart', (e) => {
            console.log('pris !', index);
            e.dataTransfer.setData('text/plain', e.target.id);
        });

    })



    dropZone.forEach( tuile => {
        
        tuile.addEventListener('dragover', e => {
            e.preventDefault(); // cela permet à l'élément d'être déposé
            console.log("bougé !");
        })
        tuile.addEventListener('drop', e => {
            e.preventDefault(); // pour éviter l'action par défaut du navigateur
            let data = e.dataTransfer.getData('text/plain');
            console.log("laché !", e.target);
        });

    });


});

function drawGameBoard(board) {
    // Obtenir la div de plateau de jeu
    let gameBoardDiv = document.getElementById('game-board');

    // Créer un nouvel élément div pour chaque tuile
    for (let row of board.rows) {
        for (let tile of row) {
            let tileDiv = document.createElement('div');
            tileDiv.className = 'tile';

            // Ajouter des éléments pour le personnage, l'objet et le monstre, s'ils existent
            if (tile.character) {
                let characterDiv = document.createElement('div');
                characterDiv.className = 'character';
                characterDiv.textContent = tile.character.name;
                tileDiv.appendChild(characterDiv);
            }

            if (tile.item) {
                let itemDiv = document.createElement('div');
                itemDiv.className = 'item';
                itemDiv.textContent = tile.item.name;
                tileDiv.appendChild(itemDiv);
            }

            if (tile.monster) {
                let monsterDiv = document.createElement('div');
                monsterDiv.className = 'monster';
                monsterDiv.textContent = tile.monster.name;
                tileDiv.appendChild(monsterDiv);
            }

            // Ajouter la tuile à la div de plateau de jeu
            gameBoardDiv.appendChild(tileDiv);
        }

        // Ajouter un élément de saut de ligne pour créer une nouvelle ligne
        gameBoardDiv.appendChild(document.createElement('br'));
    }
}

/*function drawInventoryBoard(inventory) {
    // Obtenir la div de plateau d'inventaire
    let gameBoardDiv = document.getElementById('inventory-board');

    // Créer un nouvel élément div pour chaque tuile
    for (let row of inventory.rows) {
        for (let tile of row) {
            let tileDiv = document.createElement('div');
            tileDiv.className = 'inventory';


            if (tile.item) {
                let itemDiv = document.createElement('div');
                itemDiv.className = 'item';
                itemDiv.textContent = tile.item.name;
                tileDiv.appendChild(itemDiv);
            }

            // Ajouter la tuile à la div de plateau de jeu
            gameBoardDiv.appendChild(tileDiv);
        }

        // Ajouter un élément de saut de ligne pour créer une nouvelle ligne
        gameBoardDiv.appendChild(document.createElement('br'));
    }
}*/

document.addEventListener('keyup', (event) =>{
                             
        const key = event.key;
        switch (key) {
            case "ArrowLeft":
                game.keyboardControl(key)
                break
            case "ArrowRight":
                game.keyboardControl(key)
                break
            case "ArrowUp":
                game.keyboardControl(key)
                break
            case "ArrowDown":
                game.keyboardControl(key)
                break
            case "1":
                game.keyboardControl(key)
                break
            case "2":
                game.keyboardControl(key)
                break
            case "3":
                game.keyboardControl(key)
                break
            case "A":
                game.keyboardControl(key)
                break
            case "a":
                game.keyboardControl(key)
                break

    }

    if (key === 'c') {
        var controls = document.getElementById('controls');
        if (controls.style.display === 'block') {
          controls.style.display = 'none';
        } else {
          controls.style.display = 'block';
        }
    }
    if (key === 'o') {
        var rules = document.getElementById('rules');
        if (rules.style.display === 'block') {
          rules.style.display = 'none';
        } else {
          rules.style.display = 'block';
        }
    }

    if (key === 'Escape') {
        var erreur = document.getElementById('erreur');
        if (erreur.style.display === 'block') {
            erreur.style.display = 'none';
        }

        var bravo = document.getElementById('bravo');
        if (bravo.style.display === 'block') {
            bravo.style.display = 'none';
        }

        var dialog = document.getElementById('dialog');
        if (dialog.style.display === 'block') {
            dialog.style.display = 'none';
        }

        var fin = document.getElementById('fin');
        if (fin.style.display === 'block') {
            fin.style.display = 'none';
        }
        var controls = document.getElementById('controls');
        if (controls.style.display === 'block') {
            controls.style.display = 'none';
        }
        var rules = document.getElementById('rules');
        if (rules.style.display === 'block') {
            rules.style.display = 'none';
        }

    }
})
  
var closeButton = document.getElementsByClassName('close')[0];
  
closeButton.addEventListener('click', function() {
    var rules = document.getElementById('rules');
    rules.style.display = 'none';
});

var closeButton = document.getElementsByClassName('close')[0];

closeButton.addEventListener('click', function() {
    var controls = document.getElementById('controls');
    controls.style.display = 'none';
});
  
var closeControlsButton = document.getElementsByClassName('closeControls')[0];
  
/*closeControlsButton.addEventListener('click', function() {
    var controls = document.getElementById('controls');
    controls.style.display = 'none';
});*/

var closeBravoButton = document.getElementsByClassName('closeBravo')[0];
  
closeBravoButton.addEventListener('click', function() {
    var bravo = document.getElementById('bravo');
    bravo.style.display = 'none';
});

var closeErrorButton = document.getElementsByClassName('closeError')[0];
  
closeErrorButton.addEventListener('click', function() {
    var erreur = document.getElementById('erreur');
    erreur.style.display = 'none';
});

function disparaitre() {
    var bouton = document.getElementById("start-game");
    bouton.style.display = "none";
    timer.style.display = "none";
    
}

function afficher() {
    var attackButton = document.getElementById("attack-button");
    var defendButton = document.getElementById("defend-button");
    var inventoryButton = document.getElementById("use-item-button");
    var healthBar = document.getElementById("health-bar");
    var timer = document.getElementById("timer");
    var volumeContainer = document.getElementById("volumeContainer");
    volumeContainer.style.display = "block";
   
        
    
    timer.style.display = "block";
    attackButton.style.display = "block";
    defendButton.style.display = "block";
    inventoryButton.style.display = "block";
    healthBar.style.display = "block";
    
    
    
}

function afficherRegles() {
    var rules = document.getElementById('rules');
    rules.style.display = 'block';
}
function afficherControles() {
    var controls = document.getElementById('controls');
    controls.style.display = 'block';
}


function afficherDialog() {
    var dialog = document.getElementById("dialog");
    dialog.style.display = "block";
  
    setTimeout(function() {
      dialog.style.display = "none";
    }, 5000);
  }

function setHealthLevel(percentage) {
    var healthLevel = document.getElementById('health-level');
    healthLevel.style.width = (health - percentage) + '%';
    health = health - percentage;
}

var health = 100;

var startTime;
var timerRunning = false;
var minutes = 0;
var seconds = 0;
//var milliseconds = 0;

function startTimer() {
  timerRunning = true;
  startTime = performance.now();
  requestAnimationFrame(updateTimer);
}

function updateTimer(currentTime) {
  if (!timerRunning) {
    return;
  }

  var elapsedTime = Math.floor(currentTime - startTime);
  minutes = Math.floor(elapsedTime / (1000 * 60));
  seconds = Math.floor((elapsedTime % (1000 * 60)) / 1000);
  milliseconds = elapsedTime % 1000;

  var timeString = padNumber(minutes,2) + ':' + padNumber(seconds) /*+ ':' + padNumber(milliseconds, 3)*/;
  document.getElementById('timer').innerHTML = timeString;

  requestAnimationFrame(updateTimer);
}

function padNumber(number, length) {
  var str = String(number);
  while (str.length < length) {
    str = '0' + str;
  }
  return str;
}
let audio = new Audio('Son.mp3');
function PlaySound() {
    audio.loop = true;
    audio.play(); 
}



document.getElementById('start-game').addEventListener('click', startTimer);
document.getElementById('start-game').addEventListener('click', PlaySound);
function setupVolumeSlider() {
    var volumeSlider = document.getElementById("volumeSlider");
    var volumeContainer = document.getElementById("volumeContainer");
    var volumeLabel = document.getElementById("volumeLabel");
    var audioPlayer = document.getElementById("audioPlayer");
    

    volumeSlider.addEventListener("input", function() {
        var volumeValue = volumeSlider.value;
        volumeLabel.textContent = "" + volumeValue;
        audio.volume = volumeValue / 100;
    });
    

    audioPlayer.addEventListener("canplay", function() {
        // Votre code pour lancer la lecture de la musique ici
        // Intégrez cette partie avec la logique de démarrage de votre jeu
        
        //audioPlayer.play();
    });

    volumeContainer.style.display = "none";
}

// Appelez la fonction setupVolumeSlider pour initialiser la barre de volume
setupVolumeSlider();

  