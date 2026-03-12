const student = {
    id: 101,
    name: "Priya",
    department: "CSE",
    marks: 92
};

const { id, name, department, marks } = student;
console.log(id, name, department, marks);

const updatedStudent = {
    ...student,
    grade: marks >= 90 ? "A" : marks >= 75 ? "B" : marks >= 60 ? "C" : "D"
};

console.log(updatedStudent);
