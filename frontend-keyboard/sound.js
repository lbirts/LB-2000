// Global URLs
const categoryURL = "http://localhost:3000/categories"
const soundsURL = "http://localhost:3000/sounds"
const userURL = "http://localhost:3000/users"

// Global elements
const sidepanel = document.querySelector(".side-panel ul")
const boxes = document.querySelectorAll(".box")
const recordBtn = document.getElementById("recButton")

// Global Variables
let Recording = false
let soundArray = []
let track = []

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
    const trackList = document.querySelector(".track-list")
    trackList.innerHTML = ""
    const li = document.createElement("li")
    const a = document.createElement("a")
    a.className = "entypo-star"
    a.innerText = "Track 4"
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
    setTimeout(function() {
        playAudio(sound)
    }, delay)
}

// function to play track (array of sounds)
function playTrack(array) {
    track = array.map(obj => {
        delay = obj.time - array[0].time
        // delay = obj.time - recordStart
        // delay6 = obj.time - recordTime
        playwithDelay(obj.sound, delay)
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

// event listner for key press
document.addEventListener("keypress", e => {
    for (let i = 0; i < boxes.length; i++) {
        let box = boxes[i]
        if (box.dataset.letter.toLowerCase() == e.key) {
            eventRecord(box)
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
    } else {
        playTrack(soundArray)
    }
})

// Record button animation / recording 
recordBtn.addEventListener("click", (e) => {
    recordBtn.classList.toggle('Rec')
    if (Recording) {
        Recording = false
    } else {
        Recording = true
    }
});	

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
fetch(userURL + "/1")
    .then(res => res.json())
    .then(user => user.tracks.forEach(renderTrack))

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
