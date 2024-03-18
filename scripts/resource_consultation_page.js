function displayCards(collection) {
  let cardTemplate = document.getElementById("cardTemplate");

  db.collection(collection).get()
    .then(snap => {
      var i = 1;  //Optional: if you want to have a unique ID for each hike
      snap.forEach(doc => { //iterate thru each doc
        var name = doc.data().name;       // get value of the "name" key
        var address = doc.data().address;  // get value of the "details" key
        // var hikeCode = doc.data().code;    //get unique ID to each hike to be used for fetching right image
        var consultationEmail = doc.data().email; //gets the email
        var consultationPhone = doc.data().phone; //gets the phone
        let newcard = cardTemplate.content.cloneNode(true); // Clone the HTML template to create a new card (newcard) that will be filled with Firestore data.

        //update title and text and image
        newcard.querySelector('.card-name').innerHTML = name;
        newcard.querySelector('.card-address').innerHTML = address;
        newcard.querySelector('.card-email').innerHTML = consultationEmail;
        newcard.querySelector('.card-phone').innerHTML = consultationPhone;
        // newcard.querySelector('.card-image').src = `./images/${hikeCode}.jpg`; //Example: NV01.jpg

        // Optional: give unique ids to all elements for future use
        newcard.querySelector('.card-name').setAttribute("id", "cname" + i);
        newcard.querySelector('.card-address').setAttribute("id", "caddresst" + i);
        newcard.querySelector('.card-email').setAttribute("id", "cemail" + i);

        newcard.querySelector('.card-phone').setAttribute("id", "cphone" + i);
        //attach to gallery, Example: "hikes-go-here"
        document.getElementById(collection + "-go-here").appendChild(newcard);

        i++;   //Optional: iterate variable to serve as unique ID
      })
    })
}

document.addEventListener("DOMContentLoaded", function () {
  displayCards("consultation");
});