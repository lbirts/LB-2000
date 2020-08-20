// start of SOUND PAD CODE IGNORE ABOVE, DO not look, advert your eyes lol
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
let inCategory = false

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
    p.dataset.sound = sound.filename
    box.dataset.sound = sound.filename
    box.dataset.letter = box.innerText
    box.dataset.id = sound.id
    box.append(p)
}

// function to play array of sounds with their respective delays
function playwithDelay(obj) {
    let timeO = setTimeout(function() {
        playAudio(obj.sound, obj.volume)
    }, obj.time)
    timeouts.push(timeO)
}

// function to play track (array of sounds)
function playTrack(array) {
    endTime = array[array.length - 1].time + 500
    // endTime = array[-1].time + 500
    array.map(obj => {
        playwithDelay(obj)
    })
    setTimeout(() => {
        playPause.id = "paused"
        playPause.innerHTML = "<img src='https://img.icons8.com/android/24/000000/play.png'/>"
        nowPlaying = false
    }, endTime)
}

// function to cut delay times
function subtractTimes() {
    track = soundArray.map(obj => {
        delay = obj.time - soundArray[0].time
        const object = {sound: obj.sound, time: delay, volume: obj.volume}
        return object
    })
}

// reusable function for recording sounds on click or key press
function eventRecord(element) {
    playAudio(element.dataset.sound, curVolume / 100)
    if (Recording) {
        boxTime = performance.now()
        soundArray.push({sound: element.dataset.sound, time: boxTime, volume: 0.8})
    } 
}

