// // fetch ("https://vpic.nhtsa.dot.gov/api/vehicles/getmodelsformake/toyota?format=json").then(response => response.json()
// // ).then(data => {
// //     console.log(data);
// // }).catch(error => {
// //     console.error("Error fetching data:", error);
// // });

// // input 
// let inp = document.getElementById("search").value;
// function searchVehicle(){
//     fetch (`https://vpic.nhtsa.dot.gov/api/vehicles/getmodelsformake/${inp}?format=json`).then(response => response.json()
// ).then(data => {
//     console.log(data);
// }).catch(error => {
//     console.error("Error fetching data:", error);

// }}

// function searchVehicle() {

//     let input = document.getElementById("search").value;
//     let results = document.getElementById("results");

//     results.innerHTML = "";

//     if (input === "") {
//         alert("Enter something");
//         return;
//     }

//     let url = "";

//     // check if input is number (ID)
//     if (!isNaN(input)) {
//         url = `https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMakeId/${input}?format=json`;
//     } else {
//         url = `https://vpic.nhtsa.dot.gov/api/vehicles/getmodelsformake/${input}?format=json`;
//     }

//     fetch(url)
//         .then(res => res.json())
//         .then(data => {
//             console.log(data);

//             if (data.Results.length === 0) {
//                 results.innerHTML = "<p>No results found</p>";
//                 return;
//             }

//             data.Results.forEach(car => {
//                 let p = document.createElement("p");
//                 p.innerText = car.Model_Name;
//                 results.appendChild(p);
//             });
//         })
//         .catch(error => {
//             console.log(error);
//             results.innerHTML = "<p>Error fetching data</p>";
//         });
// }
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

            console.log(data);

            
            let filtered = data.Results.filter(car => 
                car.MakeId === input
            );

            console.log("Filtered:", filtered);

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