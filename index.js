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
    clearInputValue()

})

function clearInputValue() {
    endorsmentInput.value = ""
}

onValue(endorsementsInDB, function(snapshot) {
    if (snapshot.exists()) {
        let itemsArray = Objects.entries(snapshot.val())
        for (let i = 0; i < itemsArray.length; i++) {
            let currentItem = itemsArray[i]
            appendItemsToEndorsements(currentItem)
        }
        }else {
            endorsementListEl.innerHTML = "No reviews ...yet"
    }
} )

function appendItemsToEndorsements(item) {
    let itemID = item[0]
    let itemValue = item[1]
    
    let newList = document.createElement("li")
    newList.textContent = itemValue
    endorsementList.append(newList)
}

// if (valueInput) {
//     let newList = document.createElement("li")
//     newList.textContent = valueInput
//     endorsementList.append(newList)
// }
