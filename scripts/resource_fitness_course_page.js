// run this once only in console, to write into firebase database
function writeCourses() {
    var courseRef = db.collection("courses");

    var courses = [
        {
            code: "fitness01",
            name: "Yoga for Beginners",
            details: "Dive into the basics of yoga with this course designed for beginners. Learn various poses, breathing techniques, and meditation to improve flexibility, reduce stress, and enhance mental clarity.",
            contact: "contact@yogastudio.com"
        },
        {
            code: "fitness02",
            name: "High-Intensity Interval Training (HIIT)",
            details: "Boost your metabolism and burn fat with HIIT. This course covers short bursts of intense exercise alternated with low-intensity recovery periods. It's efficient, effective, and can be done anywhere.",
            contact: "hiit@fitpro.com"
        },
        {
            code: "fitness03",
            name: "Strength Training Fundamentals",
            details: "Build muscle, increase strength, and improve bone density with our strength training fundamentals course. Learn about different techniques, equipment, and routines suitable for all levels.",
            contact: "strength@liftacademy.com"
        },
        {
            code: "fitness04",
            name: "Pilates Core Workout",
            details: "Strengthen your core, improve posture, and increase flexibility with our Pilates course. Suitable for all fitness levels, these exercises focus on controlled movements and breathing.",
            contact: "pilates@corestudio.com"
        },
        {
            code: "fitness05",
            name: "Marathon Training 101",
            details: "From couch to marathon, this course will take you through the training required to complete a marathon. Covering nutrition, running technique, and a structured training plan.",
            contact: "marathon@runnersworld.com"
        },
        {
            code: "fitness06",
            name: "Nutrition for Athletes",
            details: "Learn about the essential nutrients needed to fuel athletic performance. This course covers meal planning, supplements, hydration, and how nutrition plays a critical role in your fitness journey.",
            contact: "nutrition@fitfuel.com"
        },
        {
            code: "fitness07",
            name: "Kickboxing for Cardio",
            details: "Kick and punch your way to high levels of cardiovascular fitness with this dynamic kickboxing course. Improve endurance, coordination, and flexibility while burning calories.",
            contact: "kickboxing@combatfit.com"
        },
        {
            code: "fitness08",
            name: "Outdoor Survival Skills",
            details: "Prepare for the unexpected with outdoor survival skills. This course covers navigation, emergency shelters, finding water, and more, ideal for outdoor enthusiasts of all levels.",
            contact: "survival@outdooradventures.com"
        },
        {
            code: "fitness09",
            name: "Dance Fitness Party",
            details: "Get your heart pumping with a mix of dance and fitness in this high-energy course. Burn calories, learn new dance moves, and have fun in a party-like atmosphere.",
            contact: "dance@rhythmmoves.com"
        },
        {
            code: "fitness10",
            name: "Mindfulness and Meditation for Stress Relief",
            details: "Reduce stress, anxiety, and improve your mental well-being with mindfulness and meditation. This course offers techniques that can be integrated into daily life for a healthier mind.",
            contact: "mindfulness@zenpath.com"
        },
        {
            code: "fitness11",
            name: "Cycling: Road to Fitness",
            details: "Experience the joy of cycling while improving your fitness level. Learn about bike maintenance, road safety, and effective cycling techniques for endurance and speed.",
            contact: "cycling@pedalpower.com"
        },
        {
            code: "fitness12",
            name: "Swimming Techniques and Training",
            details: "Dive into swimming with this course that covers techniques for efficiency and speed, breathing methods, and personalized training plans for water-based fitness.",
            contact: "swim@aquafit.com"
        }
    ];

    courses.forEach(course => {
        courseRef.add(course).then(documentReference => {
            console.log(`Added document with ID: ${documentReference.id}`);
        }).catch(error => {
            console.error("Error adding document: ", error);
        });
    });
}


// favorite

document.addEventListener('DOMContentLoaded', function () {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            // User is signed in, now user.uid is available
            const userId = user.uid;
            initializePageWithUser(userId);
        } else {
            // No user is signed in. Redirect to login page or handle accordingly
            console.log("No user is signed in.");
            // window.location.href = '/login.html'; // Uncomment to redirect to login
        }
    });
});

