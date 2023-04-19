const addressDisplayContainer = document.querySelector(".inputDisplay");
const form = document.querySelector("#form");

//GET request
function displayAddresses(){
	fetch('http://localhost:8080/person', {
    	method: 'GET',
	})
	.then(response => response.json())
	.then(data=> createAddressList(data))
	.catch(err => console.error(err));
}
displayAddresses();


// POST request
form.addEventListener('submit', function(event) {
	event.preventDefault();

	const formData = new FormData(form);
	const data = Object.fromEntries(formData);

	fetch('http://localhost:8080/person', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(data),
	})
	.then(response => response.json())
	.then(data=> createAddressList([data])) //createAddressList called to add new person to HTML
	.catch(err => console.error(err));
})


// Creating address list and DELETE request through remove button
function createAddressList(data){
	for(let i = 0; i < data.length; i++){
		const person = data[i];
		console.log(person);
		addressDisplayContainer.innerHTML += `<div class="address-container-flex" data-person-id="${person.id}">
												<p><span class="bold-text">Name:</span> ${person.name}</p>
												<p><span class="bold-text">Number:</span> ${person.mobileNumber}</p> 
												<p><span class="bold-text">Address:</span> ${person.address}</p>
												<button type="button" class="remove-button">Remove</button>
											</div>`;
			const addressContainer = addressDisplayContainer.lastElementChild;
			const removeButton = document.querySelector(".remove-button");
			removeButton.addEventListener('click', function(event) {
			event.preventDefault();

			const personId = addressContainer.getAttribute("data-person-id");
			console.log(personId);
		
			fetch(`http://localhost:8080/person/${personId}`, {
				method: 'DELETE',
			})
			.then(response => response.json())
			.then(data=> {
				console.log(data);
				event.target.parentElement.remove();
			})
			.catch(err => console.error(err));
		})
	}
}
// PUT request