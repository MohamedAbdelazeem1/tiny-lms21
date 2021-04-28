// To validate objects
const Joi = require('joi');             // return class

const express = require('express');     // return a function
const app = express();                  // return an object

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json());

const courses = [
    { id: 1, name: 'course1',code:'cse213' },
    { id: 2, name: 'course2',code:'PME345' },
    { id: 3, name: 'course3' ,code:'cse456'}
];

// To respond to http get request
app.get('/'/* path or url '/' represrnts route of the website*/, /* callback function */(req, res) => {
    // This req object has a bunch of useful propereties u can refrence documentation for more info
    res.send('Hello World!!!');
});
//port
const port =process.env.PORT || 3000;
console.log(PORT);
const host ='0.0.0.0';
// app.listen(port,()=> console.log(`listening on port ${port}....`));
app.listen(port,host, function(){console.log("`listening on port ${port}....`");});

// to get all courses
app.get('/api/courses', (req, res) => {
    res.send(courses);
});

// to get single course

app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) // error 404 object not found
    {
        res.status(404).send('THe course with the given id was not found.');
        return;
    }
    res.send(course);
});

app.get('/api/posts/:year/:month', (req, res) => {
    res.send(req.params);  
}); 


// Add course
app.post('/api/courses', (req, res) => {
    // validate request
    const schema = {
        name: Joi.string().min(5).required(),
        code: Joi.string().required().regex(/[a-zA-Z]{3}\d{3}/),
        description: Joi.string().max(200).optional()
    }

    const result = Joi.validate(req.body, schema);
    console.log(result);

    if (result.error) {
        res.status(400).send(result.error.details[0].message);
        return;
    }

    // create a new course object
    const course = {
        id: courses.length + 1,
        name: req.body.name, // assuming that request body there's a name property
        code:req.body.code,
        description:req.body.description

    };
    courses.push(course);
    res.send(course);
});


// Updating resources
app.put('/api/courses/:id', (req, res) => {
    // Look up the course 
    // If not existing, return 404
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) // error 404 object not found
    {
        res.status(404).send('THe course with the given id was not found.');
        return;
    }

    // validate 
    // If not valid, return 400 bad request
    const { error } = validateCourse(req.body); 
    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }

    // Update the course 
    // Return the updated course
    course.name = req.body.name;
    course.code = req.body.code;
    course.description = req.body.description;
    res.send(course);
});

// Deleting a course
app.delete('/api/courses/:id', (req, res) => {
    // Look up the course 
    // If not existing, return 404
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) // error 404 object not found
    {
        res.status(404).send('THe course with the given id was not found.');
        return;
    }

    // Delete
    const index = courses.indexOf(course);
    courses.splice(index, 1);

    // Return the same course
    res.send(course);
});


function validateCourse(course) {
    const schema = {
        name: Joi.string().min(3).required()
    }
    return Joi.validate(course, schema);
}

                        /*      for students      */ 

const students = [
    { id: 1, name: 'mohamed',code:'1601107' },
    { id: 2, name: 'ahmed',code:'1601176'  },
    { id: 3, name: 'ali' ,code:'1601100' }
];

// to get all students
app.get('/api/students', (req, res) => {
    res.send(students);
});

// to get single student
app.get('/api/students/:id', (req, res) => {
    const student = students.find(c => c.id === parseInt(req.params.id));
    if (!student) // error 404 object not found
    {
        res.status(404).send('THe student with the given id was not found.');
        return;
    }
    res.send(student);
});

app.get('/api/posts/:year/:month', (req, res) => {
    res.send(req.params);  
}); 

// Add student
app.post('/api/students', (req, res) => {
    // validate request
    const schema = {
        name: Joi.string().min(3).required().regex(/[a-zA-Z'-]/),
        code: Joi.string().length(7).required()
    }

    const result = Joi.validate(req.body, schema);
    console.log(result);

    if (result.error) {
        res.status(400).send(result.error.details[0].message);
        return;
    }

    // create a new student object
    const student = {
        id: students.length + 1,
        name: req.body.name, // assuming that request body there's a name property
        code: req.body.code 
    };
    students.push(student);
    res.send(student);
});


// Updating resources
app.put('/api/students/:id', (req, res) => {
    // Look up the Student 
    // If not existing, return 404
    const student = students.find(c => c.id === parseInt(req.params.id));
    if (!student) // error 404 object not found
    {
        res.status(404).send('THe Student with the given id was not found.');
        return;
    }

    // validate 
    // If not valid, return 400 bad request
    const { error } = validateStudent(req.body); 
    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }

    // Update the student 
    student.name = req.body.name;
    student.code = req.body.code;
   
    res.send(student);
});

// Deleting a student
app.delete('/api/students/:id', (req, res) => {
    // Look up the student 
    // If not existing, return 404
    const student = students.find(c => c.id === parseInt(req.params.id));
    if (!student) // error 404 object not found
    {
        res.status(404).send('THe Student with the given id was not found.');
        return;
    }

    // Delete
    const index = students.indexOf(student);
    students.splice(index, 1);

    // Return the same student
    res.send(student);
});


function validateStudent(student) {
    const schema = {
        name: Joi.string().min(3).required()
    }
    return Joi.validate(student, schema);
}