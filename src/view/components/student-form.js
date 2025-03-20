const backend_url = 'http://localhost:3001/students';

const formElement = document.querySelector('form');

function editStudentHandler(event) {
  console.log('Edit student', event.detail);
  render(event.detail);
}

function addStudent(student) {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(student),
  };
  fetch(backend_url, options)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      location.reload();
    });
}

function updateStudent(student) {
  const url = `${backend_url}/${student.id}`;
  const options = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(student),
  };
  fetch(url, options)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      location.reload();
    });
}

function formSubmitHandler(event) {
  event.preventDefault();
  console.log('Form submitted');
  const formData = new FormData(event.target);
  const data = Object.fromEntries(formData);

  console.log(data);

  if (data.id) {
    updateStudent(data);
  } else {
    addStudent(data);
  }
}

function render(student = {}) {
  console.log('Render form', student);
  formElement.name.value = student.name || '';
  formElement.studentnr.value = student.studentnr || '';
  formElement.photo.value = student.photo || '';
  formElement.id.value = student.id || '';
  formElement.querySelector(`[name=gender][value=${student?.gender || 'other'}]`).checked = true;

  if (!student.id) {
    console.log('student is empty');
    formElement.querySelector('button[type=submit]').textContent = 'Add student';
  } else {
    console.log('student is not empty');
    formElement.querySelector('button[type=submit]').textContent = 'Update student';
  }
}

render();
formElement.addEventListener('submit', formSubmitHandler);
document.addEventListener('edit-student', editStudentHandler);