import Calculator from 'components/Calculator';
import Result from 'components/Calculator/Result';
import React from 'react';
import styles from './App.module.scss';

const App = () => {
  return (
    <div className={styles.App}>
      <div className={styles.InputPane}>
        <Calculator />
      </div>
      <div className={styles.InfoPane}>
        <Result />
      </div>      
    </div>
  );
};

export default App;
