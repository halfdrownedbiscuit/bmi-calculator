import React from 'react';
import { useRecoilValue } from 'recoil';
import {
  _bmi,
  _heightM,
  _heightUnits,
  _weightKg,
  _weightUnits
} from 'store/atoms';
import utils from 'utils';

import styles from './Result.module.scss';

const Result = () => {
  const bmi = useRecoilValue(_bmi);
  const weightUnits = useRecoilValue(_weightUnits);
  const heightM = useRecoilValue(_heightM);
  const weightKg = useRecoilValue(_weightKg);
  const hasHeight = heightM > 0;
  const hasWeight = weightKg > 0;

  if (bmi.length <= 0 || Number.isNaN(Number(bmi)) || !hasHeight || !hasWeight) {
    return <Nothing hasHeight={hasHeight} hasWeight={hasWeight} />;
  }
  return (
    <div className={styles.Result}>
      <h1>BMI</h1>
      <div className={styles.BMI}>{bmi}</div>
      <div className={styles.Verdict} style={{ color: utils.getBMIColor(bmi) }}>
        {utils.getBMIVerdict(bmi)}
      </div>
      <div className={styles.AdditionalInfo}>
        <span className={styles.VerdictContent}>
          Healthy BMI Range is{' '}
          <span className={styles.ContentHighlight}>18.5</span> to{' '}
          <span className={styles.ContentHighlight}>25</span>
          <br />
          Healthy Weight range for you is{' '}
          <span className={styles.ContentHighlight}>
            {utils.getMinNormalWeight(heightM, weightUnits)}
          </span>{' '}
          to{' '}
          <span className={styles.ContentHighlight}>
            {utils.getMaxNormalWeight(heightM, weightUnits)}
          </span>
          <br />
          You should{' '}
          <span className={styles.ContentHighlight}>
            {utils.getWeightChangeDirection(bmi)}
          </span>{' '}
          atleast{' '}
          <span className={styles.ContentHighlight}>
            {utils.getWeightDifference(bmi, heightM, weightKg, weightUnits)}
          </span>{' '}
          to reach healthy weight
          <br />
        </span>
      </div>
      <div className={styles.Reference}>
        Results based on{' '}
        <a target='_blank' href='https://en.wikipedia.org/wiki/Body_mass_index'>
          Wikipedia
        </a>
      </div>
    </div>
  );
};

const Nothing = ({
  hasHeight,
  hasWeight
}: {
  hasHeight: boolean;
  hasWeight: boolean;
}) => {
  return (
    <div className={styles.Nothing}>
      <div className={styles.FillSection}>
        Fill Gender, Height and Weight then click Calculate
      </div> 
    </div>
  );
};

export default Result;
