/******************************
 * columnStrengthCalc.js
 * Copyright © 2014 Stefan Horne
 * Zapp Automation Ltd.
 * Release -
 *******************************/

function calcSlenderLoad(num1, k)
{
	
	"use strict";
	
	if (((k*document.calculator.bearings.value*4) / document.calculator.root.value) > 200)
	{	
		alert("The Slenderness Ratio for this diameter has been exceeded.");
	}
	else
	{
		return(num1);
	}
}

function calcSlenderRoot(num1, k)
{
	if (((k*document.calculator.bearings.value*4) / num1) > 200)
	{
		return ((k*document.calculator.bearings.value*4) / 200);
	}
	else 
	{
		return(num1);
	}
}

function calcSlenderWidth(num1, k)
{
	if (((k*num1*4) / document.calculator.root.value) > 200)
	{
		return (Math.round((document.calculator.root.value*200) / (k*4)));
	}
	else 
	{
		return (num1);
	}
}

function getLFactor()
{
	
	var fixity = document.calculator.fixity.value;
	var k = 0;
	
	if (fixity == 0.25)
	{
		k = 2.0;
	}
	else if (fixity == 1.0)
	{
		k = 1.0;
	}
	else if (fixity == 2.0)
	{
		k = 0.7;
	}
	else if (fixity == 4.00)
	{
		k = 0.5;
	}
	
	return(k);
	
}

function calcLoad() {

   document.calculator.maxload.value = calcSlenderLoad(Math.round((document.calculator.unit.value*document.calculator.fixity.value*Math.pow(document.calculator.root.value,4) / Math.pow(document.calculator.bearings.value,2))), getLFactor());

}

function calcRoot() {

    document.calculator.root.value = calcSlenderRoot(roundit(Math.pow((Math.pow(document.calculator.bearings.value,2)*document.calculator.maxload.value / (document.calculator.fixity.value*document.calculator.unit.value)),0.25),2), getLFactor());

}

function calcWidth() {

    document.calculator.bearings.value = calcSlenderWidth(roundit(Math.sqrt(document.calculator.unit.value*document.calculator.fixity.value*Math.pow(document.calculator.root.value,4)/(document.calculator.maxload.value)),1), getLFactor());

}

// Checks which input fields are empty to infer user's desired operation
function checkOp() {

    var root = document.calculator.root.value;
    var bearings = document.calculator.bearings.value;
    var maxload = document.calculator.maxload.value;

    if ((root !== "") && (bearings !== "") && ((maxload !== "") || (maxload === ""))) {
        calcLoad();
    } else if ((root !== "") && (bearings === "") && (maxload !== "")) {
        calcWidth();
    } else if ((root === "") && (bearings !== "") && (maxload !== "")) {
        calcRoot();
    }

}

var valid = false;

// Validates user input
function validate() {
    valid = false;

    var root = document.calculator.root.value;
    var bearings = document.calculator.bearings.value;
    var maxload = document.calculator.maxload.value;

    if ((root === "") && (bearings === "") && (maxload === "")) {
        return (false);
    } else if ((root === "") && ((bearings === "") || (maxload === ""))) {
        alert("Please enter at least two values");
        return (false);
    } else if (((root === "") || (bearings === "")) && (maxload === "")) {
        alert("Please enter at least two values");
        return (false);
    } else if ((root < 0) || (bearings < 0) || (maxload < 0)) {
        alert("Please enter a positive value");
        return (false);
    } else if (isNaN(root) || isNaN(bearings) || isNaN(maxload)) {
        alert("Please enter a valid number");
        return (false);
    } else {
        valid = true;
    }
    return (valid);

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
    document.calculator.maxload.value = "";
	
	$("select#unit, select[name=fixity]").prop('selectedIndex',0);
	$("label[for = unit]").text("mm");
	$("label#maxload").text("n");
}

function Calculate() {

    if (validate()) {
        checkOp();
    }

}

// Change labels depending on unit of measure selected
$(document).ready(function () {
    $("select[name = unit]").change(function () {
        // Store current value selected
        var selected = $("option:selected", this).text().trim();

        if (selected == "Metric (mm)") {
            $("label[for = unit]").text("mm");
			$("label#maxload").text("n");
        } else if (selected == "Imperial (inches)") {
            $("label[for = unit]").text("in");
			$("label#maxload").text("lbs.");
        }

        Calculate();

    });

});