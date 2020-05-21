var items = [];
var categories = [];
var serverURL = "http://localhost:8080/API/";


function fetchCatalog() {

    //get items from server
    $.ajax({
        url: serverURL + "items",
        type: "GET",
        success: function (response) {
            console.log("response: ", response);
            for (var i = 0; i < response.length; i++) {
                var item = response[i];

                if (item.user == "Gill") {
                    items.push(item);
                }
            }

            displayCatalog();

        },
        error: function (errorDetails) {
            console.log("Error: ", errorDetails);
        }
    });

}

function displayCatalog() {
    //travel the array
    for (var i = 0; i < items.length; i++) {
        //get the item
        var item = items[i];
        //draw the item on the DOM (html)
        drawItem(item);

        var cat = item.category;
        //if not categories contains the cat
        if (!categories.includes(cat)) {
            //then push cat into categories
            categories.push(cat);
        }
    }
    console.log(categories);
    drawCategories();
}


function drawItem(item) {
    //create the sintax
    var sntx =
        `<div class='item'> 
    <label class='ecn'>${item.ecn}</label> 
    <label class='notes' >${item.notes}</label>

    <label class='location'>${item.location}</label> 

    </div>`;

    //get the element from the screen
    var container = $("#catalog");

    //append the sintax to the element
    container.append(sntx);
}

function search() {


    var text = $("#txtSearch").val().toLowerCase(); //get the text

    //clear previous results
    $("#catalog").html("");

    //travel array and only show items containing the text
    for (var i = 0; i < items.length; i++) {
        var item = items[i];

        //if the description contains the text,
        //OR the category contains the text,
        //OR the code is equal to the text,
        //OR the price is equal to the text
        //then show the item on the screen


        //if the title contains the text, then show the item on the screen
        if (item.description.toLowerCase().includes(text)
            || item.category.toLowerCase().includes(text)
            || item.ecn == text
            || item.location == text

        ) {
            drawItem(item);
        }
    }
}
function searchByCategory(catName){
    console.log("Search by cat", catName);
    //clear 
$("#catalog").html("");
    //travel array
    for (var i = 0; i < items.length; i++) {
        var item = items[i];

        if(item.category.toLowerCase() == (catName.toLowerCase()) ){
            drawItem(item);
        }

}
}



function init() {
    console.log("This is catalog page!");


    //get data
    fetchCatalog();
    displayCatalog();

    //hook events
    $("#btnSearch").click(search);
    $("#txtSearch").keypress(function (e) {
        if (e.keyCode == 13) {
            search();
        }
    });

    $("#catalog").on("click", ".item", function () {

        // $(this).toggleClass("selected");

        // get the image of the clicked element
        var img = $(this).find('img').clone();

        $(".modal-body").html(img);
        $("#modal").modal();

    });

}
//HTTP Methods for next class
//HTTP status codes for next class

window.onload = init;

