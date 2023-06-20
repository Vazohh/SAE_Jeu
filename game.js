
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

class Board {   
    constructor() {
        this.width = 75
        this.height = 40
        this.rows = Array(this.height).fill().map((_, y) => Array( this.width ).fill().map((_,x) => new Tile(x,y)))
        // On pourra ajouter ce qui se trouve sur le plateau, par exemple:
        //this.monsters = []
        //this.items = []
        // Ces instances viendront avec les méthodes addItem, removeItem, addMonster, removeMonster, ...
        this.generate()
    }

    generate(){

        //boucle pour poser l'herbe et les fleurs
        this.rows.map( (row, i) =>
            row.map( (tile, j ) =>{
                if( tile.image == '' && j>0 && i>0 && i<41 && j<71){
                    if( j%5==0 && i%5==0){
                        this.generateGrassFlower(i,j) 
                    }
                }
            })
        )
        
        //boucle pour placer les maisons
        this.rows.map( (row, i) =>
            row.map( (tile, j ) =>{
                if( tile.image == '' && j>0 && i>0 && i<41 && j<71){
                    if( j==10 && i==10){
                        this.generateHouse1(i,j)
                        this.generateTarget(i+1,i-3)
                    }
                    if(j==8 && i==17){
                        this.generateHouse1(i,j)
                    }
                    if(j==4 && i==12){
                        this.generateHouse2(i,j) 
                    }
                    if(j==22 && i==16){
                        this.generateHouse2(i,j) 
                    }
                }
            })
        )  
        //Pb avec le gravel dans House et dans WaterSource
        this.generateWaterSource(12,9)
        this.generateEnclosure(10,16)
        
        //boucle pour générer foret
        this.rows.map( (row, i) =>
            row.map( (tile, j ) =>{
                if( tile.image == '' && j>0 && i>0 && i<41 && j<71){
                    if(j==3 && i==6){
                        this.generateForest(i,j)
                        this.generateMushroom(i+2,j-1)
                    }
                    if(j==10 && i==3){
                        this.generateForest(i,j) 
                    }
                    if( j==6 && i==35){
                        this.generateForest(i,j)
                        this.generateMushroom(i+2,j-1)
                        this.generateMushroom(i-2,j+1)
                    }
                    if(j==5 && i==23){
                        this.generateForest(i,j) 
                    }
                    if(j==4 && i==30){
                        this.generateForest(i,j)
                        this.generateMushroom(i-2,j+1)
                    }
                    if(j==15 && i==35){
                        this.generateForest(i,j) 
                    }
                    if(j==10 && i==30){
                        this.generateForest(i,j) 
                    }
                    if(j==20 && i==28){
                        this.generateForest(i,j)
                        this.generateMushroom(i+2,j-1)
                    }
                    if(j==25 && i==36){
                        this.generateForest(i,j) 
                    }
                    if(j==33 && i==36){
                        this.generateForest(i,j)
                        this.generateMushroom(i+2,j-1)
                        this.generateMushroom(i-4,j-1)
                        this.generateMushroom(i+1,j+1)
                    }
                    if(j==30 && i==30){
                        this.generateForest(i,j) 
                    }
                    if(j==40 && i==35){
                        this.generateForest(i,j) 
                    }
                }
            })
        )
        
        //boucle pour générer des arbres et buissons
        this.rows.map( (row, i) =>
            row.map( (tile, j ) =>{
                if( tile.image == '' && j>0 && i>0 && i<41 && j<71){
                    if( j%24==0 && i%24==0 || j==38 && i==9 || j==45 && i==25 || j==25 && i==26 || j==58 && i==24 || j==50&& i==4){
                        this.generateTree(i,j)
                        this.generateBush(i-2,j)
                        this.generateBush(i+1,j-2) 
                    }
                    if( j%35==0 && i%35==0 || j==30 && i==20 || j==55 && i==28 || j==40 && i==26 || j==4 && i==24 || j==56&& i==4){
                        this.generateTree(i,j)
                        this.generateBush(i-3,j+2)

                    }
                    if( j%20==0 && i%18==0 || j==35 && i==4 || j==50 && i==15 || j==45 && i==35 || j==32 && i==2 || j==40&& i==35){
                        this.generateTree(i,j)

                    }
                }
            })
        )

        this.generateChest(38,30)
        this.generateBridge(29,48)
        this.generateWater(0,20)
        this.generateKey(36, 8)
        this.generateMob(13, 65)   
        this.generateWaterBorder()
        this.generateRestWaterBorder(0,20)
        this.generateCastle(12,65)

    }

    generateGrassFlower(abs,ord){
        this.rows[abs][ord].background='grass'
        this.rows[abs-1][ord+1].background='grass'
        this.rows[abs+1][ord].background='grass'
        this.rows[abs][ord+2].background='grass'
        this.rows[abs-1][ord-1].background='grass'
        this.rows[abs+2][ord-1].background='grass'
        this.rows[abs+3][ord-3].background='grass'
        this.rows[abs-3][ord].background='grass'
        this.rows[abs-3][ord-2].background='grass'
        this.rows[abs+4][ord-3].background='grass'
        this.rows[abs-2][ord+4].background='grass'
        this.rows[abs+2][ord-4].background='grass'
        this.rows[abs-3][ord-3].background='grass'
        this.rows[abs-4][ord-2].background='grass'
        this.rows[abs-1][ord-4].background='grass'
        this.rows[abs-2][ord-4].background='grass'
        

        this.rows[abs+3][ord-1].background='flower'
        this.rows[abs-2][ord-1].background='flower'
        this.rows[abs][ord-2].background='flower'
        this.rows[abs-1][ord+2].background='flower'
        
        this.rows[abs-3][ord-3].background='flower'
        this.rows[abs-4][ord+2].background='flower'
        this.rows[abs-3][ord+2].background='flower'
        this.rows[abs-3][ord+1].background='flower'
        this.rows[abs+2][ord-2].background='flower'
        this.rows[abs+2][ord-2].background='flower'
    }

    generateHouse1(abs,ord) {
        this.rows[abs][ord].image ='0089';
        this.rows[abs][ord].imgsrc=2;
        this.rows[abs][ord].walkable = false;
        this.rows[abs][ord+1].image='0079';
        this.rows[abs][ord+1].imgsrc=2;
        this.rows[abs][ord+1].walkable = false;
        this.rows[abs][ord-1].image='0077';
        this.rows[abs][ord-1].imgsrc=2;
        this.rows[abs][ord-1].walkable = false;
        this.rows[abs][ord-2].image='0088';
        this.rows[abs][ord-2].imgsrc=2;
        this.rows[abs][ord-2].walkable = false;
        this.rows[abs][ord-3].image='0076';
        this.rows[abs][ord-3].imgsrc=2;
        this.rows[abs][ord-3].walkable = false;
        this.rows[abs-1][ord+1].image='0066';
        this.rows[abs-1][ord+1].imgsrc=2;
        this.rows[abs-1][ord+1].walkable = false;
        this.rows[abs-1][ord].image='0067';
        this.rows[abs-1][ord].imgsrc=2;
        this.rows[abs-1][ord].walkable = false;
        this.rows[abs-1][ord-1].image='0065';
        this.rows[abs-1][ord-1].imgsrc=2;
        this.rows[abs-1][ord-1].walkable = false;
        this.rows[abs-1][ord-2].image='0065';
        this.rows[abs-1][ord-2].imgsrc=2;
        this.rows[abs-1][ord-2].walkable = false;
        this.rows[abs-1][ord-3].image='0064';
        this.rows[abs-1][ord-3].imgsrc=2;
        this.rows[abs-1][ord-3].walkable = false;
        this.rows[abs-2][ord+1].image='0054';
        this.rows[abs-2][ord+1].imgsrc=2;
        this.rows[abs-2][ord+1].walkable = false;
        this.rows[abs-2][ord].image='0055';
        this.rows[abs-2][ord].imgsrc=2;
        this.rows[abs-2][ord].walkable = false;
        this.rows[abs-2][ord-1].image='0053';
        this.rows[abs-2][ord-1].imgsrc=2;
        this.rows[abs-2][ord-1].walkable = false;
        this.rows[abs-2][ord-2].image='0053';
        this.rows[abs-2][ord-2].imgsrc=2;
        this.rows[abs-2][ord-2].walkable = false;
        this.rows[abs-2][ord-3].image='0052';
        this.rows[abs-2][ord-3].imgsrc=2;
        this.rows[abs-2][ord-3].walkable = false;

        this.rows[abs+1][ord-1].image='0100';
        this.rows[abs+1][ord-1].imgsrc=1;
        this.rows[abs+1][ord-1].walkable = false;

        this.rows[abs+1][ord].background = 'gravel'
        this.rows[abs+2][ord].background = 'gravel'
        this.rows[abs+1][ord+1].background = 'gravel'
        this.rows[abs+1][ord-2].background = 'gravel'
        this.rows[abs+1][ord-1].background = 'gravel'
        this.rows[abs+1][ord-3].background = 'gravel'
    }

    generateHouse2(abs,ord) {
        this.rows[abs][ord].image ='0089';
        this.rows[abs][ord].imgsrc=2;
        this.rows[abs][ord].walkable = false;
        this.rows[abs][ord+1].image='0079';
        this.rows[abs][ord+1].imgsrc=2;
        this.rows[abs][ord+1].walkable = false;
        this.rows[abs][ord-1].image='0076';
        this.rows[abs][ord-1].imgsrc=2;
        this.rows[abs][ord-1].walkable = false;
        this.rows[abs-1][ord+1].image='0066';
        this.rows[abs-1][ord+1].imgsrc=2;
        this.rows[abs-1][ord+1].walkable = false;
        this.rows[abs-1][ord].image='0067';
        this.rows[abs-1][ord].imgsrc=2;
        this.rows[abs-1][ord].walkable = false;
        this.rows[abs-1][ord-1].image='0064';
        this.rows[abs-1][ord-1].imgsrc=2;
        this.rows[abs-1][ord-1].walkable = false;
        this.rows[abs-2][ord+1].image='0054';
        this.rows[abs-2][ord+1].imgsrc=2;
        this.rows[abs-2][ord+1].walkable = false;
        this.rows[abs-2][ord].image='0055';
        this.rows[abs-2][ord].imgsrc=2;
        this.rows[abs-2][ord].walkable = false;
        this.rows[abs-2][ord-1].image='0052';
        this.rows[abs-2][ord-1].imgsrc=2;
        this.rows[abs-2][ord-1].walkable = false;

        this.rows[abs+1][ord-1].image='0088';
        this.rows[abs+1][ord-1].imgsrc=1;
        this.rows[abs+1][ord-1].walkable = false;

        this.rows[abs+1][ord].background = 'gravel'
        this.rows[abs+2][ord].background = 'gravel'
        this.rows[abs+1][ord+1].background = 'gravel'
        this.rows[abs+1][ord-1].background = 'gravel'
    }

