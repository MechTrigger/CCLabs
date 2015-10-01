function Pet(hunger, fun, energy, health) {
    this.hunger = hunger;
    this.fun = fun;
    this.energy = energy;
    this.health = health;

    this.setHunger = function (hunger) {
        this.hunger = hunger;
        $('#hunger').text(this.hunger);
    }
    this.setFun = function (fun) {
        this.fun = fun;
        $('#fun').text(this.fun);
    }
    this.setEnergy = function (energy) {
        this.energy = energy;
        $('#energy').text(this.energy);
    }
    this.setHealth = function (health) {
        this.health = health;
        $('#health').text(this.health);
    }
}
var pet = new Pet(100, 99, 98, 97);

$(document).ready(function () {



});