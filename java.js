


function searchVehicle() {

    let input = Number(document.getElementById("search").value);
    let results = document.getElementById("results");

    results.innerHTML = "";

    if (!input) {
        alert("Enter Make ID");
        return;
    }

    fetch("https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForManufacturerAndYear/mer?year=2014&format=json")
        .then(response => response.json())
        .then(data => {

            let filtered = data.Results.filter(car => 
                car.MakeId === input
            );

            if (filtered.length === 0) {
                results.innerHTML = "<p>No match found</p>";
                return;
            }

            let html = filtered.map(car => `
                <div class="card">
                    <h3>${car.MakeName}</h3>
                    <p>MfrId: ${car.MfrId}</p>
                    <p>MfrName: ${car.MfrName}</p>
                </div>
            `).join("");

            results.innerHTML = html;

        })
        .catch(error => {
            console.log(error);
            results.innerHTML = "<p>Error fetching data</p>";
        });
}



let toggleBtn = document.getElementById("themeToggle");

toggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {
        toggleBtn.textContent = "☀️";
    } else {
        toggleBtn.textContent = "🌙";
    }
});