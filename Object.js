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

class Main{
    constructor() {
        this.damage = 10
		
    }
}
const Hand = new Main();
class Epee extends Object {
    constructor() {
        super();
        this.localisation='dungeon'
		this.idImage = '0104'
        this.damage = 25
    }
}
class Clef extends Object {
    constructor() {
        super();
        this.localisation='town'
		this.idImage = '0117'
    }
}
const sword = new Epee();
const key = new Clef();

class Bombe extends Object {  
    constructor() {
        super();
        this.localisation='town'
		this.idImage = '0105'
        this.damage = 100
    }
}
const bomb = new Bombe();
/*
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
}*/

/*
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

class Poignard extends Object {
    constructor() {
        super();
        this.localisation='dungeon'
		this.idImage = '0103'
        this.damage = 3
		
    }
	
}
*/