const categoryURL = "http://localhost:3000/categories"
const soundsURL = "http://localhost:3000/sounds"
const userURL = "http://localhost:3000/users"
const sidepanel = document.querySelector(".side-panel ul")

// render category on page
function renderCategory(category) {
    const li = document.createElement("li")
    const a = document.createElement("a")
    const span1 = document.createElement("span")
    span1.className = "entypo-note"
    const span2 = document.createElement("span")
    span2.className = "menu-item"
    span2.innerText = category.name
    span2.dataset.id = category.id
    a.append(span1, span2)
    li.append(a)
    sidepanel.append(li)
}

// render track on page
function renderTrack(track) {
    const trackList = document.querySelector(".track-list")
    trackList.innerHTML = ""
    const li = document.createElement("li")
    const a = document.createElement("a")
    a.className = "entypo-star"
    a.innerText = "Track 4"
    li.append(a)
    debugger
    trackList.append(li)
}

// render sounds
function renderSounds(sound) {
    console.log(sound)
}

// category on click event
sidepanel.addEventListener("click", e => {
    getSingleCategory(e.target)
})

// Record button animation
const recordBtn = document.getElementById("recButton")

recordBtn.addEventListener("click", () => {
    recordBtn.classList.toggle('Rec')
});	

// fetch single category
function getSingleCategory(obj) {
    fetch(categoryURL + `/${obj.dataset.id}`)
        .then(res => res.json())
        .then(category => category.sounds.forEach(renderSounds))
}

// fetch all categories
fetch(categoryURL)
    .then(res => res.json())
    .then(categories => categories.forEach(renderCategory))

// fetch individual user
fetch(userURL + "/1")
    .then(res => res.json())
    .then(user => user.tracks.forEach(renderTrack))


