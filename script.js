const billInput = document.getElementById("bill");
const tipButtons = document.querySelectorAll(".fieldset button");
const customTip = document.getElementById("custom-tip");
const peopleNumberInput = document.getElementById("people_number");
const tipAmountPerPerson = document.getElementById("tip_amount_per_person");
const totalPerPersonOutput = document.getElementById("totalPerPerson");

let currentBill = 0;
let currentPeopleNumber = 0;
let currentTipPercent = null;
let currentCustomTip = 0;

const calculate = () => {
  const tipPercent =
    currentCustomTip > 0 ? currentCustomTip : currentTipPercent;

  if (currentBill > 0 && currentPeopleNumber > 0 && tipPercent > 0) {
    calculateTipValue(currentBill, currentPeopleNumber, tipPercent);
  }
};

billInput.addEventListener("input", () => {
  const billInput = document.getElementById("bill");
  const billValue = parseFloat(billInput.value);
  const errorMessage = document.querySelector(".error_message");
  if (isNaN(billValue) || billValue <= 0) {
    errorMessage.classList.add("visible");

    billInput.classList.remove("input_valid");
    billInput.classList.add("input_invalid");

    console.log("input_invalid  input_valid");

    currentBill = 0;
  } else {
    errorMessage.classList.remove("visible");
    billInput.classList.remove("input_invalid");
    billInput.classList.add("input_valid");
    currentBill = billValue;
    calculate();
  }
});

peopleNumberInput.addEventListener("input", () => {
  const peopleNumberValue = parseInt(peopleNumberInput.value);
  const errorText = document.getElementById("people_error");

  if (isNaN(peopleNumberValue) || peopleNumberValue <= 0) {
    peopleNumberInput.classList.add("input_invalid");
    peopleNumberInput.classList.remove("input_valid");
    errorText.classList.add("visible");
    currentPeopleNumber = 0;
  } else {
    peopleNumberInput.classList.remove("input_invalid");
    peopleNumberInput.classList.add("input_valid");
    errorText.classList.remove("visible");
    currentPeopleNumber = peopleNumberValue;
    calculate();
  }
});

tipButtons.forEach((tipButton) => {
  tipButton.addEventListener("click", () => {
    const buttonValue = parseFloat(tipButton.textContent);
    if (!isNaN(buttonValue)) {
      currentTipPercent = buttonValue / 100;
      currentCustomTip = 0;
      customTip.value = "";
      calculate();
    }
  });
});

customTip.addEventListener("input", () => {
  const valueCustomTip = parseFloat(customTip.value);
  if (isNaN(valueCustomTip) || valueCustomTip <= 0) {
    currentCustomTip = 0;
    return;
  }

  currentCustomTip = valueCustomTip / 100;
  currentTipPercent = null;
  calculate();
});

const resetButton = document.getElementById("reset_button");

resetButton.addEventListener("click", () => {
  billInput.value = "";
  peopleNumberInput.value = "";
  customTip.value = "";

  tipAmountPerPerson.textContent = "$0.00";
  totalPerPersonOutput.textContent = "$0.00";
});

const calculateTipValue = (bill, people, tipPercent) => {
  console.log("tipPercent", tipPercent);

  const tipOfBill = bill * tipPercent;
  const tipAmountPerson = tipOfBill / people;
  const totalPerPerson = (bill + tipOfBill) / people;

  tipAmountPerPerson.textContent = `$${tipAmountPerson.toFixed(2)}`;
  totalPerPersonOutput.textContent = `$${totalPerPerson.toFixed(2)}`;
};
