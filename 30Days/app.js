let age= 32;
let userName = 'Jin';
let hobbies = ['Sports', 'Game', 'Reading'];
let job = { 
    title: 'Developer', 
    place: 'South Korea', 
    salary: 50000,
};

let totaladultYears;

function calculateAdultYears(userAge) {
    let Result;
    result = userAge - 18;
    return result;
}

totaladultYears = calculateAdultYears(age);
console.log(totaladultYears);

age = 45;
totaladultYears = calculateAdultYears(age);

console.log(totaladultYears);

let person = {
    name: 'jin', //Property
    greet() {    //method
        console.log('Hello');
    }
};

person.greet();