    generateTree(abs,ord){
        this.rows[abs][ord].image ='0004';
        this.rows[abs][ord].imgsrc=2;
        this.rows[abs][ord].walkable = true;
        this.rows[abs+1][ord].image='0016';
        this.rows[abs+1][ord].imgsrc=2;
        this.rows[abs+1][ord].walkable = false;
    }

    generateBush(abs,ord){
        this.rows[abs][ord].image ='0005';
        this.rows[abs][ord].imgsrc=2;
        this.rows[abs][ord].walkable = true;
    }

    generateMushroom(abs,ord){
        this.rows[abs][ord].background='Mushroom'
    }

    generateForest(abs,ord){
        this.rows[abs][ord].image ='0028';
        this.rows[abs][ord].imgsrc=2;
        this.rows[abs][ord].walkable = false;
        this.rows[abs+1][ord].image='0028';
        this.rows[abs+1][ord].imgsrc=2;
        this.rows[abs+1][ord].walkable = false;
        this.rows[abs][ord+1].image='0028';
        this.rows[abs][ord+1].imgsrc=2;
        this.rows[abs][ord+1].walkable = false;
        this.rows[abs-1][ord-1].image='0028';
        this.rows[abs-1][ord-1].imgsrc=2;
        this.rows[abs-1][ord-1].walkable = false;
        this.rows[abs-2][ord+2].image='0028';
        this.rows[abs-2][ord+2].imgsrc=2;
        this.rows[abs-2][ord+2].walkable = false;
        this.rows[abs-1][ord+2].image='0028';
        this.rows[abs-1][ord+2].imgsrc=2;
        this.rows[abs-1][ord+2].walkable = false;
        this.rows[abs+2][ord-1].image='0028';
        this.rows[abs+2][ord-1].imgsrc=2;
        this.rows[abs+2][ord-1].walkable = false;

        this.rows[abs+2][ord+1].image ='0004';
        this.rows[abs+2][ord+1].imgsrc=2;
        this.rows[abs+2][ord+1].walkable = true;
        this.rows[abs+3][ord+1].image='0016';
        this.rows[abs+3][ord+1].imgsrc=2;
        this.rows[abs+3][ord+1].walkable = false;

        this.rows[abs][ord-2].image ='0004';
        this.rows[abs][ord-2].imgsrc=2;
        this.rows[abs][ord-2].walkable = true;
        this.rows[abs+1][ord-2].image='0016';
        this.rows[abs+1][ord-2].imgsrc=2;
        this.rows[abs+1][ord-2].walkable = false;

        this.rows[abs-2][ord].image ='0004';
        this.rows[abs-2][ord].imgsrc=2;
        this.rows[abs-2][ord].walkable = true;
        this.rows[abs-1][ord].image='0016';
        this.rows[abs-1][ord].imgsrc=2;
        this.rows[abs-1][ord].walkable = false;

        this.rows[abs+1][ord+3].image ='0004';
        this.rows[abs+1][ord+3].imgsrc=2;
        this.rows[abs+1][ord+3].walkable = true;
        this.rows[abs+2][ord+3].image='0016';
        this.rows[abs+2][ord+3].imgsrc=2;
        this.rows[abs+2][ord+3].walkable = false;


    }

    generateWaterSource(abs,ord){
        this.rows[abs][ord].image ='0092';
        this.rows[abs][ord].imgsrc=2;
        this.rows[abs][ord].walkable = false;
        this.rows[abs+1][ord].image='0104';
        this.rows[abs+1][ord].imgsrc=2;
        this.rows[abs+1][ord].walkable = false;

        this.rows[abs+1][ord].background = 'gravel'
        this.rows[abs-1][ord].background = 'gravel'
        this.rows[abs+1][ord+1].background = 'gravel'
        this.rows[abs+1][ord-1].background = 'gravel'
        this.rows[abs-1][ord+1].background = 'gravel'
        this.rows[abs-1][ord-1].background = 'gravel'
    }

    generateEnclosure(abs,ord){
        this.rows[abs][ord].image ='0045';
        this.rows[abs][ord].imgsrc=2;
        this.rows[abs][ord].walkable = false;
        this.rows[abs][ord-1].image ='0045';
        this.rows[abs][ord-1].imgsrc=2;
        this.rows[abs][ord-1].walkable = false;
        this.rows[abs][ord+1].image ='0045';
        this.rows[abs][ord+1].imgsrc=2;
        this.rows[abs][ord+1].walkable = false;
        this.rows[abs][ord+2].image ='0045';
        this.rows[abs][ord+2].imgsrc=2;
        this.rows[abs][ord+2].walkable = false;
        this.rows[abs][ord+3].image ='0046';
        this.rows[abs][ord+3].imgsrc=2;
        this.rows[abs][ord+3].walkable = false;
        this.rows[abs][ord-2].image ='0044';
        this.rows[abs][ord-2].imgsrc=2;
        this.rows[abs][ord-2].walkable = false;
        this.rows[abs+1][ord+3].image ='0058';
        this.rows[abs+1][ord+3].imgsrc=2;
        this.rows[abs+1][ord+3].walkable = false;
        this.rows[abs+2][ord+3].image ='0058';
        this.rows[abs+2][ord+3].imgsrc=2;
        this.rows[abs+2][ord+3].walkable = false;
        this.rows[abs+3][ord+3].image ='0058';
        this.rows[abs+3][ord+3].imgsrc=2;
        this.rows[abs+3][ord+3].walkable = false;
        this.rows[abs+4][ord+3].image ='0070';
        this.rows[abs+4][ord+3].imgsrc=2;
        this.rows[abs+4][ord+3].walkable = false;
        this.rows[abs+4][ord+1].image ='0044';
        this.rows[abs+4][ord+1].imgsrc=2;
        this.rows[abs+4][ord+1].walkable = false;
        this.rows[abs+5][ord+1].image ='0058';
        this.rows[abs+5][ord+1].imgsrc=2;
        this.rows[abs+5][ord+1].walkable = false;
        this.rows[abs+6][ord+1].image ='0070';
        this.rows[abs+6][ord+1].imgsrc=2;
        this.rows[abs+6][ord+1].walkable = false
        this.rows[abs+6][ord].image ='0045';
        this.rows[abs+6][ord].imgsrc=2;
        this.rows[abs+6][ord].walkable = false;
        this.rows[abs+6][ord-1].image ='0045';
        this.rows[abs+6][ord-1].imgsrc=2;
        this.rows[abs+6][ord-1].walkable = false;
        this.rows[abs+6][ord-2].image ='0045';
        this.rows[abs+6][ord-2].imgsrc=2;
        this.rows[abs+6][ord-2].walkable = false;
        this.rows[abs+6][ord-3].image ='0068';
        this.rows[abs+6][ord-3].imgsrc=2;
        this.rows[abs+6][ord-3].walkable = false;
        this.rows[abs+5][ord-3].image ='0056';
        this.rows[abs+5][ord-3].imgsrc=2;
        this.rows[abs+5][ord-3].walkable = false;
        this.rows[abs+4][ord-3].image ='0056';
        this.rows[abs+4][ord-3].imgsrc=2;
        this.rows[abs+4][ord-3].walkable = false;
        this.rows[abs+3][ord-3].image ='0056';
        this.rows[abs+3][ord-3].imgsrc=2;
        this.rows[abs+3][ord-3].walkable = false;
        this.rows[abs+2][ord-3].image ='0044';
        this.rows[abs+2][ord-3].imgsrc=2;
        this.rows[abs+2][ord-3].walkable = false;
        this.rows[abs+2][ord-2].image ='0070';
        this.rows[abs+2][ord-2].imgsrc=2;
        this.rows[abs+2][ord-2].walkable = false;
        this.rows[abs+1][ord-2].image ='0056';
        this.rows[abs+1][ord-2].imgsrc=2;
        this.rows[abs+1][ord-2].walkable = false;

        this.rows[abs+4][ord+2].background = 'entryEnclosure'

        this.rows[abs+1][ord].background ='Plant';
        this.rows[abs+2][ord].background ='Plant';
        this.rows[abs+1][ord+1].background ='Plant';
        this.rows[abs+2][ord+1].background ='Plant';
        this.rows[abs+3][ord-2].background ='Plant';
        this.rows[abs+3][ord-1].background ='Plant';
        this.rows[abs+4][ord-2].background ='Plant';
        this.rows[abs+5][ord].background ='Plant';

        this.rows[abs+6][ord+2].image ='0057';
        this.rows[abs+6][ord+2].imgsrc=2;
        this.rows[abs+6][ord+2].walkable = false;

        this.rows[abs+4][ord-1].image ='0086';
        this.rows[abs+4][ord-1].imgsrc=1;
        this.rows[abs+4][ord-1].walkable = false;


    }

    generateTarget(abs,ord){
        this.rows[abs][ord].image ='0095';
        this.rows[abs][ord].imgsrc=2;
        this.rows[abs][ord].walkable = false;
    }

    generateChest(abs,ord){
        this.rows[abs][ord].image ='0089';
        this.rows[abs][ord].imgsrc=1;
        this.rows[abs][ord].walkable = false;
    }

