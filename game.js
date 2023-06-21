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
            setHealthLevel(0);
        }

        if (this.currentPlayer.position[0] == 28 && this.currentPlayer.position[1] == 46) {
            if (!this.currentPlayer.hasOpenedChest) {
                afficherDialog();
            }
        }

        if (this.currentPlayer.position[0] == 39 && this.currentPlayer.position[1] == 30 && !this.currentPlayer.hasOpenedChest) {
            if (this.currentPlayer.hasKey) {
                var bravo = document.getElementById('bravo');
                bravo.style.display = 'block';
                this.currentPlayer.items.push(new Epee());
                this.currentPlayer.items.splice(this.currentPlayer.items.findIndex(item => item instanceof Clef), 1);
                updateInventoryTest(this);
                this.currentPlayer.hasOpenedChest = true;
            } else {
                var erreur = document.getElementById('erreur');
                erreur.style.display = 'block'; 
            }
        }

        if ((this.currentPlayer.position[0] == 14 && this.currentPlayer.position[1] == 65 && !this.currentPlayer.mobDeath) || (this.currentPlayer.position[0] == 14 && this.currentPlayer.position[1] == 64 && !this.currentPlayer.mobDeath) || (this.currentPlayer.position[0] == 13 && this.currentPlayer.position[1] == 64 && !this.currentPlayer.mobDeath) || (this.currentPlayer.position[0] == 14 && this.currentPlayer.position[1] == 66 && !this.currentPlayer.mobDeath) || (this.currentPlayer.position[0] == 13 && this.currentPlayer.position[1] == 66 && !this.currentPlayer.mobDeath)) {
            setHealthLevel(5);
        }

        if (this.currentPlayer.position[0] == 14 && this.currentPlayer.position[1] == 65 && this.currentPlayer.hasOpenedChest) {
            this.board.deleteMob(13, 65);
            this.currentPlayer.mobDeath = true;
        }

        // Cyclops
        if ((this.currentPlayer.position[0] == 9 && this.currentPlayer.position[1] == 54) || (this.currentPlayer.position[0] == 9 && this.currentPlayer.position[1] == 55) || (this.currentPlayer.position[0] == 9 && this.currentPlayer.position[1] == 56) || (this.currentPlayer.position[0] == 8 && this.currentPlayer.position[1] == 56) || (this.currentPlayer.position[0] == 8 && this.currentPlayer.position[1] == 54) || (this.currentPlayer.position[0] == 7 && this.currentPlayer.position[1] == 55) || (this.currentPlayer.position[0] == 7 && this.currentPlayer.position[1] == 54) || (this.currentPlayer.position[0] == 7 && this.currentPlayer.position[1] == 56)) {
            setHealthLevel(5);
        }
        if ((this.currentPlayer.position[0] == 22 && this.currentPlayer.position[1] == 19) || (this.currentPlayer.position[0] == 22 && this.currentPlayer.position[1] == 20) || (this.currentPlayer.position[0] == 22 && this.currentPlayer.position[1] == 21) || (this.currentPlayer.position[0] == 21 && this.currentPlayer.position[1] == 21) || (this.currentPlayer.position[0] == 20 && this.currentPlayer.position[1] == 21) || (this.currentPlayer.position[0] == 20 && this.currentPlayer.position[1] == 20) || (this.currentPlayer.position[0] == 20 && this.currentPlayer.position[1] == 19) || (this.currentPlayer.position[0] == 21 && this.currentPlayer.position[1] == 19)) {
            setHealthLevel(5);
        }
        if ((this.currentPlayer.position[0] == 29 && this.currentPlayer.position[1] == 7) || (this.currentPlayer.position[0] == 29 && this.currentPlayer.position[1] == 8) || (this.currentPlayer.position[0] == 30 && this.currentPlayer.position[1] == 8) || (this.currentPlayer.position[0] == 30 && this.currentPlayer.position[1] == 6) || (this.currentPlayer.position[0] == 31 && this.currentPlayer.position[1] == 6) || (this.currentPlayer.position[0] == 31 && this.currentPlayer.position[1] == 7)) {
            setHealthLevel(5);
        }
        if ((this.currentPlayer.position[0] == 37 && this.currentPlayer.position[1] == 30) || (this.currentPlayer.position[0] == 36 && this.currentPlayer.position[1] == 30) || (this.currentPlayer.position[0] == 36 && this.currentPlayer.position[1] == 29) || (this.currentPlayer.position[0] == 36 && this.currentPlayer.position[1] == 28) || (this.currentPlayer.position[0] == 38 && this.currentPlayer.position[1] == 29) || (this.currentPlayer.position[0] == 37 && this.currentPlayer.position[1] == 28)) {
            setHealthLevel(5);
        }

        if (health == 0) {
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
        if(touche == "1"){
            if(this.Apparence == 1){
                this.Apparence = 0
            }
            else{
                this.Apparence = 1
            }
        }
        if(touche == "2"){
            if(this.Apparence == 2){
                this.Apparence = 0
            }
            else{
                this.Apparence = 2
            }
        }
        if(touche == "3"){
            if(this.Apparence == 3){
                this.Apparence = 0
            }
            else{
                this.Apparence = 3
            }
        }
        if(touche == "A" || touche == "a"){
            if(this.Apparence == 1){
                console.log("Attaque !")
                this.board.rows[this.currentPlayer.position[0]][ this.currentPlayer.position[1]-1]//vie du monstre -damage de l'épée
                this.board.rows[this.currentPlayer.position[0]][ this.currentPlayer.position[1]+1]//vie du monstre -damage de l'épée
                this.board.rows[this.currentPlayer.position[0]-1][ this.currentPlayer.position[1]]//vie du monstre -damage de l'épée
                this.board.rows[this.currentPlayer.position[0]+1][ this.currentPlayer.position[1]]//vie du monstre -damage de l'épée
                this.board.rows[this.currentPlayer.position[0]-1][ this.currentPlayer.position[1]-1]//vie du monstre -damage de l'épée
                this.board.rows[this.currentPlayer.position[0]+1][ this.currentPlayer.position[1]-1]//vie du monstre -damage de l'épée
                this.board.rows[this.currentPlayer.position[0]-1][ this.currentPlayer.position[1]+1]//vie du monstre -damage de l'épée
                this.board.rows[this.currentPlayer.position[0]+1][ this.currentPlayer.position[1]+1]//vie du monstre -damage de l'épée
            }
            else{
                console.log("coup de coude")
                this.board.rows[this.currentPlayer.position[0]][ this.currentPlayer.position[1]-1]//vie du monstre -damage du point
                this.board.rows[this.currentPlayer.position[0]][ this.currentPlayer.position[1]+1]//vie du monstre -damage du point
                this.board.rows[this.currentPlayer.position[0]-1][ this.currentPlayer.position[1]]//vie du monstre -damage du point
                this.board.rows[this.currentPlayer.position[0]+1][ this.currentPlayer.position[1]]//vie du monstre -damage du point
                this.board.rows[this.currentPlayer.position[0]-1][ this.currentPlayer.position[1]-1]//vie du monstre -damage du point
                this.board.rows[this.currentPlayer.position[0]+1][ this.currentPlayer.position[1]-1]//vie du monstre -damage du point
                this.board.rows[this.currentPlayer.position[0]-1][ this.currentPlayer.position[1]+1]//vie du monstre -damage du point
                this.board.rows[this.currentPlayer.position[0]+1][ this.currentPlayer.position[1]+1]//vie du monstre -damage du point
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
                        ${tile.character ? `<img id="Player" src=kenney_tiny-dungeon/Tiles/tile_0133.png></img>` : ''}
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

 function updateInventory(game) {

//     let currentPlayer = game.currentPlayer

//     // Afficher l'état de l'inventaire
//     let inventoryHTML = '';
//     inventoryHTML += `<div class="row">`; // Début de la ligne 
//     for (let item  of currentPlayer.items) {
//             inventoryHTML += `
                
//                 <div class="inventory" id="drag-item" draggable="true" class="poignard"> 
//                     ${item ? '<img id="inventory" src="kenney_tiny-dungeon/Tiles/tile_0103.png" alt="poignard"></img>' : ''}
//                 </div>
//                 <div class="inventory" id="drag-item" draggable="true" class="épée">
//                     ${item ? '<img id="inventory" src="kenney_tiny-dungeon/Tiles/tile_0104.png" alt="épée"></img>' : ''}
//                 </div>
//                 <div class="inventory" id="drag-item" draggable="true" class="épée large">
//                     ${item ? '<img id="inventory" src="kenney_tiny-dungeon/Tiles/tile_0105.png" alt="épée large"></img>' : ''}
//                 </div>
//                 <div class="inventory" id="drag-item" draggable="true" class="épée bronze">
//                     ${item ? '<img id="inventory" src="kenney_tiny-dungeon/Tiles/tile_0107.png" alt="épée bronze"></img>' : ''}
//                 </div>              
//                 <div class="inventory" id="drag-item" draggable="true" class="marteau">
//                     ${item ? '<img id="inventory" src="kenney_tiny-dungeon/Tiles/tile_0117.png" alt="marteau"></img>' : ''}
//                 </div>
//                 <div class="inventory" id="drag-item" draggable="true" class="double hache">
//                     ${item ? '<img id="inventory" src="kenney_tiny-dungeon/Tiles/tile_0118.png" alt="double hache"></img>' : ''}
//                 </div>
//                 <div class="inventory" id="drag-item" draggable="true" class="hache">
//                     ${item ? '<img id="inventory" src="kenney_tiny-dungeon/Tiles/tile_0119.png" alt="hache"></img>' : ''}
//                 </div>
//                 <div class="inventory" id="drag-item" draggable="true" class="faucille">
//                     ${item ? '<img id="inventory" src="kenney_tiny-town/Tiles/tile_0129.png" alt="faucille"></img>' : ''}
//                 </div>
//                 <div class="inventory" id="drag-item" draggable="true" class="lance">
//                 ${item ? '<img id="inventory" src="kenney_tiny-dungeon/Tiles/tile_0131.png" alt="lance"></img>' : ''}
//                 </div>
//                 <div class="inventory" id="drag-item" draggable="true" class="arc">
//                     ${item ? '<img id="inventory" src="kenney_tiny-town/Tiles/tile_0118.png" alt="arc"></img>' : ''}
//                 </div>
//                 <div class="inventory" id="drag-item" draggable="true" class="flèche">
//                     ${item ? '<img id="inventory" src="kenney_tiny-town/Tiles/tile_0119.png" alt="flèche"></img>' : ''}
//                 </div>
//                 <div class="inventory" id="drag-item" draggable="true" class="bombe">
//                     ${item ? '<img id="inventory" src="kenney_tiny-town/Tiles/tile_0105.png" alt="bombe"></img>' : ''}
//                 </div>
//                 <div class="inventory" id="drag-item" draggable="true" class="baguette magique">
//                     ${item ? '<img id="inventory" src="kenney_tiny-dungeon/Tiles/tile_0129.png" alt="baguette magique"></img>' : ''}
//                 </div>
//                 <div class="inventory" id="drag-item" draggable="true" class="baguette magique courbée">
//                     ${item ? '<img id="inventory" src="kenney_tiny-dungeon/Tiles/tile_0130.png" alt="baguette magique courbée"></img>' : ''}
//                 </div>
//                 <div class="inventory" id="drag-item" draggable="true" class="potion sante">
//                     ${item ? '<img id="inventory" src="kenney_tiny-dungeon/Tiles/tile_0113.png" alt="potion sante"></img>' : ''}
//                 </div>
//                 <div class="inventory" id="drag-item" draggable="true" class="potion vitesse">
//                     ${item ? '<img id="inventory" src="kenney_tiny-dungeon/Tiles/tile_0114.png" alt="potion vitesse"></img>' : ''}
//                 </div>
//                 <div class="inventory" id="drag-item" draggable="true" class="potion force">
//                     ${item ? '<img id="inventory" src="kenney_tiny-dungeon/Tiles/tile_0115.png" alt="potion force"></img>' : ''}
//                 </div>
//                 <div class="inventory" id="drag-item" draggable="true" class="potion defense">
//                     ${item ? '<img id="inventory" src="kenney_tiny-dungeon/Tiles/tile_0116.png" alt="potion defense"></img>' : ''}
//                 </div>
//                 <div class="inventory" id="drag-item" draggable="true" class="sort seisme">
//                     ${item ? '<img id="inventory" src="kenney_tiny-dungeon/Tiles/tile_0126.png" alt="sort seisme"></img>' : ''}
//                 </div>
//                 <div class="inventory" id="drag-item" draggable="true" class="sort poison">
//                     ${item ? '<img id="inventory" src="kenney_tiny-dungeon/Tiles/tile_0127.png" alt="sort poison"></img>' : ''}
//                 </div>
//                 <div class="inventory" id="drag-item" draggable="true" class="sort foudre">
//                     ${item ? '<img id="inventory" src="kenney_tiny-dungeon/Tiles/tile_0128.png" alt="sort foudre"></img>' : ''}
//                 </div>
//                 <div class="inventory" id="drag-item" draggable="true" class="sort gel">
//                     ${item ? '<img id="inventory" src="kenney_tiny-dungeon/Tiles/tile_0125.png" alt="sort gel"></img>' : ''}
//                 </div>
//                 <div class="inventory" id="drag-item" draggable="true" class="clé">
//                     ${item ? '<img id="inventory" src="kenney_tiny-town/Tiles/tile_0117.png" alt="clé"></img>' : ''}
//                 </div>
//             `;
            
//     }
//     inventoryHTML += '</div>'; // Fin de la ligne   
//     document.getElementById('inventory-board').innerHTML = inventoryHTML;

//     console.log(inventory);
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
    game.currentPlayer.items.push(new Poignard());
    updateInventoryTest(game);

});

document.getElementById('use-item-button').addEventListener('click', () => {
    compteur = 0;
    if (compteur == 0) {
        drawInventoryBoard(game.inventory);
        updateInventoryTest(game);
        compteur++;
    }

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

function drawInventoryBoard(inventory) {
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
}

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

    if (key === 'r') {
        var rules = document.getElementById('rules');
        if (rules.style.display === 'block') {
          rules.style.display = 'none';
        } else {
          rules.style.display = 'block';
        }
    }
    if (key === 'c') {
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
    }
})
  
var closeButton = document.getElementsByClassName('close')[0];
  
closeButton.addEventListener('click', function() {
    var rules = document.getElementById('rules');
    rules.style.display = 'none';
  });

  
var closeControlsButton = document.getElementsByClassName('closeControls')[0];
  
closeControlsButton.addEventListener('click', function() {
    var controls = document.getElementById('controls');
    controls.style.display = 'none';
});

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
}

function afficher() {
    var attackButton = document.getElementById("attack-button");
    var defendButton = document.getElementById("defend-button");
    var inventoryButton = document.getElementById("use-item-button");
    var healthBar = document.getElementById("health-bar");
    attackButton.style.display = "block";
    defendButton.style.display = "block";
    inventoryButton.style.display = "block";
    healthBar.style.display = "block";
    
}

function afficherRegles() {
    var rules = document.getElementById('rules');
    rules.style.display = 'block';
}
//Drag & Drop

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
  