// reusable function for playing sounds
function playAudio(sound, newvolume) {
    const audio = new Audio(sound)
    console.log(audio)
    audio.volume = newvolume
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

// event listener for save
save.addEventListener("click", () => {
    document.removeEventListener("keypress", keyEvent)
    document.body.removeEventListener("keyup", playSound);
})

// event listener for edit
edit.addEventListener("click", () => {
    document.removeEventListener("keypress", keyEvent)
    document.body.removeEventListener("keyup", playSound);
})

// Event listener for play pause utton
playPause.addEventListener("click", () => {
    if (!nowPlaying) {
        nowPlaying = true
        playPause.innerHTML = "<img src='https://img.icons8.com/android/24/000000/pause.png'/>"
        playPause.id = "nowPlaying"
        playTrack(track)
    } else {
        playPause.id = "paused"
        playPause.innerHTML = "<img src='https://img.icons8.com/android/24/000000/play.png'/>"
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
        inCategory = true
        testing()
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

// form to submit categories and tracks
trackForm.addEventListener("submit", (e) => {
    e.preventDefault()
    document.querySelector('#trackModal').style.display = 'none'
    document.querySelector('.modal-backdrop').remove()
    if (!inCategory) {
        let counter = 0
        audios.forEach(audio => {
            let obj
            if (audio.src === "") {
                obj = {name: `Sound${++counter}`, file: "no sound"}
            } else {
                obj = {name: `Sound${++counter}`, file: audio.src}
            }
            audioArray.push(obj)
        })
        console.log(audioArray)
        console.log(e.target[0].value)
        debugger
        createCategory(e.target[0].value)
        e.target.reset()
    } else {
        checkingTrack(e.target[0].value, e.target.dataset.id)
        track = []
        soundArray = []
        e.target.reset()
        document.addEventListener("keypress", keyEvent)
    }
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

// create category
async function createCategory(value) {
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            name: value
        })
    }
    fetch(categoryURL, options)
        .then(res => res.json())
        .then(category => {
            delay = 0
            audioArray.forEach(sound => {
                setTimeout(() => {
                    createSounds(sound, category.id)
                }, delay)
                delay += 500
            })
            renderCategory(category)
            audioArray = []
        })
}

// create sounds
function createSounds(sound, categoryId) {
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            sound_name: sound.name,
            filename: sound.file,
            category_id: categoryId
        })
    }
    fetch(soundsURL, options)
        .then(res => res.json())
        .then(console.log)
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

// Record power and display buttons
let on = false
document.querySelector(".power-button").addEventListener("click", () => {
    if (on) {
        on = false
        document.querySelector("#display").innerText = ""
        document.querySelector("#display").classList.remove('drum-display--on')
        document.querySelector(".volume-display").classList.remove('volume-display--on')
        document.querySelector(".power-button svg").setAttribute("fill", "grey")
    } else {
        on = true
        document.querySelector("#display").innerText = "Welcome"
        document.querySelector("#display").classList.add('drum-display--on')
        document.querySelector(".volume-display").classList.add('volume-display--on')
        document.querySelector(".power-button svg").setAttribute("fill", "green")
    }
    
})

let curVolume = 80
document.querySelector(".vol-plus").addEventListener("click", () => {
    if (curVolume < 100) {
        updateVolume(++curVolume)
    }
})

document.querySelector(".vol-minus").addEventListener("click", () => {
    if (curVolume > 0) {
        updateVolume(--curVolume)
    }
})

function updateVolume() {
    track.forEach(audio => {
        audio.volume = curVolume / 100
    })
    document.querySelector(".volume-display").innerText = `Volume ${curVolume}%`
}

//   handleVolumeUp() {
//     if (this.state.volume < 100) {
//       this.setState({ volume: this.state.volume + 1 });
//     }
//     this.updateVolume();
//   }

//   handleVolumeDown() {
//     if (this.state.volume > 0) {
//       this.setState({ volume: this.state.volume - 1 });
//     }
//     this.updateVolume();
//   }

//   updateVolume() {
//     const audios = document.querySelectorAll('audio');
//     audios.forEach(audio => {
//       audio.volume = this.state.volume / 100;
//     });
//   }


//  line break for microphone do not go past this line these are stretch goals!!!!!!!!!!!!!
//  line break for microphone do not go past this line these are stretch goals!!!!!!!!!!!!!
//  line break for microphone do not go past this line these are stretch goals!!!!!!!!!!!!!
//  line break for microphone do not go past this line these are stretch goals!!!!!!!!!!!!!

let micRecord = false
const audios = document.querySelectorAll("audio")
let audioArray = []

function testingAgain(e) {
    console.log(e.target.innerText)
    recordBtn.dataset.letter = e.target.innerText
    e.target.removeEventListener("click", testingAgain)
}

async function recordSelf(e) {
    if (micRecord) {
        micRecord = false
    } else {
        micRecord = true
        console.log("Recording")
        const activeBtn = document.querySelector(`.box[data-letter="${e.target.dataset.letter}"]`)
        console.log(activeBtn)
        const activeLtr = activeBtn.dataset.letter
        console.log(activeLtr)
        console.log('heya1')
        const recorder = await recordAudio(activeLtr)
        console.log('heya2')
        recorder.start()
        console.log('heya3')
        // stopRecording(recorder)
        var stopRecording = function(e) {
            if (e.key === "p") {
                micRecord = false
                recordBtn.classList.toggle('Rec')
                console.log("recording stopped");
                recorder.stop(); //this triggers the creating the audio el
            }
            document.body.removeEventListener("keyup", stopRecording);
            //document.body.removeEventListener("click", stopRecording);
        };
    
        document.body.addEventListener("keyup", stopRecording);
    }
}

function testing() {
    if (inCategory == false) {
        boxes.forEach(box => {
            box.addEventListener("click", testingAgain)
            box.addEventListener("click", clickSound)
        })
        recordBtn.addEventListener("click", recordSelf)
        document.body.addEventListener("keyup", playSound);
    } else {
        boxes.forEach(box => {
            box.removeEventListener("click", testingAgain)
        })
        document.body.removeEventListener("keyup", playSound);
        document.addEventListener("keypress", keyEvent)
        recordBtn.removeEventListener("click", recordSelf)
    }
}

function clickSound(e) {
    // console.log(e.target)
    if (micRecord) return;
    const key = e.target.dataset.letter;
    const sound = document.querySelector(`audio[data-key="${key}"]`);
    if (!sound) return;
    console.log("playing");
    sound.currentTime = 0;
    sound.play();
}

function playSound(e) {
    // console.log(e.key)
    // debugger
    if (micRecord) return;
    const key = e.key.toUpperCase();
    const sound = document.querySelector(`audio[data-key="${key}"]`);
    if (!sound) return;
    console.log("playing");
    sound.currentTime = 0;
    sound.play();
}

// record Audio
function recordAudio(key) {
	console.log(key);
	return new Promise(async resolve => {
		const stream = await navigator.mediaDevices.getUserMedia({
			audio: true
		});
		const mediaRecorder = new MediaRecorder(stream);
		const audioChunks = [];

		mediaRecorder.addEventListener("dataavailable", event => {
			audioChunks.push(event.data);
		});
		const start = () => {
			console.log("started");
			return mediaRecorder.start();
		};

		const stop = () =>
			new Promise(resolve => {
				mediaRecorder.addEventListener("stop", stop);
				function stop() {
					const audioBlob = new Blob(audioChunks);
					const audioUrl = URL.createObjectURL(audioBlob);
					//creating audio el here
					console.log({ key });
					addAudio(audioUrl, key);
					mediaRecorder.removeEventListener("stop", stop);

					resolve();
				}

				try {
					mediaRecorder.stop();
				} catch (e) {
					console.log("cant stop wont stop", e);
				}
			});

		resolve({ start, stop });
    });
}

function addAudio(url, key) {
	console.log("added audio");
	const el = document.querySelector(`audio[data-key="${key}"]`);
	el.playbackRate = 2.0;
	el.src = url;
}

testing()