function initializePageWithUser(userId) {
    const gallery = document.getElementById('course-gallery');
    let coursesData = [];

    db.collection("courses").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            const course = { ...doc.data(), id: doc.id, isFavorite: false };
            coursesData.push(course);
        });
        fetchUserFavoritesAndUpdateUI(userId, coursesData, gallery);
    }).catch(error => console.error('Error fetching courses data:', error));

    // Add the "My favorite:" text element
    const favoriteText = document.createElement('div');
    favoriteText.textContent = 'My favorite:';
    favoriteText.classList.add('my-favorite-text');
    favoriteText.style.display = 'none';
    gallery.parentNode.insertBefore(favoriteText, gallery);

    const showFavoritesBtn = document.getElementById('show-favorites-btn');
    showFavoritesBtn.addEventListener('click', function () {
        const showingFavorites = this.textContent.includes('Show Favorites');
        this.textContent = showingFavorites ? 'Show All' : 'Show Favorites';

        const coursesToShow = showingFavorites ? coursesData.filter(course => course.isFavorite) : coursesData;
        renderCourses(coursesToShow, gallery, userId);

        favoriteText.style.display = showingFavorites ? 'block' : 'none';
    });
}

function renderCourses(data, container, userId) {
    container.innerHTML = '';
    const template = document.getElementById('cardTemplate').content;

    data.forEach(course => {
        const clone = document.importNode(template, true);
        clone.querySelector('.card-title').textContent = course.name;
        clone.querySelector('.card-text').textContent = course.details;
        clone.querySelector('.card-image').src = `images/${course.code}.jpg`;
        clone.querySelector('.card-contact').textContent = course.contact;

        const favoriteBtn = clone.querySelector('.favorite-btn');
        favoriteBtn.dataset.id = course.id;
        favoriteBtn.dataset.favorite = course.isFavorite;
        favoriteBtn.innerHTML = course.isFavorite ?
            `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-heart-filled" width="30" height="30" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ff2825" fill="#ff2825" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M6.979 3.074a6 6 0 0 1 4.988 1.425l.037 .033l.034 -.03a6 6 0 0 1 4.733 -1.44l.246 .036a6 6 0 0 1 3.364 10.008l-.18 .185l-.048 .041l-7.45 7.379a1 1 0 0 1 -1.313 .082l-.094 -.082l-7.493 -7.422a6 6 0 0 1 3.176 -10.215z" stroke-width="0" fill="currentColor" /></svg>` :
            `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-heart" width="30" height="30" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ff2825" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572" /></svg>`;

        favoriteBtn.addEventListener('click', function () {
            const courseId = this.dataset.id;
            const newFavoriteStatus = !JSON.parse(this.dataset.favorite);

            // Update Firestore database
            updateFavoriteStatus(userId, courseId, newFavoriteStatus);

            // Update the local data and UI
            const courseIndex = data.findIndex(c => c.id === courseId);
            data[courseIndex].isFavorite = newFavoriteStatus;
            this.dataset.favorite = newFavoriteStatus;
            this.innerHTML = newFavoriteStatus ?
                `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-heart-filled" width="30" height="30" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ff2825" fill="#ff2825" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M6.979 3.074a6 6 0 0 1 4.988 1.425l.037 .033l.034 -.03a6 6 0 0 1 4.733 -1.44l.246 .036a6 6 0 0 1 3.364 10.008l-.18 .185l-.048 .041l-7.45 7.379a1 1 0 0 1 -1.313 .082l-.094 -.082l-7.493 -7.422a6 6 0 0 1 3.176 -10.215z" stroke-width="0" fill="currentColor" /></svg>` :
                `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-heart" width="30" height="30" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ff2825" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572" /></svg>`;
        });

        container.appendChild(clone);
    });
}

function updateFavoriteStatus(userId, courseId, isFavorite) {
    const userFavoritesRef = db.collection('users').doc(userId).collection('favorites');

    if (isFavorite) {
        userFavoritesRef.doc(courseId).set({});
    } else {
        userFavoritesRef.doc(courseId).delete();
    }
}

function fetchUserFavoritesAndUpdateUI(userId, coursesData, gallery) {
    const userFavoritesRef = db.collection('users').doc(userId).collection('favorites');
    userFavoritesRef.get().then((querySnapshot) => {
        const favoriteCourseIds = new Set(querySnapshot.docs.map(doc => doc.id));

        coursesData.forEach(course => {
            course.isFavorite = favoriteCourseIds.has(course.id);
        });

        renderCourses(coursesData, gallery, userId);
    }).catch(error => console.error('Error fetching favorites:', error));
}
