document.addEventListener('DOMContentLoaded', () => {

    // REFERENCIAS AL DOM
    const sizeASelect = document.getElementById('sizeA');
    const sizeBSelect = document.getElementById('sizeB');
    const matrixAContainer = document.getElementById('matrixA-container');
    const matrixBContainer = document.getElementById('matrixB-container');
    const resultContainer = document.getElementById('result-container');
    const messageArea = document.getElementById('message-area');
    const scalarInput = document.getElementById('scalar');
    const btnGenerate = document.getElementById('btnGenerate');
    
    function generateGrid(container, size, idPrefix){

        container.innerHTML = ''; // Limpiar rejilla anterior
        container.style.gridTemplateColumns = `repeat(${size}, 50px)`;

        for (let i = 0; i < size; i++) {
            for (let j = 0; j < size; j++) {
                const input = document.createElement('input');
                input.type = 'number';
                input.className = 'matrix-input';
                input.id = `${idPrefix}-${i}-${j}`;
                input.value = '0';
                container.appendChild(input);
            }
        }
    }

    // Botón de Generar Rejillas
    btnGenerate.addEventListener('click', () => {
        generateGrid(matrixAContainer, parseInt(sizeASelect.value), 'matrixA');
        generateGrid(matrixBContainer, parseInt(sizeBSelect.value), 'matrixB');
    });

    // Generar rejillas iniciales al cargar la página
    generateGrid(matrixAContainer, parseInt(sizeASelect.value), 'matrixA');
    generateGrid(matrixBContainer, parseInt(sizeBSelect.value), 'matrixB');
    

});