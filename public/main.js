document.addEventListener('DOMContentLoaded', function(event) {
  console.log("DOM fully loaded and parsed");

  let body = document.body;

  function fetchJSONData(path, callback) {
    let httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = function() {
      if(httpRequest.readyState == 4 & httpRequest.status == 200) {
        let data = JSON.parse(httpRequest.responseText);
        if (callback) callback(data);
      }
    } 
    httpRequest.open('GET', path, true);
    httpRequest.send(null); 
  }

  // Add event listener to each of the rats in the carousel
  let ratPics = document.getElementsByClassName('ratPic');
  for (const ratPic of ratPics) {
    ratPic.addEventListener('click', function(event) {
      // clear out modal from last time it was populated with data
      let modal = document.getElementById('ratModalBody');
      modal.innerHTML = "";

      // Make the GET url by using the rat's name
      const getUrl = 'getrat?name=' + ratPic.getAttribute('id');

      // Make a request to fetch the data for this specific rat
      fetchJSONData(getUrl, function(data) {
      // Save data in a rat object
      const rat = data;
        
      // Create unorder list element to append rattie data to
      const ratInfoList = document.createElement('ul');
      ratInfoList.setAttribute('style', 'list-style: none');

      // Change modal title to rat name
      const ratName = document.getElementById('ratTitle');
      ratName.innerHTML = rat[0]['name'];

      // Create list element and append img to it
      const ratImgLi = document.createElement('li');
      const ratImg = document.createElement('img');
      ratImg.setAttribute('src', rat[0]['imgUrl']);
      ratImg.setAttribute('alt', rat[0]['imgAlt']);
      ratImgLi.appendChild(ratImg);
        
      // Create list element and add age value to it
      const ratAgeLi = document.createElement('li');
      ratAgeLi.innerHTML = 'Age: ' + rat[0]["age"] + ' months';

      // Create list element and add sex value to it
      const ratSexLi = document.createElement('li');
      ratSexLi.innerHTML = 'Sex: ' + rat[0]['sex'];

      // Create list element and add favorite treat to it
      const ratTreatLi = document.createElement('li');
      ratTreatLi.innerHTML = 'Favorite Treat: ' + rat[0]['favoriteTreat'];

      // Create list element and add description to it
      const ratDescLi = document.createElement('li');
      ratDescLi.innerHTML = rat[0]['description'];

      // Append all of the list elements to the list
      // Add break lines in between list items
      ratInfoList.appendChild(ratImgLi);
      ratInfoList.appendChild(document.createElement('br'));
      ratInfoList.appendChild(ratAgeLi);
      ratInfoList.appendChild(document.createElement('br'));
      ratInfoList.appendChild(ratSexLi);
      ratInfoList.appendChild(document.createElement('br'));
      ratInfoList.appendChild(ratTreatLi);
      ratInfoList.appendChild(document.createElement('br'));
      ratInfoList.appendChild(ratDescLi);
      
      // append list element to modal body
      modal.appendChild(ratInfoList);
    });
  });
  }
});





