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

    function handleOperation(e) {
        if (e.target.tagName !== 'BUTTON') return;
        
        clearOutput();
        
        const op = e.target.dataset.op;
        const sizeA = parseInt(sizeASelect.value);
        const sizeB = parseInt(sizeBSelect.value);
        
        let matrixA, matrixB, result;

        try {
            // Validaciones y ejecución de operaciones
            switch (op) {
                case 'add':
                case 'subtract':
                    if (sizeA !== sizeB) throw new Error("Las matrices deben tener el mismo tamaño.");
                    matrixA = getMatrix(sizeA, 'matrixA');
                    matrixB = getMatrix(sizeB, 'matrixB');
                    result = (op === 'add') ? M.add(matrixA, matrixB) : M.subtract(matrixA, matrixB);
                    break;

                case 'multiply':
                    if (sizeA !== sizeB) throw new Error("Las matrices deben tener el mismo tamaño.");
                    matrixA = getMatrix(sizeA, 'matrixA');
                    matrixB = getMatrix(sizeB, 'matrixB');
                    result = M.multiply(matrixA, matrixB);
                    break;

                case 'multiplyScalarA':
                    matrixA = getMatrix(sizeA, 'matrixA');
                    result = M.multiplyScalar(matrixA, parseFloat(scalarInput.value));
                    break;
                    
                case 'multiplyScalarB':
                    matrixB = getMatrix(sizeB, 'matrixB');
                    result = M.multiplyScalar(matrixB, parseFloat(scalarInput.value));
                    break;

                case 'transposeA':
                    matrixA = getMatrix(sizeA, 'matrixA');
                    result = M.transpose(matrixA);
                    break;

                case 'detA':
                    matrixA = getMatrix(sizeA, 'matrixA');
                    const det = M.determinant(matrixA);
                    messageArea.textContent = `Determinante(A) = ${parseFloat(det.toFixed(4))}`;
                    return;

                case 'invA':
                    matrixA = getMatrix(sizeA, 'matrixA');
                    result = M.inverse(matrixA);
                    break;

                case 'identityA':
                    result = M.identity(sizeA);
                    break;
            }
            
            if (result) {
                displayResult(result);
            }

        } catch (error) {
            showError(error.message);
        }
    }

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

        /**
     * Rellena una matriz con valores aleatorios.
     * @param {number} size - El tamaño de la matriz.
     * @param {string} idPrefix - Prefijo de los inputs.
     */
    function fillRandom(size, idPrefix) {
        for (let i = 0; i < size; i++) {
            for (let j = 0; j < size; j++) {
                const input = document.getElementById(`${idPrefix}-${i}-${j}`);
                // Enteros aleatorios entre -9 y 9
                input.value = Math.floor(Math.random() * 19) - 9;
            }
        }
    }
    
    /**
     * Rellena una rejilla con los valores de una matriz dada.
     * @param {number[][]} matrix - La matriz de valores.
     * @param {string} idPrefix - 'A' o 'B'.
     */
    function fillGrid(matrix, idPrefix) {
            for (let i = 0; i < matrix.length; i++) {
            for (let j = 0; j < matrix[i].length; j++) {
                const input = document.getElementById(`matrix${idPrefix}-${i}-${j}`);
                if (input) {
                    input.value = matrix[i][j];
                }
            }
        }
    }
    
    /**
     * Carga valores de ejemplo en matrices 3x3.
     */
    function loadExample() {
        if (parseInt(sizeASelect.value) !== 3 || parseInt(sizeBSelect.value) !== 3) {
            showError("El ejemplo solo funciona si ambas matrices son 3x3.");
            return;
        }
        const exampleA = [[1, 2, 3], [0, 1, 4], [5, 6, 0]];
        const exampleB = [[8, 1, 4], [7, 2, 5], [3, 9, 6]];
        fillGrid(exampleA, 'A');
        fillGrid(exampleB, 'B');
        clearOutput();
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
        },

        /**
         * Multiplica la matriz A por la matriz B.
         * @returns {number[][]} A * B
         */
        multiply: (A, B) => {
            const size = A.length;
            const result = M.zeros(size); // Matriz de ceros

            for (let i = 0; i < size; i++) {
                for (let j = 0; j < size; j++) {
                    let sum = 0;
                    for (let k = 0; k < size; k++) {
                        sum += A[i][k] * B[k][j];
                    }
                    result[i][j] = sum;
                }
            }
            return result;
        },

        /**
         * Funcion auxiliar para obtener la submatriz (cofactor/menor)
         * al eliminar la fila 'rowToRemove' y la columna 'colToRemove'.
         */
        getCofactor: (A, rowToRemove, colToRemove) => {
            return A
                .filter((_, i) => i !== rowToRemove) // Eliminar la fila
                .map(row => 
                    row.filter((_, j) => j !== colToRemove) // Eliminar la columna
                );
        },

        /**
         * Calcula el determinante de A (usando expansión por cofactores).
         * @returns {number} det(A)
         */
        determinant: (A) => {
            const n = A.length;
            
            if (n === 1) return A[0][0];
            if (n === 2) return A[0][0] * A[1][1] - A[0][1] * A[1][0];

            let det = 0;
            for (let j = 0; j < n; j++) {
                const sign = (j % 2 === 0) ? 1 : -1;
                const cofactor = M.getCofactor(A, 0, j);
                det += sign * A[0][j] * M.determinant(cofactor);
            }
            return det;
        },

        /**
         * Calcula la matriz inversa de A.
         * inv(A) = (1/det(A)) * adj(A)
         * @returns {number[][]} A^-1
         */
        inverse: (A) => {
            const n = A.length;
            const det = M.determinant(A);

            if (Math.abs(det) < 1e-10) { // Tolerancia por errores de punto flotante
                throw new Error("La matriz no es invertible (determinante es 0).");
            }

            if (n === 2) { // Caso 2x2
                const invDet = 1 / det;
                return [
                    [ A[1][1] * invDet, -A[0][1] * invDet],
                    [-A[1][0] * invDet,  A[0][0] * invDet]
                ];
            }

            // 1. Matriz de Cofactores
            const cofactors = M.zeros(n);
            for (let i = 0; i < n; i++) {
                for (let j = 0; j < n; j++) {
                    const sign = ((i + j) % 2 === 0) ? 1 : -1;
                    const minor = M.getCofactor(A, i, j);
                    cofactors[i][j] = sign * M.determinant(minor);
                }
            }

            // 2. Matriz Adjunta (Transpuesta de la de Cofactores)
            const adjoint = M.transpose(cofactors);

            // 3. Multiplicar por (1 / determinante)
            return M.multiplyScalar(adjoint, 1 / det);
        }

    };     

// ... (dentro de la sección EVENT LISTENERS)
// ... (después del listener de btnGenerate)

    // Botón de Valores Aleatorios
    document.getElementById('btnRandom').addEventListener('click', () => {
        clearOutput();
        fillRandom(parseInt(sizeASelect.value), 'matrixA');
        fillRandom(parseInt(sizeBSelect.value), 'matrixB');
    });
    
    // Botón de Cargar Ejemplo
    document.getElementById('btnExample').addEventListener('click', loadExample);

    // Listener para todos los botones de operaciones
    document.querySelector('.operations').addEventListener('click', handleOperation);
    document.querySelector('.scalar-op').addEventListener('click', handleOperation);

});