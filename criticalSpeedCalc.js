/******************************
 * criticalSpeedCalc.js
 * Copyright © 2014 Stefan Horne
 * Zapp Automation Ltd.
 * Release -
 *******************************/


 function calcSpeed() {

    document.calculator.speed.value = Math.round((document.calculator.fixity.value * document.calculator.unit.value * document.calculator.root.value) / (document.calculator.bearings.value * document.calculator.bearings.value));

}

function calcRoot() {

    document.calculator.root.value = roundit((document.calculator.speed.value * document.calculator.bearings.value * document.calculator.bearings.value) / (document.calculator.fixity.value * document.calculator.unit.value), 2);

}

function calcWidth() {

    document.calculator.bearings.value = roundit(Math.sqrt((document.calculator.fixity.value * document.calculator.unit.value * document.calculator.root.value) / (document.calculator.speed.value)), 1);

}
// Checks which input fields are empty to infer user's desired operation
function checkOp() {

    var root = document.calculator.root.value;
    var bearings = document.calculator.bearings.value;
    var speed = document.calculator.speed.value;

    if ((root !== "") && (bearings !== "") && ((speed !== "") || (speed === ""))) {
        calcSpeed();
    } else if ((root !== "") && (bearings === "") && (speed !== "")) {
        calcWidth();
    } else if ((root === "") && (bearings !== "") && (speed !== "")) {
        calcRoot();
    }

}


var valid = false;

// Validates user input
function validate() {
    valid = false;

    var root = document.calculator.root.value;
    var bearings = document.calculator.bearings.value;
    var speed = document.calculator.speed.value;

    if ((root === "") && (bearings === "") && (speed === "")) {
        return (false);
    } else if ((root === "") && ((bearings === "") || (speed === ""))) {
        alert("Please enter at least two values");
        return (false);
    } else if (((root === "") || (bearings === "")) && (speed === "")) {
        alert("Please enter at least two values");
        return (false);
    } else if ((root < 0) || (bearings < 0) || (speed < 0)) {
        alert("Please enter a positive value");
        return (false);
    } else if (isNaN(root) || isNaN(bearings) || isNaN(speed)) {
        alert("Please enter a valid number");
        return (false);
    } else {
        valid = true;
    }
    return (valid);

}

// Change labels depending on unit of measure selected
$(document).ready(function () {
    $("select[name = unit]").change(function () {
        // Store current value selected
        var selected = $("option:selected", this).text().trim();

        if (selected == "Metric (mm)") {
            $("label[for = unit]").text("mm");
        } else if (selected == "Imperial (inches)") {
            $("label[for = unit]").text("in");
        }

        Calculate();

    });

});

function Calculate() {

    if (validate()) {
        checkOp();
    }

}

function roundit(Num, Places) {
    if (Places > 0) {
        if ((Num.toString().length - Num.toString().lastIndexOf('.')) > (Places + 1)) {
            var Rounder = Math.pow(10, Places);
            return Math.round(Num * Rounder) / Rounder;
        } else return Num;
    } else return Math.round(Num);
}

function reset()
{
	document.calculator.root.value = "";
    document.calculator.bearings.value = "";
    document.calculator.speed.value = "";
    
    $("select#unit, select[name=fixity]").prop('selectedIndex',0);
    $("label[for = unit]").text("mm");
}