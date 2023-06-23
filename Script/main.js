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
geeksForgeeks.com
https://jquery.com/
sitepoint.com/basic-jquery-form-validation-tutorial/
Traversy https://www.youtube.com/watch?v=hdI2bqOjy3c&t=4419s
https://stackoverflow.com/questions/19625646/javascript-adding-an-id-attribute-to-another-created-element
https://stackoverflow.com/questions/27392899/rows-disappearing-when-adding-them-dynamically-to-table-with-js-jquery
https://stackoverflow.com/questions/38447344/create-jquery-validate-rule-for-positive-whole-numbers
*/

 

const table = document.getElementById("mlttable");
const tableRange= [null, null, null,null];  //min x, min y, max x, max y

// Digit broken code:
// digit: true,
// digit: jQuery.validator.format("Please select whole Column number (ex. -1,0,1,2)")  
$(function() {
    
    function validate(){
       var validator =  $("form").validate({
            rules:{
                minX:{
                    required: true,
                    min: -50,
                    max: 50,
                },
                minY:{
                    required: true,
                    min: -50,
                    max: 50,
                    
                },
                maxX:{
                    required: true,
                    min: -50,
                    max: 50,

                },
                maxY:{
                    required: true,
                    min: -50,
                    max: 50,
                },
            },
            messages:{
                minX:{
                    required: jQuery.validator.format("Minimum Column Required"),
                    min: jQuery.validator.format("Please select Column number greater than -51"),
                    max: jQuery.validator.format("Please select Column number less than 51"),
                   
                    
                },
                minY:{
                    required: jQuery.validator.format("Minimum Row Required"),
                    min: jQuery.validator.format("Please select Row number greater than -51"),
                    max: jQuery.validator.format("Please select Row number less than 51"),

                },
                maxX:{
                    required: jQuery.validator.format("Maximum Column Required"),
                    min: jQuery.validator.format("Please select Column number greater than -51"),
                    max: jQuery.validator.format("Please select Column number less than 51"),
                   
                },
                maxY:{
                    required: jQuery.validator.format("Maximum Row Required"),
                    min: jQuery.validator.format("Please select Row number greater than -51"),
                    max: jQuery.validator.format("Please select Row number less than 51"),
                   
                },


            },
            showErrors: function(errorMap, errorList) {
                $("#summary").html("Your form contains "
                  + this.numberOfInvalids()
                  + " errors, see details below.");
                this.defaultShowErrors();
              },
          
            
        })
        // console.log($minX.val())
        // $numErrs=validator.numberOfInvalids();
        validator.resetForm();
        // return ($numErrs==0);
}
    
    $("#minX").change(function(e){
        e.preventDefault();
        console.log()
        tableRange[0] = Number($("#minX").val());
        validate();
        readyTable();
    });
    $("#minY").change(function(e){
        e.preventDefault();
        tableRange[1] = Number($("#minY").val());
        validate();
        readyTable();
    });
    $("#maxX").change(function(e){
        e.preventDefault();
        tableRange[2] = Number($("#maxX").val());
        validate();
        readyTable();
        
    });
    $("#maxY").change(function(e){
        e.preventDefault();
        tableRange[3] = Number($("#maxY").val());
        validate();
        readyTable();
        
    });
    
    //check if program is ready to create new table
    function readyTable(){
        if ((tableRange[0] != null&&tableRange[1] != null &&tableRange[3] != null && tableRange[2] != null))
        if ($("form").valid()){
            $("#info").text('');
            if (tableRange[0]>tableRange[2]){
                $("#info").append("Minimum row is larger than the max so program has switched them")
                var tempx=tableRange[0];
                tableRange[0]=tableRange[2];
                tableRange[2]=tempx;  
            }
            if (tableRange[1]>tableRange[3]){
                $("#info").append(" Minimum row is larger than the max so program has switched them")
                var tempx=tableRange[1];
                tableRange[1]=tableRange[3];
                tableRange[3]=tempx;  
            }
                makeTable();
       }
    
    }

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

       
    }
});