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
// const save = document.querySelector(".save")


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
    li.dataset.id = category.id
    a.dataset.id = category.id
    span1.dataset.id = category.id
    span2.dataset.id = category.id
    a.append(span1, span2)
    li.append(a)
    sidepanel.append(li)
}

// function to render track on page
function renderTrack(track) {
    const li = document.createElement("li")
    const a = document.createElement("a")
    a.className = "entypo-star"
    a.innerText = track.track_name
    li.append(a)
    trackList.append(li)
}

// function to render sounds
function renderSounds(sound, index) {
    const box = boxes[index]
    if (box.querySelector("p")) {
        box.querySelector("p").remove()
    }
    const p = document.createElement("p")
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
    array.map(obj => {
        playwithDelay(obj.sound, obj.time)
    })
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

// function to pause sounds
// function pauseAudio(sound) {

// }

// // event listener for save
// save.addEventListener("click", () => {
//     document.querySelector('#trackModal').style.display = 'block'
// })

// Event listener for play pause utton
playPause.addEventListener("click", () => {
    if (!nowPlaying) {
        playPause.innerHTML = "<img src='https://img.icons8.com/android/48/000000/pause.png'/>"
        playPause.id = "nowPlaying"
        timeouts.push(setTimeout(() => {
            playTrack(track)
        }, 0))
        nowPlaying = true
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

//ent listeniner for track plays
function

// event listner for key press
document.addEventListener("keypress", e => {
    const randomColor = Math.floor(Math.random()*16777215).toString(16);
    for (let i = 0; i < boxes.length; i++) {
        let box = boxes[i]
        if (box.dataset.letter.toLowerCase() == e.key) {
            eventRecord(box)
            box.style.backgroundColor = `#${randomColor}`
            box.classList.add("active")
            setTimeout(() => {
                box.style.backgroundColor = "#444"
                box.classList.remove("active")
            }, 250);
        }
    }
})

// click event for saving sound and time interval into sound array
boxes.forEach(box => {
    box.addEventListener("click", (e) => {
       eventRecord(e.target)
    })    
})

// category on click event
sidepanel.addEventListener("click", e => {
    if (e.target.dataset.id) {
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
})


// fetch single category
function getSingleCategory(obj) {
    fetch(categoryURL + `/${obj.dataset.id}`)
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

// checking if track exists
function checkingTrack(name, id) {
    console.log(JSON.stringify(track))
    if(!track.length) {
        alert("Please record a track before you save")
    } else {
        createTrack(name, id)
    }
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
