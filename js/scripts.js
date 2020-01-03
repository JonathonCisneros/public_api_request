$(document).ready(function () {
    $.ajax({
      url: 'https://randomuser.me/api/?results=12&nat=us',
      dataType: 'json',
      success: function(data) {
        getData(data);
        console.log(data);
      }
  }); // End AJAX request
}); // End $.ready

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

    // Retrieves user's clicked card information
    $('.card').click( function () {
        let index = $('.card').index(this);
        let first = results[index].name.first;
        let last = results[index].name.last;
        let email = results[index].email;
        let city = results[index].location.city;
        let picture = results[index].picture.large;
        let phone = results[index].cell;
        let location = results[index].location.city
                                + ', ' + results[index].location.state
                                + ' ' + results[index].location.postcode;

        let birthdayString = results[index].dob.date.substring(0, 10); // Gets birthday string e.g. '1997-05-25'
        let birthMonth = birthdayString.substring(5,7); // Gets birthday month
        let birthDay = birthdayString.substring(8,10); // Gets birthday day
        let birthYear = birthdayString.substring(0,4); // Gets birthday year
        let birthday = birthMonth + '/' + birthDay + '/' + birthYear; // Birthday formatted

        showModal(first, last, email, city, picture, phone, location, birthday); // Calls showModal() with user-selected card information
    });
} // End getData//

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
    card.innerHTML += cardImage;
    card.innerHTML += cardInfo;

    $('#gallery').append(card); // Appends .card div to #gallery div
} // End showDirectory()

function showModal (first, last, email, city, picture, phone, location, birthday) {
    let modalContainer = document.createElement('div');
    modalContainer.className = 'modal-container';

    // Adds all information to modalContainer
    let modal = '';
    modal += '<div class="modal">';
    modal += '<button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>';
    modal += '<div class="modal-info-container">';
    modal += '<img class="modal-img" src=" ' + picture + ' " alt="profile picture">';
    modal += '<h3 id="name" class="modal-name cap">' + first + ' ' + last + '</h3>';
    modal += '<p class="modal-text">' + email + '</p>';
    modal += '<p class="modal-text cap">' + city + '</p> <hr/>';
    modal += '<p class="modal-text">' + phone + '</p>';
    modal += '<p class="modal-text cap">' + location + '</p>';
    modal += '<p class="modal-text">Birthday: ' + birthday + '</p>';
    modal += '</div>'; // End .modal-info-container
    modal += '</div>'; // End .modal

    modalContainer.innerHTML = modal; // Adds HTML to modalContainer
    $('body').append(modalContainer); // Appends modal to body when card is clicked

    // Closes modal when user clicks 'X'
    $('.modal-close-btn').click(function () {
        modalContainer.remove();
    });
} // End showModal()
