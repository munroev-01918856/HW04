/*File: main.js
GUI Assignment: HW 3-Create multiplication table
Victoria Munroe victoria_munroe@student.uml.edu
Description: Website to take input & return multiplication table
This page holds the jquery & JS code

Copyright (c) 2023 by VMunroe. All rights reserved. May be freely copied or excerpted for educational purposes with credit to the author.
created by VM 06/15/23

Sources: 
w3Schools w3schools.com
tutorialrepublic.com/faq/how-to-get-the-value-in-an-input-text-box-using-jquery.php#:~:text=Answer%3A%20Use%20the%20jQuery%20val,in%20an%20alert%20dialog%20box.
TutorialsPoint 
https://jquery.com/
https://www.geeksforgeeks.org/how-to-get-the-objects-name-using-jquery/
Traversy https://www.youtube.com/watch?v=hdI2bqOjy3c&t=4419s
https://stackoverflow.com/questions/19625646/javascript-adding-an-id-attribute-to-another-created-element
https://stackoverflow.com/questions/27392899/rows-disappearing-when-adding-them-dynamically-to-table-with-js-jquery
*/
 

const table = document.getElementById("mlttable");
$error=false;
$ready=false;
var errmsg="";
const tableRange= [null, null, null,null];  //min x, min y, max x, max y

// Disable calculate until no errors


function validate($button) {
    const regEx = /^-?[0-9]+$/;
    if (!regEx.test($button.val())) {
        $error = true;
        errmsg ="Please check input " +$button.attr("name") + " number must be a whole number";
    }
    else if (($button.val() < -50) || ($button.val() > 50)) {
        $error = true;
        errmsg = $button.attr("name") + " must be between -50 and 50";
    }
    else {
        $error = false;
        errmsg = "";
    }
    if ((tableRange[0] != null && tableRange[2] != null) && (tableRange[0] > tableRange[2])) {
        $error = true;
        errmsg ="Minimum row number must be smaller than maximum row number"
    }
    if ((tableRange[1] != null && tableRange[3] != null) && (tableRange[1] > tableRange[3])) {
        $error = true;
        errmsg ="Minimum column number must be smaller than maximum row number"
    }
    if (!$error) {
        $('#minX').prop('disabled', false);
        $('#minY').prop('disabled', false);
        $('#maxX').prop('disabled', false);
        $('#maxY').prop('disabled', false);
        if (!$error && tableRange[0] != null && tableRange[1] != null && tableRange[2] != null && tableRange[3] != null) { $ready=true; }
    }
    else {
        $('#minX').prop('disabled', true);
        $('#minY').prop('disabled', true);
        $('#maxX').prop('disabled', true);
        $('#maxY').prop('disabled', true);
        $button.prop('disabled', false);
    }
    
    // msg.classList.add('error');
   $("#errMsg").text(errmsg);
    return $ready;
}

// Input Listeners

$("#minX").change(function(e){
    e.preventDefault();
    tableRange[0] = Number($("#minX").val());
    if(validate($("#minX")))
        makeTable();
  });
$("#minY").change(function(e){
    e.preventDefault();
    tableRange[1] = Number($("#minY").val());
    if (validate($("#minY"))) makeTable();
});
$("#maxX").change(function(e){
    e.preventDefault();
    tableRange[2] = Number($("#maxX").val());
    if(validate($("#maxX")))makeTable();
});
$("#maxY").change(function(e){
    e.preventDefault();
    tableRange[3] = Number($("#maxY").val());
    if (validate($("#maxY")))makeTable();
    
});
  

//create dynamic table
function makeTable() {
    table.innerHTML = ""; //clear old table
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