document.addEventListener('DOMContentLoaded', function () {
    const gallery = document.getElementById('photo-gallery');
    let photosData = [];

    fetch('https://jsonplaceholder.typicode.com/photos')
        .then(response => response.json())
        .then(data => {
            photosData = data.slice(0, 100); // Limit to first 100 for example
            photosData.forEach(photo => photo.isFavorite = false); // Initialize isFavorite
            renderPhotos(photosData, gallery);
        })
        .catch(error => console.error('Error fetching data:', error));

    const showFavoritesBtn = document.getElementById('show-favorites-btn');
    showFavoritesBtn.addEventListener('click', function () {
        const showingFavorites = this.textContent.includes('Show All');
        this.textContent = showingFavorites ? 'Show Favorites' : 'Show All';
        const photosToShow = showingFavorites ? photosData : photosData.filter(photo => photo.isFavorite);
        renderPhotos(photosToShow, gallery);
    });
});

function renderPhotos(data, container) {
    container.innerHTML = ''; // Clear existing photos
    data.forEach(photo => {
        const photoElement = document.createElement('div');
        photoElement.style.marginBottom = '20px';

        const heartIcon = photo.isFavorite ? "&#x2665;" : "&#x2661;";
        photoElement.innerHTML = `
            <img src="${photo.thumbnailUrl}" alt="${photo.title}" style="display: block; margin-bottom: 10px;">
            <p>${photo.title}</p>
            <button class="favorite-btn" data-favorite="${photo.isFavorite}">${heartIcon}</button>
        `;

        container.appendChild(photoElement);

        const favoriteBtn = photoElement.querySelector('.favorite-btn');
        favoriteBtn.addEventListener('click', function () {
            const isFavorite = this.getAttribute('data-favorite') === "true";
            photo.isFavorite = !isFavorite; // Update photo object's isFavorite property
            this.setAttribute('data-favorite', photo.isFavorite);
            this.innerHTML = photo.isFavorite ? "&#x2665;" : "&#x2661;"; // Update button display
        });
    });
}

