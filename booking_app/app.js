
async function getData() {
    const response = await axios.get('http://localhost:3000/user/');
    return response.data;
  }

async function postData(data) {
  const response = await axios.post('http://localhost:3000/user/add',data);
  return response;
}

async function updateData(data,id) {
    const response = await axios.put(`http://localhost:3000/edit/${id}`, data);
    return response.data;
  }
async function deleteTask(id) {
  const response = await axios.delete(`http://localhost:3000/delete/${id}`);
  return response;
}

document.addEventListener("DOMContentLoaded",async ()=>{
    const form1 = document.getElementById('form1');
    const list = document.getElementById('users');

    await loadContent();
    const submit = form1.querySelector('#submit')
    submit.addEventListener('click',event=>handleSubmit(event,form1));
    list.addEventListener('click',handleList);
    
    async function loadContent(){
        try{
            const response = await getData();
            renderHtml(response);
        }catch(e){
            console.log(e);
        }
    }
    async function renderHtml(res){
        for (const appointment of res) {

            createList(appointment);
          }
    }
    function createList(appointment){
        const listItem = document.createElement('li');
            listItem.innerHTML = `
              <span>${appointment.name}</span>
              <span>${appointment.email}</span>
              <span>${appointment.phone}</span><br>
              <button class="edit-button" data-id="${appointment._id}">Edit</button>
              <button class="delete-button" data-id="${appointment._id}">Delete</button>
            `;
            list.appendChild(listItem);
    }
    async function handleSubmit(event,form){
        event.preventDefault();
        const nameSpan = form.querySelector('#name');
        const emailSpan = form.querySelector('#email');
        const phoneSpan = form.querySelector('#phonenumber');
        const name = nameSpan.value;
        const email = emailSpan.value
        const phone = phoneSpan.value

        if (!name || !email || !phone) {
          alert('Please enter all the details');
          return;
        }
        try{
            const obj ={name,email,phone}
            const res = await postData(obj);
            const newAppointment = res;
            nameSpan.value ='';
            emailSpan.value ='';
            phoneSpan.value ='';
            createList(newAppointment);
        }catch(e){
            console.log(e);
        }
    }
    async function handleList(event) {
        // Handle clicks on the delete button
        if (event.target.classList.contains('delete-button')) {
          event.preventDefault();
          const id = event.target.dataset.id;
          try {
            await deleteTask(id);
            const listItem = event.target.parentElement;
            listItem.remove();
          } catch (error) {
            console.error(error);
          }
        }
        // Handle clicks on the edit button
        if (event.target.classList.contains('edit-button')) {
          event.preventDefault();
          const id = event.target.dataset.id;
          try{
            
            const listItem = event.target.parentElement;
            const nameSpan = listItem.querySelector('span:nth-child(1)');
            const emailSpan = listItem.querySelector('span:nth-child(2)');
            const phoneSpan = listItem.querySelector('span:nth-child(3)');
        
            // Create a form with the appointment data
            const form = document.createElement('form');
            form.id = 'form2';
            form.innerHTML = `
              <label for="name-input">Name:</label>
              <input id="name-i" type="text" value="${nameSpan.textContent}">
              <label for="email-input">Email:</label>
              <input id="email-i" type="email" value="${emailSpan.textContent}">
              <label for="phone-input">Phone:</label>
              <input id="phone-i" type="tel" value="${phoneSpan.textContent}">
              <button type="submit">Save</button>
              <button type="button" class="cancel-button">Cancel</button>
            `;
            // Replace the list item with the form
            listItem.appendChild(form);
        
            // Attach event listeners to the form submit button and the cancel button
            const saveButton = form.querySelector('button[type="submit"]');
            const cancelButton = form.querySelector('.cancel-button');
            saveButton.addEventListener('click', event => handleSaveClick(event, listItem));
            cancelButton.addEventListener('click', handleCancelClick);
          }catch(e){
            console.log(e);
          }
        
          async function handleSaveClick(event,listItem) {
            event.preventDefault();
            const listItem1 = event.target.parentElement;
            const nameSpan = listItem.querySelector('span:nth-child(1)');
            const emailSpan = listItem.querySelector('span:nth-child(2)');
            const phoneSpan = listItem.querySelector('span:nth-child(3)');// Get the input values from the form
            const name = document.getElementById('name-i').value.trim();
            const email = document.getElementById('email-i').value.trim();
            const phone = document.getElementById('phone-i').value.trim();
      
            // Validate the input v alues
            if (!name || !email || !phone) {
              return;
            }
      
            // Update the appointment in the API
            try{
                const res = await updateData({name,email,phone},id)
                // Update the list item with the updated appointment data
                
                listItem1.remove();
                nameSpan.innerHTML = name;
                emailSpan.innerHTML = email;
                phoneSpan.innerHTML = phone;
            
            }catch(error) {
                console.error(error);
                alert('There was an error updating the appointment.');
              }
          }
      
          function handleCancelClick(event) {
            const listItem = event.target.parentElement;
            const _id = event.target.dataset.id; 
            listItem.remove();
            
          }
        }
      }
      
})