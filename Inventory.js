class Inventory{
    constructor(){

        this.rows = Array(10).fill().map(() => new Object())
    }
}

function updateInventoryTest(game) {
    let currentPlayer = game.currentPlayer

    // Afficher l'état de l'inventaire
    let inventoryHTML = '';
    inventoryHTML += `<div class="row">`;
                
    //currentPlayer.items.push(new Epee());
    //currentPlayer.items.push(new PotionSante());
    //currentPlayer.items.push(new Bombe());
    //currentPlayer.items.push(new Clef());
    for (let object  of currentPlayer.items) {
        console.log(object)
        if ((object instanceof Clef) || (object instanceof Epee) || (object instanceof Bombe)) {
            inventoryHTML += `
                <div class="inventory" id="drag-item" draggable="true">
                    <img id="Board" src=kenney_tiny-${object.localisation}/Tiles/tile_${object.idImage}.png></img>
                </div>
            `;
        }
        else {
            inventoryHTML += `
                <div class="inventory" id="drag-item" draggable="true">
                    
                </div>
            `;
        }
    }
    inventoryHTML += '</div>'; // Fin de la ligne   
    document.getElementById('inventory-board').innerHTML = inventoryHTML;

    console.log(game.inventory);
}