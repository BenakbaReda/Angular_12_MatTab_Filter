

var faker = require('faker');
const fs = require('fs');
var database = { Users: [] };

for (var i=1; i<=150; i++) {
    database.Users.push(
        {
                id: i  ,
                firstName:faker.name.firstName(), 
                lastName: faker.name.lastName(), 
                phone :  faker.phone.phoneNumber(),
                email:faker.internet.email(),     
                password: faker.internet.password(), 
                status:  faker.random.arrayElement([ 'not define', 'Paid All', 'Paid with acompte', 'not Paid']) ,
              
        });
}
const jsonString = JSON.stringify(database,null, 2)

fs.writeFile('./DBUsers.json', jsonString, err => {
  if (err) {
      console.log('Error writing file', err)
  } else {
      console.log('Successfully wrote file')
  }
})
 