const hobbies = ['Sports', 'Cooking'];
const age = 32;

hobbies.push('Reading');

console.log(hobbies);

const person = {age: 32};

function getAdultYears(p) {
    p.age -= 18;
    return p.age;
    // return p.age - 18;
}

console.log(getAdultYears({ ...person })); // ... : 스프레드 연산자(객체를 새로 만듦)
console.log(person);