//--Declarations
var timer;
var points = 0;
var dollarNum = 0;
var halfDollarNum = 0;
var quarterNum = 0;
var dimeNum = 0;
var nickleNum = 0;
var pennyNum = 0;
var timeAllowed = 100;
var coinData = [];

$(document).ready(function () {
    $('#speedCoins').hide();
    $('#coinClicker').hide();
    $('#gameNameSpeed').hide();
    $('#gameNameClicker').hide();
    doc("value").style.visibility = "hidden";
    doc("myProgress").style.visibility = "hidden";
    doc("points").style.visibility = "hidden";
    $("#1scrambleVersion").hide();
    $("#2scrambleVersion").hide();
    $("#3scrambleVersion").hide();

    $('input:checkbox').change(
    function () {
        if ($(this).is(':checked')) {
            timeAllowed = 200;
        } else {
            timeAllowed = 100;
        }
    });

    //<---COIN CLICKER--->
    $('#btnCoinClicker').click(function () {
        coinClicker();
    });
    $('#silverDollar').click(function () {
        dollarNum++;
    });
    $('#halfDollar').click(function () {
        halfDollarNum++;
    });
    $('#quarter').click(function () {
        quarterNum++;
    });
    $('#dime').click(function () {
        dimeNum++;
    });
    $('#nickle').click(function () {
        nickleNum++;
    });
    $('#penny').click(function () {
        pennyNum++;
    });
    $('#silverPTS .glyphicon-plus').click(function () {
        dollarNum++;
    });
    $('#halfPTS .glyphicon-plus').click(function () {
        halfDollarNum++;
    });
    $('#quarterPTS .glyphicon-plus').click(function () {
        quarterNum++;
    });
    $('#dimePTS .glyphicon-plus').click(function () {
        dimeNum++;
    });
    $('#nicklePTS .glyphicon-plus').click(function () {
        nickleNum++;
    });
    $('#pennyPTS .glyphicon-plus').click(function () {
        pennyNum++;
    });
    $('#silverPTS .glyphicon-minus').click(function () {
        dollarNum--;
    });
    $('#halfPTS .glyphicon-minus').click(function () {
        halfDollarNum--;
    });
    $('#quarterPTS .glyphicon-minus').click(function () {
        quarterNum--;
    });
    $('#dimePTS .glyphicon-minus').click(function () {
        dimeNum--;
    });
    $('#nicklePTS .glyphicon-minus').click(function () {
        nickleNum--;
    });
    $('#pennyPTS .glyphicon-minus').click(function () {
        pennyNum--;
    });
    $(".continueSpeed").click(function () {
        startTimer();
        speedCoins();
    })
    $(".continue").click(function () {
        coinClicker();
    })
    $(".timesUpModal").click(function () {
        location.reload();
    })
    $(".winnerModal").click(function () {
        location.reload();
    })
    $('#submitAnswer').click(function () {
        clearInterval(timer);
        if (dollarNum == coinData[0] && halfDollarNum == coinData[1] && quarterNum == coinData[2]
        && dimeNum == coinData[3] && nickleNum == coinData[4] && pennyNum == coinData[5]) {
            points += 10;
            $("#correctModal").modal({
                backdrop: 'static',
                keyboard: false
            })
            dollarNum = halfDollarNum = quarterNum = dimeNum = nickleNum = pennyNum = 0;
        } else {
            points -= 5;
            $("#incorrectModal").modal({
                backdrop: 'static',
                keyboard: false
            })
            dollarNum = halfDollarNum = quarterNum = dimeNum = nickleNum = pennyNum = 0;
        }
    })
    //<---SPEED COINS--->
    $('#btnSpeedCoins').click(function () {
        clearInterval(timer);
        $('#gameNameClicker').hide();
        $('#coinClicker').hide();
        $('#speedCoins').show();
        $('#gameNameSpeed').show();
        doc("value").style.visibility = "visible";
        doc("myProgress").style.visibility = "visible";
        doc("points").style.visibility = "visible";
        $('#message').text("Select the correct change amount below.");
        startTimer();
        speedCoins();
    });

    $('#ans1').click(function () {
        clearInterval(timer);
        if (doc('1scrambleVersion').innerHTML == 1) {
            points += 10;
            $("#correctSpeedCoins").modal({
                backdrop: 'static',
                keyboard: false
            })
            clearPanel();
        } else {
            points -= 5;
            $("#incorrectSpeedCoins").modal({
                backdrop: 'static',
                keyboard: false
            })
            clearPanel();
        }
    });

    $('#ans2').click(function () {
        clearInterval(timer);
        if (doc('2scrambleVersion').innerHTML == 1) {
            points += 10;
            $("#correctSpeedCoins").modal({
                backdrop: 'static',
                keyboard: false
            })
            clearPanel();
        } else {
            points -= 5;
            $("#incorrectSpeedCoins").modal({
                backdrop: 'static',
                keyboard: false
            })
            clearPanel();
        }
    });

    $('#ans3').click(function () {
        clearInterval(timer);
        if (doc('3scrambleVersion').innerHTML == 1) {
            points += 10;
            $("#correctSpeedCoins").modal({
                backdrop: 'static',
                keyboard: false
            })
            clearPanel();
        } else {
            points -= 5;
            $("#incorrectSpeedCoins").modal({
                backdrop: 'static',
                keyboard: false
            })
            clearPanel();
        }
    });
    
});


