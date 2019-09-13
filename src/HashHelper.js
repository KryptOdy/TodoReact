/**
* Setting the Keys of ID's is not working so creating a class to generate a
* pseudo-Random key based on the Task Name and Date
*/

let HashHelper = (taskName, date) => {
  let length = taskName.length + date.length;
  let ceil = 100;
  let floor = 1;
  let hash = "";
  for (let i  = 0; i < length; i++) {
    hash += Math.floor(Math.random() * (ceil - floor + 1)) + floor;
  }

  return hash;
}

export default HashHelper
