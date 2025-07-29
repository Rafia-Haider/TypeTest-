let timerBox = document.querySelector(".timer");

let input = document.querySelector(".input-box input");

let result = document.querySelector(".result");

let start = false;

let timeButton = document.querySelectorAll(".timeDuration button");

let time = 60;

let wordBox = document.querySelector(".quote-box h5")

//TIMER START

input.addEventListener("keydown", () => {
    if (!start) {
        console.log("key pressed");
        startTimer(time);
    }
    start = true;
})

// USING SET INTERVAL TO GO ONE SECOND FORWARD(OR BACKWARD;) AND UPDATING TIME 

function startTimer(time) {
    let intervald = setInterval(() => {
        time--;
        let m = Math.floor(time / 60);
        let s = time % 60;
        if (s < 10) {
            timerBox.textContent = `${m}:0${s}`;
        }
        else {
            timerBox.textContent = `${m}:${s}`;
        }
        if (time == 0) {
            clearInterval(intervald);
            result.style.display = "flex";
        }
    }, 1000);
}

// DIFFERENT TIMER BUTTONS

timeButton.forEach(element => {
    element.addEventListener("click", () => {
        if (element.textContent == "0:30") {
            time = 30;
            timerBox.textContent = "0:30";
        }
        else if (element.textContent == "2:00") {
            time = 120;
            timerBox.textContent = "2:00";
        }
        else {
            time = 300;
            timerBox.textContent = "5:00";
        }

    })
});

// FECTHING WORDS TO PUT IN THE BOX

let wordList = [];

fetch("https://random-word-api.vercel.app/api?words=50")
    .then(res => res.json())
    .then(data => {
        wordList = data;
        wordBox.textContent = wordList.join(" ");
    })
    .catch(err => {
        console.warn("API FAILED! using backup local list.", err);
        wordList = [
            "apple", "jump", "coffee", "glass", "ocean", "frame", "orange", "train", "plant", "spoon",
            "river", "cloud", "mountain", "guitar", "window", "forest", "mirror", "garden", "cheese", "bottle",
            "camera", "bridge", "button", "silver", "rocket", "planet", "school", "laptop", "energy", "pencil",
            "kitten", "castle", "hammer", "engine", "friend", "market", "signal", "vacuum", "shadow", "garage",
            "whistle", "holiday", "notebook", "whisper", "blanket", "lantern", "scooter", "drizzle", "wallet", "poster",
            "fortune", "traffic", "journal", "trophy", "message", "satchel", "horizon", "shampoo", "curtain", "luggage"
        ];
        wordBox.textContent = wordList.join(" ");
    }
    )