    generateWater(abs,ord){
        this.rows[abs][ord].image ='0042';
        this.rows[abs][ord].imgsrc=3;
        this.rows[abs][ord].walkable = false;
        this.rows[abs][ord+1].image ='0042';
        this.rows[abs][ord+1].imgsrc=3;
        this.rows[abs][ord+1].walkable = false;
        this.rows[abs][ord+2].image ='0042';
        this.rows[abs][ord+2].imgsrc=3;
        this.rows[abs][ord+2].walkable = false;

        this.rows[abs+1][ord].image ='0042';
        this.rows[abs+1][ord].imgsrc=3;
        this.rows[abs+1][ord].walkable = false;
        this.rows[abs+1][ord+1].image ='0042';
        this.rows[abs+1][ord+1].imgsrc=3;
        this.rows[abs+1][ord+1].walkable = false;
        this.rows[abs+1][ord+2].image ='0042';
        this.rows[abs+1][ord+2].imgsrc=3;
        this.rows[abs+1][ord+2].walkable = false;

        this.rows[abs+2][ord].image ='0042';
        this.rows[abs+2][ord].imgsrc=3;
        this.rows[abs+2][ord].walkable = false;
        this.rows[abs+2][ord+1].image ='0042';
        this.rows[abs+2][ord+1].imgsrc=3;
        this.rows[abs+2][ord+1].walkable = false;
        this.rows[abs+2][ord+2].image ='0042';
        this.rows[abs+2][ord+2].imgsrc=3;
        this.rows[abs+2][ord+2].walkable = false;

        this.rows[abs+3][ord].image ='0042';
        this.rows[abs+3][ord].imgsrc=3;
        this.rows[abs+3][ord].walkable = false;
        this.rows[abs+3][ord+1].image ='0042';
        this.rows[abs+3][ord+1].imgsrc=3;
        this.rows[abs+3][ord+1].walkable = false;
        this.rows[abs+3][ord+2].image ='0042';
        this.rows[abs+3][ord+2].imgsrc=3;
        this.rows[abs+3][ord+2].walkable = false;

        this.rows[abs+4][ord].image ='0042';
        this.rows[abs+4][ord].imgsrc=3;
        this.rows[abs+4][ord].walkable = false;
        this.rows[abs+4][ord+1].image ='0042';
        this.rows[abs+4][ord+1].imgsrc=3;
        this.rows[abs+4][ord+1].walkable = false;
        this.rows[abs+4][ord+2].image ='0042';
        this.rows[abs+4][ord+2].imgsrc=3;
        this.rows[abs+4][ord+2].walkable = false;
        this.rows[abs+4][ord+3].image ='0042';
        this.rows[abs+4][ord+3].imgsrc=3;
        this.rows[abs+4][ord+3].walkable = false;

        this.rows[abs+5][ord+1].image ='0042';
        this.rows[abs+5][ord+1].imgsrc=3;
        this.rows[abs+5][ord+1].walkable = false;
        this.rows[abs+5][ord+2].image ='0042';
        this.rows[abs+5][ord+2].imgsrc=3;
        this.rows[abs+5][ord+2].walkable = false;
        this.rows[abs+5][ord+3].image ='0042';
        this.rows[abs+5][ord+3].imgsrc=3;
        this.rows[abs+5][ord+3].walkable = false;

        this.rows[abs+6][ord+1].image ='0042';
        this.rows[abs+6][ord+1].imgsrc=3;
        this.rows[abs+6][ord+1].walkable = false;
        this.rows[abs+6][ord+2].image ='0042';
        this.rows[abs+6][ord+2].imgsrc=3;
        this.rows[abs+6][ord+2].walkable = false;
        this.rows[abs+6][ord+3].image ='0042';
        this.rows[abs+6][ord+3].imgsrc=3;
        this.rows[abs+6][ord+3].walkable = false;
        this.rows[abs+6][ord+4].image ='0042';
        this.rows[abs+6][ord+4].imgsrc=3;
        this.rows[abs+6][ord+4].walkable = false;

        this.rows[abs+7][ord+2].image ='0042';
        this.rows[abs+7][ord+2].imgsrc=3;
        this.rows[abs+7][ord+2].walkable = false;
        this.rows[abs+7][ord+3].image ='0042';
        this.rows[abs+7][ord+3].imgsrc=3;
        this.rows[abs+7][ord+3].walkable = false;
        this.rows[abs+7][ord+4].image ='0042';
        this.rows[abs+7][ord+4].imgsrc=3;
        this.rows[abs+7][ord+4].walkable = false;

        this.rows[abs+8][ord+2].image ='0042';
        this.rows[abs+8][ord+2].imgsrc=3;
        this.rows[abs+8][ord+2].walkable = false;
        this.rows[abs+8][ord+3].image ='0042';
        this.rows[abs+8][ord+3].imgsrc=3;
        this.rows[abs+8][ord+3].walkable = false;
        this.rows[abs+8][ord+4].image ='0042';
        this.rows[abs+8][ord+4].imgsrc=3;
        this.rows[abs+8][ord+4].walkable = false;
        this.rows[abs+8][ord+13].image ='0042';
        this.rows[abs+8][ord+13].imgsrc=3;
        this.rows[abs+8][ord+13].walkable = false;
        this.rows[abs+8][ord+14].image ='0042';
        this.rows[abs+8][ord+14].imgsrc=3;
        this.rows[abs+8][ord+14].walkable = false;

        this.rows[abs+9][ord+2].image ='0042';
        this.rows[abs+9][ord+2].imgsrc=3;
        this.rows[abs+9][ord+2].walkable = false;
        this.rows[abs+9][ord+3].image ='0042';
        this.rows[abs+9][ord+3].imgsrc=3;
        this.rows[abs+9][ord+3].walkable = false;
        this.rows[abs+9][ord+4].image ='0042';
        this.rows[abs+9][ord+4].imgsrc=3;
        this.rows[abs+9][ord+4].walkable = false;
        this.rows[abs+9][ord+12].image ='0042';
        this.rows[abs+9][ord+12].imgsrc=3;
        this.rows[abs+9][ord+12].walkable = false;
        this.rows[abs+9][ord+13].image ='0042';
        this.rows[abs+9][ord+13].imgsrc=3;
        this.rows[abs+9][ord+13].walkable = false;
        this.rows[abs+9][ord+14].image ='0042';
        this.rows[abs+9][ord+14].imgsrc=3;
        this.rows[abs+9][ord+14].walkable = false;
        this.rows[abs+9][ord+15].image ='0042';
        this.rows[abs+9][ord+15].imgsrc=3;
        this.rows[abs+9][ord+15].walkable = false;
        this.rows[abs+9][ord+16].image ='0042';
        this.rows[abs+9][ord+16].imgsrc=3;
        this.rows[abs+9][ord+16].walkable = false;
        this.rows[abs+9][ord+17].image ='0042';
        this.rows[abs+9][ord+17].imgsrc=3;
        this.rows[abs+9][ord+17].walkable = false;
        this.rows[abs+9][ord+18].image ='0042';
        this.rows[abs+9][ord+18].imgsrc=3;
        this.rows[abs+9][ord+18].walkable = false;

        this.rows[abs+10][ord+2].image ='0042';
        this.rows[abs+10][ord+2].imgsrc=3;
        this.rows[abs+10][ord+2].walkable = false;
        this.rows[abs+10][ord+3].image ='0042';
        this.rows[abs+10][ord+3].imgsrc=3;
        this.rows[abs+10][ord+3].walkable = false;
        this.rows[abs+10][ord+4].image ='0042';
        this.rows[abs+10][ord+4].imgsrc=3;
        this.rows[abs+10][ord+4].walkable = false;
        this.rows[abs+10][ord+5].image ='0042';
        this.rows[abs+10][ord+5].imgsrc=3;
        this.rows[abs+10][ord+5].walkable = false;
        this.rows[abs+10][ord+10].image ='0042';
        this.rows[abs+10][ord+10].imgsrc=3;
        this.rows[abs+10][ord+10].walkable = false;
        this.rows[abs+10][ord+11].image ='0042';
        this.rows[abs+10][ord+11].imgsrc=3;
        this.rows[abs+10][ord+11].walkable = false;
        this.rows[abs+10][ord+12].image ='0042';
        this.rows[abs+10][ord+12].imgsrc=3;
        this.rows[abs+10][ord+12].walkable = false;
        this.rows[abs+10][ord+13].image ='0042';
        this.rows[abs+10][ord+13].imgsrc=3;
        this.rows[abs+10][ord+13].walkable = false;
        this.rows[abs+10][ord+14].image ='0037';
        this.rows[abs+10][ord+14].imgsrc=3;
        this.rows[abs+10][ord+14].walkable = false;
        this.rows[abs+10][ord+16].image ='0039';
        this.rows[abs+10][ord+16].imgsrc=3;
        this.rows[abs+10][ord+16].walkable = false;
        this.rows[abs+10][ord+17].image ='0042';
        this.rows[abs+10][ord+17].imgsrc=3;
        this.rows[abs+10][ord+17].walkable = false;
        this.rows[abs+10][ord+18].image ='0042';
        this.rows[abs+10][ord+18].imgsrc=3;
        this.rows[abs+10][ord+18].walkable = false;

        this.rows[abs+11][ord+3].image ='0042';
        this.rows[abs+11][ord+3].imgsrc=3;
        this.rows[abs+11][ord+3].walkable = false;
        this.rows[abs+11][ord+4].image ='0042';
        this.rows[abs+11][ord+4].imgsrc=3;
        this.rows[abs+11][ord+4].walkable = false;
        this.rows[abs+11][ord+5].image ='0042';
        this.rows[abs+11][ord+5].imgsrc=3;
        this.rows[abs+11][ord+5].walkable = false;
        this.rows[abs+11][ord+6].image ='0042';
        this.rows[abs+11][ord+6].imgsrc=3;
        this.rows[abs+11][ord+6].walkable = false;
        this.rows[abs+11][ord+9].image ='0042';
        this.rows[abs+11][ord+9].imgsrc=3;
        this.rows[abs+11][ord+9].walkable = false;
        this.rows[abs+11][ord+10].image ='0042';
        this.rows[abs+11][ord+10].imgsrc=3;
        this.rows[abs+11][ord+10].walkable = false;
        this.rows[abs+11][ord+11].image ='0042';
        this.rows[abs+11][ord+11].imgsrc=3;
        this.rows[abs+11][ord+11].walkable = false;
        this.rows[abs+11][ord+12].image ='0042';
        this.rows[abs+11][ord+12].imgsrc=3;
        this.rows[abs+11][ord+12].walkable = false;
        this.rows[abs+11][ord+13].image ='0042';
        this.rows[abs+11][ord+13].imgsrc=3;
        this.rows[abs+11][ord+13].walkable = false;
        this.rows[abs+11][ord+17].image ='0042';
        this.rows[abs+11][ord+17].imgsrc=3;
        this.rows[abs+11][ord+17].walkable = false;
        this.rows[abs+11][ord+18].image ='0042';
        this.rows[abs+11][ord+18].imgsrc=3;
        this.rows[abs+11][ord+18].walkable = false;

        this.rows[abs+12][ord+4].image ='0042';
        this.rows[abs+12][ord+4].imgsrc=3;
        this.rows[abs+12][ord+4].walkable = false;
        this.rows[abs+12][ord+5].image ='0042';
        this.rows[abs+12][ord+5].imgsrc=3;
        this.rows[abs+12][ord+5].walkable = false;
        this.rows[abs+12][ord+6].image ='0042';
        this.rows[abs+12][ord+6].imgsrc=3;
        this.rows[abs+12][ord+6].walkable = false;
        this.rows[abs+12][ord+7].image ='0042';
        this.rows[abs+12][ord+7].imgsrc=3;
        this.rows[abs+12][ord+7].walkable = false;
        this.rows[abs+12][ord+8].image ='0042';
        this.rows[abs+12][ord+8].imgsrc=3;
        this.rows[abs+12][ord+8].walkable = false;
        this.rows[abs+12][ord+9].image ='0042';
        this.rows[abs+12][ord+9].imgsrc=3;
        this.rows[abs+12][ord+9].walkable = false;
        this.rows[abs+12][ord+10].image ='0042';
        this.rows[abs+12][ord+10].imgsrc=3;
        this.rows[abs+12][ord+10].walkable = false;
        this.rows[abs+12][ord+11].image ='0042';
        this.rows[abs+12][ord+11].imgsrc=3;
        this.rows[abs+12][ord+11].walkable = false;
        this.rows[abs+12][ord+12].image ='0042';
        this.rows[abs+12][ord+12].imgsrc=3;
        this.rows[abs+12][ord+12].walkable = false;
        this.rows[abs+12][ord+13].image ='0042';
        this.rows[abs+12][ord+13].imgsrc=3;
        this.rows[abs+12][ord+13].walkable = false;
        this.rows[abs+12][ord+14].image ='0061';
        this.rows[abs+12][ord+14].imgsrc=3;
        this.rows[abs+12][ord+14].walkable = false;
        this.rows[abs+12][ord+15].image ='0062';
        this.rows[abs+12][ord+15].imgsrc=3;
        this.rows[abs+12][ord+15].walkable = false;
        this.rows[abs+12][ord+16].image ='0063';
        this.rows[abs+12][ord+16].imgsrc=3;
        this.rows[abs+12][ord+16].walkable = false;
        this.rows[abs+12][ord+17].image ='0042';
        this.rows[abs+12][ord+17].imgsrc=3;
        this.rows[abs+12][ord+17].walkable = false;
        this.rows[abs+12][ord+18].image ='0042';
        this.rows[abs+12][ord+18].imgsrc=3;
        this.rows[abs+12][ord+18].walkable = false;
        

        this.rows[abs+13][ord+5].image ='0042';
        this.rows[abs+13][ord+5].imgsrc=3;
        this.rows[abs+13][ord+5].walkable = false;
        this.rows[abs+13][ord+6].image ='0042';
        this.rows[abs+13][ord+6].imgsrc=3;
        this.rows[abs+13][ord+6].walkable = false;
        this.rows[abs+13][ord+7].image ='0042';
        this.rows[abs+13][ord+7].imgsrc=3;
        this.rows[abs+13][ord+7].walkable = false;
        this.rows[abs+13][ord+8].image ='0042';
        this.rows[abs+13][ord+8].imgsrc=3;
        this.rows[abs+13][ord+8].walkable = false;
        this.rows[abs+13][ord+9].image ='0042';
        this.rows[abs+13][ord+9].imgsrc=3;
        this.rows[abs+13][ord+9].walkable = false;
        this.rows[abs+13][ord+10].image ='0042';
        this.rows[abs+13][ord+10].imgsrc=3;
        this.rows[abs+13][ord+10].walkable = false;
        this.rows[abs+13][ord+11].image ='0042';
        this.rows[abs+13][ord+11].imgsrc=3;
        this.rows[abs+13][ord+11].walkable = false;
        this.rows[abs+13][ord+12].image ='0042';
        this.rows[abs+13][ord+12].imgsrc=3;
        this.rows[abs+13][ord+12].walkable = false;
        this.rows[abs+13][ord+13].image ='0042';
        this.rows[abs+13][ord+13].imgsrc=3;
        this.rows[abs+13][ord+13].walkable = false;
        this.rows[abs+13][ord+14].image ='0042';
        this.rows[abs+13][ord+14].imgsrc=3;
        this.rows[abs+13][ord+14].walkable = false;
        this.rows[abs+13][ord+15].image ='0042';
        this.rows[abs+13][ord+15].imgsrc=3;
        this.rows[abs+13][ord+15].walkable = false;
        this.rows[abs+13][ord+16].image ='0042';
        this.rows[abs+13][ord+16].imgsrc=3;
        this.rows[abs+13][ord+16].walkable = false;
        this.rows[abs+13][ord+17].image ='0042';
        this.rows[abs+13][ord+17].imgsrc=3;
        this.rows[abs+13][ord+17].walkable = false;
        this.rows[abs+13][ord+18].image ='0042';
        this.rows[abs+13][ord+18].imgsrc=3;
        this.rows[abs+13][ord+18].walkable = false;
        this.rows[abs+13][ord+19].image ='0042';
        this.rows[abs+13][ord+19].imgsrc=3;
        this.rows[abs+13][ord+19].walkable = false;
        this.rows[abs+13][ord+20].image ='0042';
        this.rows[abs+13][ord+20].imgsrc=3;
        this.rows[abs+13][ord+20].walkable = false;
        
        this.rows[abs+14][ord+5].image ='0042';
        this.rows[abs+14][ord+5].imgsrc=3;
        this.rows[abs+14][ord+5].walkable = false;
        this.rows[abs+14][ord+6].image ='0042';
        this.rows[abs+14][ord+6].imgsrc=3;
        this.rows[abs+14][ord+6].walkable = false;
        this.rows[abs+14][ord+7].image ='0042';
        this.rows[abs+14][ord+7].imgsrc=3;
        this.rows[abs+14][ord+7].walkable = false;
        this.rows[abs+14][ord+8].image ='0042';
        this.rows[abs+14][ord+8].imgsrc=3;
        this.rows[abs+14][ord+8].walkable = false;
        this.rows[abs+14][ord+9].image ='0042';
        this.rows[abs+14][ord+9].imgsrc=3;
        this.rows[abs+14][ord+9].walkable = false;
        this.rows[abs+14][ord+10].image ='0042';
        this.rows[abs+14][ord+10].imgsrc=3;
        this.rows[abs+14][ord+10].walkable = false;
        this.rows[abs+14][ord+11].image ='0042';
        this.rows[abs+14][ord+11].imgsrc=3;
        this.rows[abs+14][ord+11].walkable = false;
        this.rows[abs+14][ord+12].image ='0042';
        this.rows[abs+14][ord+12].imgsrc=3;
        this.rows[abs+14][ord+12].walkable = false;
        this.rows[abs+14][ord+13].image ='0042';
        this.rows[abs+14][ord+13].imgsrc=3;
        this.rows[abs+14][ord+13].walkable = false;
        this.rows[abs+14][ord+14].image ='0042';
        this.rows[abs+14][ord+14].imgsrc=3;
        this.rows[abs+14][ord+14].walkable = false;
        this.rows[abs+14][ord+15].image ='0042';
        this.rows[abs+14][ord+15].imgsrc=3;
        this.rows[abs+14][ord+15].walkable = false;
        this.rows[abs+14][ord+16].image ='0042';
        this.rows[abs+14][ord+16].imgsrc=3;
        this.rows[abs+14][ord+16].walkable = false;
        this.rows[abs+14][ord+17].image ='0042';
        this.rows[abs+14][ord+17].imgsrc=3;
        this.rows[abs+14][ord+17].walkable = false;
        this.rows[abs+14][ord+18].image ='0042';
        this.rows[abs+14][ord+18].imgsrc=3;
        this.rows[abs+14][ord+18].walkable = false;
        this.rows[abs+14][ord+19].image ='0042';
        this.rows[abs+14][ord+19].imgsrc=3;
        this.rows[abs+14][ord+19].walkable = false;
        this.rows[abs+14][ord+20].image ='0042';
        this.rows[abs+14][ord+20].imgsrc=3;
        this.rows[abs+14][ord+20].walkable = false;
        this.rows[abs+14][ord+21].image ='0042';
        this.rows[abs+14][ord+21].imgsrc=3;
        this.rows[abs+14][ord+21].walkable = false;


        this.rows[abs+15][ord+5].image ='0042';
        this.rows[abs+15][ord+5].imgsrc=3;
        this.rows[abs+15][ord+5].walkable = false;
        this.rows[abs+15][ord+6].image ='0042';
        this.rows[abs+15][ord+6].imgsrc=3;
        this.rows[abs+15][ord+6].walkable = false;
        this.rows[abs+15][ord+7].image ='0042';
        this.rows[abs+15][ord+7].imgsrc=3;
        this.rows[abs+15][ord+7].walkable = false;
        this.rows[abs+15][ord+8].image ='0042';
        this.rows[abs+15][ord+8].imgsrc=3;
        this.rows[abs+15][ord+8].walkable = false;
        this.rows[abs+15][ord+9].image ='0042';
        this.rows[abs+15][ord+9].imgsrc=3;
        this.rows[abs+15][ord+9].walkable = false;
        this.rows[abs+15][ord+10].image ='0042';
        this.rows[abs+15][ord+10].imgsrc=3;
        this.rows[abs+15][ord+10].walkable = false;
        this.rows[abs+15][ord+11].image ='0042';
        this.rows[abs+15][ord+11].imgsrc=3;
        this.rows[abs+15][ord+11].walkable = false;
        this.rows[abs+15][ord+12].image ='0042';
        this.rows[abs+15][ord+12].imgsrc=3;
        this.rows[abs+15][ord+12].walkable = false;
        this.rows[abs+15][ord+13].image ='0042';
        this.rows[abs+15][ord+13].imgsrc=3;
        this.rows[abs+15][ord+13].walkable = false;
        this.rows[abs+15][ord+14].image ='0042';
        this.rows[abs+15][ord+14].imgsrc=3;
        this.rows[abs+15][ord+14].walkable = false;
        this.rows[abs+15][ord+15].image ='0042';
        this.rows[abs+15][ord+15].imgsrc=3;
        this.rows[abs+15][ord+15].walkable = false;
        this.rows[abs+15][ord+20].image ='0042';
        this.rows[abs+15][ord+20].imgsrc=3;
        this.rows[abs+15][ord+20].walkable = false;
        this.rows[abs+15][ord+21].image ='0042';
        this.rows[abs+15][ord+21].imgsrc=3;
        this.rows[abs+15][ord+21].walkable = false;
        this.rows[abs+15][ord+22].image ='0042';
        this.rows[abs+15][ord+22].imgsrc=3;
        this.rows[abs+15][ord+22].walkable = false;
        this.rows[abs+15][ord+23].image ='0042';
        this.rows[abs+15][ord+23].imgsrc=3;
        this.rows[abs+15][ord+23].walkable = false;

        this.rows[abs+16][ord+6].image ='0042';
        this.rows[abs+16][ord+6].imgsrc=3;
        this.rows[abs+16][ord+6].walkable = false;
        this.rows[abs+16][ord+7].image ='0042';
        this.rows[abs+16][ord+7].imgsrc=3;
        this.rows[abs+16][ord+7].walkable = false;
        this.rows[abs+16][ord+8].image ='0042';
        this.rows[abs+16][ord+8].imgsrc=3;
        this.rows[abs+16][ord+8].walkable = false;
        this.rows[abs+16][ord+9].image ='0042';
        this.rows[abs+16][ord+9].imgsrc=3;
        this.rows[abs+16][ord+9].walkable = false;
        this.rows[abs+16][ord+10].image ='0042';
        this.rows[abs+16][ord+10].imgsrc=3;
        this.rows[abs+16][ord+10].walkable = false;
        this.rows[abs+16][ord+11].image ='0042';
        this.rows[abs+16][ord+11].imgsrc=3;
        this.rows[abs+16][ord+11].walkable = false;
        this.rows[abs+16][ord+12].image ='0042';
        this.rows[abs+16][ord+12].imgsrc=3;
        this.rows[abs+16][ord+12].walkable = false;
        this.rows[abs+16][ord+13].image ='0042';
        this.rows[abs+16][ord+13].imgsrc=3;
        this.rows[abs+16][ord+13].walkable = false;
        this.rows[abs+16][ord+14].image ='0042';
        this.rows[abs+16][ord+14].imgsrc=3;
        this.rows[abs+16][ord+14].walkable = false;
        this.rows[abs+16][ord+15].image ='0042';
        this.rows[abs+16][ord+15].imgsrc=3;
        this.rows[abs+16][ord+15].walkable = false;
        this.rows[abs+16][ord+21].image ='0042';
        this.rows[abs+16][ord+21].imgsrc=3;
        this.rows[abs+16][ord+21].walkable = false;
        this.rows[abs+16][ord+22].image ='0042';
        this.rows[abs+16][ord+22].imgsrc=3;
        this.rows[abs+16][ord+22].walkable = false;
        this.rows[abs+16][ord+23].image ='0042';
        this.rows[abs+16][ord+23].imgsrc=3;
        this.rows[abs+16][ord+23].walkable = false;
        this.rows[abs+16][ord+24].image ='0042';
        this.rows[abs+16][ord+24].imgsrc=3;
        this.rows[abs+16][ord+24].walkable = false;
        this.rows[abs+16][ord+25].image ='0042';
        this.rows[abs+16][ord+25].imgsrc=3;
        this.rows[abs+16][ord+25].walkable = false;
        this.rows[abs+16][ord+26].image ='0042';
        this.rows[abs+16][ord+26].imgsrc=3;
        this.rows[abs+16][ord+26].walkable = false;


        this.rows[abs+17][ord+6].image ='0042';
        this.rows[abs+17][ord+6].imgsrc=3;
        this.rows[abs+17][ord+6].walkable = false;
        this.rows[abs+17][ord+7].image ='0042';
        this.rows[abs+17][ord+7].imgsrc=3;
        this.rows[abs+17][ord+7].walkable = false;
        this.rows[abs+17][ord+8].image ='0042';
        this.rows[abs+17][ord+8].imgsrc=3;
        this.rows[abs+17][ord+8].walkable = false;
        this.rows[abs+17][ord+9].image ='0064';
        this.rows[abs+17][ord+9].imgsrc=3;
        this.rows[abs+17][ord+9].walkable = false;
        this.rows[abs+17][ord+10].image ='0042';
        this.rows[abs+17][ord+10].imgsrc=3;
        this.rows[abs+17][ord+10].walkable = false;
        this.rows[abs+17][ord+11].image ='0042';
        this.rows[abs+17][ord+11].imgsrc=3;
        this.rows[abs+17][ord+11].walkable = false;
        this.rows[abs+17][ord+12].image ='0042';
        this.rows[abs+17][ord+12].imgsrc=3;
        this.rows[abs+17][ord+12].walkable = false;
        this.rows[abs+17][ord+13].image ='0042';
        this.rows[abs+17][ord+13].imgsrc=3;
        this.rows[abs+17][ord+13].walkable = false;
        this.rows[abs+17][ord+14].image ='0042';
        this.rows[abs+17][ord+14].imgsrc=3;
        this.rows[abs+17][ord+14].walkable = false;
        this.rows[abs+17][ord+24].image ='0042';
        this.rows[abs+17][ord+24].imgsrc=3;
        this.rows[abs+17][ord+24].walkable = false;
        this.rows[abs+17][ord+26].image ='0042';
        this.rows[abs+17][ord+26].imgsrc=3;
        this.rows[abs+17][ord+26].walkable = false;
        this.rows[abs+17][ord+25].image ='0042';
        this.rows[abs+17][ord+25].imgsrc=3;
        this.rows[abs+17][ord+25].walkable = false;
        this.rows[abs+17][ord+26].image ='0042';
        this.rows[abs+17][ord+26].imgsrc=3;
        this.rows[abs+17][ord+26].walkable = false;
        this.rows[abs+17][ord+27].image ='0042';
        this.rows[abs+17][ord+27].imgsrc=3;
        this.rows[abs+17][ord+27].walkable = false;


        this.rows[abs+18][ord+6].image ='0042';
        this.rows[abs+18][ord+6].imgsrc=3;
        this.rows[abs+18][ord+6].walkable = false;
        this.rows[abs+18][ord+7].image ='0042';
        this.rows[abs+18][ord+7].imgsrc=3;
        this.rows[abs+18][ord+7].walkable = false;
        this.rows[abs+18][ord+8].image ='0042';
        this.rows[abs+18][ord+8].imgsrc=3;
        this.rows[abs+18][ord+8].walkable = false;
        this.rows[abs+18][ord+9].image ='0065';
        this.rows[abs+18][ord+9].imgsrc=3;
        this.rows[abs+18][ord+9].walkable = false;
        this.rows[abs+18][ord+10].image ='0042';
        this.rows[abs+18][ord+10].imgsrc=3;
        this.rows[abs+18][ord+10].walkable = false;
        this.rows[abs+18][ord+11].image ='0042';
        this.rows[abs+18][ord+11].imgsrc=3;
        this.rows[abs+18][ord+11].walkable = false;
        this.rows[abs+18][ord+12].image ='0042';
        this.rows[abs+18][ord+12].imgsrc=3;
        this.rows[abs+18][ord+12].walkable = false;
        this.rows[abs+18][ord+13].image ='0042';
        this.rows[abs+18][ord+13].imgsrc=3;
        this.rows[abs+18][ord+13].walkable = false;
        this.rows[abs+18][ord+25].image ='0042';
        this.rows[abs+18][ord+25].imgsrc=3;
        this.rows[abs+18][ord+25].walkable = false;
        this.rows[abs+18][ord+26].image ='0042';
        this.rows[abs+18][ord+26].imgsrc=3;
        this.rows[abs+18][ord+26].walkable = false;
        this.rows[abs+18][ord+27].image ='0042';
        this.rows[abs+18][ord+27].imgsrc=3;
        this.rows[abs+18][ord+27].walkable = false;
        this.rows[abs+18][ord+28].image ='0042';
        this.rows[abs+18][ord+28].imgsrc=3;
        this.rows[abs+18][ord+28].walkable = false;
  
        this.rows[abs+19][ord+7].image ='0042';
        this.rows[abs+19][ord+7].imgsrc=3;
        this.rows[abs+19][ord+7].walkable = false;
        this.rows[abs+19][ord+8].image ='0042';
        this.rows[abs+19][ord+8].imgsrc=3;
        this.rows[abs+19][ord+8].walkable = false;
        this.rows[abs+19][ord+9].image ='0042';
        this.rows[abs+19][ord+9].imgsrc=3;
        this.rows[abs+19][ord+9].walkable = false;
        this.rows[abs+19][ord+10].image ='0042';
        this.rows[abs+19][ord+10].imgsrc=3;
        this.rows[abs+19][ord+10].walkable = false;
        this.rows[abs+19][ord+11].image ='0042';
        this.rows[abs+19][ord+11].imgsrc=3;
        this.rows[abs+19][ord+11].walkable = false;
        this.rows[abs+19][ord+12].image ='0042';
        this.rows[abs+19][ord+12].imgsrc=3;
        this.rows[abs+19][ord+12].walkable = false;
        this.rows[abs+19][ord+26].image ='0042';
        this.rows[abs+19][ord+26].imgsrc=3;
        this.rows[abs+19][ord+26].walkable = false;
        this.rows[abs+19][ord+27].image ='0042';
        this.rows[abs+19][ord+27].imgsrc=3;
        this.rows[abs+19][ord+27].walkable = false;
        this.rows[abs+19][ord+28].image ='0042';
        this.rows[abs+19][ord+28].imgsrc=3;
        this.rows[abs+19][ord+28].walkable = false;

        this.rows[abs+20][ord+8].image ='0042';
        this.rows[abs+20][ord+8].imgsrc=3;
        this.rows[abs+20][ord+8].walkable = false;
        this.rows[abs+20][ord+9].image ='0042';
        this.rows[abs+20][ord+9].imgsrc=3;
        this.rows[abs+20][ord+9].walkable = false;
        this.rows[abs+20][ord+10].image ='0042';
        this.rows[abs+20][ord+10].imgsrc=3;
        this.rows[abs+20][ord+10].walkable = false;
        this.rows[abs+20][ord+11].image ='0042';
        this.rows[abs+20][ord+11].imgsrc=3;
        this.rows[abs+20][ord+11].walkable = false;
        this.rows[abs+20][ord+26].image ='0042';
        this.rows[abs+20][ord+26].imgsrc=3;
        this.rows[abs+20][ord+26].walkable = false;
        this.rows[abs+20][ord+27].image ='0042';
        this.rows[abs+20][ord+27].imgsrc=3;
        this.rows[abs+20][ord+27].walkable = false;
        this.rows[abs+20][ord+28].image ='0042';
        this.rows[abs+20][ord+28].imgsrc=3;
        this.rows[abs+20][ord+28].walkable = false;

        this.rows[abs+21][ord+26].image ='0042';
        this.rows[abs+21][ord+26].imgsrc=3;
        this.rows[abs+21][ord+26].walkable = false;
        this.rows[abs+21][ord+27].image ='0042';
        this.rows[abs+21][ord+27].imgsrc=3;
        this.rows[abs+21][ord+27].walkable = false;
        this.rows[abs+21][ord+28].image ='0042';
        this.rows[abs+21][ord+28].imgsrc=3;
        this.rows[abs+21][ord+28].walkable = false;
        
        this.rows[abs+22][ord+27].image ='0042';
        this.rows[abs+22][ord+27].imgsrc=3;
        this.rows[abs+22][ord+27].walkable = false;
        this.rows[abs+22][ord+28].image ='0042';
        this.rows[abs+22][ord+28].imgsrc=3;
        this.rows[abs+22][ord+28].walkable = false;
        this.rows[abs+22][ord+29].image ='0042';
        this.rows[abs+22][ord+29].imgsrc=3;
        this.rows[abs+22][ord+29].walkable = false;

        this.rows[abs+23][ord+27].image ='0042';
        this.rows[abs+23][ord+27].imgsrc=3;
        this.rows[abs+23][ord+27].walkable = false;
        this.rows[abs+23][ord+28].image ='0042';
        this.rows[abs+23][ord+28].imgsrc=3;
        this.rows[abs+23][ord+28].walkable = false;
        this.rows[abs+23][ord+29].image ='0042';
        this.rows[abs+23][ord+29].imgsrc=3;
        this.rows[abs+23][ord+29].walkable = false;

        this.rows[abs+24][ord+27].image ='0042';
        this.rows[abs+24][ord+27].imgsrc=3;
        this.rows[abs+24][ord+27].walkable = false;
        this.rows[abs+24][ord+28].image ='0042';
        this.rows[abs+24][ord+28].imgsrc=3;
        this.rows[abs+24][ord+28].walkable = false;
        this.rows[abs+24][ord+29].image ='0042';
        this.rows[abs+24][ord+29].imgsrc=3;
        this.rows[abs+24][ord+29].walkable = false;

        this.rows[abs+25][ord+28].image ='0042';
        this.rows[abs+25][ord+28].imgsrc=3;
        this.rows[abs+25][ord+28].walkable = false;
        this.rows[abs+25][ord+29].image ='0042';
        this.rows[abs+25][ord+29].imgsrc=3;
        this.rows[abs+25][ord+29].walkable = false;
        this.rows[abs+25][ord+30].image ='0042';
        this.rows[abs+25][ord+30].imgsrc=3;
        this.rows[abs+25][ord+30].walkable = false;

        this.rows[abs+26][ord+28].image ='0042';
        this.rows[abs+26][ord+28].imgsrc=3;
        this.rows[abs+26][ord+28].walkable = false;
        this.rows[abs+26][ord+29].image ='0042';
        this.rows[abs+26][ord+29].imgsrc=3;
        this.rows[abs+26][ord+29].walkable = false;
        this.rows[abs+26][ord+30].image ='0042';
        this.rows[abs+26][ord+30].imgsrc=3;
        this.rows[abs+26][ord+30].walkable = false      

        this.rows[abs+30][ord+28].image ='0042';
        this.rows[abs+30][ord+28].imgsrc=3;
        this.rows[abs+30][ord+28].walkable = false;
        this.rows[abs+30][ord+29].image ='0042';
        this.rows[abs+30][ord+29].imgsrc=3;
        this.rows[abs+30][ord+29].walkable = false;
        this.rows[abs+30][ord+30].image ='0042';
        this.rows[abs+30][ord+30].imgsrc=3;
        this.rows[abs+30][ord+30].walkable = false;

        this.rows[abs+31][ord+28].image ='0042';
        this.rows[abs+31][ord+28].imgsrc=3;
        this.rows[abs+31][ord+28].walkable = false;
        this.rows[abs+31][ord+29].image ='0042';
        this.rows[abs+31][ord+29].imgsrc=3;
        this.rows[abs+31][ord+29].walkable = false;
        this.rows[abs+31][ord+30].image ='0042';
        this.rows[abs+31][ord+30].imgsrc=3;
        this.rows[abs+31][ord+30].walkable = false;

        this.rows[abs+32][ord+29].image ='0042';
        this.rows[abs+32][ord+29].imgsrc=3;
        this.rows[abs+32][ord+29].walkable = false;
        this.rows[abs+32][ord+30].image ='0042';
        this.rows[abs+32][ord+30].imgsrc=3;
        this.rows[abs+32][ord+30].walkable = false;
        this.rows[abs+32][ord+31].image ='0042';
        this.rows[abs+32][ord+31].imgsrc=3;
        this.rows[abs+32][ord+31].walkable = false;

        this.rows[abs+33][ord+29].image ='0042';
        this.rows[abs+33][ord+29].imgsrc=3;
        this.rows[abs+33][ord+29].walkable = false;
        this.rows[abs+33][ord+30].image ='0042';
        this.rows[abs+33][ord+30].imgsrc=3;
        this.rows[abs+33][ord+30].walkable = false;
        this.rows[abs+33][ord+31].image ='0042';
        this.rows[abs+33][ord+31].imgsrc=3;
        this.rows[abs+33][ord+31].walkable = false;

        this.rows[abs+34][ord+29].image ='0042';
        this.rows[abs+34][ord+29].imgsrc=3;
        this.rows[abs+34][ord+29].walkable = false;
        this.rows[abs+34][ord+30].image ='0042';
        this.rows[abs+34][ord+30].imgsrc=3;
        this.rows[abs+34][ord+30].walkable = false;
        this.rows[abs+34][ord+31].image ='0042';
        this.rows[abs+34][ord+31].imgsrc=3;
        this.rows[abs+34][ord+31].walkable = false;

        this.rows[abs+35][ord+29].image ='0042';
        this.rows[abs+35][ord+29].imgsrc=3;
        this.rows[abs+35][ord+29].walkable = false;
        this.rows[abs+35][ord+30].image ='0042';
        this.rows[abs+35][ord+30].imgsrc=3;
        this.rows[abs+35][ord+30].walkable = false;
        this.rows[abs+35][ord+31].image ='0042';
        this.rows[abs+35][ord+31].imgsrc=3;
        this.rows[abs+35][ord+31].walkable = false;

        this.rows[abs+36][ord+30].image ='0042';
        this.rows[abs+36][ord+30].imgsrc=3;
        this.rows[abs+36][ord+30].walkable = false;
        this.rows[abs+36][ord+31].image ='0042';
        this.rows[abs+36][ord+31].imgsrc=3;
        this.rows[abs+36][ord+31].walkable = false;
        this.rows[abs+36][ord+32].image ='0042';
        this.rows[abs+36][ord+32].imgsrc=3;
        this.rows[abs+36][ord+32].walkable = false;

        this.rows[abs+37][ord+30].image ='0042';
        this.rows[abs+37][ord+30].imgsrc=3;
        this.rows[abs+37][ord+30].walkable = false;
        this.rows[abs+37][ord+31].image ='0042';
        this.rows[abs+37][ord+31].imgsrc=3;
        this.rows[abs+37][ord+31].walkable = false;
        this.rows[abs+37][ord+32].image ='0042';
        this.rows[abs+37][ord+32].imgsrc=3;
        this.rows[abs+37][ord+32].walkable = false;

        this.rows[abs+38][ord+30].image ='0042';
        this.rows[abs+38][ord+30].imgsrc=3;
        this.rows[abs+38][ord+30].walkable = false;
        this.rows[abs+38][ord+31].image ='0064';
        this.rows[abs+38][ord+31].imgsrc=3;
        this.rows[abs+38][ord+31].walkable = false;
        this.rows[abs+38][ord+32].image ='0042';
        this.rows[abs+38][ord+32].imgsrc=3;
        this.rows[abs+38][ord+32].walkable = false;

        this.rows[abs+39][ord+30].image ='0042';
        this.rows[abs+39][ord+30].imgsrc=3;
        this.rows[abs+39][ord+30].walkable = false;
        this.rows[abs+39][ord+31].image ='0042';
        this.rows[abs+39][ord+31].imgsrc=3;
        this.rows[abs+39][ord+31].walkable = false;
        this.rows[abs+39][ord+32].image ='0042';
        this.rows[abs+39][ord+32].imgsrc=3;
        this.rows[abs+39][ord+32].walkable = false;

    }

