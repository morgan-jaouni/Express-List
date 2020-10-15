//Event listener for signup button

$('#sign-up').on("click", (event) => {

    $('.user-cover').animate({right: '110%'});

});


// searchbar for listings
function searchBar() { 
    let input = document.getElementById('input-bar').value 
    input=input.toLowerCase(); 
    let x = document.getElementsByClassName('search'); 
      
    for (i = 0; i < x.length; i++) {  
        if (!x[i].innerHTML.toLowerCase().includes(input)) { 
            x[i].style.display="none"; 
        } 
        else { 
            x[i].style.display="block";
        };
    };
};