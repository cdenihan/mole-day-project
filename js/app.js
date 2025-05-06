// Chemical Equation Balancer
const {
  chemicalEquationBalancer,
} = require("chemical-equation-balancer-haizuka");

document
  .getElementById("equationForm")
  .addEventListener("submit", function (e) {
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

// Function to return appropriate units for each physical quantity
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
    default:
      return "";
  }
}

// Frequency and Wavelength Calculator
// Steps
// 1. Get the speed of light, frequency, and wavelength values from the input fields.
// 2. Determine missing value based on the provided inputs.
// 3. Display the result in the output field.

document
  // Get values from input fields
  .getElementById("wfsForm")
  .addEventListener("submit", function (e) {
    e.preventDefault();
    const speedOfLight = parseFloat(
      document.getElementById("speedOfLight").value
    );
    const frequency = parseFloat(document.getElementById("frequency").value);
    const wavelength = parseFloat(document.getElementById("wavelength").value);
    let result = "";
    // Calculate missing value
    var missingValue = "";
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
      document.getElementById("wfsResult").innerHTML =
        "<p class='error'>Please enter two values.</p>";
      return;
    }
    // Display result
    document.getElementById("wfsResult").innerHTML = `
            <h3>${
      missingValue.charAt(0).toUpperCase() + missingValue.slice(1)
    }:</h3>
            <p>${result.toFixed(3)} ${getUnits(missingValue)}</p>
        `;
  });

document
    // Get values from input fields
    .getElementById("fphForm")
    .addEventListener("submit", function (e) {
        e.preventDefault();
        const plancksConstant = parseFloat(
            document.getElementById("plancksConstant").value
        );
        const ffrequency = parseFloat(document.getElementById("ffrequency").value);
        const photonenergy = parseFloat(document.getElementById("photonenergy").value);
        let result = "";
        // Calculate missing value
        var missingValue = "";
        if (!isNaN(photonenergy) && !isNaN(plancksConstant)) {
            missingValue = "ffrequency";
            result = photonenergy / plancksConstant;
        } else if (!isNaN(plancksConstant) && !isNaN(ffrequency)) {
            missingValue = "photonenergy";
            result = plancksConstant * ffrequency;
        } else if (!isNaN(ffrequency) && !isNaN(photonenergy)) {
            missingValue = "plancksConstant";
            result = ffrequency * photonenergy;
        } else {
            document.getElementById("fphResult").innerHTML =
                "<p class='error'>Please enter two values.</p>";
            return;
        }
        // Display result
        document.getElementById("fphResult").innerHTML = `
            <h3>${
            missingValue.charAt(0).toUpperCase() + missingValue.slice(1)
        }:</h3>
            <p>${result.toFixed(3)} ${getUnits(missingValue)}</p>
        `;
    });
