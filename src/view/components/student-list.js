const studentTemplate = document.querySelector('#student-template');
const studentList = document.querySelector('#students');

let students = [];

function render() {
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

    studentElement.querySelector('li').addEventListener('click', () => {
      const editStudentEvent = new CustomEvent('edit-student', {
        detail: student,
      });
      document.dispatchEvent(editStudentEvent);
    });

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