    generateKey(abs,ord) {
        this.rows[abs][ord].image ='0117';
        this.rows[abs][ord].imgsrc=2;
        this.rows[abs][ord].walkable = true;
    }

    deleteKey(abs, ord, game) {
        this.rows[abs][ord].image = null;
        this.rows[abs][ord].imgsrc = null;
        this.rows[abs][ord].walkable = true;
        let currentPlayer = game.currentPlayer
        currentPlayer.items.push(new Clef())
        updateInventoryTest(game);
    }

    generateMob(abs,ord) {
        this.rows[abs][ord].image ='0121';
        this.rows[abs][ord].imgsrc=1;
        this.rows[abs][ord].walkable = false;
    }   

    deleteMob(abs, ord) {
        this.rows[abs][ord].image = null;
        this.rows[abs][ord].imgsrc = null;
        this.rows[abs][ord].walkable = true;
    }

    generateWaterBorder(){    
        this.rows.map( (row, abs) =>
                row.map( (tile, ord ) =>{
                    if(abs >0 && ord>0 && abs<39 && ord<69){
                        if(this.rows[abs][ord].imgsrc == 3 && this.rows[abs][ord].image=='0042'){
                            console.log(abs, ord);
                            console.log("test", this.rows[abs-1][ord].background);

                            let caseHaut = this.rows[abs-1][ord]
                            let caseBas = this.rows[abs+1][ord]
                            let caseGauche = this.rows[abs][ord-1]
                            let caseDroite = this.rows[abs][ord+1]
                            let caseHautGauche = this.rows[abs-1][ord-1]
                            let caseHautDroite = this.rows[abs-1][ord+1]
                            let caseBasGauche = this.rows[abs+1][ord-1]
                            let caseBasDroite = this.rows[abs+1][ord+1]

                            let herbeEnHaut = caseHaut.image != '0042' &&  caseHaut.imgsrc!=3 && caseHaut.background!="BridgeA" && caseHaut.background!="BridgeC" && caseHaut.background!="BridgeB"
                            let herbeADroite = caseDroite.image != '0042' && caseDroite.imgsrc!=3 && caseDroite.background!="BridgeA" && caseDroite.background!="BridgeC" && caseDroite.background!="BridgeB"
                            let herbeAGauche = caseGauche.image != '0042' && caseGauche.imgsrc!=3 && caseGauche.background!="BridgeA" && caseGauche.background!="BridgeC" && caseGauche.background!="BridgeB"
                            let herbeEnBas = caseBas.image != '0042' && caseBas.imgsrc!=3 && caseBas.background!="BridgeA" && caseBas.background!="BridgeC" && caseBas.background!="BridgeB"

                            let herbeEnHautGauche = caseHautGauche.image != '0042' &&  caseHautGauche.imgsrc!=3 && caseHautGauche.background!="BridgeA" && caseHautGauche.background!="BridgeC" && caseHautGauche.background!="BridgeB"
                            let herbeEnHautDroite = caseHautDroite.image != '0042' &&caseHautDroite.imgsrc!=3 && caseHautDroite.background!="BridgeA" && caseHautDroite.background!="BridgeC" && caseHautDroite.background!="BridgeB"
                            let herbeEnBasGauche = caseBasGauche.image != '0042' && caseBasGauche.imgsrc!=3 && caseBasGauche.background!="BridgeA" && caseBasGauche.background!="BridgeC" && caseBasGauche.background!="BridgeB"
                            let herbeEnBasDroite = caseBasDroite.image != '0042' && caseBasDroite.imgsrc!=3 && caseBasDroite.background!="BridgeA" && caseBasDroite.background!="BridgeC" && caseBasDroite.background!="BridgeB"
                            
                            if (!herbeAGauche && herbeADroite && !herbeEnHaut && !herbeEnBas) {
                                // Si l'herbe est présente à droite
                                caseDroite.image ='0049';
                                caseDroite.imgsrc=3;
                                caseDroite.walkable = false;
                                if(!herbeEnBasDroite){
                                    caseDroite.image ='0061';
                                    caseDroite.imgsrc=3;
                                    caseDroite.walkable = false;
                                    if(this.rows[abs][ord+3].image !='0042'){

                                    }
                                    else{
                                        this.rows[abs][ord+2].image ='0041';
                                        this.rows[abs][ord+2].imgsrc=3;
                                        this.rows[abs][ord+2].walkable = false;
                                    }
                                }
                                
                            }if (!herbeAGauche && !herbeADroite && herbeEnHaut && !herbeEnBas) {
                                // Si l'herbe est présente en haut
                            
                                caseHaut.image ='0062';
                                caseHaut.imgsrc=3;
                                caseHaut.walkable = false;
                            
                            }if (!herbeAGauche && !herbeADroite && !herbeEnHaut && herbeEnBas) {
                                // Si l'herbe est présente en bas
                                if(!herbeEnHautGauche){
                                    caseBas.image ='0038';
                                    caseBas.imgsrc=3;
                                    caseBas.walkable = false;
                                }
                                
                            }
                            if (herbeAGauche && herbeADroite && !herbeEnHaut && !herbeEnBas) {
                                // Si l'herbe est présente à gauche et à droite, mais pas en haut ni en bas
                                caseGauche.image ='0051';
                                caseGauche.imgsrc=3;
                                caseGauche.walkable = false;

                                caseDroite.image ='0051';
                                caseDroite.imgsrc=3;
                                caseDroite.walkable = false;

                            }if (herbeAGauche && !herbeADroite && !herbeEnHaut && herbeEnBas) {
                                // Si l'herbe est présente à gauche et en bas, mais pas à droite ni en haut
                                caseGauche.image ='0051';
                                caseGauche.imgsrc=3;
                                caseGauche.walkable = false;

                                caseBasGauche.image ='0052';
                                caseBasGauche.imgsrc=3;
                                caseBasGauche.walkable = false;

                                caseBas.image ='0039';
                                caseBas.imgsrc=3;
                                caseBas.walkable = false;

                                if(!herbeEnBasDroite){
                                    this.rows[abs+2][ord].image='0052'
                                    this.rows[abs+2][ord].imgsrc=3;
                                    this.rows[abs+2][ord].walkable = false;

                                    this.rows[abs+2][ord+1].image='0039'
                                    this.rows[abs+2][ord+1].imgsrc=3;
                                    this.rows[abs+2][ord+1].walkable = false;
                                }
                                
                            }if (!herbeAGauche && herbeADroite && herbeEnHaut && !herbeEnBas) {
                                // Si l'herbe est présente à droite et en haut, mais pas à gauche ni en bas*
                                caseDroite.image ='0061';
                                caseDroite.imgsrc=3;
                                caseDroite.walkable = false;

                                caseHautDroite.image ='0041';
                                caseHautDroite.imgsrc=3;
                                caseHautDroite.walkable = false;

                            }if (herbeAGauche && !herbeADroite && !herbeEnHaut && !herbeEnBas)  {
                                // Si l'herbe est présente à gauche, mais pas à droite, en haut ni en bas
                                    if(!herbeEnHautGauche){
                                    caseGauche.image ='0051';
                                    caseGauche.imgsrc=3;
                                    caseGauche.walkable = false;
                                }
                                if(!herbeEnHaut && !herbeEnBasDroite && !herbeADroite && !herbeEnHautDroite && herbeEnHautGauche && herbeEnBasGauche && herbeAGauche && herbeEnBas){
                                    caseGauche.image ='0051';
                                    caseGauche.imgsrc=3;
                                    caseGauche.walkable = false;

                                    caseDroite.image ='0051';
                                    caseDroite.imgsrc=3;
                                    caseDroite.walkable = false;

                            }if (herbeAGauche && !herbeADroite && !herbeEnHaut && herbeEnBas) {
                                // Si l'herbe est présente à gauche et en bas, mais pas à droite ni en haut
                                caseGauche.image ='0051';
                                caseGauche.imgsrc=3;
                                caseGauche.walkable = false;
                                caseBasGauche.image ='0052';
                                caseBasGauche.imgsrc=3;
                                caseBasGauche.walkable = false;

                                caseBas.image ='0039';
                                caseBas.imgsrc=3;
                                caseBas.walkable = false;

                                if(!herbeEnBasDroite){
                                    this.rows[abs+2][ord].image='0052'
                                    this.rows[abs+2][ord].imgsrc=3;
                                    this.rows[abs+2][ord].walkable = false;

                                    this.rows[abs+2][ord+1].image='0039'
                                    this.rows[abs+2][ord+1].imgsrc=3;
                                    this.rows[abs+2][ord+1].walkable = false;
                                    }
                                }
                                
                            }
                            else {
                                // Si l'herbe n'est pas présente dans aucune des positions

                            }

                        }   
                    }
            })
        )
        
    }

