
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
                    if(j==3 && i==23){
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
                    if( j%20==0 && i%18==0 || j==35 && i==6 || j==50 && i==15 || j==45 && i==35 || j==32 && i==2 || j==40&& i==35){
                        this.generateTree(i,j)

                    }
                }
            })
        )


        this.generateChest(38,30)
        this.generateWater(0,20)

        this.generateBorder(0,20)
        this.generateKey(38, 31)   

        this.generateWaterBorder(0,20)
        this.generateBridge(29,48)
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
        this.rows[abs][ord-2].image='0077';
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

        this.rows[abs+1][ord].background = 'gravel'
        this.rows[abs+2][ord].background = 'gravel'
        this.rows[abs+1][ord+1].background = 'gravel'
        this.rows[abs+1][ord-1].background = 'gravel'
    }

    generateTree(abs,ord){
        this.rows[abs][ord].image ='0004';
        this.rows[abs][ord].imgsrc=2;
        this.rows[abs][ord].walkable = false;
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
        this.rows[abs][ord].image ='0029';
        this.rows[abs][ord].imgsrc=2;
        this.rows[abs][ord].walkable = true;
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
        this.rows[abs+2][ord+1].walkable = false;
        this.rows[abs+3][ord+1].image='0016';
        this.rows[abs+3][ord+1].imgsrc=2;
        this.rows[abs+3][ord+1].walkable = false;

        this.rows[abs][ord-2].image ='0004';
        this.rows[abs][ord-2].imgsrc=2;
        this.rows[abs][ord-2].walkable = false;
        this.rows[abs+1][ord-2].image='0016';
        this.rows[abs+1][ord-2].imgsrc=2;
        this.rows[abs+1][ord-2].walkable = false;

        this.rows[abs-2][ord].image ='0004';
        this.rows[abs-2][ord].imgsrc=2;
        this.rows[abs-2][ord].walkable = false;
        this.rows[abs-1][ord].image='0016';
        this.rows[abs-1][ord].imgsrc=2;
        this.rows[abs-1][ord].walkable = false;

        this.rows[abs+1][ord+3].image ='0004';
        this.rows[abs+1][ord+3].imgsrc=2;
        this.rows[abs+1][ord+3].walkable = false;
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

        this.rows[abs+1][ord].image ='0017';
        this.rows[abs+1][ord].imgsrc=2;
        this.rows[abs+1][ord].walkable = true;
        this.rows[abs+2][ord].image ='0017';
        this.rows[abs+2][ord].imgsrc=2;
        this.rows[abs+2][ord].walkable = true;
        this.rows[abs+1][ord+1].image ='0017';
        this.rows[abs+1][ord+1].imgsrc=2;
        this.rows[abs+1][ord+1].walkable = true;
        this.rows[abs+2][ord+1].image ='0017';
        this.rows[abs+2][ord+1].imgsrc=2;
        this.rows[abs+2][ord+1].walkable = true;
        this.rows[abs+3][ord-2].image ='0017';
        this.rows[abs+3][ord-2].imgsrc=2;
        this.rows[abs+3][ord-2].walkable = true;
        this.rows[abs+3][ord-1].image ='0017';
        this.rows[abs+3][ord-1].imgsrc=2;
        this.rows[abs+3][ord-1].walkable = true;
        this.rows[abs+4][ord-2].image ='0017';
        this.rows[abs+4][ord-2].imgsrc=2;
        this.rows[abs+4][ord-2].walkable = true;
        this.rows[abs+5][ord].image ='0017';
        this.rows[abs+5][ord].imgsrc=2;
        this.rows[abs+5][ord].walkable = true;
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
        this.rows[abs+10][ord+16].image ='0042';
        this.rows[abs+10][ord+16].imgsrc=3;
        this.rows[abs+10][ord+17].walkable = false;
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
        this.rows[abs+12][ord+14].image ='0042';
        this.rows[abs+12][ord+14].imgsrc=3;
        this.rows[abs+12][ord+14].walkable = false;
        this.rows[abs+12][ord+15].image ='0042';
        this.rows[abs+12][ord+15].imgsrc=3;
        this.rows[abs+12][ord+15].walkable = false;
        this.rows[abs+12][ord+16].image ='0042';
        this.rows[abs+12][ord+16].imgsrc=3;
        this.rows[abs+12][ord+16].walkable = false;
        this.rows[abs+12][ord+17].image ='0042';
        this.rows[abs+12][ord+17].imgsrc=3;
        this.rows[abs+12][ord+17].walkable = false;
        

        this.rows[abs+13][ord+4].image ='0042';
        this.rows[abs+13][ord+4].imgsrc=3;
        this.rows[abs+13][ord+4].walkable = false;
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
        this.rows[abs+20][ord+10].image ='0042';
        this.rows[abs+20][ord+10].imgsrc=3;
        this.rows[abs+20][ord+10].walkable = false;
        this.rows[abs+20][ord+26].image ='0042';
        this.rows[abs+20][ord+26].imgsrc=3;
        this.rows[abs+20][ord+26].walkable = false;
        this.rows[abs+20][ord+27].image ='0042';
        this.rows[abs+20][ord+27].imgsrc=3;
        this.rows[abs+20][ord+27].walkable = false;
        this.rows[abs+20][ord+28].image ='0042';
        this.rows[abs+20][ord+28].imgsrc=3;
        this.rows[abs+20][ord+28].walkable = false;

        this.rows[abs+21][ord+10].image ='0042';
        this.rows[abs+21][ord+10].imgsrc=3;
        this.rows[abs+21][ord+10].walkable = false;
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
        this.rows[abs+38][ord+32].image ='0042';
        this.rows[abs+38][ord+32].imgsrc=3;
        this.rows[abs+38][ord+32].walkable = false;

        this.rows[abs+39][ord+30].image ='0042';
        this.rows[abs+39][ord+30].imgsrc=3;
        this.rows[abs+39][ord+30].walkable = false;
        this.rows[abs+39][ord+32].image ='0042';
        this.rows[abs+39][ord+32].imgsrc=3;
        this.rows[abs+39][ord+32].walkable = false;

    }

