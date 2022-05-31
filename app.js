let selectors = document.querySelectorAll('#money');
let Selector1 = document.querySelector('.Selector1');
let Selector2 = document.querySelector('.Selector2');
let input1 = document.getElementById('input1');
let input2 = document.getElementById('input2');
let inputs = document.querySelectorAll('.container__content--input');
let requestFunction = async function () {
  let res = await fetch("https://api.currencyapi.com/v3/latest?apikey=Ig3hvytuECbkVoOE9xJCzpxliOUnIkfuGyW0Jixu");
  let data = await res.json();
  let codes = [];
  let values = [];
  let valuesArray = Object.values(data.data);
  for (let i = 0; i < valuesArray.length; i++) {
    codes.push(valuesArray[i].code);
    values.push(valuesArray[i].value);
  }

  for (let i = 0; i < codes.length; i++) {
    selectors.forEach(function (item) {
      item.innerHTML += `
      <option value="${codes[i]}">${codes[i]}</option>
      `;
    });
  }

  selectors.forEach(function (item) {
    item.addEventListener('click', function () {
      input1.value = 0;
      input2.value = 0;
    });
  });

  input1.addEventListener('keyup', function () {
    if (Selector1.value == Selector2.value) {
      input2.value = input1.value;
    } else {
      let index1;
      let index2;
      for (let i = 0; i < codes.length; i++) {
        if (codes[i] === Selector1.value) {
          index1 = i;
        }
        if (codes[i] === Selector2.value) {
          index2 = i;
        }
      }
      let difference = values[index2] / values[index1]

      input2.value = input1.value * difference;
    }
  });

  input2.addEventListener('keyup', function () {
    if (Selector1.value == Selector2.value) {
      input1.value = input2.value;
    } else {
      let index1;
      let index2;
      for (let i = 0; i < codes.length; i++) {
        if (codes[i] === Selector1.value) {
          index1 = i;
        }
        if (codes[i] === Selector2.value) {
          index2 = i;
        }
      }
      let difference = values[index1] / values[index2]

      input1.value = input2.value * difference;
    }
  });
}

requestFunction();