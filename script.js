function calculateBudget() {
   // Obtener los valores del salario, periodo y gastos fijos
    const salary = parseFloat(document.getElementById('salary').value);
    const period = document.getElementById('period').value;
    const fixedExpenses = Array.from(document.querySelectorAll('#expenses .expense-item input[type="number"]')).map(input => parseFloat(input.value) || 0);
    const savings = parseFloat(document.getElementById('savings').value) || 0;

    // Calcular el total de gastos fijos
    const totalFixedExpenses = fixedExpenses.reduce((total, expense) => total + expense, 0);

    // Calcular el presupuesto diario
    const dailyBudget = (salary - totalFixedExpenses - savings) / getNumberOfDaysInPeriod(period);

    // Mostrar los resultados
    displayResults(totalFixedExpenses, savings, salary - totalFixedExpenses - savings, dailyBudget);
}
function addExpense() {
    const expenseList = document.getElementById('expenseList');

    // Crear elementos de gasto
    const newExpense = document.createElement('div');
    newExpense.classList.add('expense-item');

    // Función para crear etiquetas e inputs y agregarlos al contenedor
    function createLabelInputPair(labelText, inputType, inputPlaceholder, isRequired) {
        const labelInputContainer = document.createElement('div');
        labelInputContainer.classList.add('label-input-container');

        const label = document.createElement('label');
        label.textContent = labelText;

        const input = document.createElement('input');
        input.type = inputType;
        input.placeholder = inputPlaceholder;
        input.required = isRequired;

        labelInputContainer.appendChild(label);
        labelInputContainer.appendChild(input);
        newExpense.appendChild(labelInputContainer);
    }

    // Crear etiquetas e inputs para el nombre y el monto
    createLabelInputPair('Nombre del Gasto:', 'text', 'Nombre', true);
    createLabelInputPair('Monto:', 'number', '$ Monto', true);

    // Agregar el nuevo gasto a la lista
    expenseList.appendChild(newExpense);
}

function getNumberOfDaysInPeriod(period) {
    // Agrega lógica para obtener el número de días en el periodo seleccionado (mensual, quincenal, semanal, etc.)
    // Aquí asumo que el mes tiene 30 días, la quincena 15 días, y la semana 7 días
    const daysInPeriod = {
        monthly: 30,
        biweekly: 15,
        weekly: 7,
    };

    return daysInPeriod[period];
}

function displayResults(totalExpenses, savings, finalBudget, dailyBudget) {
    // Mostrar los resultados en el elemento con id 'result'
    const resultDiv = document.getElementById('result');
    resultDiv.classList.remove('hidden');

    const totalExpensesParagraph = document.createElement('p');
    totalExpensesParagraph.textContent = `Total de gastos: $${totalExpenses.toFixed(2)}`;
    resultDiv.appendChild(totalExpensesParagraph);

    const totalSavingsParagraph = document.createElement('p');
    totalSavingsParagraph.textContent = `Total ahorrado: $${savings.toFixed(2)}`;
    resultDiv.appendChild(totalSavingsParagraph);

    const remainingBudgetParagraph = document.createElement('p');
    remainingBudgetParagraph.textContent = `Dinero restante después de gastos y ahorro: $${finalBudget.toFixed(2)}`;
    resultDiv.appendChild(remainingBudgetParagraph);

    const dailyBudgetParagraph = document.createElement('p');
    dailyBudgetParagraph.textContent = `Presupuesto diario: $${dailyBudget.toFixed(2)}`;
    resultDiv.appendChild(dailyBudgetParagraph);
}
