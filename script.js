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
        clearOutput();
        generateGrid(matrixAContainer, parseInt(sizeASelect.value), 'matrixA');
        generateGrid(matrixBContainer, parseInt(sizeBSelect.value), 'matrixB');
    });

    // Generar rejillas iniciales al cargar la página
    generateGrid(matrixAContainer, parseInt(sizeASelect.value), 'matrixA');
    generateGrid(matrixBContainer, parseInt(sizeBSelect.value), 'matrixB');

    function getMatrix(size, idPrefix) {
        const matrix = [];
        for (let i = 0; i < size; i++) {
            const row = [];
            for (let j = 0; j < size; j++) {
                const input = document.getElementById(`${idPrefix}-${i}-${j}`);
                row.push(parseFloat(input.value) || 0);
            }
            matrix.push(row);
        }
        return matrix;
    }

    /**
     * Muestra una matriz resultado en la rejilla de resultados.
     * @param {number[][]} matrix - La matriz a mostrar.
     */

    function displayResult(matrix) {
        const size = matrix.length;
        resultContainer.innerHTML = ''; // Limpiar
        resultContainer.style.gridTemplateColumns = `repeat(${size}, 50px)`;

        for (let i = 0; i < size; i++) {
            for (let j = 0; j < size; j++) {
                const input = document.createElement('input');
                input.type = 'text'; // Usamos text para mostrar, no editar
                input.className = 'matrix-input';
                input.readOnly = true;
                // Redondear a 4 decimales para mejor visualización
                input.value = parseFloat(matrix[i][j].toFixed(4));
                resultContainer.appendChild(input);
            }
        }
    }

    /**
     * Limpia el área de mensajes y resultados.
     */
    function clearOutput() {
        messageArea.textContent = '';
        resultContainer.innerHTML = '';
    }

    /**
     * Muestra un mensaje de error.
     * @param {string} message - El mensaje a mostrar.
     */
    function showError(message) {
        messageArea.textContent = message;
        resultContainer.innerHTML = ''; // Limpiar resultado en caso de error
    }

    // --- LÓGICA DE MATEMÁTICAS (FUNCIONES PURAS) ---
    // Usamos un objeto 'M' (de Matrix) para agrupar la lógica.

    const M = {

        /**
         * Crea una matriz de ceros de tamaño N.
         * @returns {number[][]}
         */
        zeros: (size) => {
            return Array(size).fill(0).map(() => Array(size).fill(0));
        },

        /**
         * Suma dos matrices A y B.
         * @returns {number[][]} A + B
         */
        add: (A, B) => {
            return A.map((row, i) => 
                row.map((val, j) => val + B[i][j])
            );
        },

        /**
         * Resta dos matrices A y B.
         * @returns {number[][]} A - B
         */
        subtract: (A, B) => {
            return A.map((row, i) =>
                row.map((val, j) => val - B[i][j])
            );
        },

        /**
         * Multiplica una matriz A por un escalar.
         * @returns {number[][]} A * s
         */
        multiplyScalar: (A, s) => {
            return A.map(row => 
                row.map(val => val * s)
            );
        },

        /**
         * Calcula la transpuesta de A.
         * @returns {number[][]} A^T
         */
        transpose: (A) => {
            const size = A.length;
            const result = M.zeros(size);
            for (let i = 0; i < size; i++) {
                for (let j = 0; j < size; j++) {
                    result[j][i] = A[i][j];
                }
            }
            return result;
        },

        /**
         * Genera una matriz identidad de tamaño N.
         * @returns {number[][]} I
         */
        identity: (size) => {
            const result = M.zeros(size);
            for (let i = 0; i < size; i++) {
                result[i][i] = 1;
            }
            return result;
        }

    }; 
});