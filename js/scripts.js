$(document).ready(function () {
    $.ajax({
      url: 'https://randomuser.me/api/?results=12',
      dataType: 'json',
      success: function(data) {
        getData(data);
        //console.log(data);
      }
    });
});

/**
    This function retrieves results from API and
    calls showDirectory() to display employees
**/
function getData (data) {
    let results = data.results;
    results.forEach(result => {
        showDirectory(result.name.first,
                                    result.name.last,
                                    result.email,
                                    result.location.city,
                                    result.picture.large);
    });

    $('.card').click( (e) => {
        console.log(results[e]);
    });
}

/**
    Displays employees (gallery)
**/
function showDirectory (first, last, email, city, picture) {
    let card = document.createElement('div');
    card.className = 'card';

    // Creates profile picture
    let cardImage = '<div class="card-img-container">';
    cardImage += '<img class="card-img" src= " ' + picture + ' " alt="profile picture">';
    cardImage += '</div>';

    // Creates information section of card
    let cardInfo = '<div class="card-info-container">';
    cardInfo += '<h3 id="name" class="card-name cap">' + first + ' ' + last + '</h3>';
    cardInfo += '<p class="card-text">' + email + '</p>';
    cardInfo += '<p class="card-text cap">' + city + '</p>';
    cardInfo += '</div>';

    // Adds above to .card div
    card.innerHTML = cardImage;
    card.innerHTML += cardInfo;

    $('#gallery').append(card); // Appends .card div to #gallery div
}

function showModal (first, last, email, city, picture, phone, location, birthday) {
    let modalContainer = document.createElement('div');
    modalContainer.className = 'modal-container';

    // Adds all information to modalContainer
    modalContainer += '<div class="modal">';
    modalContainer += '<button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>';
    modalContainer += '<div class="modal-info-container">';
    modalContainer += '<img class="modal-img" src=" ' + picture + ' " alt="profile picture">';
    modalContainer += '<h3 id="name" class="modal-name cap">' + first + ' ' + last + '</h3>';
    modalContainer += '<p class="modal-text">' + email + '</p>';
    modalContainer += '<p class="modal-text cap">' + city + '</p> <hr/>';
    modalContainer += '<p class="modal-text">' + phone + '</p>';
    modalContainer += '<p class="modal-text">' + location + '</p>';
    modalContainer += '<p class="modal-text">Birthday: ' + birthday + '</p>';
    modalContainer += '</div>'; // End .modal-info-container
    modalContainer += '</div>'; // End .modal

    $('body').append(modalContainer); // Appends modal to body when card is clicked
}