<<<<<<< HEAD
    generateKey(abs,ord) {
        this.rows[abs][ord].image ='0117';
        this.rows[abs][ord].imgsrc=2;
        this.rows[abs][ord].walkable = true;
    }

    generateBorder(abs,ord){    
=======
    generateWaterBorder(abs,ord){    
>>>>>>> 4007b216a291db68b9051ababeec96b310ef7dae

        this.rows.map( (row, ord) =>
                row.map( (tile, abs ) =>{
                    if( tile.image == '0042' && abs >0 && ord>0 && abs<45 && ord<70){

                        let herbeAGauche = this.rows[abs-1, ord].background == 'grass' || this.rows[abs-1, ord].background == 'flower' || this.rows[abs-1, ord].background == 'kenney_tiny-town/Tiles/tile_0000.png'
                        let herbeEnBas = this.rows[abs, ord+1].background == 'grass' || this.rows[abs-1, ord].background == 'flower' || this.rows[abs-1, ord].background == 'kenney_tiny-town/Tiles/tile_0000.png'
                        let herbeEnHaut = this.rows[abs, ord-1].background == 'grass' || this.rows[abs-1, ord].background == 'flower' || this.rows[abs-1, ord].background == 'kenney_tiny-town/Tiles/tile_0000.png'
                        let herbeADroite = this.rows[abs+1,ord].background == 'grass' ||this.rows[abs-1, ord].background == 'flower' || this.rows[abs-1, ord].background == 'kenney_tiny-town/Tiles/tile_0000.png'
                        /*
                        if (herbeAGauche && herbeADroite && herbeEnHaut && herbeEnBas) {
                            // Si l'herbe est présente à gauche, à droite, en haut et en bas
                            // Code à exécuter lorsque toutes les conditions sont remplies
                        
                        } else if (herbeAGauche && herbeADroite && herbeEnHaut) {
                            // Si l'herbe est présente à gauche, à droite et en haut, mais pas en bas
                            // Code à exécuter lorsque seules les conditions "herbeAGauche", "herbeADroite" et "herbeEnHaut" sont remplies
                        
                        } else if (herbeAGauche && herbeADroite && herbeEnBas) {
                            // Si l'herbe est présente à gauche, à droite et en bas, mais pas en haut

                        
                        } */if (herbeAGauche && herbeEnHaut && herbeEnBas) {
                            // Si l'herbe est présente à gauche, en haut et en bas, mais pas à droite
                            this.rows[abs+1][ord].image ='0039';
                            this.rows[abs+1][ord].imgsrc=3;
                            this.rows[abs+1][ord].walkable = false;

                            this.rows[abs+1][ord-1].image ='0052';
                            this.rows[abs+1][ord-1].imgsrc=3;
                            this.rows[abs+1][ord-1].walkable = false;

                            this.rows[abs][ord-1].image ='0051';
                            this.rows[abs][ord-1].imgsrc=3;
                            this.rows[abs][ord-1].walkable = false;

                            this.rows[abs-1][ord-1].image ='0040';
                            this.rows[abs-1][ord-1].imgsrc=3;
                            this.rows[abs-1][ord-1].walkable = false;

                            this.rows[abs][ord-1].image ='0062';
                            this.rows[abs][ord-1].imgsrc=3;
                            this.rows[abs][ord-1].walkable = false;
                        
                        } else if (herbeADroite && herbeEnHaut && herbeEnBas) {
                            // Si l'herbe est présente à droite, en haut et en bas, mais pas à gauche
                            this.rows[abs+1][ord].image ='0037';
                            this.rows[abs+1][ord].imgsrc=3;
                            this.rows[abs+1][ord].walkable = false;

                            this.rows[abs][ord+1].image ='0049';
                            this.rows[abs][ord+1].imgsrc=3;
                            this.rows[abs][ord+1].walkable = false;

                            this.rows[abs+1][ord+1].image ='0053';
                            this.rows[abs+1][ord+1].imgsrc=3;
                            this.rows[abs+1][ord+1].walkable = false;

                            this.rows[abs-1][ord+1].image ='0041';
                            this.rows[abs-1][ord+1].imgsrc=3;
                            this.rows[abs-1][ord+1].walkable = false;

                            this.rows[abs-1][ord].image ='0062';
                            this.rows[abs-1][ord].imgsrc=3;
                            this.rows[abs-1][ord].walkable = false;
                        
                        } else if (herbeAGauche && herbeADroite) {
                            // Si l'herbe est présente à gauche et à droite, mais pas en haut ni en bas
                            this.rows[abs][ord-1].image ='0051';
                            this.rows[abs][ord-1].imgsrc=3;
                            this.rows[abs][ord-1].walkable = false;

                            this.rows[abs][ord+1].image ='0049';
                            this.rows[abs][ord+1].imgsrc=3;
                            this.rows[abs][ord+1].walkable = false;
                        
                        } else if (herbeAGauche && herbeEnHaut) {
                            // Si l'herbe est présente à gauche et en haut, mais pas à droite ni en bas
                            this.rows[abs][ord-1].image ='0051';
                            this.rows[abs][ord-1].imgsrc=3;
                            this.rows[abs][ord-1].walkable = false;

                            this.rows[abs-1][ord-1].image ='0040';
                            this.rows[abs-1][ord-1].imgsrc=3;
                            this.rows[abs-1][ord-1].walkable = false;

                            this.rows[abs-1][ord].image ='0062';
                            this.rows[abs-1][ord].imgsrc=3;
                            this.rows[abs-1][ord].walkable = false;
                        
                        } else if (herbeAGauche && herbeEnBas) {
                            // Si l'herbe est présente à gauche et en bas, mais pas à droite ni en haut
                            this.rows[abs][ord-1].image ='0051';
                            this.rows[abs][ord-1].imgsrc=3;
                            this.rows[abs][ord-1].walkable = false;

                            this.rows[abs+1][ord-1].image ='0052';
                            this.rows[abs+1][ord-1].imgsrc=3;
                            this.rows[abs+1][ord-1].walkable = false;

                            this.rows[abs-1][ord].image ='0039';
                            this.rows[abs-1][ord].imgsrc=3;
                            this.rows[abs-1][ord].walkable = false;
                        
                        } else if (herbeADroite && herbeEnHaut) {
                            // Si l'herbe est présente à droite et en haut, mais pas à gauche ni en bas
                            this.rows[abs][ord+1].image ='0049';
                            this.rows[abs][ord+1].imgsrc=3;
                            this.rows[abs][ord+1].walkable = false;

                            this.rows[abs-1][ord+1].image ='0041';
                            this.rows[abs-1][ord+1].imgsrc=3;
                            this.rows[abs-1][ord+1].walkable = false;

                            this.rows[abs-1][ord].image ='0049';
                            this.rows[abs-1][ord].imgsrc=3;
                            this.rows[abs-1][ord].walkable = false;
                        
                        } else if (herbeADroite && herbeEnBas) {
                            // Si l'herbe est présente à droite et en bas, mais pas à gauche ni en haut
                            this.rows[abs+1][ord].image ='0049';
                            this.rows[abs+1][ord].imgsrc=3;
                            this.rows[abs+1][ord].walkable = false;

                            this.rows[abs+1][ord+1].image ='0053';
                            this.rows[abs+1][ord+1].imgsrc=3;
                            this.rows[abs+1][ord+1].walkable = false;

                            this.rows[abs][ord+1].image ='0037';
                            this.rows[abs][ord+1].imgsrc=3;
                            this.rows[abs][ord+1].walkable = false;
                        
                        } else if (herbeEnHaut && herbeEnBas) {
                            // Si l'herbe est présente en haut et en bas, mais pas à gauche ni à droite
                            this.rows[abs+1][ord].image ='0038';
                            this.rows[abs+1][ord].imgsrc=3;
                            this.rows[abs+1][ord].walkable = false;

                            this.rows[abs-1][ord].image ='0062';
                            this.rows[abs-1][ord].imgsrc=3;
                            this.rows[abs-1][ord].walkable = false;
                        
                        } else if (herbeAGauche) {
                            // Si l'herbe est présente à gauche, mais pas à droite, en haut ni en bas
                            this.rows[abs][ord-1].image ='0051';
                            this.rows[abs][ord-1].imgsrc=3;
                            this.rows[abs][ord-1].walkable = false;
                        
                        } else if (herbeADroite) {
                            // Si l'herbe est présente à droite, mais pas à gauche, en haut ni en bas
                            this.rows[abs][ord+1].image ='0049';
                            this.rows[abs][ord+1].imgsrc=3;
                            this.rows[abs][ord+1].walkable = false;
                        
                        } else if (herbeEnHaut) {
                            // Si l'herbe est présente en haut, mais pas à gauche, à droite ni en bas
                            this.rows[abs-1][ord].image ='0062';
                            this.rows[abs-1][ord].imgsrc=3;
                            this.rows[abs-1][ord].walkable = false;
                        
                        } else if (herbeEnBas) {
                            // Si l'herbe est présente en bas, mais pas à gauche, à droite ni en haut
                            this.rows[abs+1][ord].image ='0038';
                            this.rows[abs+1][ord].imgsrc=3;
                            this.rows[abs+1][ord].walkable = false;
                        
                        } else {
                            // Si l'herbe n'est pas présente dans aucune des positions

                        }


                    }

                }



            )
            
            
            
        )
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
    }

    generateCastle(abs,ord){
        this.rows[abs][ord].image ='00123';
        this.rows[abs][ord].imgsrc=2;
        this.rows[abs][ord].walkable = false;
        this.rows[abs][ord+1].image ='00124';
        this.rows[abs][ord+1].imgsrc=2;
        this.rows[abs][ord+1].walkable = false;
        this.rows[abs][ord+2].image ='00126';
        this.rows[abs][ord+2].imgsrc=2;
        this.rows[abs][ord+2].walkable = false;
        this.rows[abs][ord-1].image ='00126';
        this.rows[abs][ord-1].imgsrc=2;
        this.rows[abs][ord-1].walkable = false;


    }
}




