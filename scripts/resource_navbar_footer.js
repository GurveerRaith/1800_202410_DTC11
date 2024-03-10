//---------------------------------------------------
// This function loads the parts of your skeleton 
// (navbar, footer, and other things) into html doc. 
//---------------------------------------------------
function loadSkeleton() {

  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {                   //if the pointer to "user" object is not null, then someone is logged in
      // User is signed in.
      // Do something for the user here.
      console.log($('#navbarPlaceholder').load('/text/nav_after_login.html'));
      console.log($('#footerPlaceholder').load('/text/footer.html'));
    } else {
      // No user is signed in.
      console.log($('#navbarPlaceholder').load('/text/nav_before_login.html'));
      console.log($('#footerPlaceholder').load('/text/footer.html'));
    }
  });
}
loadSkeleton(); //invoke the function


// // Function to read the quote of the day from the Firestore "quotes" collection
// // Input param is the String representing the day of the week, aka, the document name
// function readQuote(userID) {
//   db.collection("users").doc(userID)                                                      //name of the collection and documents should matach excatly with what you have in Firestore
//     .onSnapshot(dayDoc => {                                                               //arrow notation
//       console.log("current document data: " + dayDoc.data());                          //.data() returns data object
//       document.getElementById("user-name-goes-here").innerHTML = dayDoc.data().name;      //using javascript to display the data on the right place

//       //Here are other ways to access key-value data fields
//       //$('#quote-goes-here').text(dayDoc.data().quote);         //using jquery object dot notation
//       //$("#quote-goes-here").text(dayDoc.data()["quote"]);      //using json object indexing
//       //document.querySelector("#quote-goes-here").innerHTML = dayDoc.data().quote;
//     })
// }
// readQuote("FsLx1X5DM6SvQS5q8fjsIQNiLAc2");        //calling the function