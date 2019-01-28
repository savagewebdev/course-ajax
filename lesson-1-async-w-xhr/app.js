(function () {
    const searchedForText = 'Kavanaugh';
    const unsplashRequest = new XMLHttpRequest();

    unsplashRequest.open('GET', `https://api.unsplash.com/search/photos?page=1&query=${searchedForText}`);
    unsplashRequest.onload = addImage;
    unsplashRequest.setRequestHeader('Authorization', 'UdacitySplash');
    unsplashRequest.send();

    function addImage(){
        debugger;
    }
    
    
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        responseContainer.innerHTML = '';
        searchedForText = searchField.value;
    });
})();
