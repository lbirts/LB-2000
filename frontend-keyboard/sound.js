// Global URLs
const categoryURL = "http://localhost:3000/categories"
const soundsURL = "http://localhost:3000/sounds"
const userURL = "http://localhost:3000/users"
const trackURL = "http://localhost:3000/tracks"

// Global elements
const sidepanel = document.querySelector(".side-panel ul")
const boxes = document.querySelectorAll(".box")
const recordBtn = document.getElementById("recButton")
const loginForm = document.querySelector(".login-page form")
const trackForm = document.querySelector(".track-page form")
const trackList = document.querySelector(".track-list")
const playPause = document.querySelector(".playPause")
const editForm = document.querySelector(".edit-page form")
const save = document.querySelector(".save")
const edit = document.querySelector(".edit")


// Global Variables
let Recording = false
let soundArray = []
let track = []
let nowPlaying = false
let test
let timeouts = []

// function to render category on page
function renderCategory(category) {
    const li = document.createElement("li")
    const a = document.createElement("a")
    const span1 = document.createElement("span")
    span1.className = "entypo-note"
    const span2 = document.createElement("span")
    span2.className = "menu-item"
    span2.innerText = category.name
    li.dataset.categoryId = category.id
    a.dataset.categoryId = category.id
    span1.dataset.categoryId = category.id
    span2.dataset.categoryId = category.id
    a.append(span1, span2)
    li.append(a)
    sidepanel.append(li)
}

// function to render track on page
function renderTrack(track) {
    const li = document.createElement("li")
    const a = document.createElement("a")
    const cancel = document.createElement("a")
    cancel.className = "entypo-cancel"
    cancel.dataset.id = track.id
    a.className = "entypo-star"
    a.innerText = track.track_name
    a.dataset.filename = track.filename
    li.dataset.filename = track.filename
    li.dataset.trackId = track.id
    li.append(a, cancel)
    trackList.append(li)
}

// function to render sounds
function renderSounds(sound, index) {
    const box = boxes[index]
    if (box.querySelector("p")) {
        box.querySelector("p").remove()
    }
    const p = document.createElement("p")
    const linebr = document.createElement("br")
    const linebr2 = document.createElement("br")
    const linebr3 = document.createElement("br")
    const linebr4 = document.createElement("br")
    p.className = "idk"
    p.innerText = sound.sound_name
    p.dataset.sound = sound.sound
    box.dataset.sound = sound.sound
    box.dataset.letter = box.innerText
    box.dataset.id = sound.id
    box.append(p)
}

// function to play array of sounds with their respective delays
function playwithDelay(sound, delay) {
    let timeO = setTimeout(function() {
        playAudio(sound)
    }, delay)
    timeouts.push(timeO)
}

// function to play track (array of sounds)
function playTrack(array) {
    endTime = array[array.length - 1].time + 500
    // endTime = array[-1].time + 500
    array.map(obj => {
        playwithDelay(obj.sound, obj.time)
    })
    setTimeout(() => {
        playPause.id = "paused"
        playPause.innerHTML = "<img src='https://img.icons8.com/android/48/000000/play.png'/>"
        nowPlaying = false
    }, endTime)
    // playPause.id = "paused"
    // playPause.innerHTML = "<img src='https://img.icons8.com/android/48/000000/play.png'/>"
    // nowPlaying = false
}

// function to cut delay times
function subtractTimes() {
    track = soundArray.map(obj => {
        delay = obj.time - soundArray[0].time
        const object = {sound: obj.sound, time: delay}
        return object
    })
}

// reusable function for recording sounds on click or key press
function eventRecord(element) {
    playAudio(element.dataset.sound)
    if (Recording) {
        boxTime = performance.now()
        soundArray.push({sound: element.dataset.sound, time: boxTime})
    } 
}

// reusable function for playing sounds
function playAudio(sound) {
    const audio = new Audio(sound)
    audio.play()
}

// checking if track exists
function checkingTrack(name, id) {
    if(!track.length) {
        alert("Please record a track before you save")
    } else {
        createTrack(name, id)
    }
}

// function to pause sounds
// function pauseAudio(sound) {

// }

// event listener for save
save.addEventListener("click", () => {
    document.removeEventListener("keypress", keyEvent)
})

// event listener for edit
edit.addEventListener("click", () => {
    document.removeEventListener("keypress", keyEvent)
})

// Event listener for play pause utton
playPause.addEventListener("click", () => {
    if (!nowPlaying) {
        nowPlaying = true
        playPause.innerHTML = "<img src='https://img.icons8.com/android/48/000000/pause.png'/>"
        playPause.id = "nowPlaying"
        playTrack(track)
    } else {
        playPause.id = "paused"
        playPause.innerHTML = "<img src='https://img.icons8.com/android/48/000000/play.png'/>"
        for (let i = 0; i < timeouts.length; i++) {
            clearTimeout(timeouts[i]);
        }
        timeouts = []
        nowPlaying = false
    }
})

//event listeniner for track plays
trackList.addEventListener("click", e => {
    if (e.target.dataset.filename) {
        track = JSON.parse(e.target.dataset.filename) 
    } else if (e.target.className == "entypo-cancel") {
        deleteTrack(e.target.dataset.id)
    }
    // playTrack(trax)
})

// event listener for trash
document.querySelector(".trash").addEventListener("click", () => {
    soundArray = []
    track = []
})

// event listner for key press
document.addEventListener("keypress", keyEvent)


