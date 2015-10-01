//Functions & Globals
function Pet(hunger, fun, energy, health, purse) {
    this.hunger = hunger;
    this.fun = fun;
    this.energy = energy;
    this.health = health;
    this.purse = purse;
};
var pet = new Pet(100, 100, 100, 100, 0);
var purse = 0;
var timer = 0;
function numColor(stat, id) {
    if (stat > 19) {
        $(id).css('color', 'whitesmoke');
    } else {
        $(id).css('color', 'red');
    }
};
//Messages
function logMessage(message) {
    $('#logDiv').empty();
    $('#logDiv').append(logMessageHtml.clone().text(message));
}
function logMessage2(message) {
    $('#logDiv2').empty();
    $('#logDiv2').append(logMessage2Html.clone().text(message));
}
function logMessage3(message) {
    $('#logDiv3').empty();
    $('#logDiv3').append(logMessage3Html.clone().text(message));
}

//Doc Ready
$(document).ready(function () {
    var name = prompt("What is your creature's name?", "");
    $('#name span').text("This is your adorable and lovable pet " + name + ".");
    $('#statusImg').html('<img src="penguinIdle.gif" />');
    logMessageHtml = $('#logDiv .logMessage').clone();
    $('#logDiv .logMessage').remove();
    logMessage2Html = $('#logDiv2 .logMessage2').clone();
    logMessage3Html = $('#logDiv2 .logMessage2').clone();
    //Feed your pet
    $('#feed').on('click', function () {
        if (pet.hunger <= 60 && pet.purse >= 5) {
            pet.hunger += 20;
            pet.purse -= 5;
            pet.health += 5;
            logMessage("You fed your hungry pet. (Satiation +10)(Coins -5)");
            $('#statusImg').html('<img src="penguinEating.gif" />');
        } else if (pet.hunger >= 80 && pet.purse >= 5) {
            $('#statusImg').html('<img src="penguinIdle.gif" />');
            logMessage("Your pet isn't hungry right now.");
        } else if (pet.purse < 5) {
            $('#statusImg').html('<img src="penguinIdle.gif" />');
            logMessage("You lack the funds to feed your pet. Get a job.")
        } else if (pet.hunger <= 80 && pet.hunger >= 60 && pet.purse >= 5) {
            pet.hunger += 20;
            pet.purse -= 5;
            logMessage("Your pet is getting fat. (Health -10)(Coins -5)");
            $('#statusImg').html('<img src="penguinEating.gif" />');
        }
        if (pet.energy <= 90) { pet.energy += 10; };
        if (pet.hunger <= 80 && pet.health >= 60) { pet.health -= 10; };
    });
    //Entertain and make coins
    $('#play').on('click', function () {
        if (pet.fun <= 90 && pet.fun > 40) {
            $('#statusImg').html('<img src="penguinFun.gif" />');
            pet.fun += 10;
            pet.energy -= 10;
            pet.hunger -= 10;
            pet.purse += 7;
            logMessage("People love watching your pet dance and play. (+7 Coins)");
        } else if (pet.health <= 40 || pet.hunger <= 40 || pet.energy <= 40) {
            $('#statusImg').html('<img src="penguinFun.gif" />');
            pet.fun += 10;
            pet.energy -= 10;
            pet.hunger -= 10;
            pet.purse += 4;
            logMessage("Your pet will dance but he's not happy about it. (+4 Coins)");
        } else {
            $('#statusImg').html('<img src="penguinIdle.gif" />');
            logMessage("Your pet doesn't feel like playing right now. :(");
        }
    });
    //Sleep to gain energy
    $('#sleep').on('click', function () {
        if (pet.energy <= 50) {
            $('#statusImg').html('<img src="penguinSleeping.gif" />');
            pet.energy += 10;
            pet.hunger -= 20;
            pet.fun -= 20;
            logMessage("Sleepy time for your pet. (+10 Energy)");
        } else {
            $('#statusImg').html('<img src="penguinIdle.gif" />');
            logMessage("Your pet isn't tired. If you need a nap go for it.")
        }
    });
    //Counter
    var interval = setInterval(function () {
        $('#hungerLvl').text(pet.hunger--);
        $('#funLvl').text(pet.fun--);
        $('#energyLvl').text(pet.energy--);
        $('#healthLvl').text(pet.health--);
        $('#purse').text(pet.purse);
        timer++;
        //Constant conditionals
        if (pet.health <= 20 || pet.energy <= 20 || pet.hunger <= 20) {
            $('#statusImg').html('<img src="penguinSick.gif" />');
            logMessage("Your pet is dying! Someone call PETA!");
        }
        if (pet.fun <= -1) {
            $('#statusImg').html('<img src="penguinRanaway.gif" />');
            logMessage("Your pet got bored and ran away. Too bad.");
            logMessage2("You lose.");
            logMessage3("You were the proud owner of " + name + " for " + timer + " seconds.");
            clearInterval(interval);
        }
        if (pet.hunger <= -1 || pet.energy <= -1 || pet.health <= -1) {
            $('#statusImg').html('<img src="penguinDead.gif" />');
            logMessage("Your pet has died. I hope you're proud of yourself.");
            logMessage2("You lose.");
            logMessage3("You were the proud owner of " + name + " for " + timer + " seconds.");
            clearInterval(interval);
        }
        numColor(pet.hunger, '#hungerLvl');
        numColor(pet.fun, '#funLvl');
        numColor(pet.health, '#healthLvl');
        numColor(pet.energy, '#energyLvl');
    }, 1000);
});


//if (pet.hunger > 19) {
//    $('#hungerLvl').css('color', 'whitesmoke');
//} else {
//    $('#hungerLvl').css('color', 'red');
//}
//if (pet.fun > 19) {
//    $('#funLvl').css('color', 'whitesmoke');
//} else {
//    $('#funLvl').css('color', 'red');
//}
//if (pet.health > 19) {
//    $('#healthLvl').css('color', 'whitesmoke');
//} else {
//    $('#healthLvl').css('color', 'red');
//}
//if (pet.energy > 19) {
//    $('#energyLvl').css('color', 'whitesmoke');
//} else {
//    $('#energyLvl').css('color', 'red');
//}
//function addUnits(stat, amount) {
//    if (stat <= 90) {
//        stat += amount;
//        console.log("hello");
//    }
//}
//addUnits(pet.hunger, 10);
