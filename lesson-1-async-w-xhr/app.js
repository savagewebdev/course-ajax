(function () {
        form.addEventListener('submit', function (e) {
        e.preventDefault();
        responseContainer.innerHTML = '';
        searchedForText = searchField.value;
    });
    
    const searchedForText = '';
    const unsplashRequest = new XMLHttpRequest();
    unsplashRequest.onload = addImage;
    unsplashRequest.onerror = function (err) {
        requestError = (err, 'image');
    }
    unsplashRequest.open('GET', `https://api.unsplash.com/search/photos?page=1&query=${searchedForText}`);
    unsplashRequest.setRequestHeader('Authorization', 'Client-ID 4d38c65773a6eb0bf1557e5770a8b121e2c38d56a4763a81bbd05974586dbb24');
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
    
    function addArticles () {
        let htmlContent
    const articleRequest = new XMLHttpRequest();
    articleRequest.onload = addArticles;
    articleRequest.open('GET', `http://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchedForText}&api-key=<144585c9-db15-402c-92bd-e94a7ea37794
>`);
    articleRequest.send();
    };

})();