function keyEvent(e) {
    const randomColor = Math.floor(Math.random()*16777215).toString(16);
    for (let i = 0; i < boxes.length; i++) {
        let box = boxes[i]
        if (box.dataset.letter.toLowerCase() == e.key) {
            eventRecord(box)
            box.style.backgroundColor = `#${randomColor}`
            box.style.borderColor = `#${randomColor}`
            box.classList.add("active")
            setTimeout(() => {
                box.style.backgroundColor = "#444"
                box.classList.remove("active")
            }, 250);
        }
    }
}

editForm.addEventListener("submit", (e) => {
    e.preventDefault()
    document.querySelector('#editModal').style.display = 'none'
    document.querySelector('.modal-backdrop').remove()
    editUsername(e.target.dataset.id, e.target[0].value)
    e.target.reset()
    document.addEventListener("keypress", keyEvent)
})

document.querySelectorAll(".close").forEach(el => el.addEventListener("click", () => {
    document.addEventListener("keypress", keyEvent)
}))

// click event for saving sound and time interval into sound array
boxes.forEach(box => {
    box.addEventListener("click", (e) => {
        const randomColor = Math.floor(Math.random()*16777215).toString(16);
       eventRecord(e.target)
       box.style.backgroundColor = `#${randomColor}`
       box.style.borderColor = `#${randomColor}`
       setTimeout(() => {
        //    box.style.borderColor = "#2ecc71"
           box.style.backgroundColor = "#444"
           box.classList.remove("active")
       }, 250);
    })    
})

// category on click event
sidepanel.addEventListener("click", e => {
    if (e.target.dataset.categoryId) {
        getSingleCategory(e.target)
    }
})

// Record button animation / recording 
recordBtn.addEventListener("click", () => {
    recordBtn.classList.toggle('Rec')
    if (Recording) {
        Recording = false
        subtractTimes()
    } else {
        Recording = true
    }
});	

trackForm.addEventListener("submit", (e) => {
    e.preventDefault()
    document.querySelector('#trackModal').style.display = 'none'
    document.querySelector('.modal-backdrop').remove()
    checkingTrack(e.target[0].value, e.target.dataset.id)
    track = []
    soundArray = []
    e.target.reset()
    document.addEventListener("keypress", keyEvent)
})


// fetch single category
function getSingleCategory(obj) {
    fetch(categoryURL + `/${obj.dataset.categoryId}`)
        .then(res => res.json())
        .then(category => {
            category.sounds.forEach((sound, index) => {
                renderSounds(sound, index)
            })
        })
}

// fetch all categories
fetch(categoryURL)
    .then(res => res.json())
    .then(categories => categories.forEach(renderCategory))

// fetch individual user
function getSingleUser(id) {
    fetch(userURL + `/${id}`)
        .then(res => res.json())
        .then(user => {
            user.tracks.forEach(renderTrack)
            document.querySelector(".djName").innerText = `Hi, DJ ${user.username}`
            trackForm.dataset.id = user.id
            editForm.dataset.id = user.id
        })
}

// create new user in database
function createUser(name) {
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            username: name
        })
    }
    fetch(userURL, options)
        .then(res => res.json())
        .then(user => getSingleUser(user.id))
}

// get all users 
function getUsers(name) {
    fetch(userURL)
        .then(res => res.json())
        .then(users => {
            if (users.find(user => user.username.toLowerCase() == name.toLowerCase())) {
                const found = users.find(user => user.username.toLowerCase() == name.toLowerCase())
                getSingleUser(found.id)
            } else {
                createUser(name)
            }
        })
}


//update username
function editUsername(id, editUserInp){
    const options = {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            username: editUserInp
        })
    }
        fetch(userURL + `/${id}`, options)
            .then(res => res.json())
            .then(user => document.querySelector(".djName").innerText = `Hi, DJ ${user.username}`)
}

// delete track 
function deleteTrack(id) {
    const options = {
        method: "DELETE"
    }
    fetch(trackURL + `/${id}`, options)
        .then(() => {
            document.querySelector(`li[data-track-id="${id}"]`).remove()
        })
}

// create new track in database
function createTrack(trackname, userid) {
    const options = {
        method: "POST", 
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            track_name: trackname,
            filename: JSON.stringify(track),
            user_id: userid
        })
    }
    fetch(trackURL, options)
        .then(res => res.json())
        .then(track => renderTrack(track))
}


document.querySelector('.login-page form').addEventListener("submit", (e) => {
    e.preventDefault()
    document.querySelector('.loginModal').style.display = "none"
    getUsers(e.target[0].value)
})


// Record Audio

// navigator.mediaDevices.getUserMedia({ audio: true })
//   .then(stream => {
//     const mediaRecorder = new MediaRecorder(stream);
//     mediaRecorder.start();

//     const audioChunks = [];
//     mediaRecorder.addEventListener("dataavailable", event => {
//       audioChunks.push(event.data);
//     });

//     mediaRecorder.addEventListener("stop", () => {
//         const audioBlob = new Blob(audioChunks);
//         const audioUrl = URL.createObjectURL(audioBlob);
//         const audio = new Audio(audioUrl);
//       audio.play();
//       });

//     setTimeout(() => {
//         mediaRecorder.stop();
//       }, 3000);
// });

// const start = Date.now();
// setInterval(function() {
//     const delta = Date.now() - start; // milliseconds elapsed since start
//     …
//     output(Math.floor(delta / 1000)); // in seconds
//     // alternatively just show wall clock time:
//     output(new Date().toUTCString());
// }, 1000);
