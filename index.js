'use strict';


function getUserRepos(userHandle) {
  fetch(`https://api.github.com/users/${userHandle}/repos`)
    .then(handleErrors)
    .then(response => response.json())
    .then(responseJson => 
      displayResults(responseJson))
    .catch(error => alert(error));
}

function handleErrors(response) {
    if (!response.ok) {
      throw Error(response.statusText);
    }
    return response;
}


function displayResults(responseJson) {
  console.log(responseJson);
  for (let i=0; i<responseJson.length; i++){
    $('.results').append(
    `<h4>${i+1}. ${responseJson[i].name}</h4>
    <p>${responseJson[i].html_url}</p>`
    );  
  }
  //display the results section
  $('.results').removeClass('hidden');
}

function watchForm() {
  $('form').submit(event => {
    let userHandle = $('#user-handle-search').val();
    event.preventDefault();
    $('.results').empty();
    getUserRepos(userHandle);
     $('#user-handle-search, textarea').val('');
  });
}

$(watchForm);