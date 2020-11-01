import Calculator from 'components/Calculator';
import Result from 'components/Calculator/Result';
import React from 'react';
import { useRecoilValue } from 'recoil';
import { _isMobile, _isResultOpen } from 'store/atoms';
import styles from './App.module.scss';

const App = () => {
  const isMobile = useRecoilValue(_isMobile);
  const isResultOpen = useRecoilValue(_isResultOpen);
  return (
    <div className={styles.App}>
      <div className={styles.InputPane}>
        <Calculator />
      </div>
      {isMobile ? null : (
        <div className={styles.InfoPane}>
          <Result />
        </div>
      )}
      {isMobile && isResultOpen ? (
        <div className={styles.InfoPaneMobile}>
          <Result />
        </div>
      ) : null}
    </div>
  );
};

export default App;
