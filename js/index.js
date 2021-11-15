// Wait for page to be loaded to fetccMonsters

document.addEventListener('DOMContentLoaded', renderMonsters)

// Fetch monsters

function renderMonsters(){
    fetchMonsters();
    const monsterForm = document.getElementById('create');
    const forward = document.getElementById('forward');
    monsterForm.addEventListener('submit', createMonsters);
    forward.addEventListener('click', moreMonsters)
}
let i = 100;

function moreMonsters() {
    fetch(`http://localhost:3000/monsters/?_limit=${i}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
    })
    .then(resp => resp.json())
    .then(monsters => {
        const monsContainer = document.getElementById('monster-container');
        for(const monster of monsters) {
            const monDiv = document.createElement('div');
            monDiv.className = monster["name"];
            monDiv.innerHTML = `
            <ul>
            <li>${monster["name"]}</li>
            <li>Age: ${monster["age"]}</li>
            <li>Description: ${monster["description"]}</li>
            </ul>
            `
            monsContainer.append(monDiv);
            
        }
    })
    i = i + 50
}

function fetchMonsters() {
    fetch("http://localhost:3000/monsters/?_limit=50", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
    })
    .then(resp => resp.json())
    .then(monsters => {
        const monsContainer = document.getElementById('monster-container');
        for(const monster of monsters) {
            const monDiv = document.createElement('div');
            monDiv.className = monster["name"];
            monDiv.innerHTML = `
            <ul>
            <li>${monster["name"]}</li>
            <li>Age: ${monster["age"]}</li>
            <li>Description: ${monster["description"]}</li>
            </ul>
            `
            monsContainer.append(monDiv);
            
        }
    })
}

function createMonsters(e){
    const name = e.target.children[0].value;
    const age = e.target.children[1].value;
    const description = e.target.children[2].value;
    e.preventDefault();
    fetch("http://localhost:3000/monsters", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
        body: JSON.stringify({
            "name": name,
            "age": age,
            "description": description,
        }),
    })
}
