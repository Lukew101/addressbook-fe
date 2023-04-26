import { createAddressList } from "./components/createAddressList.js";

const form = document.querySelector("#form");

function openAddressAdder(){
	const formOpener = document.querySelector(".open-form");
	formOpener.addEventListener('click', function(){
		form.classList.toggle("form-display");
	})
}
openAddressAdder();

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
	
	// Get data from form fields
	const formData = new FormData(form);
	const data = Object.fromEntries(formData);

	// Add in condition so Number must be a number
	const errorMessage = document.querySelector(".number-error-message");
	if(isNaN(data.mobileNumber)){
		errorMessage.classList.add("number-error-display");

		setTimeout(() => {
			errorMessage.classList.remove("number-error-display");
		}, 3000)
		return;
	}

	// Clear data fields
	const formInputs = document.querySelectorAll("form input");
	formInputs.forEach(input => {
		input.value = "";
	})


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