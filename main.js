let quests = `
CATEGORY: School Essentials (packlista)
Nollbricka: 30
Gott humör: 10
Bok-rekommendation: 15
Matsäck (ölsäck, höhö): 20
Plunta: 15
Post-it-lappar: 15
Barndoms-körkort (ex. symaskin): 25

CATEGORY: Preschool Originals (förfest)
Häfv en öl: 20
Klara viskeleken: 20
Bäska droppar: 30
Blanda drink: 30

CATEGORY: School Originals (på campus)
Study session på puben: 50
Hitta Erik: 30
Spela king i kön: 50
Avverka en hög post-it-lappar: 40
Kasta pappersflygplan längst: 30
Slåss mot nazis: 100
Pissa i kors: 40
Visa barndomskörkort för vakt: 50

CATEGORY: Recess activities (spel)
Vinn på hänga gubbe: 30
Vinn på coup: 30
Vinn på pingis: 30
Vinn på leif: 20
Vinn på bluff: 20
Få över 20p på dryckleif: 30
Syna Alex rätt tre gånger i rad: 50
Bli skjuten på Secret Hitler: 40

CATEGORY: Class activities (dagsplan)
Stå i 1h+ kö till Kajsabaren: 50
Ge upp på kön till Kajsabaren: 50
Undvik toaletter til midnatt: 60
Basta på teknologgården: 50
Vin i röda rummet: 50
Sluta på Focus: 50

CATEGORY: Talent show (utmaningar)
Gå par: 100
Gå matpar: 150
Gå toalettpar: 100
Maxa karaoken: 60
`
;

let points = parseInt(localStorage.getItem("points")) || 0;
let currColor = "#FFFFFF";

for (let quest of quests.split("\n")) {
    
    if (quest === "") {
        continue;
    }

    let split = quest.split(':');
    let task = split[0];
    let reward = split[1];

    if (task === "CATEGORY") {
        switch (reward) {
            case " School Essentials (packlista)":
                currColor = "#FF4444";
                break; 
            case " Preschool Originals (förfest)":
                currColor = "#FF9955";
                break;
            case " School Originals (på campus)":
                currColor = "yellow";
                break;
            case " Recess activities (spel)":
                currColor = "#35EC5F";
                break;
            case " Class activities (dagsplan)":
                currColor = "#45B1FF";
                break;
            case " Talent show (utmaningar)":
                currColor = "#AC72FF";
                break;
        }
        
        let categoryElem = document.createElement("div");
        categoryElem.className = "category";
        categoryElem.style.color = currColor;
        categoryElem.innerHTML = "<u>" + reward + "</u>";
        document.getElementById("quest-list").appendChild(categoryElem);
    } else {
        let taskStatus = localStorage.getItem(task);
        let tickboxClassName = taskStatus === null || taskStatus === "no" ? "tickbox" : "tickbox-checked";
    
        let questElem = document.createElement("div");
        let taskElem = document.createElement("p");
        let rewardElem = document.createElement("p");
        let tickboxElem = document.createElement("div");
        let questInfoElem = document.createElement("div");
    
        taskElem.innerHTML = task;
        rewardElem.innerHTML = reward;
        tickboxElem.className = tickboxClassName;
        tickboxElem.points = parseInt(reward);
        tickboxElem.task = task;
        tickboxElem.onclick = tickboxOnClick;
    
        questInfoElem.className = "quest-info";
        questInfoElem.replaceChildren(rewardElem, tickboxElem);
    
        questElem.className = "quest";
        questElem.replaceChildren(taskElem, questInfoElem);
        questElem.style.color = currColor;
        
        document.getElementById("quest-list").appendChild(questElem);
    }
}
/*
document.getElementById("redeem-button").onclick = () => {
    if (points > 0) {
        points = 0;
        updatePoints();
    }
}
*/
updatePoints();

function tickboxOnClick(e) {
    let box = e.target;
    if (box.className === "tickbox") {
        box.className = "tickbox-checked";
        localStorage.setItem(box.task, "yes");
        points += box.points;
    } else {
        box.className = "tickbox";
        localStorage.setItem(box.task, "no");
        points -= box.points;
    }
    updatePoints();
}

function updatePoints() {
    localStorage.setItem("points", points.toString());
    console.log(points);
    document.getElementById("points").innerHTML = "Poäng: " + points.toString();
}