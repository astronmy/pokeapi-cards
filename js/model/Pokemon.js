class Pokemon {
  constructor(img, imgGame, imgCvg, name, xp, hp, attack, defense, special, number, type = "none") {
    this.img      = img;
    this.imgGame  = imgGame;
    this.name     = name;
    this.imgCvg   = imgCvg;
    this.xp       = xp;
    this.hp       = hp;
    this.attack   = attack;
    this.defense  = defense;
    this.special  = special;
    this.type     = type;
    this.number   = number;
  }
}