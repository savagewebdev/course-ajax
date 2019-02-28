(function () {
    const form = document.querySelector('#search-form');
    const searchField = document.querySelector('#search-keyword');
    let searchedForText;
    const responseContainer = document.querySelector('#response-container');

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        responseContainer.innerHTML = '';
        searchedForText = searchField.value;

        fetch('url......${searchedForText}', {
          headers: {
            Authorization: 'Client-ID 123123123123123123123',
          },
          method: "POST",
          headers: "Content-Type: application/graphql",


        })

        .then(response => response.JSON())
        .then(addImage) // or articles
        .catch(err => requestError(err, 'image')); // Request error function...
     }); // with the error and that it was the 'image' function that failed.

     function addImage(data) { // images parameter added.
         let htmlContent = '';
 //        const data = JSON.parse(this.responseText); No longer needed.

         if (data && data.results && data.results[0]) {
             const firstImage = data.results[0];
             htmlContent = `<figure>
                 <img src="${firstImage.urls.regular}" alt="${searchedForText}">
                 <figcaption>${searchedForText} by ${firstImage.user.name}</figcaption>
             </figure>`;
         } else {
             htmlContent = '<div class="error-no-image">No images available</div>';
         }

         responseContainer.insertAdjacentHTML('afterbegin', htmlContent);
     }

     function addArticles(data) { // data to be found in API itself? Perhaps.
         let htmlContent = '';
 //        const data = JSON.parse(this.responseText);

         if (data.response && data.response.docs && data.response.docs.length > 1) {
             htmlContent = '<ul>' + data.response.docs.map(article => `<li class="article">
                     <h2><a href="${article.web_url}">${article.headline.main}</a></h2>
                     <p>${article.snippet}</p>
                 </li>`
             ).join('') + '</ul>';
         } else {
             htmlContent = '<div class="error-no-articles">No articles available</div>';
         }

         responseContainer.insertAdjacentHTML('beforeend', htmlContent);
     }

     function requestError(err, part) {
         console.log(err);
})();