    generateRestWaterBorder(abs,ord){
        this.rows[abs][ord-1].image ='0051';
        this.rows[abs][ord-1].imgsrc=3;
        this.rows[abs][ord-1].walkable = false;
        this.rows[abs][ord+3].image ='0049';
        this.rows[abs][ord+3].imgsrc=3;
        this.rows[abs][ord+3].walkable = false;

        this.rows[abs+39][ord+29].image ='0051';
        this.rows[abs+39][ord+29].imgsrc=3;
        this.rows[abs+39][ord+29].walkable = false;
        this.rows[abs+39][ord+33].image ='0049';
        this.rows[abs+39][ord+33].imgsrc=3;
        this.rows[abs+39][ord+33].walkable = false;

        this.rows[abs+3][ord+4].image = '0041';
        this.rows[abs+3][ord+4].imgsrc=3;
        this.rows[abs+3][ord+4].walkable = false;
        this.rows[abs+5][ord+5].image = '0041';
        this.rows[abs+5][ord+5].imgsrc=3;
        this.rows[abs+5][ord+5].walkable = false;
        this.rows[abs+9][ord+6].image = '0041';
        this.rows[abs+9][ord+6].imgsrc=3;
        this.rows[abs+9][ord+6].walkable = false;
        this.rows[abs+10][ord+7].image = '0041';
        this.rows[abs+10][ord+7].imgsrc=3;
        this.rows[abs+10][ord+7].walkable = false;
    }

