const students = [
  { 
    name: 'Jens',
    studentnr: 123456,
    photo: 'https://randomuser.me/api/portraits',
    gender: 'other'
  },
  {
    name: 'Sanne',
    studentnr: 654321,
    photo: 'https://randomuser.me/api/portraits',
    gender: 'female'
  },
  {
    name: 'Hatice',
    studentnr: 654321,
    photo: 'https://randomuser.me/api/portraits',
    gender: 'female'
  },
  {
    name: 'Remy',
    studentnr: 654321,
    photo: 'https://randomuser.me/api/portraits',
    gender: 'male'
  }
];

const studentTemplate = document.querySelector('#student-template');
const studentList = document.querySelector('#students');

students.forEach(student => {
  const studentElement = studentTemplate.content.cloneNode(true);
  console.log(studentElement);
  studentElement.querySelector('li').classList.add(student.gender);
  const name = studentElement.querySelector('h1');
  const studentnr = studentElement.querySelector('.studentnr');
  const photo = studentElement.querySelector('.studentimg');

  name.textContent = student.name;
  studentnr.textContent = student.studentnr;
  photo.src = `${student.photo}/lego/1.jpg`;
  photo.alt = student.name;
    
  studentList.appendChild(studentElement);
}
);