class Invetory{
    constructor(){
        this.rows = Array(1).fill().map(() => Array(10).fill().map(() => new Tile()))
    }
}

class Player {
    constructor(name) {
        this.name = name;
        this.health = 100;
        this.items = ["objets"];
        this.position = [11, 10];
    }
    
    moveLeft() {
        if(this.position[1]>0 || this.position.walkable==true){
            this.position[1] = this.position[1]-1
        }
        else{

        }
        // À implémenter : mettre à jour la position du joueur et gérer les interactions avec les objets/monstres
    }
    moveRight(){
        if(this.position[1]<75 || this.position.walkable==true){
            this.position[1] = this.position[1]+1
        }
        else{

        }
    }
    moveUp(){
        if(this.position[0]>0 || this.position.walkable==true){
            this.position[0] = this.position[0]-1
        }
        else{

        }
    }

    moveDown(){
        if(this.position[0]<40 || this.position.walkable==true){
            this.position[0] = this.position[0]+1;
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

    let currentPlayer = game.currentPlayer

    // Afficher l'état de l'inventaire
    let inventoryHTML = '';
    inventoryHTML += `<div class="row">`; // Début de la ligne 
    for (let item  of currentPlayer.items) {
            inventoryHTML += `
                
                <div class="inventory" id="drag-item" draggable="true"> 
                    ${item ? '<img id="inventory" src="kenney_tiny-dungeon/Tiles/tile_0103.png" alt="poignard"></img>' : ''}
                </div>
                <div class="inventory" id="drag-item" draggable="true">
                    ${item ? '<img id="inventory" src="kenney_tiny-dungeon/Tiles/tile_0104.png" alt="épée"></img>' : ''}
                </div>
                <div class="inventory" id="drag-item" draggable="true">
                    ${item ? '<img id="inventory" src="kenney_tiny-dungeon/Tiles/tile_0105.png" alt="épée large"></img>' : ''}
                </div>
                <div class="inventory" id="drag-item" draggable="true">
                    ${item ? '<img id="inventory" src="kenney_tiny-dungeon/Tiles/tile_0107.png" alt="épée bronze"></img>' : ''}
                </div>
                <div class="inventory" id="drag-item" draggable="true">
                    ${item ? '<img id="inventory" src="kenney_tiny-dungeon/Tiles/tile_0113.png" alt="potion sante"></img>' : ''}
                </div>
                <div class="inventory" id="drag-item" draggable="true">
                    ${item ? '<img id="inventory" src="kenney_tiny-dungeon/Tiles/tile_0114.png" alt="potion vitesse"></img>' : ''}
                </div>
                <div class="inventory" id="drag-item" draggable="true">
                    ${item ? '<img id="inventory" src="kenney_tiny-dungeon/Tiles/tile_0115.png" alt="potion force"></img>' : ''}
                </div>
                <div class="inventory" id="drag-item" draggable="true">
                    ${item ? '<img id="inventory" src="kenney_tiny-dungeon/Tiles/tile_0116.png" alt="potion defense"></img>' : ''}
                </div>
                <div class="inventory" id="drag-item" draggable="true">
                    ${item ? '<img id="inventory" src="kenney_tiny-dungeon/Tiles/tile_0117.png" alt="marteau"></img>' : ''}
                </div>
                <div class="inventory" id="drag-item" draggable="true">
                    ${item ? '<img id="inventory" src="kenney_tiny-dungeon/Tiles/tile_0118.png" alt="double hache"></img>' : ''}
                </div>
                <div class="inventory" id="drag-item" draggable="true">
                    ${item ? '<img id="inventory" src="kenney_tiny-dungeon/Tiles/tile_0119.png" alt="sort gel"></img>' : ''}
                </div>
                <div class="inventory" id="drag-item" draggable="true">
                    ${item ? '<img id="inventory" src="kenney_tiny-dungeon/Tiles/tile_0125.png" alt="sort seisme"></img>' : ''}
                </div>
                <div class="inventory" id="drag-item" draggable="true">
                    ${item ? '<img id="inventory" src="kenney_tiny-dungeon/Tiles/tile_0126.png" alt="sort poison"></img>' : ''}
                </div>
                <div class="inventory" id="drag-item" draggable="true">
                    ${item ? '<img id="inventory" src="kenney_tiny-dungeon/Tiles/tile_0127.png" alt="sort foudre"></img>' : ''}
                </div>
                <div class="inventory" id="drag-item" draggable="true" >
                    ${item ? '<img id="inventory" src="kenney_tiny-dungeon/Tiles/tile_0128.png"></img>' : ''}
                </div>
                <div class="inventory" id="drag-item" draggable="true">
                    ${item ? '<img id="inventory" src="kenney_tiny-dungeon/Tiles/tile_0129.png"></img>' : ''}
                </div>
                <div class="inventory" id="drag-item" draggable="true">
                    ${item ? '<img id="inventory" src="kenney_tiny-dungeon/Tiles/tile_0130.png"></img>' : ''}
                </div>
                <div class="inventory" id="drag-item" draggable="true">
                    ${item ? '<img id="inventory" src="kenney_tiny-dungeon/Tiles/tile_0131.png"></img>' : ''}
                </div>
                <div class="inventory" id="drag-item" draggable="true">
                    ${item ? '<img id="inventory" src="kenney_tiny-town/Tiles/tile_0105.png"></img>' : ''}
                </div>
                <div class="inventory" id="drag-item" draggable="true">
                    ${item ? '<img id="inventory" src="kenney_tiny-town/Tiles/tile_0129.png"></img>' : ''}
                </div>
                <div class="inventory" id="drag-item" draggable="true">
                    ${item ? '<img id="inventory" src="kenney_tiny-town/Tiles/tile_0117.png"></img>' : ''}
                </div>
                <div class="inventory" id="drag-item" draggable="true">
                    ${item ? '<img id="inventory" src="kenney_tiny-town/Tiles/tile_0118.png"></img>' : ''}
                </div>
                <div class="inventory" id="drag-item" draggable="true">
                    ${item ? '<img id="inventory" src="kenney_tiny-town/Tiles/tile_0119.png"></img>' : ''}
                </div>
                
            `;
            
    }
    inventoryHTML += '</div>'; // Fin de la ligne   
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
    inventory = new Invetory(10);
    //drawInventoryBoard(inventory);
    updateInventory(game);


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

function disparaitre() {
    var bouton = document.getElementById("start-game");
    bouton.style.display = "none";
}

function afficher() {
    var attackButton = document.getElementById("attack-button");
    var defendButton = document.getElementById("defend-button");
    var inventoryButton = document.getElementById("use-item-button");
    attackButton.style.display = "block";
    defendButton.style.display = "block";
    inventoryButton.style.display = "block";
}
function updateTimerDisplay() {
  const minutes = Math.floor(timerSeconds / 60);
  const seconds = timerSeconds % 60;

  const formattedTime = `${minutes}:${seconds.toString().padStart(2, '0')}`;

  timerDisplay.textContent = formattedTime;
}

//Drag & Drop


function jeuTermine() {
  // Implémentez votre logique pour vérifier si le jeu est terminé
  // Renvoyez true si le jeu est terminé, sinon renvoyez false
  // Par exemple, vous pouvez vérifier si toutes les conditions de fin du jeu sont remplies
  // et renvoyer true dans ce cas
  return false;
}