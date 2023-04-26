const addressDisplayContainer = document.querySelector(".inputDisplay");

// Creating address list with a DELETE & PUT request
export function createAddressList(data){
	for(let i = 0; i < data.length; i++){
		const person = data[i];
		console.log(person);

		const addressContainer = document.createElement("div");
		addressContainer.classList.add("address-container-flex");
		addressContainer.setAttribute("data-person-id", person.id);
		addressContainer.innerHTML += `<p><span class="name">${person.name}</span></p>
									<p><span class="number">${person.mobileNumber}</span></p> 
									<p><span class="address">${person.address}</span></p>
									<div class="edit-remove-buttons">
										<i class="edit-button fa-solid fa-user-pen"></i>
										<i class="remove-button fa-solid fa-trash-can"></i>
									</div>`;
		addressDisplayContainer.appendChild(addressContainer);
		
		// Remove button - DELETE
		const removeButtons = document.querySelectorAll(".remove-button");
		removeButtons.forEach(removeButton => {
			removeButton.addEventListener('click', function(event) {
				event.preventDefault();
				const getAddressContainer = event.target.parentElement.parentElement;
				const personId = getAddressContainer.getAttribute("data-person-id");
			
				fetch(`http://localhost:8080/person/${personId}`, {
					method: 'DELETE',
				})
				.then(response => {
					if(response.ok){
						getAddressContainer.remove();
					}
				})
				.catch(err => console.error(err));
			})
		})
		
		// Edit button - PUT
		const editButton = addressContainer.querySelector(".edit-button");
		editButton.addEventListener('click', function(event){
			event.preventDefault();

			const nameElement = addressContainer.querySelector(".name");
			const numberElement = addressContainer.querySelector(".number");
			const addressElement = addressContainer.querySelector(".address");

			// Hide Edit and X buttons
			const editRemoveButtonsDiv = document.querySelectorAll(".edit-remove-buttons");

			editRemoveButtonsDiv.forEach(button => {
				button.classList.toggle("button-hider");
			})

			// Elements replaced with inputs containing the same data for user to make changes
			const nameInput = document.createElement("input");
			nameInput.classList.add("edit-input-name");
			nameInput.value = nameElement.textContent;
			nameElement.replaceWith(nameInput);

			const numberInput = document.createElement("input");
			numberInput.classList.add("edit-input-number");
			numberInput.value = numberElement.textContent;
			numberElement.replaceWith(numberInput);

			const addressInput = document.createElement("input");
			addressInput.classList.add("edit-input-address");
			addressInput.value = addressElement.textContent;
			addressElement.replaceWith(addressInput);

			const saveButton = document.createElement("i");
			saveButton.classList.add("fa-regular", "fa-circle-check");
			addressContainer.appendChild(saveButton);
			
			saveButton.addEventListener('click', function(event){
				event.preventDefault();

				// Display Edit and X buttons again
				editRemoveButtonsDiv.forEach(button => {
					button.classList.toggle("button-hider");
				})

				// Value of user input set as an object to be sent in the PUT request
				const updatedPerson = {
					name: nameInput.value,
					mobileNumber: numberInput.value,
					address: addressInput.value
				};
				const personId = addressContainer.getAttribute("data-person-id");

				// Once edits saved, PUT request sent for edits to be saved
				fetch(`http://localhost:8080/person/${personId}`, {
					method: 'PUT',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify(updatedPerson)
				})
				.then(response => {
					// Once response is ok, inputs are replaced by original elements with the inclusion of the changes
					if(response.ok){
						nameInput.replaceWith(nameElement);
						nameElement.textContent = updatedPerson.name;
						
						numberInput.replaceWith(numberElement);
						numberElement.textContent = updatedPerson.mobileNumber;
						
						addressInput.replaceWith(addressElement);
						addressElement.textContent = updatedPerson.address;
						
						saveButton.remove();
					}
				})
				.catch(err => console.error(err));
			});
		});
	}
}