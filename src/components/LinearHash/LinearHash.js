import React, { useState } from 'react';
import { fabric } from 'fabric';

const TABLE_SIZE = 10;

const LinearHash = () => {
  const [hashTable, setHashTable] = useState(Array(TABLE_SIZE).fill(null));
  const [rectangles, setRectangles] = useState([]);

  const hashFunction = (key) => {
    return key % TABLE_SIZE;
  };

  const linearHashAlgorithm = (canvas, value) => {
    let index = hashFunction(value);

    for (let i = 0; i < TABLE_SIZE; i++) {
      const targetIndex = (index + i) % TABLE_SIZE;

      if (hashTable[targetIndex] === null) {
        // Actualiza la tabla hash
        const newHashTable = [...hashTable];
        newHashTable[targetIndex] = value;
        setHashTable(newHashTable);

        // Crea un rectángulo y lo añade al canvas
        const rect = new fabric.Rect({
          left: targetIndex * 50,
          top: 50,
          fill: 'blue',
          width: 40,
          height: 40,
        });

        // Agrega el valor al rectángulo
        const text = new fabric.Text(value.toString(), {
          left: targetIndex * 50 + 10,
          top: 50 + 10,
          fill: 'white',
          fontSize: 20,
        });

        const group = new fabric.Group([rect, text]);
        canvas.add(group);

        // Agrega el grupo de rectángulo y texto a la lista de rectángulos
        setRectangles([...rectangles, group]);

        // Finaliza la búsqueda
        break;
      }
    }
  };

  const handleAddValue = () => {
    const value = parseInt(prompt('Ingrese un valor numérico') || '0', 10);

    if (!isNaN(value)) {
      const canvas = new fabric.Canvas('canvas');

      linearHashAlgorithm(canvas, value);
    }
  };

  return (
    <div>
      <button onClick={handleAddValue}>Agregar valor</button>
      <canvas id="canvas" width={500} height={100} />

      {/* Renderiza los rectángulos en el canvas */}
      {rectangles.map((rect, index) => (
        <canvas key={index} id={`canvas\${index}`} width={500} height={100} />
      ))}
    </div>
  );
};


export default LinearHash;
