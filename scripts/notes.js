const notesContainer = document.querySelector(".notes-container");
const createBtn = document.querySelector(".btn-for-create");

createBtn.addEventListener("click", () =>{
    let inputBox = document.createElement("input");
    let img = document.createElement("img");
    inputBox.className = "input-box";
    img.src = "images/delete.png";
    img.className = "delete-btn";
    console.log(342323);
    
    // Create a div to hold the input and delete button
    let noteDiv = document.createElement("div");
    noteDiv.appendChild(inputBox);
    noteDiv.appendChild(img);
    notesContainer.appendChild(noteDiv);

    // Add event listener to delete button
    img.addEventListener("click", () => {
        notesContainer.removeChild(noteDiv);
    });
});