    generateBridge(abs,ord){
        this.rows[abs-2][ord-1].background="BridgeA"
        this.rows[abs-2][ord].background="BridgeA"
        this.rows[abs-2][ord+1].background="BridgeA"
        this.rows[abs-2][ord+2].background="BridgeA"
        this.rows[abs-2][ord+3].background="BridgeA"

        this.rows[abs-1][ord-1].background="gravel"
        this.rows[abs-1][ord].background="BridgeB"
        this.rows[abs-1][ord+1].background="BridgeB"
        this.rows[abs-1][ord+2].background="BridgeB"
        this.rows[abs-1][ord+3].background="gravel"

        this.rows[abs][ord-1].background="BridgeC"
        this.rows[abs][ord].background="BridgeC"
        this.rows[abs][ord+1].background="BridgeC"
        this.rows[abs][ord+2].background="BridgeC"
        this.rows[abs][ord+3].background="BridgeC"

        this.rows[abs-2][ord-2].image ='0084';
        this.rows[abs-2][ord-2].imgsrc=1;
        this.rows[abs-2][ord-2].walkable = false;


    }

    generateCastle(abs,ord){

        this.rows[abs][ord].image ='0123';
        this.rows[abs][ord].imgsrc=2;
        this.rows[abs][ord].walkable = false;
        this.rows[abs][ord+1].image ='0124';
        this.rows[abs][ord+1].imgsrc=2;
        this.rows[abs][ord+1].walkable = false;
        this.rows[abs-1][ord].image ='0111';
        this.rows[abs-1][ord].imgsrc=2;
        this.rows[abs-1][ord].walkable = false;
        this.rows[abs-1][ord+1].image ='0112';
        this.rows[abs-1][ord+1].imgsrc=2;
        this.rows[abs-1][ord+1].walkable = false;

        this.rows[abs][ord+2].image ='0058';
        this.rows[abs][ord+2].imgsrc=1;
        this.rows[abs][ord+2].walkable = false;
        this.rows[abs][ord-1].image ='0058';
        this.rows[abs][ord-1].imgsrc=1;
        this.rows[abs][ord-1].walkable = false;
        this.rows[abs-1][ord+4].image ='0058';
        this.rows[abs-1][ord+4].imgsrc=1;
        this.rows[abs-1][ord+4].walkable = false;
        this.rows[abs-1][ord-3].image ='0058';
        this.rows[abs-1][ord-3].imgsrc=1;
        this.rows[abs-1][ord-3].walkable = false;

        this.rows[abs-1][ord+2].image ='0058';
        this.rows[abs-1][ord+2].imgsrc=1;
        this.rows[abs-1][ord+2].walkable = false;
        this.rows[abs-1][ord-1].image ='0058';
        this.rows[abs-1][ord-1].imgsrc=1;
        this.rows[abs-1][ord-1].walkable = false;
        this.rows[abs-2][ord+4].image ='0058';
        this.rows[abs-2][ord+4].imgsrc=1;
        this.rows[abs-2][ord+4].walkable = false;
        this.rows[abs-2][ord-3].image ='0058';
        this.rows[abs-2][ord-3].imgsrc=1;
        this.rows[abs-2][ord-3].walkable = false;
        this.rows[abs-2][ord+3].image ='0125';
        this.rows[abs-2][ord+3].imgsrc=2;
        this.rows[abs-2][ord+3].walkable = false;
        this.rows[abs-2][ord-2].image ='0125';
        this.rows[abs-2][ord-2].imgsrc=2;
        this.rows[abs-2][ord-2].walkable = false;

        this.rows[abs-5][ord].image ='0096';
        this.rows[abs-5][ord].imgsrc=2;
        this.rows[abs-5][ord].walkable = false;
        this.rows[abs-5][ord+1].image ='0098';
        this.rows[abs-5][ord+1].imgsrc=2;
        this.rows[abs-5][ord+1].walkable = false;

        this.rows[abs-4][ord].image ='0120';
        this.rows[abs-4][ord].imgsrc=2;
        this.rows[abs-4][ord].walkable = false;
        this.rows[abs-4][ord+1].image ='0122';
        this.rows[abs-4][ord+1].imgsrc=2;
        this.rows[abs-4][ord+1].walkable = false;

        this.rows[abs-3][ord].image ='0029';
        this.rows[abs-3][ord].imgsrc=1;
        this.rows[abs-3][ord].walkable = false;
        this.rows[abs-3][ord+1].image ='0029';
        this.rows[abs-3][ord+1].imgsrc=1;
        this.rows[abs-3][ord+1].walkable = false;


        this.rows[abs-2][ord+2].image ='0058';
        this.rows[abs-2][ord+2].imgsrc=1;
        this.rows[abs-2][ord+2].walkable = false;
        this.rows[abs-2][ord-1].image ='0058';
        this.rows[abs-2][ord-1].imgsrc=1;
        this.rows[abs-3][ord+2].image ='0058';
        this.rows[abs-3][ord+2].imgsrc=1;
        this.rows[abs-3][ord+2].walkable = false;
        this.rows[abs-3][ord-1].image ='0058';
        this.rows[abs-3][ord-1].imgsrc=1;
        this.rows[abs-3][ord-1].walkable = false;
        this.rows[abs-4][ord+2].image ='0058';
        this.rows[abs-4][ord+2].imgsrc=1;
        this.rows[abs-4][ord+2].walkable = false;
        this.rows[abs-4][ord-1].image ='0058';
        this.rows[abs-4][ord-1].imgsrc=1;
        this.rows[abs-4][ord-1].walkable = false;
        this.rows[abs-5][ord+2].image ='0102';
        this.rows[abs-5][ord+2].imgsrc=2;
        this.rows[abs-5][ord+2].walkable = false;
        this.rows[abs-5][ord-1].image ='0102';
        this.rows[abs-5][ord-1].imgsrc=2;
        this.rows[abs-5][ord-1].walkable = false;


        this.rows[abs-4][ord+4].image ='0058';
        this.rows[abs-4][ord+4].imgsrc=1;
        this.rows[abs-4][ord+4].walkable = false;
        this.rows[abs-4][ord-3].image ='0058';
        this.rows[abs-4][ord-3].imgsrc=1;
        this.rows[abs-4][ord-3].walkable = false;
        this.rows[abs-5][ord+4].image ='0058';
        this.rows[abs-5][ord+4].imgsrc=1;
        this.rows[abs-5][ord+4].walkable = false;
        this.rows[abs-5][ord-3].image ='0058';
        this.rows[abs-5][ord-3].imgsrc=1;
        this.rows[abs-5][ord-3].walkable = false;
        this.rows[abs-6][ord+4].image ='0102';
        this.rows[abs-6][ord+4].imgsrc=2;
        this.rows[abs-6][ord+4].walkable = false;
        this.rows[abs-6][ord-3].image ='0102';
        this.rows[abs-6][ord-3].imgsrc=2;
        this.rows[abs-6][ord-3].walkable = false;

        this.rows[abs-4][ord+3].image ='0097';
        this.rows[abs-4][ord+3].imgsrc=2;
        this.rows[abs-4][ord+3].walkable = false;
        this.rows[abs-4][ord-2].image ='0097';
        this.rows[abs-4][ord-2].imgsrc=2;
        this.rows[abs-4][ord-2].walkable = false;

        this.rows[abs-6][ord+2].image ='0058';
        this.rows[abs-6][ord+2].imgsrc=1;
        this.rows[abs-6][ord+2].walkable = false;
        this.rows[abs-6][ord-1].image ='0058';
        this.rows[abs-6][ord-1].imgsrc=1;
        this.rows[abs-6][ord-1].walkable = false;
        this.rows[abs-7][ord+2].image ='0102';
        this.rows[abs-7][ord+2].imgsrc=2;
        this.rows[abs-7][ord+2].walkable = false;
        this.rows[abs-7][ord-1].image ='0102';
        this.rows[abs-7][ord-1].imgsrc=2;
        this.rows[abs-7][ord-1].walkable = false;

        this.rows[abs-2][ord].image ='0121';
        this.rows[abs-2][ord].imgsrc=2;
        this.rows[abs-2][ord].walkable = false;
        this.rows[abs-2][ord+1].image ='0121';
        this.rows[abs-2][ord+1].imgsrc=2;
        this.rows[abs-2][ord+1].walkable = false;

        this.rows[abs-3][ord+4].image ='0122';
        this.rows[abs-3][ord+4].imgsrc=2;
        this.rows[abs-3][ord+4].walkable = false;
        this.rows[abs-3][ord-3].image ='0120';
        this.rows[abs-3][ord-3].imgsrc=2;
        this.rows[abs-3][ord-3].walkable = false;
        this.rows[abs-3][ord+3].image ='0121';
        this.rows[abs-3][ord+3].imgsrc=2;
        this.rows[abs-3][ord+3].walkable = false;
        this.rows[abs-3][ord-2].image ='0121';
        this.rows[abs-3][ord-2].imgsrc=2;
        this.rows[abs-3][ord-2].walkable = false;

        this.rows[abs-1][ord+3].image ='0020';
        this.rows[abs-1][ord+3].imgsrc=1;
        this.rows[abs-1][ord+3].walkable = false;
        this.rows[abs-1][ord-2].image ='0020';
        this.rows[abs-1][ord-2].imgsrc=1;
        this.rows[abs-1][ord-2].walkable = false;
        this.rows[abs][ord+3].image ='0032';
        this.rows[abs][ord+3].imgsrc=1;
        this.rows[abs][ord+3].walkable = false;
        this.rows[abs][ord-2].image ='0032';
        this.rows[abs][ord-2].imgsrc=1;
        this.rows[abs][ord-2].walkable = false;

        this.generateTombstone1(abs+6,ord-2)
        this.generateTombstone1(abs+8,ord-12)
        this.generateTombstone1(abs,ord+6)
        this.generateTombstone1(abs+10,ord-1)
        this.generateTombstone1(abs+8,ord+3)

        this.generateTombstone2(abs-3,ord-14)
        this.generateTombstone2(abs-10,ord-9)
        this.generateTombstone2(abs-6,ord-5)
        this.generateTombstone2(abs,ord-12)




    }

