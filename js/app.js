/**
 * Chemical Equation Balancer
 * Balances chemical equations entered by the user
 */
const {chemicalEquationBalancer} = require("chemical-equation-balancer-haizuka");

document.getElementById("equationForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const equation = document.getElementById("equation").value;
    try {
        const result = chemicalEquationBalancer(equation);
        document.getElementById("result").innerHTML = `
      <h3>Balanced Equation:</h3>
      <p>${result.text}</p>
    `;
    } catch (error) {
        document.getElementById("result").innerHTML = `
      <p class="error">Error: Invalid equation format</p>
    `;
    }
});

/**
 * Returns appropriate units for each physical quantity
 * @param {string} variable - The physical quantity
 * @returns {string} The unit for the given quantity
 */
function getUnits(variable) {
  switch (variable) {
    case "wavelength":
      return "m";
    case "frequency":
      return "Hz";
    case "speedOfLight":
      return "m/s";
      case "planckConstant":
          return "J*s";
      case "photonenergy":
          return "J";
      case "mass":
          return "g";
      case "molem":
      case "moles":
          return "mol";
    default:
      return "";
  }
}

/**
 * Capitalizes the first letter of a string
 * @param {string} str - The string to capitalize
 * @returns {string} The capitalized string
 */
function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Displays calculation result in the specified element
 * @param {string} elementId - The ID of the element to display the result in
 * @param {string} missingValue - The name of the calculated value
 * @param {number} result - The calculated value
 */
function displayResult(elementId, missingValue, result) {
    document.getElementById(elementId).innerHTML = `
    <h3>${capitalizeFirstLetter(missingValue)}:</h3>
    <p>${result.toFixed(3)} ${getUnits(missingValue)}</p>
  `;
}

/**
 * Displays an error message when insufficient values are provided
 * @param {string} elementId - The ID of the element to display the error in
 */
function displayError(elementId) {
    document.getElementById(elementId).innerHTML =
        "<p class='error'>Please enter two values.</p>";
}

/**
 * Frequency and Wavelength Calculator
 * Calculates the relationship between frequency, wavelength, and speed of light
 */
document.getElementById("wfsForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const speedOfLight = parseFloat(document.getElementById("speedOfLight").value);
    const frequency = parseFloat(document.getElementById("frequency").value);
    const wavelength = parseFloat(document.getElementById("wavelength").value);

    let result = 0;
    let missingValue = "";

    if (!isNaN(speedOfLight) && !isNaN(frequency)) {
        missingValue = "wavelength";
        result = speedOfLight / frequency;
    } else if (!isNaN(speedOfLight) && !isNaN(wavelength)) {
        missingValue = "frequency";
        result = speedOfLight / wavelength;
    } else if (!isNaN(frequency) && !isNaN(wavelength)) {
        missingValue = "speedOfLight";
        result = frequency * wavelength;
    } else {
        displayError("wfsResult");
        return;
    }

    displayResult("wfsResult", missingValue, result);
});

/**
 * Frequency and Photon Energy Calculator
 * Calculates the relationship between frequency, photon energy, and Planck's constant
 */
document.getElementById("fphForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const planckConstant = parseFloat(document.getElementById("plancksConstant").value);
    const frequency = parseFloat(document.getElementById("ffrequency").value);
    const photonEnergy = parseFloat(document.getElementById("photonenergy").value);

    let result = 0;
    let missingValue = "";

    if (!isNaN(photonEnergy) && !isNaN(planckConstant)) {
        missingValue = "frequency";
        result = photonEnergy / planckConstant;
    } else if (!isNaN(planckConstant) && !isNaN(frequency)) {
        missingValue = "photonenergy";
        result = planckConstant * frequency;
    } else if (!isNaN(frequency) && !isNaN(photonEnergy)) {
        missingValue = "planckConstant";
        result = photonEnergy / frequency;
    } else {
        displayError("fphResult");
        return;
    }

    displayResult("fphResult", missingValue, result);
});

/**
 * Mole Calculator
 * Calculates the relationship between mass, molecular weight, and moles
 */
document.getElementById("mmmForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const mass = parseFloat(document.getElementById("mass").value);
    const molecularWeight = parseFloat(document.getElementById("molem").value);
    const moles = parseFloat(document.getElementById("moles").value);

    let result = 0;
    let missingValue = "";

    if (!isNaN(mass) && !isNaN(molecularWeight)) {
        missingValue = "moles";
        result = mass / molecularWeight;
    } else if (!isNaN(mass) && !isNaN(moles)) {
        missingValue = "molem";
        result = mass / moles;
    } else if (!isNaN(moles) && !isNaN(molecularWeight)) {
        missingValue = "mass";
        result = moles * molecularWeight;
    } else {
        displayError("mmmResult");
        return;
    }

    displayResult("mmmResult", missingValue, result);
});
