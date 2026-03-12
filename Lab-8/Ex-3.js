class Course {
    constructor(courseName, instructor) {
        this.courseName = courseName;
        this.instructor = instructor;
    }

    displayCourse() {
        console.log(`Course: ${this.courseName}, Instructor: ${this.instructor}`);
    }
}

const course1 = new Course("Web Technologies", "Dr. Kumar");
course1.displayCourse();

const seatsAvailable = true;

const enrollCourse = new Promise((resolve, reject) => {
    if (seatsAvailable) {
        resolve("Enrollment Successful");
        return;
    }

    reject("Course Full");
});

enrollCourse
    .then((message) => console.log(message))
    .catch((error) => console.log(error));
