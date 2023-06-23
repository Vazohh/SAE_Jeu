class ChateauInterieur {
    constructor() {
      this.width = 75;
      this.height = 40;
      this.rows = Array(this.height).fill().map((_, y) => Array(this.width).fill().map((_, x) => new Tile(x, y)));
      this.generate();
    }
  
    generate() {
      // Générer l'intérieur du château avec une seule image
      for (let i = 0; i < this.height; i++) {
        for (let j = 0; j < this.width; j++) {
          const abs = Math.floor(i);
          const ord = Math.floor(j);
          this.rows[abs][ord].image = '0109';
          this.rows[abs][ord].imgsrc = 2;
          this.rows[abs][ord].walkable = true;
        }
      }
    }
  

  }
  