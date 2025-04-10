const backend_url = 'http://localhost:3001/students';

const studentTemplate = document.querySelector('#student-template');
const studentList = document.querySelector('#students');

let students = [];

// --- function declarations ---

function getStudents() {
  return fetch(backend_url)
    .then(response => response.json())
    .then((data) => {
      students = [...data];
      render();
    });
}

function editStudentEvent(student, event) {
  console.log('editStudentEvent event:', event);
  console.log('editStudentEvent student', student);

  // create a new custom event to inform the student-form component that we want to edit a student
  const editStudentEvent = new CustomEvent('edit-student', {
    detail: student,
  });
  document.dispatchEvent(editStudentEvent);
}

function vergelijkStudentEvent() {
  let studentMap = {};
  let dubbeleStudenten = {};

  students.forEach((student) => {
    studentMap[student.studentnr] = (studentMap[student.studentnr] || []).concat([student]);
  });

  for (let studentnr in studentMap) {
    if (studentMap[studentnr].length > 1) {
      dubbeleStudenten[studentnr] = studentMap[studentnr];
    }
  }

  console.log("Dit zijn de dubbele studenten:", dubbeleStudenten);
}
  

  // studentMap: checken welke entries in deze map een Array hebben van lengte > 1
  // dan => console.log hiervan.



function deleteStudentEvent(student, event) {
  console.log('deleteStudentEvent event', event);
  console.log('deleteStudentEvent student', student);
  // because the event is triggered within the li element, we need to stop the event from bubbling up to the li element
  // otherwise the editStudentEvent will be triggered as well
  event.stopPropagation();

  fetch(`${backend_url}/${student.id}`, {
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

document.querySelector('#compare').addEventListener('click', vergelijkStudentEvent);
// --- student-list main ---

render();
getStudents();
