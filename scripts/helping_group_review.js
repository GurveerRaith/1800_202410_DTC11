var groupDocID = localStorage.getItem("groupDocID");    //visible to all functions on this page

function getGroupName(id) {
    db.collection("groups")
        .doc(id)
        .get()
        .then((thisGroup) => {
            var groupName = thisGroup.data().name;
            document.getElementById("groupName").innerHTML = groupName;
        });
}

getGroupName(groupDocID);


// Add this JavaScript code to make stars clickable
// Select all elements with the class name "star" and store them in the "stars" variable
const stars = document.querySelectorAll('.star');

// Iterate through each star element
stars.forEach((star, index) => {
    // Add a click event listener to the current star
    star.addEventListener('click', () => {
        // Fill in clicked star and stars before it
        for (let i = 0; i <= index; i++) {
            // Change the text content of stars to 'star' (filled)
            document.getElementById(`star${i + 1}`).textContent = 'star';
        }
    });
});

function writeReview() {
    console.log("inside write review");
    let groupTitle = document.getElementById("title").value;
    let groupHelpful = document.getElementById("helpful").value;
    let groupSatisfied = document.getElementById("satisfied").value;
    let groupDescription = document.getElementById("description").value;
    let groupAgain = document.querySelector('input[name="again"]:checked').value;
    let groupRecommend = document.querySelector('input[name="recommend"]:checked').value;

    // Get the star rating
    // Get all the elements with the class "star" and store them in the 'stars' variable
    const stars = document.querySelectorAll('.star');
    // Initialize a variable 'groupRating' to keep track of the rating count
    let groupRating = 0;
    // Iterate through each element in the 'stars' NodeList using the forEach method
    stars.forEach((star) => {
        // Check if the text content of the current 'star' element is equal to the string 'star'
        if (star.textContent === 'star') {
            // If the condition is met, increment the 'groupRating' by 1
            groupRating++;
        }
    });


    // check if user is signed in and upload review to firestore
    var user = firebase.auth().currentUser;
    if (user) {
        // var currentUser = db.collection("users").doc(user.uid);
        var userID = user.uid;

        // Get the document for the current user.
        db.collection("reviews").add({
            groupDocID: groupDocID,
            userID: userID,
            title: groupTitle,
            helpful: groupHelpful,
            satisfied: groupSatisfied,
            description: groupDescription,
            again: groupAgain,
            recommend: groupRecommend,
            rating: groupRating, // Include the rating in the review
            // get the time of the review writing
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        }).then(() => {
            window.location.href = "helping_group_thanks.html"; // Redirect to the thanks page
        });
    } else {
        console.log("No user is signed in");
        window.location.href = 'helping_group_review.html';
    }
}