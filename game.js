
class Tile {
    constructor(i, j) {
        this.position = [i, j]
        this.background = ''
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

class Board {
    constructor() {
        this.rows = Array(30).fill().map((_, y) => Array(80).fill().map((_,x) => new Tile(x,y)))
        // On pourra ajouter ce qui se trouve sur le plateau, par exemple:
        //this.monsters = []
        //this.items = []
        // Ces instances viendront avec les méthodes addItem, removeItem, addMonster, removeMonster, ...
        this.generate()
    }

    generate(){
        this.rows[17][2].background = 'grass'
        this.rows[5][2].background = 'flower'
        this.generateHouse(26,51)
    }

    generateHouse(abs, ord){
        this.rows[abs, ord].image ='0089'
        this.rows[abs, ord].walkable = false
        this.rows[abs,ord+1].image='0079'
        this.rows[abs, ord+1].walkable = false
        this.rows[abs,ord-1].image='0077'
        this.rows[abs, ord-1].walkable = false
        this.rows[abs,ord-2].image='0077'
        this.rows[abs, ord-2].walkable = false
        this.rows[abs,ord-3].image='0076'
        this.rows[abs, ord-3].walkable = false
        this.rows[abs-1,ord+1].image='0064'
        this.rows[abs-1, ord+1].walkable = false
        this.rows[abs-1,ord].image='0067'
        this.rows[abs-1, ord].walkable = false
        this.rows[abs-1,ord-1].image='0065'
        this.rows[abs-1, ord-1].walkable = false
        this.rows[abs-1,ord-2].image='0065'
        this.rows[abs-1, ord-2].walkable = false
        this.rows[abs-1,ord-3].image='0066'
        this.rows[abs-1, ord-3].walkable = false
        this.rows[abs-2,ord+1].image='0054'
        this.rows[abs-2, ord+1].walkable = false
        this.rows[abs-2,ord].image='0055'
        this.rows[abs-2, ord].walkable = false
        this.rows[abs-2,ord-1].image='0053'
        this.rows[abs-2, ord-1].walkable = false
        this.rows[abs-2,ord-2].image='0053'
        this.rows[abs-2, ord-2].walkable = false
        this.rows[abs-2,ord-3].image='0052'
        this.rows[abs-2, ord-3].walkable = false  
    }
}
class Player {
    constructor(name) {
        this.name = name;
        this.health = 100;
        this.items = [];
        this.position = [0, 0];
    }

    moveLeft() {
        if(this.position[1]>0){
            this.position[1] = this.position[1]-1
        }
        else{

        }
        // À implémenter : mettre à jour la position du joueur et gérer les interactions avec les objets/monstres
    }
    moveRight(){
        if(this.position[1]<30){
            this.position[1] = this.position[1]+1
        }
        else{

        }

    }
    moveUp(){
        if(this.position[0]>0){
            this.position[0] = this.position[0]-1
        }
        else{

        }
    }
    moveDown(){
        if(this.position[0]<80){
            this.position[0] = this.position[0]+1
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
        // À implémenter : utiliser un objet de l'inventaire du joueur
    }
}


class Game {
    constructor(players, board) {
        this.players = players;
        this.board = board;
        this.currentPlayer = players[0];
        this.gameState = "not_started";

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
        // À implémenter : afficher un message de fin de partie
    }

    nextTurn() {
        // À implémenter : passer au joueur suivant et gérer le tour de jeu
    }

    update(){
        this.board.rows.forEach(ligne => ligne.forEach(tuile => tuile.character = ""))
        this.board.rows[this.currentPlayer.position[0]][this.currentPlayer.position[1]].character = "hero"
        updateUI(this)

    }

    keyboardControl(touche){
        if(touche == "ArrowLeft"){
            this.currentPlayer.moveLeft()
        }
        if(touche == "ArrowRight"){
            this.currentPlayer.moveRight()
        }
        if(touche == "ArrowUp"){
            this.currentPlayer.moveUp()
        }
        if(touche == "ArrowDown"){
            this.currentPlayer.moveDown()
        }
    
        this.update()
    }
}


function updateUI(game) {
    // Afficher les statistiques des personnages
    let playerStatsHTML = `<p>stats sur les joueurs</p>`
        
    document.getElementById('player-stats').innerHTML = playerStatsHTML;

    // Afficher l'état du plateau de jeu
    let gameBoardHTML = '';
    for (let row of game.board.rows) {
        gameBoardHTML += `<div class="row">`; // Début de la ligne
        for(let tile of row){
            gameBoardHTML += `
                <div class="tile ${tile.background}" >
                    ${tile.character ? '<img id="Player" src="kenney_tiny-dungeon/Tiles/tile_0085.png"></img>' : ''}
                    ${tile.item ? tile.item.name : ''}
                    ${tile.monster ? tile.monster.name : ''}
                    ${tile.image ? `<img id=Player src=kenney_tiny-dungeon/Tiles/tile_${tile.image}.png></img>` : ''}
                </div>
            `;
        }
        gameBoardHTML += '</div>'; // Fin de la ligne
    }
    document.getElementById('game-board').innerHTML = gameBoardHTML;

    // Afficher le tour actuel
    document.getElementById('current-turn').textContent = `Current turn: ${game.currentPlayer.name}`;

}

function updateInventory(inventory) {

    // Afficher l'état de l'inventaire
    let inventoryHTML = '';
    for (let row of inventory.rows) {
        inventoryHTML += `<div class="row">`; // Début de la ligne
        for(let tile of row){

            inventoryHTML += `
                <div class="inventory">
                    ${tile.character ? tile.character.name : ''}
                    ${tile.item ? '<img id="inventory" src="kenney_tiny-dungeon/Tiles/pioche.png"></img>' : ''}
                    ${tile.monster ? tile.monster.name : ''}
                    ${tile.image ? tile.image : ''}
                </div>
            `;
        }
        inventoryHTML += '</div>'; // Fin de la ligne
    }
    document.getElementById('inventory-board').innerHTML = inventoryHTML;

    console.log(inventory);
}

let game;
document.getElementById('start-game').addEventListener('click', () => {
    game = new Game([new Player("Joueur 1"), new Player("Joueur 2")], new Board(10));
    game.start();
    drawGameBoard(game.board);
    updateUI(game);
});
let inventory;
document.getElementById('use-item-button').addEventListener('click', () => {
    inventory = new Board(10);
    drawInventoryBoard(inventory);
    updateInventory(inventory);
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

document.addEventListener('keydown', (event) =>{
                                
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
    }

    if (event.key === 'r') {
        var rules = document.getElementById('rules');
        rules.style.display = 'block';
    }
    if (event.key === 'c') {
        var controls = document.getElementById('controls');
        controls.style.display = 'block';
    }
    });

  
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

// Sélectionnez le bouton "Commencer" par son ID
const startButton = document.getElementById('start-game');
// Sélectionnez l'élément d'affichage du timer par son ID
const timerDisplay = document.getElementById('timer-display');

let timerInterval; // Variable pour stocker l'ID de l'intervalle du timer
let timerSeconds = 0; // Variable pour stocker le nombre de secondes écoulées

// Ajoutez un écouteur d'événements pour le clic sur le bouton
startButton.addEventListener('click', function() {
  // Déclenchez votre fonction de démarrage du timer ici
  startTimer();
});

// Fonction pour démarrer le timer
function startTimer() {
  // Réinitialisez le nombre de secondes écoulées
  timerSeconds = 0;

  // Affichez une indication de démarrage du timer (facultatif)
  console.log('Le timer a commencé !');

  // Mettez à jour l'affichage initial du timer
  updateTimerDisplay();

  // Démarrez l'intervalle du timer
  timerInterval = setInterval(function() {
    // Augmentez le nombre de secondes écoulées à chaque itération
    timerSeconds++;

    // Code à exécuter à chaque itération de l'intervalle (le timer continue)
    console.log('Le timer continue...');
    // Vous pouvez ajouter votre logique de jeu ici

    // Mettez à jour l'affichage du timer
    updateTimerDisplay();

    // Exemple : Vérifiez si le jeu est terminé
    if (jeuTermine()) {
      // Arrêtez l'intervalle du timer
      clearInterval(timerInterval);
      console.log('Le jeu est terminé !');
      // Ajoutez votre logique de fin de jeu ici
    }
  }, 1000); // Interval de 1 seconde (vous pouvez ajuster selon vos besoins)
}

// Fonction pour mettre à jour l'affichage du timer
function updateTimerDisplay() {
  // Calculez les minutes et les secondes à partir du nombre de secondes écoulées
  const minutes = Math.floor(timerSeconds / 60);
  const seconds = timerSeconds % 60;

  // Formatez les minutes et les secondes avec un zéro devant si nécessaire
  const formattedTime = `${minutes}:${seconds.toString().padStart(2, '0')}`;

  // Mettez à jour le contenu de l'élément d'affichage du timer
  timerDisplay.textContent = formattedTime;
}

// Fonction pour vérifier si le jeu est terminé (exemple)
function jeuTermine() {
  // Implémentez votre logique pour vérifier si le jeu est terminé
  // Renvoyez true si le jeu est terminé, sinon renvoyez false
  // Par exemple, vous pouvez vérifier si toutes les conditions de fin du jeu sont remplies
  // et renvoyer true dans ce cas
  return false;
}