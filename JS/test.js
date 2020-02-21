// var oldObject = {
//   "Chicago, IL:Myrtle Beach, SC": 0.005340186908091907,
//   "Portsmouth, NH:Rock Hill, SC": 0.0063224791225441205,
//   "Columbia, SC:Laconia, NH": 0.006360767389277389,
//   "Council Bluffs, IA:Derry, NH": 0.0016636141225441225
// };
// var newArray = [];

// for (object in oldObject) {
//   var thisObjectName = object;
//   var thisObjectAsArray = thisObjectName.split(":");
//   var newObject = {
//     city: "",
//     similar_to: ""
//   };
//   thisObjectAsArray.forEach(function(element, index, array) {
//     var thisObjectNameAsArray = element.split(",");
//     var thisObjectNameCity = thisObjectNameAsArray[0];
//     if (index === 0) {
//       newObject.city = thisObjectNameCity;
//     } else if (index === 1) {
//       newObject.similar_to = thisObjectNameCity;
//     }
//   });
//   newArray.push(newObject);
// }
// console.log(newArray);
/* ------------------------- */

let datas = [
  { date: "10", val: 56 },
  { date: "10", val: 415 },
  { date: "10", val: 45 },
  { date: "20", val: 452 },
  { date: "20", val: 455 },
  { date: "20", val: 456 },
  { date: "20", val: 457 },
  { date: "30", val: 45 },
  { date: "30", val: 455 },
  { date: "30", val: 48 }
];
let svg = datas[0].date;
var newArray = [];
let object = [datas[0].date];
let obj = [];
for (let i = 1; i < datas.length; i++) {
  const date = datas[i].date;

  console.log("date", date);
  console.log("svg", svg);

  if (date === svg) {
    console.log("i+", i);
    object.push(obj);
    object.push(date);
    console.log("svg", svg);
    console.log("object", object);
  } else {
    console.log("i-", i);

    newArray.push(object);
    obj.push(date);
    console.log("obj", obj);

    object = [];

    console.log("newArray", newArray);
  }
  svg = date;
}

console.log("nesArrayOUT", newArray);
