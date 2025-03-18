const formElement = document.querySelector('form');

function editStudentHandler(event) {
  console.log(event.detail);
  // update form with student data
  const student = event.detail;
  formElement.name.value = student.name;
  formElement.studentnr.value = student.studentnr;
  formElement.photo.value = student.photo;
  formElement.id.value = student.id;
  formElement.querySelector(`[name=gender][value=${student.gender}]`).checked = true;
  formElement.querySelector('button[type=submit]').textContent = 'Update student';
}

function addStudent(student) {
  const url = 'http://localhost:3001/students';
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(student),
  };
  fetch(url, options)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    });
}

function formSubmitHandler(event) {
  event.preventDefault();
  console.log('Form submitted');
  const formData = new FormData(event.target);
  const data = Object.fromEntries(formData);
  console.log(data);
  // addStudent(data);
}

formElement.addEventListener('submit', formSubmitHandler);
document.addEventListener('edit-student', editStudentHandler);