    generateTombstone1(abs,ord){

        this.rows[abs][ord].image ='0064';
        this.rows[abs][ord].imgsrc=1;
        this.rows[abs][ord].walkable = false;

        this.rows[abs+1][ord].background ='DurtTombstone';


    }

    generateTombstone2(abs,ord){

        this.rows[abs][ord].image ='0065';
        this.rows[abs][ord].imgsrc=1;
        this.rows[abs][ord].walkable = false;

        this.rows[abs+1][ord].background ='DurtTombstone';

    }
}




class Inventory{
    constructor(){
        
        //this.rows = Array(1).fill().map(() => Array(10).fill().map(() => new Tile()))
        //Test object
        this.rows = Array(10).fill().map(() => new Object())
    }
}

class Object {
    constructor(){
        this.compteur = 0
        this.getCompteur = function() {
            return this.compteur
        }
        this.setCompteur = function() {
            //A continuer
        }
    }
}

class Poignard extends Object {
    constructor() {
        super();
        this.localisation='dungeon'
		this.idImage = '0103'
        this.damage = 3
		
    }
	
}

class Epee extends Object {
    constructor() {
        super();
        this.localisation='dungeon'
		this.idImage = '0104'
        this.damage = 10
    }
}
class EpeeLarge extends Object {
    constructor() {
        super();
		this.idImage = '0105'
        this.damage = 9
    }
}
class EpeeBronze extends Object {
    constructor() {
        super();
		this.idImage = '0107'
        this.damage = 8
    }
}
class Marteau extends Object {
    constructor() {
        super();
		this.idImage = '0117'
        this.damage = 7
    }
}
class DoubleHache extends Object {
    constructor() {
        super();
		this.idImage = '0118'
        this.damage = 20
    }
}
class Hache extends Object {
    constructor() {
        super();
		this.idImage = '0119'
        this.damage = 15
    }
}
class Faucille extends Object {
    //town
    constructor() {
        super();
		this.idImage = '0129'
        this.damage = 11
    }
}
class Lance extends Object {
    constructor() {
        super();
		this.idImage = '0131'
        this.damage = 13
    }
}
class Arc extends Object {
    //town
    constructor() {
        super();
		this.idImage = '0118'
        this.damage = 0
    }
}
class Fleche extends Object {
    //town
    constructor() {
        super();
		this.idImage = '0119'
        this.damage = 2
    }
}
class Bombe extends Object {
    //town
    
