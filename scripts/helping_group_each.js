function displayGroupInfo() {
  let params = new URL(window.location.href); //get URL of search bar
  let ID = params.searchParams.get("docID"); //get value for key "id"
  console.log(ID);

  // doublecheck: is your collection called "Reviews" or "reviews"?
  db.collection("groups")
    .doc(ID)
    .get()
    .then(doc => {
      thisGroup = doc.data();
      groupCode = thisGroup.code;
      groupName = doc.data().name;
      groupDetails = doc.data().details;
      groupContact = doc.data().contact

      // only populate title, and image
      document.getElementById("groupName").innerHTML = groupName;
      document.getElementById("groupDetails").innerHTML = groupDetails;

      let imgEvent = document.querySelector(".group-img");
      imgEvent.src = "../images/" + groupCode + ".jpg";

      document.getElementById("groupContact").innerHTML = groupContact;
    });
}
displayGroupInfo();


function saveGroupDocumentIDAndRedirect() {
  let params = new URL(window.location.href) //get the url from the search bar
  let ID = params.searchParams.get("docID");

  localStorage.setItem('groupDocID', ID);
  window.location.href = 'helping_group_review.html';
}

function populateReviews() {
  // console.log("test");
  let groupCardTemplate = document.getElementById("reviewCardTemplate");
  let groupCardGroup = document.getElementById("reviewCardGroup");

  let params = new URL(window.location.href); // Get the URL from the search bar
  let groupID = params.searchParams.get("docID");

  // Double-check: is your collection called "Reviews" or "reviews"?
  db.collection("reviews")
    // get all reviews where gropuDocID is equal to the groupID
    .where("groupDocID", "==", groupID)
    .get()
    .then((allReviews) => {
      reviews = allReviews.docs;
      console.log(reviews);
      reviews.forEach((doc) => {
        var title = doc.data().title;
        var level = doc.data().level;
        var season = doc.data().season;
        var description = doc.data().description;
        var flooded = doc.data().flooded;
        var scrambled = doc.data().scrambled;
        var time = doc.data().timestamp.toDate();
        var rating = doc.data().rating; // Get the rating value
        console.log(rating)

        console.log(time);

        let reviewCard = groupCardTemplate.content.cloneNode(true);
        reviewCard.querySelector(".title").innerHTML = title;
        reviewCard.querySelector(".time").innerHTML = new Date(
          time
        ).toLocaleString();
        reviewCard.querySelector(".helpful").innerHTML = `Was the group helpful for you life? ${level}`;
        reviewCard.querySelector(".satisfied").innerHTML = `Were you satisfied with the events they organized? ${season}`;
        reviewCard.querySelector(".again").innerHTML = `Will attend again? ${flooded}`;
        reviewCard.querySelector(".recommend").innerHTML = `Recommend to others? ${scrambled}`;
        reviewCard.querySelector(".description").innerHTML = `What did you think of this helping group? ${description}`;

        // Populate the star rating based on the rating value

        // Initialize an empty string to store the star rating HTML
        let starRating = "";
        // This loop runs from i=0 to i<rating, where 'rating' is a variable holding the rating value.
        for (let i = 0; i < rating; i++) {
          starRating += '<span class="material-icons">star</span>';
        }
        // After the first loop, this second loop runs from i=rating to i<5.
        for (let i = rating; i < 5; i++) {
          starRating += '<span class="material-icons">star_outline</span>';
        }
        reviewCard.querySelector(".star-rating").innerHTML = starRating;

        groupCardGroup.appendChild(reviewCard);
      });
    });
}

populateReviews();