// File: main.js
// GUI Assignment: HW 3-Create multiplication table
// Victoria Munroe victoria_munroe@student.uml.edu
// Description: Website to take input & return multiplication table
// This page holds the html scaffoliding

// Copyright (c) 2023 by VMunroe. All rights reserved. May be freely copied or excerpted for educational purposes with credit to the author.
// created by VM 06/02/23

// Sources: 
// w3Schools w3schools.com
//tutorialrepublic.com/faq/how-to-get-the-value-in-an-input-text-box-using-jquery.php#:~:text=Answer%3A%20Use%20the%20jQuery%20val,in%20an%20alert%20dialog%20box.
// TutorialsPoint 
//https://jquery.com/
//https://www.geeksforgeeks.org/how-to-get-the-objects-name-using-jquery/
// Traversy https://www.youtube.com/watch?v=hdI2bqOjy3c&t=4419s
//https://stackoverflow.com/questions/19625646/javascript-adding-an-id-attribute-to-another-created-element
 

/*
Todo:
mid:
table not shrinking
make prettier
input alignment off

low:
fix validation
*/

var minXInput= document.querySelector("#minX");
var minYInput =document.querySelector("#minY");
var maxXInput =document.querySelector("#maxX");
var maxYInput = maxY = document.querySelector("#maxY");
const table = document.getElementById("mlttable");
var error=false;
var errmsg="";
const msg = document.querySelector('.msg');
// const btn = document.querySelector('.btn')
var x = false;
const tableRange= [null, null, null,null];  //min x, min y, max x, max y

// Disable calculate until no errors
$('.btn').prop('disabled', true);


function validate($button, $num) {
    const regEx = /^-?[0-9]+$/;
    if (!regEx.test($button.val())) {
        error = true;
        console.log("true")
        errmsg ="Please check input " +$button.attr("name") + " number must be a whole number";
    }
    else if (($button.val() < -50) || ($button.val() > 50)) {
        error = true;
        errmsg = $button.attr("name") + " must be between -50 and 50";
    }
    else {
        error = false;
        errmsg = "";
    }
    if ((tableRange[0] != null && tableRange[2] != null) && (tableRange[0] > tableRange[2])) {
        error = true;
        errmsg ="Minimum row number must be smaller than maximum row number"
    }
    if ((tableRange[1] != null && tableRange[3] != null) && (tableRange[1] > tableRange[3])) {
        error = true;
        errmsg ="Minimum column number must be smaller than maximum row number"
    }
    if (!error) {
        minXInput.disabled = false;
        minYInput.disabled = false;
        maxXInput.disabled = false
        maxYInput.disabled = false;
        if (!error && tableRange[0] != null && tableRange[1] != null && tableRange[2] != null && tableRange[3] != null) { $('.btn').prop('disabled', false); }
        else { $('.btn').prop('disabled', true);}   
    }
    else {
        minXInput.disabled = true;
        minYInput.disabled = true;
        maxXInput.disabled=true
        maxYInput.disabled = true;
        $('.btn').prop('disabled', true);
        $button.prop('disabled', false);
    }
    
    msg.classList.add('error');
    msg.innerHTML = errmsg;
    return error;
}

// Input Listeners

$("#minX").change(function(){
    // console.log("JQ value"+ $("#minX" )
    tableRange[0] = Number($("#minX").val());
    validate($("#minX"), tableRange[0]);
  });
  $("#minY").change(function(){
    tableRange[1] = Number(minYInput.value);
    validate(minYInput,"Minimum column number ",tableRange[1]);
});
$("#maxX").change(function(){
    tableRange[2] = Number(maxXInput.value);
    validate(maxXInput,"Maximum row number",tableRange[2]);
});
$("#maxY").change(function(){
    tableRange[3] = Number(maxYInput.value);
    validate(maxYInput,"Maximum column number",tableRange[3]);
    
});
  
$('.btn').click(function(){
    // e.preventDefault();
    makeTable();
   
});

//create dynamic table
function makeTable() {
    table.innerHTML = ""; //clear old table
    x = true;
    console.log("Calculating Table");
    console.log("Min X: " + tableRange[0] + "Min Y: " + tableRange[1] + "Max X: " + tableRange[2] + "Max Y: " + tableRange[3]);
    var y = tableRange[1];
    var rowIndex = 1;
    var colIndex = 0;
    var row;
    var headerRow;
    var cell;
    var header = table.createTHead();
    
    //create header
    headerRow = header.insertRow(0);
    //headerRow.setAttribute("class", "headers"); //TH is bolded by default
    var headerCell = document.createElement("TH"); //create a blank top-left cell
    headerRow.appendChild(headerCell);
    for (let x = tableRange[0]; x <= tableRange[2]; x++){
        headerCell = document.createElement("TH"); //TH is bolded by default
        headerCell.innerHTML = x;
        headerRow.appendChild(headerCell);

    }

    //Calculate table contents
    while (y <= tableRange[3]) {
	//colIndex = 0;
        console.log("New Row: " +y);
        row = table.insertRow(rowIndex);
	
	//create left column header
	var headerColumnCell = row.insertCell(0);
	headerColumnCell.innerHTML = y;
	headerColumnCell.setAttribute("class", "headers");
	
	//create rest of the row
	colIndex = 1; //0th column was header
        for (let x = tableRange[0]; x <= tableRange[2]; x++){
            cell = row.insertCell(colIndex);
            cell.innerHTML = y * x;
            // console.log("Row " + x+ " Column " + y);
            // console.log("Resut" + (x * y));
            colIndex++;
        }
        y++;
        rowIndex++;
    }

    // row = table.insertRow(0);
    // cell = row.insertCell(0);
    // var cell2 = row.insertCell(1);
    // cell.innerHTML = "Hi";
    // cell2.innerHTML = "world";
}