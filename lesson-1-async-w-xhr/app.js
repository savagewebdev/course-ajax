(function () {
    const searchedForText = 'Kavanaugh';
    const unsplashRequest = new XMLHttpRequest();

    unsplashRequest.open('GET', `https://api.unsplash.com/search/photos?page=1&query=${searchedForText}`);
    unsplashRequest.onload = addImage;
    unsplashRequest.setRequestHeader('Authorization', 'UdacitySplash');
    unsplashRequest.send();

    function addImage(){
        let htmlContent = "";
        const data = JSON.parse(this.responseText);
        
        if (if data && data.results && data.results[0]) {
        
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
    
    
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        responseContainer.innerHTML = '';
        searchedForText = searchField.value;
    });
})();
