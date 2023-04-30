import React, { useRef, useEffect } from 'react';
import { fabric } from 'fabric';
import styles from './HashTable.module.css';

const HashTable = ({ algorithm }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = new fabric.Canvas(canvasRef.current);
      algorithm(canvas, 5);
    }
  }, [algorithm]);

  return <canvas ref={canvasRef} className={styles.canvas}></canvas>;
};

export default HashTable;