    constructor() {
        super();
        this.localisation='town'
		this.idImage = '0105'
        this.damage = 100
    }
}
class BaguetteMagique extends Object {
    constructor() {
        super();
		this.idImage = '0129'
        this.damage = 11
    }
}
class BaguetteMagiqueCourbee extends Object {    
    constructor() {
        super();
		this.idImage = '0130'
        this.damage = 20
    }
}
class PotionSante extends Object {
    constructor() {
        super();
        this.localisation='dungeon'
		this.idImage = '0114'
        this.heal = 50
    }
}
class PotionVitesse extends Object {
    constructor() {
        super();
		this.idImage = '0113'
    }
}
class PotionForce extends Object {
    constructor() {
        super();
		this.idImage = '0115'
    }
}
class PotionDefense extends Object {
    constructor() {
        super();
		this.idImage = '0116'
    }
}
class SortSeisme extends Object {
    constructor() {
        super();
		this.idImage = '0126'
    }
}
class SortPoison extends Object {
    constructor() {
        super();
		this.idImage = '0127'
    }
}
class SortFoudre extends Object {
    constructor() {
        super();
		this.idImage = '0128'
    }
}
class SortGel extends Object {
    constructor() {
        super();
		this.idImage = '0125'
    }
}
class Clef extends Object {
    constructor() {
        super();
        this.localisation='town'
		this.idImage = '0117'
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
        inventoryHTML += `
            <div class="inventory" id="drag-item" draggable="true">
                <img id="Board" src=kenney_tiny-${object.localisation}/Tiles/tile_${object.idImage}.png></img>
            </div>
        `;
    }
    inventoryHTML += '</div>'; // Fin de la ligne   
    document.getElementById('inventory-board').innerHTML = inventoryHTML;

    console.log(game.inventory);
}

class Player {
    constructor(name) {
        this.name = name;
        this.health = 100;
        this.items = [];
        this.position = [11, 10];
        this.hasKey = false;
        this.hasOpenedChest = false;
        this.mobInLife = true;
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
        // À implémenter : utiliser un objet de l'inventaire du joueur
    }
}


class Game {
    constructor(players, board, inventory) {
        this.players = players;
        this.board = board;
        this.currentPlayer = players[0];
        this.gameState = "not_started";
        this.inventory = inventory;

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
            } else {
                var erreur = document.getElementById('erreur');
                erreur.style.display = 'block'; 
            }
        }

        if (this.currentPlayer.position[0] == 14 && this.currentPlayer.position[1] == 65 && this.currentPlayer.hasOpenedChest) {
            this.board.deleteMob(13, 65);
            setHealthLevel(50);
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
                gameBoardHTML += `
                <div class="tile ${tile.background}" id="drop-zone" >
                    ${tile.character ? '<img id="Player" src="kenney_tiny-dungeon/Tiles/tile_0085.png"></img>' : ''}
                    ${tile.item ? tile.item.name : ''}
                    ${tile.monster ? tile.monster.name : ''}
                </div>
            `;
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
    healthLevel.style.width = percentage + '%';
    health = percentage;
}

var health = 100;
  
