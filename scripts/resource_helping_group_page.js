// run this once only in console, to read api data and write into firebase database
async function readJSONhero() {
    const response = await fetch(
        'https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/all.json'
    )
    const data = await response.text(); //get text file, string
    const superHeroes = JSON.parse(data); //convert to JSON
    //console.log(superHeroes);
    for (x of superHeroes) {       //iterate thru each hero
        let name = x.name;
        //console.log(name);
        let details = "Elmo is impressed! " + name + " occupation: "; //creating a string with details
        for (w in x.work) {
            details += " " + x.work.occupation;
        }
        if (name.includes("A")) {
            console.log(name);
            //    db.collection("heros").add({
            //       name: x.name,
            //       details: details
            //    })
        }
    }
}


//------------------------------------------------------------------
// Read from firestore to get a collection of hikes (of variable length)
// Then for each hike in the list,
// create a new "card" from the "template"
// update thet title and text, and other ID's 
// attach it to the gallery div
//-------------------------------------------------------------------
function displayCards(collection) {
    let cardTemplate = document.getElementById("cardTemplate");

    db.collection(collection).get()
        .then(snap => {
            var i = 1;
            snap.forEach(doc => {    //iterate thru each doc
                var title = doc.data().name;
                var details = doc.data().details;
                let newcard = cardTemplate.content.cloneNode(true);

                //update title and text and image
                newcard.querySelector('.card-title').innerHTML = title;
                newcard.querySelector('.card-text').innerHTML = details;
                // newcard.querySelector('.card-image').src = "./images/" + collection + ".jpg";  //hikes.jpg

                //give unique ids to all elements for future use
                newcard.querySelector('.card-title').setAttribute("id", "ctitle" + i);
                newcard.querySelector('.card-text').setAttribute("id", "ctext" + i);
                // newcard.querySelector('.card-image').setAttribute("id", "cimage" + i);

                //attach to gallery
                document.getElementById(collection + "-go-here").appendChild(newcard);
                i++;
            })
        })
}

document.addEventListener("DOMContentLoaded", function () {
    displayCards("heros");
});