console.clear();

//* GET PERMISSION-----------------------------/
(function() {
	window.navigator.permissions.query({ name: "microphone" }).then(function(res) {
		if (res.state === "prompt") {
			navigator.mediaDevices.getUserMedia({ audio: true });
		} else {
			console.log("I gots the permissions");
		}
	});
})();

//* SHOW THE RECORD DIALOG---------------------------------------/
//sets initial position of dialog
const recordModal = document.querySelector(".record-modal");
const container = document.querySelector(".keys");
recordModal.style.setProperty(
	"--modalYPos",
	container.getBoundingClientRect().top
);

const keys = [...document.querySelectorAll(".beat")];
keys.forEach(key => {
	key.addEventListener("click", editSound);
});
document.body.addEventListener("click", e => {
	if (recording) return;
	const button = e.target.closest(".beat");
	if (!button) {
		document
			.querySelectorAll(".beat")
			.forEach(beat => (beat.dataset.active = "false"));
		hideRecordDialog();
	}
});
function editSound(e) {
	if (recording) return;
	const state = this.dataset.active;
	[...document.querySelectorAll("[data-active]")].forEach(
		key => (key.dataset.active = "false")
	);
	if (state === "true") {
		this.dataset.active = "false";
		hideRecordDialog();
	} else {
		showRecordDialog(this);
		this.dataset.active = "true";
	}
}

function showRecordDialog(activeEl) {
	const pos = activeEl.getBoundingClientRect();
	const recordModal = document.querySelector(".record-modal");

	recordModal.style.setProperty("--modalDisplay", "visible");
	recordModal.style.setProperty("--modalXPos", pos.x);
	recordModal.style.setProperty("--modalYPos", pos.y);
	recordModal.style.setProperty("--modalOpacity", 1);
}
function hideRecordDialog() {
	const recordModal = document.querySelector(".record-modal");
	const container = document.querySelector(".keys");

	recordModal.style.setProperty("--modalDisplay", "hidden");
	recordModal.style.setProperty("--modalXPos", 0);
	recordModal.style.setProperty("--modalOpacity", 0);
	recordModal.style.setProperty(
		"--modalYPos",
		container.getBoundingClientRect().top
	);
}

//* RECORDING THE SOUND---------------------------------------
//this is true when you are recording (r key is pressed)
let recording = false;

document.body.addEventListener("keydown", record);

async function record(e) {
	if (e.key !== "r" || recording) return;
	console.log("recording");
	recording = true;

	const activeEl = document.querySelector(`.beat[data-active="true"]`);
	const activeKey = activeEl.dataset.key;
	activeEl.classList.add("recording");
	const recordModal = document.querySelector(".record-modal");
	recordModal.dataset.recording = "true";

	const recorder = await recordAudio(activeKey);
	recorder.start();

	var stopRecording = function(e) {
		console.log(e);
		if (e.key === "r" || e.type === "click") {
			console.log("recording stopped");

			recording = false;
			recordModal.dataset.recording = "false";
			activeEl.classList.remove("recording");
			recorder.stop(); //this triggers the creating the audio el
		}
		document.body.removeEventListener("keyup", stopRecording);
		//document.body.removeEventListener("click", stopRecording);
	};

	document.body.addEventListener("keyup", stopRecording);
	//document.body.addEventListener("click", stopRecording);
}

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

//*PLAY THE SOUND--------------------------------------------
document.body.addEventListener("keydown", playSound);
function playSound(e) {
	if (recording) return;
	const key = e.key;
	const sound = document.querySelector(`audio[data-key="${key}"]`);
	const beat = document.querySelector(`.beat[data-key="${key}"]`);
	if (!sound) return;
	console.log("playing");
	beat.classList.add("playing");
	sound.currentTime = 0;
	sound.play();
}
const beats = [...document.querySelectorAll(`.beat`)];
beats.forEach(beat => {
	beat.addEventListener("transitionend", removePlaying);
});
function removePlaying(e) {
	if (e.target.classList.contains("playing")) {
		e.target.classList.remove("playing");
	}
}

const toggleModalBtn = document.querySelector(".toggle-modal");
const helpModal = document.querySelector(".help-modal");
toggleModalBtn.addEventListener("click", toggleHelp);
function toggleHelp() {
	console.log("ran");
	const modal = document.querySelector(".help-modal");
	modal.dataset.open = modal.dataset.open === "false" ? "true" : "false";
}
helpModal.addEventListener("click", toggleHelp);

setTimeout(toggleHelp, 700);
