(function () {
    const form = document.querySelector('#search-form');
    const searchField = document.querySelector('#search-keyword');
    let searchedForText;
    const responseContainer = document.querySelector('#response-container');

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        responseContainer.innerHTML = '';
        searchedForText = searchField.value;

//        Pre-jquery XHR code.
//        const imgRequest = new XMLHttpRequest();
//        imgRequest.onload = addImage;
//        imgRequest.onerror = function (err) {
//            requestError(err, 'image');
//        };
//        imgRequest.open('GET', `https://api.unsplash.com/search/photos?page=1&query=${searchedForText}`);
//        imgRequest.setRequestHeader('Authorization', 'Client-ID 462d22cae6dd1d4877bb082c9e9c6502893a9bb7305d4bf8f681d13b56d4abc3');
//        imgRequest.send();

        $.ajax({
            url: `https://api.unsplash.com/search/photos?page=1&query=${searchedForText}`,
            headers: {
    "Authorization" : "Client-ID 462d22cae6dd1d4877bb082c9e9c6502893a9bb7305d4bf8f681d13b56d4abc3"
        },
            // password: "wgy6PMFp-MWG2EUJz40Le2W7p0JagF_9q8lpGxmSqq2_xzGmUErWyg7zKTe5NicC5HAFuQB06b2opPXJkO2OK2oZAWDDMSdrS2I_nmpixKLJO_xQc6Dvw3OtWnVoXHYx"

        }).done(addImage);

//        const articleRequest = new XMLHttpRequest();
//        articleRequest.onload = addArticles;
//        articleRequest.onerror = function (err) {
//            requestError(err, 'articles');
//        };
//        articleRequest.open('GET', `http://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchedForText}&api-key=e6a9801dab184d89a4d77b94ff44048c`);
//        articleRequest.send();
//    });

        $.ajax({
            url: `http://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchedForText}&api-key=e6a9801dab184d89a4d77b94ff44048c`
        }).done(addArticles);
        fail(function(err) {
            requestError(err, 'articles');
        });
    });

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

    function requestError(e, part) {
        console.log(e);
        responseContainer.insertAdjacentHTML('beforeend', `<p class="network-warning error-${part}">Oh no! There was an error making a request for the ${part}.</p>`);
    }
})();
