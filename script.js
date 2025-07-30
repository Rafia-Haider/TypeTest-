let timerBox = document.querySelector(".timer");

let input = document.querySelector(".input-box input");

let result = document.querySelector(".result");

let start = false;

let timeButton = document.querySelectorAll(".timeDuration button");

let time = 60;

let wordBox = document.querySelector(".quote-box")

let correctWords = 0;

let  incorrrectWords = 0;

let wordNumber = 0;

let wordSpanList= [];

let wordList = [];

let currentWord = wordList[0];
//TIMER START

input.addEventListener("keydown", (event) => {
    if(!wordList) return;

    if (!start) {
        console.log("key pressed");
        startTimer(time);
    }
    start = true;
    if (event.key == " ") {
        currentWord = wordList[wordNumber];
        if (input.value.trim() == currentWord) {
            correctWords++;
            console.log("correct");
        }
        else{
            incorrrectWords++;
            console.log("incorrect");
        }
       
        input.value = "";
        wordSpanList[wordNumber].classList.remove("currentWord");
        wordNumber++;
        wordSpanList[wordNumber].classList.add("currentWord");
        console.log(currentWord);
    }
})

// USING SET INTERVAL TO GO ONE SECOND FORWARD(OR BACKWARD;)) AND UPDATING TIME 

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
            input.disabled = "true";
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


fetch("https://random-word-api.vercel.app/api?words=50")
    .then(res => res.json())
    .then(data => {
        wordList = data;
        wordList.forEach(element => {
            let wordSpan = document.createElement("span");
            wordSpan.textContent = element;
            wordBox.appendChild(wordSpan);
        });
        wordSpanList = document.querySelectorAll(".quote-box span");
        wordSpanList[0].classList.add("currentWord");
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
    }
    )



