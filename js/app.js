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
