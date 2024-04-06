// run this once only in console, to write into firebase database
function writeGroups() {
    var groupRef = db.collection("groups");

    var groups = [
        {
            code: "group01",
            name: "Community Support Hub",
            details: "A beacon of hope and support in our community, providing essential services and fostering a sense of unity and care. We stand ready to assist our community members in times of need, offering resources, guidance, and a compassionate ear.",
            contact: "a1bb@e8ec8.com"
        },
        {
            code: "group02",
            name: "Local Aid Society",
            details: "Empowering individuals through supportive community engagement, educational programs, and resource sharing. Our mission is to build a stronger, more resilient community where every member has the opportunity to thrive and contribute.",
            contact: "5751@7060b.com"
        },
        {
            code: "group03",
            name: "Neighborhood Assistance Circle",
            details: "Our dedicated team works tirelessly to ensure that no one in our community feels alone or without support. We believe in the power of community assistance and are committed to being there for our neighbors in every way possible.",
            contact: "8bd3@59202.com"
        },
        {
            code: "group04",
            name: "Village Volunteer Team",
            details: "Offering a hand of friendship and assistance to those facing challenges, our outreach programs are designed to provide support, encouragement, and practical help. We are here to make a difference in the lives of our community members.",
            contact: "1217@3b9a4.com"
        },
        {
            code: "group05",
            name: "Urban Wellness Collective",
            details: "Committed to creating a nurturing environment, our collective efforts focus on ensuring that every community member can access the support and resources they need. We believe in the strength of community and the importance of care for one another.",
            contact: "fd5a@b5513.com"
        },
        {
            code: "group06",
            name: "Rural Relief Network",
            details: "Our network of volunteers is dedicated to making a positive impact through acts of kindness, support, and guidance. We aim to uplift and assist our community members, fostering a spirit of generosity and mutual aid.",
            contact: "cb95@58d3b.com"
        },
        {
            code: "group07",
            name: "Town Welfare Association",
            details: "We provide comprehensive support services aimed at improving the quality of life for individuals and families. Our association is a pillar of the community, offering assistance, resources, and hope to those in need.",
            contact: "44ae@d3323.com"
        },
        {
            code: "group08",
            name: "City Care Group",
            details: "Our group is dedicated to offering relief and assistance through innovative and compassionate services. We are committed to helping our community members overcome challenges, providing support and resources to ensure their well-being.",
            contact: "006b@5c191.com"
        },
        {
            code: "group09",
            name: "Regional Help Organization",
            details: "As a hub for community engagement, we offer programs that address the diverse needs of our population. We strive to empower, support, and connect our community members, fostering an inclusive and supportive environment.",
            contact: "5339@0eacf.com"
        },
        {
            code: "group10",
            name: "Municipal Support Services",
            details: "Our efforts are focused on enhancing the well-being of our community through dedicated support services and initiatives. We believe in the power of collective action and are committed to making a positive difference in the lives of our members.",
            contact: "a28f@6cb9d.com"
        },
        {
            code: "group11",
            name: "Civic Aid Unit",
            details: "We are focused on enriching the community with a wide array of services designed to support and uplift. Our unit is dedicated to providing the tools and resources necessary for community members to thrive and achieve their goals.",
            contact: "6058@49e89.com"
        },
        {
            code: "group12",
            name: "Public Service Volunteers",
            details: "A grassroots organization, we are dedicated to supporting our neighbors through community-driven initiatives. We believe in the power of collaboration and are committed to fostering a supportive network for all community members.",
            contact: "8905@9ea25.com"
        }
    ];

    groups.forEach(group => {
        groupRef.add(group).then(documentReference => {
            console.log(`Added document with ID: ${documentReference.id}`);
        }).catch(error => {
            console.error("Error adding document: ", error);
        });
    });
}


//------------------------------------------------------------------
// Read from firestore to get a collection of groups (of variable length)
// Then for each group in the list,
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
                var contact = doc.data().contact
                var imageCode = doc.data().code
                var docID = doc.id;
                let newcard = cardTemplate.content.cloneNode(true);

                //update title and text and image
                newcard.querySelector('.card-title').innerHTML = title;
                newcard.querySelector('.card-text').innerHTML = details;
                newcard.querySelector('.card-contact').innerHTML = contact;
                newcard.querySelector('.card-image').src = `./images/${imageCode}.jpg`;
                newcard.querySelector('a').href = "helping_group_each.html?docID=" + docID;

                //give unique ids to all elements for future use
                newcard.querySelector('.card-title').setAttribute("id", "ctitle" + i);
                newcard.querySelector('.card-text').setAttribute("id", "ctext" + i);
                newcard.querySelector('.card-contact').setAttribute("id", "ccontact" + i);
                newcard.querySelector('.card-image').setAttribute("id", "cimage" + i);

                //attach to gallery
                document.getElementById(collection + "-go-here").appendChild(newcard);
                i++;
            })
        })
}

document.addEventListener("DOMContentLoaded", function () {
    displayCards("groups");
});

function saveGroupDocumentIDAndRedirect() {
    let params = new URL(window.location.href) //get the url from the search bar
    let ID = params.searchParams.get("docID");
    localStorage.setItem('groupDocID', ID);
    window.location.href = 'helping_group_review.html';
}