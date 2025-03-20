const studentTemplate = document.querySelector('#student-template');
const studentList = document.querySelector('#students');

let students = [];

function editStudentEvent(student, event) {
  console.log(event);
  console.log('Student clicked', student);
  const editStudentEvent = new CustomEvent('edit-student', {
    detail: student,
  });
  document.dispatchEvent(editStudentEvent);
}

function deleteStudentEvent(student, event) {
  console.log(event);
  console.log('Delete student', student);
  event.stopPropagation();

  fetch(`http://localhost:3001/students/${student.id}`, {
    method: 'DELETE',
  }).then(() => {
    getStudents();
  });
}

function render() {
  studentList.innerHTML = '';
  students.forEach((student) => {
    const studentElement = studentTemplate.content.cloneNode(true);
    studentElement.querySelector('li').classList.add(student.gender);
    const name = studentElement.querySelector('h1');
    const studentnr = studentElement.querySelector('.studentnr');
    const photo = studentElement.querySelector('.studentimg');

    name.textContent = student.name;
    studentnr.textContent = student.studentnr;
    photo.src = `${student.photo}`;
    photo.alt = student.name;

    studentElement.querySelector('.delete').addEventListener('click', (event) => deleteStudentEvent(student, event));

    studentElement.querySelector('li').addEventListener('click', (event) => editStudentEvent(student, event));

    studentList.appendChild(studentElement);
  });
}

function getStudents() {
  return fetch('http://localhost:3001/students')
    .then((response) => response.json())
    .then((data) => {
      students = [...data];
      console.log(students);
      render();
    });
}

render();
getStudents();
