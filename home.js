
let allVehicles = [];
let isSorted = false;


function loadAllVehicles() {
    let results = document.getElementById("results");

    fetch("https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForManufacturerAndYear/mer?year=2014&format=json")
        .then(res => res.json())
        .then(data => {
            allVehicles = data.Results;
            displayVehicles(allVehicles);
        })
        .catch(err => {
            console.log(err);
            results.innerHTML = "<p>Error loading data</p>";
        });
}

function displayVehicles(list) {
    let results = document.getElementById("results");

    let html = list.map(car => `
        <div class="card">
            <h3>${car.MakeName}</h3>
            <p>Make ID: ${car.MakeId}</p>
            <p>MfrId: ${car.MfrId}</p>
            <p>MfrName: ${car.MfrName}</p>
        </div>
    `).join("");

    results.innerHTML = html;
}


function toggleSort() {
    let btn = document.getElementById("sortBtn");

    if (!isSorted) {
        let sorted = [...allVehicles].sort((a, b) =>
            a.MakeName.localeCompare(b.MakeName)
        );

        displayVehicles(sorted);
        btn.textContent = "Original Order";
        isSorted = true;

    } else {
        displayVehicles(allVehicles);
        btn.textContent = "Sort A → Z";
        isSorted = false;
    }
}
let toggleBtn = document.getElementById("themeToggle");

toggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark");

    toggleBtn.textContent =
        document.body.classList.contains("dark") ? "☀️" : "🌙";
});


window.onload = loadAllVehicles; // well as it wasnt loading i added it 
