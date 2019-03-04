const frisby = require('frisby');
const Joi = frisby.Joi;

it('POST should return a status of 200 Created', function () {
  return frisby
    .post('http://localhost:4200/api/todos/add',
      {
        "item": "Kitchen",
        "isEditable": false
      })
    .expect('status', 200);
});

it('GET should return a status of 200 OK and should Validate the response', function () {
  return frisby
    .get('http://localhost:4200/api/todos')
    .expect('status', 200)
    .expect('json', [{
      item: "Kitchen",
      isEditable: false
    }]);
});

it('GET should return a status of 200 OK and validate item should be String', function () {
  return frisby
    .get('http://localhost:4200/api/todos')
    .expect('jsonTypes', '*', {
      item: Joi.string(),
    });
});

it('PUT should return a status of 200 OK', function () {
  return frisby
    .put('http://localhost:4200/api/todos/update/Kitchen', {
      "item": "Pizza",
      "isEditable": false
    })
    .expect('status', 200);
});

it('DELETE should return a status of 200', function () {
  return frisby
    .del('http://localhost:4200/api/todos/delete/Pizza')
    .expect('status', 200);
});

it('Validate Get Service JSON response after deleting all the Objects', function () {
  return frisby
    .get('http://localhost:4200/api/todos')
    .expect('json', []
    );
});
