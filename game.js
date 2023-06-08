
class Tile {
    constructor(i, j) {
        this.position = [i, j]
        this.image=''
        this.character = ''
        this.item = null
        this.monster = null
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
        this.rows = Array(25).fill().map(() => Array(25).fill().map(() => new Tile()))
        // On pourra ajouter ce qui se trouve sur le plateau, par exemple:
        //this.monsters = []
        //this.items = []
        // Ces instances viendront avec les méthodes addItem, removeItem, addMonster, removeMonster, ...
    }

    generate(){

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
        if(this.position[1]<25){
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
        if(this.position[0]<25){
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
                <div class="tile">
                    ${tile.character ? '<img id="Player" src="kenney_tiny-dungeon/Tiles/tile_0085.png"></img>' : ''}
                    ${tile.item ? tile.item.name : ''}
                    ${tile.monster ? tile.monster.name : ''}
                    ${tile.image ? tile.image : ''}
                </div>
            `;
        }
        gameBoardHTML += '</div>'; // Fin de la ligne
    }
    document.getElementById('game-board').innerHTML = gameBoardHTML;

    // Afficher le tour actuel
    document.getElementById('current-turn').textContent = `Current turn: ${game.currentPlayer.name}`;

    console.log(game);
}

let game;
document.getElementById('start-game').addEventListener('click', () => {
    game = new Game([new Player("Joueur 1"), new Player("Joueur 2")], new Board(10));
    game.start();
    drawGameBoard(game.board);
    updateUI(game);
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

document.addEventListener('keydown', (event) =>{
                                
        const key = event.key;
        switch (key) {
            case "ArrowLeft":
                game.keyboardControl(key)
            case "ArrowRight":
                str = 'Right';
                game.keyboardControl(key)
            case "ArrowUp":
                str = 'Up';
                game.keyboardControl(key)
            case "ArrowDown":
                str = 'Down';
                game.keyboardControl(key)
    }
    });

document.addEventListener('keydown', function(event) {
    if (event.key === 'r') {
        var rules = document.getElementById('rules');
        rules.style.display = 'block';
    }
  });
  
var closeButton = document.getElementsByClassName('close')[0];
  
closeButton.addEventListener('click', function() {
    var rules = document.getElementById('rules');
    rules.style.display = 'none';
  });
// Fin des fonctions pour les règles
