import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-app.js"
import { getDatabase, ref, push, onValue, child, get } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-database.js"

let realtimeDatabase = {
    databaseURL: "https://we-are-the-champions-54d9e-default-rtdb.europe-west1.firebasedatabase.app/"
}

const app = initializeApp(realtimeDatabase)
const databaseEndorsmentForApp = getDatabase(app)
const endorsementsInDB = ref(databaseEndorsmentForApp, "endorsements")
const endorsementInput = document.getElementById("endorsement-element")
const endorsementBtn = document.getElementById("push-for-endorsement")
let endorsementListEl = document.getElementById("endorsement-list")

endorsementBtn.addEventListener("click", function() {
    let inputValue = endorsementInput.value.trim()
    if (inputValue) {
        push(endorsementsInDB, inputValue)
        appendItemsToEndorsements()
        clearInputValue()
    }
})

onValue(endorsementsInDB, (snapshot) => {
    const data = snapshot.val();
    console.log(data)
    if (data) {
        endorsementListEl.innerHTML = ''; // Clear the list
        for (const [key, value] of Object.entries(data)) {
            console.log(value)
            if (value) { // Check if the value is not empty
                appendItemsToEndorsements(value);
            }
        }}})

function clearInputValue() {
    endorsementInput.value = ""
}

function appendItemsToEndorsements() {
    let itemValue = endorsementInput.value
    let newList = document.createElement("li", "br")
    newList.innerHTML = itemValue
    endorsementListEl.append(newList)
}