const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const app = express();

const log = function(entry) {
    fs.appendFileSync('/tmp/sample-app.log', new Date().toISOString() + ' - ' + entry + '\n');
};

//connect to mongodb
mongoose.connect('mongodb://paulr:ii3Tfxp1qTFGQoJGcqsNk0LOtoevNx6m@ds129823.mlab.com:29823/resdev_apitest')
    .then(() => console.log('Connected to MongoDB..'))
    .catch(err => console.log('Could not connect to MongoDB ...', err));

// using app.use to use static files in my public 
// folder for the root level of the site
app.use('/static/', express.static('public'));

// using app.get app.put app.post and app.delete for api

const courses = [
  { id: 1, name: 'course1' },  
  { id: 2, name: 'course2' },  
  { id: 3, name: 'course3' },  
];

app.get('/', (req, res) => {
  res.send(courses);
});

app.post('/', (req, res) => {
  const { error } = validateCourse(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  const course = {
    id: courses.length + 1,
    name: req.body.name
  };
  courses.push(course);
  res.send(course);
});

app.put('/:id', (req, res) => {
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if (!course) return res.status(404).send('The course with the given ID was not found.');    

  const { error } = validateCourse(req.body); 
  if (error) return res.status(400).send(error.details[0].message);
  
  course.name = req.body.name; 
  res.send(course);
});

app.delete('/:id', (req, res) => {
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if (!course) return res.status(404).send('The course with the given ID was not found.');

  const index = courses.indexOf(course);
  courses.splice(index, 1);

  res.send(course);
});

app.get('/:id', (req, res) => {
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if (!course) return res.status(404).send('The course with the given ID was not found.');
  res.send(course);
});

function validateCourse(course) {
  const schema = {
    name: Joi.string().min(3).required()
  };

  return Joi.validate(course, schema);
}


// getting port this way
const port = process.env.PORT || process.argv[2] || 80;
 
app.listen(port, function () {
     console.log('app up on port: ' + port);
});