function getData() {
    $.getJSON('api/problems').done(function (data) {
        return data;
    })
}

function coinClicker() {
    $.getJSON('api/problems')
            .done(function (data) {
                $('#gameNameSpeed').hide();
                clearInterval(timer);
                startTimer(timer);
                $('#value span').text("$" + (Math.floor(data.Value * 100) / 100).toFixed(2));
                $('#speedCoins').hide();
                $('#coinClicker').show();
                $('#gameNameClicker').show(); doc("value").style.visibility = "visible";
                doc("myProgress").style.visibility = "visible";
                doc("points").style.visibility = "visible";
                $('#message').text("Select the correct change amount below.");
                coinData = [data.SilverDollars, data.HalfDollars, data.Quarters, data.Dimes, data.Nickles, data.Pennies];
            })
}

function clearPanel() {
    document.getElementsByClassName('ansBlock').innerHTML = "";
}

function speedCoins() {
    $.getJSON('api/problems')
        .done(function (data) {
            var rnd = shuffle([1, 2, 3]);
            var rndWrong1 = shuffle([1, 1, 1, 0, 0, 0]);
            var rndWrong2 = shuffle([1, 1, 1, 0, 0, 0]);
            $('#value span').text("$" + (Math.floor(data.Value * 100) / 100).toFixed(2));
            // answer box (correct)
            doc(rnd[0].toString() + 'silverDollars').innerHTML = data.SilverDollars + ' : SilverDollars';
            doc(rnd[0].toString() + 'halfDollars').innerHTML = data.HalfDollars + ' : HalfDollars';
            doc(rnd[0].toString() + 'quarters').innerHTML = data.Quarters + ' : Quarters';
            doc(rnd[0].toString() + 'dimes').innerHTML = data.Dimes + ' : Dimes';
            doc(rnd[0].toString() + 'nickles').innerHTML = data.Nickles + ' : Nickles';
            doc(rnd[0].toString() + 'pennies').innerHTML = data.Pennies + ' : Pennies';
            doc(rnd[0].toString() + 'scrambleVersion').innerHTML = 1;
            // answer box (incorrect)
            doc(rnd[1].toString() + 'silverDollars').innerHTML = (data.SilverDollars + rndWrong1[0]) + ' : SilverDollars';
            doc(rnd[1].toString() + 'halfDollars').innerHTML = (data.HalfDollars + rndWrong1[1]) + ' : HalfDollars';
            doc(rnd[1].toString() + 'quarters').innerHTML = (data.Quarters + rndWrong1[2]) + ' : Quarters';
            doc(rnd[1].toString() + 'dimes').innerHTML = (data.Dimes + rndWrong1[3]) + ' : Dimes';
            doc(rnd[1].toString() + 'nickles').innerHTML = (data.Nickles + rndWrong1[4]) + ' : Nickles';
            doc(rnd[1].toString() + 'pennies').innerHTML = (data.Pennies + rndWrong1[5]) + ' : Pennies';
            doc(rnd[1].toString() + 'scrambleVersion').innerHTML = 0;
            // answer box (incorrect)
            doc(rnd[2].toString() + 'silverDollars').innerHTML = (data.SilverDollars + rndWrong2[0]) + ' : SilverDollars';
            doc(rnd[2].toString() + 'halfDollars').innerHTML = (data.HalfDollars + rndWrong2[1]) + ' : HalfDollars';
            doc(rnd[2].toString() + 'quarters').innerHTML = (data.Quarters + rndWrong2[2]) + ' : Quarters';
            doc(rnd[2].toString() + 'dimes').innerHTML = (data.Dimes + rndWrong2[3]) + ' : Dimes';
            doc(rnd[2].toString() + 'nickles').innerHTML = (data.Nickles + rndWrong2[4]) + ' : Nickles';
            doc(rnd[2].toString() + 'pennies').innerHTML = (data.Pennies + rndWrong2[5]) + ' : Pennies';
            doc(rnd[2].toString() + 'scrambleVersion').innerHTML = 0;
        });
};
//--AUDIO YET TO BE ADDED
function play() {
    var audio = doc("clickSound");
    audio.play();
}

function startTimer() {
    var elem = doc("myBar");
    var width = 0;
    timer = setInterval(frame, timeAllowed);
    function frame() {
        if (width == 100) {
            clearInterval(timer);
            $("#timesUpModal").modal({
                backdrop: 'static',
                keyboard: false
            })
        } else {
            if (points >= 50) {
                $("#winnerModal").modal({
                    backdrop: 'static',
                    keyboard: false
                })
                clearInterval(timer);
            }
            $('#points span').text(points);
            $('#silverPTS .pts').text(dollarNum);
            $('#halfPTS .pts').text(halfDollarNum);
            $('#quarterPTS .pts').text(quarterNum);
            $('#dimePTS .pts').text(dimeNum);
            $('#nicklePTS .pts').text(nickleNum);
            $('#pennyPTS .pts').text(pennyNum);
            width++;
            elem.style.width = width + '%';
        }
    }
}

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

function formatItem(item) {
    return item.Value + " " + item.ScrambleVersion;
}

function doc(id) {
    var doc = document.getElementById(id);
    return doc;
};

function show() {
    document.getElementById('body_holder').style.visibility = 'visible';
}
//<--- START TEST AREA --->





//<--- END TEST AREA --->


