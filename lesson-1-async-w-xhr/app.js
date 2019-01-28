(function () {
    const searchedForText = '';
    const unsplashRequest = new XMLHttpRequest();
    unsplashRequest.onload = addImage;
    unsplashRequest.onerror = function (err) {
        requestError = (err, 'image');
    }
    unsplashRequest.open('GET', `https://api.unsplash.com/search/photos?page=1&query=${searchedForText}`);
    unsplashRequest.setRequestHeader('Authorization', 'Client-ID 1656c584143a5c9d2205b32008e764ef8a4cc34f9a95b3c9b39464dedb492e96');
    unsplashRequest.send();

    function addImage(){
        let htmlContent = "";
        const data = JSON.parse(this.responseText);
        
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
    
    function addArticles () {}
    const articleRequest = new XMLHttpRequest();
    articleRequest.onload = addArticles;
    articleRequest.open('GET', `http://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchedForText}&api-key=<144585c9-db15-402c-92bd-e94a7ea37794
>`);
    articleRequest.send();
    
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        responseContainer.innerHTML = '';
        searchedForText = searchField.value;
    });
})();
