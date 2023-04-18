const addressDisplayContainer = document.querySelector(".inputDisplay");
const form = document.querySelector("#form");

function displayAddresses(){
	fetch('http://localhost:8080/person', {
    	method: 'GET',
	})
	.then(response => response.json())
	.then(data=> createAddressList(data))
	.catch(err => console.error(err));
}
displayAddresses();

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
	.then(data=> console.log(data))
	.catch(err => console.error(err));
})



function createAddressList(data){
	for(let i = 0; i < data.length; i++){
		const person = data[i];
		console.log(person);
		addressDisplayContainer.innerHTML += `<div class="address-container-flex">
												<p><span class="bold-text">Name:</span> ${person.name}</p>
												<p><span class="bold-text">Number:</span> ${person.mobileNumber}</p> 
												<p><span class="bold-text">Address:</span> ${person.address}</p>
												<button type="button" class="remove-button">Remove</button>
											</div>`;
			const removeButton = document.querySelector(".remove-button");
			removeButton.addEventListener('click', function(event) {
			event.preventDefault();
		
			fetch(`http://localhost:8080/person${person.id}`, {
				method: 'DELETE',
			})
			.then(response => response.json())
			.then(data=> {
				console.log(data);
				addressDisplayContainer.remove();
			})
			.catch(err => console.error(err));
		})
	}
}