// This is how a comment is added to JavaScript
// Comments are not executed - they are just there to provide extra
// information to you or other developers

// Exercise Time!

// 1) Create three new variables:
//    - A variable that stores the name of an online course of your choice
//    - A variable that stores the price of that course
//    - A variable that stores the three main goals that you have, when taking this course

// let Name;
// Name = "Web Development- JIN";
// let Price = 39;
// let Goals = ['learn Web Development', 'became a web developer', 'have fun!'];

// 2) Output ("alert") the three variable values

// alert(Name);
// alert(Price);
// alert(Goals);

// 3) Try "grouping" the three variables together and still output their values thereafter

let corse = {
  name: "Web Development- JIN",
  price: 39,
  goals: ["learn Web Development", "became a web developer", "have fun!"],
};

alert(corse.name);
alert(corse.price);
alert(corse.goals);

// 4) Also output the second element in your "main goals" variable

alert(corse.goals[0]);
alert(corse.goals[1]);
alert(corse.goals[2]);

// 5) Add a custom command that does the following:
//    - Use your "main goals" variable and access an element by its identifier
//    - The concrete identifier value should be dynamic / flexible
//      (i.e. the command can be executed for different identifier)
//    - The "main goals" variable should also be dynamic: The command should work
//      with ANY list of values
//    - The custom command should provide the accessed value (i.e. the list element)

function getListItem(array, arrayIndex) {
    let arrayElement = array[arrayIndex];
    return arrayElement;
};

// 6) Execute your custom command from (5) and output ("alert") the result

let firstGoal = getListItem(corse.goals, 0);
alert(firstGoal);