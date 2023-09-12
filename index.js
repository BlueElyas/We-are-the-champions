import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-database.js"

let realtimeDatabase = {
    databaseURL: "https://we-are-the-champions-54d9e-default-rtdb.europe-west1.firebasedatabase.app/"
}

const app = initializeApp(realtimeDatabase)
const databaseEndorsmentForApp = getDatabase(app) 
const endorsementsInDB = ref(databaseEndorsmentForApp, "endorsements")
const endorsmentInput = document.getElementById("endorsement-element")
const endorsementBtn = document.getElementById("push-for-endorsement")
let endorsementListEl = document.getElementById("endorsement-list")


endorsementBtn.addEventListener("click", function() {
    let inputValue = endorsmentInput.value 
    push(endorsementsInDB, inputValue)
    appendItemsToEndorsements()
    clearInputValue()
})

function clearInputValue() {
    endorsmentInput.value = ""
}

function appendItemsToEndorsements() {
    let itemValue = endorsmentInput.value
    let newList = document.createElement("li")
    newList.innerHTML = itemValue
    endorsementListEl.append(newList)
}

// if (valueInput) {
//     let newList = document.createElement("li")
//     newList.textContent = valueInput
//     endorsementList.append(newList)
// }
