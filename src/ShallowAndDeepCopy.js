// Shallow Copy And Deep Copy

/**
 * -- Shallow Copy // it is worked only in first level and not work on nested levels
 * Spread Syntax
 * Array.prototype.concat()
 * Array.protptype.slice()
 * Array.from()
 * Object.assign()
 * Object.create()
 */

/**
 * -- Deep Copy // it is used when we have nested states or objects or arrays
 * JSON.stringify() then JSON.parse()
 */

const friend_list = [
    "Ali",
    {
        friends: [
            "Sina",
            "Mary",
            "Najim",
            "Ali KH",
        ]
    }
];

// Shallow Copy
const friend_list_shallowCopy = [...friend_list];
// const friend_list_shallowCopy_2 = Array.from(friend_list);

// Deep Copy
const frined_list_DeepCopy = JSON.parse(JSON.stringify(friend_list));

friend_list_shallowCopy[0] = "Shaban"; // it follows shallow copy and doesn't change the original one
friend_list_shallowCopy[1].friends = ["S", "M", "N", "A"]; // it doesn't follow shallow copy and change the original one

frined_list_DeepCopy[0] = "Ali Asghar"; // it follows deep copy and doesn't change the original one
frined_list_DeepCopy[1].friends = ["Sina"]; // it follows deep copy and doesn't change the original one

console.log('Original:', friend_list);
console.log('Shallow Copy:', friend_list_shallowCopy);
console.log('Deep Copy:', frined_list_DeepCopy);