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
});