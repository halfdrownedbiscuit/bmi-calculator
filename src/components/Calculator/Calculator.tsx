import React, { ChangeEvent, useCallback, useEffect, useMemo } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

import styles from './Calculator.module.scss';
import Icon from 'ui-components/Icon';
import {
  _gender,
  _heightFt,
  _heightIn,
  _heightCm,
  _heightM,
  _heightUnits,
  _weight,
  _weightKg,
  _weightUnits,
  _bmi,
  _isResultOpen,
  _canCalculate,
  _isMobile
} from 'store/atoms';
import {
  FACTOR_FT_TO_CM,
  FACTOR_IN_TO_CM,
  FACTOR_LB_TO_KG,
  GENDER,
  HEIGHT_UNITS,
  WEIGHT_UNITS
} from 'consts';

const Calculator = () => {
  //store
  const [gender, setGender] = useRecoilState(_gender);
  const [heightUnits, setHeightUnits] = useRecoilState(_heightUnits);
  const [weightUnits, setWeightUnits] = useRecoilState(_weightUnits);
  const [heightFt, setHeightFt] = useRecoilState(_heightFt);
  const [heightIn, setHeightIn] = useRecoilState(_heightIn);
  const [heightCm, setHeightCm] = useRecoilState(_heightCm);
  const heightM = useRecoilValue(_heightM);
  const [weight, setWeight] = useRecoilState(_weight);
  const weightKg = useRecoilValue(_weightKg);
  const [bmi, setBmi] = useRecoilState(_bmi);
  const isMobile = useRecoilValue(_isMobile);
  const [isResultOpen, setIsResultOpen] = useRecoilState(_isResultOpen);
  const canCalculate = useRecoilValue(_canCalculate);
  //state
  //side-effs
  //local
  const isMale = gender === GENDER.MALE;
  const isFemale = gender === GENDER.FEMALE;
  const isFtIn = heightUnits === HEIGHT_UNITS.FT;
  const isKgs = weightUnits === WEIGHT_UNITS.KG;

  const onValueChange = (
    event: ChangeEvent<HTMLInputElement>,
    setVal: Function
  ) => {
    let val = event.target.value;
    if (val.length > 6) {
      val = val.substring(0, 6);
    }
    setVal(val);
    setBmi('');
  };

  const calcBMI = useCallback(() => {
    if (!canCalculate) return;
    const bmiVal = weightKg / (heightM * heightM);
    setBmi(bmiVal.toFixed(2));
    setIsResultOpen(true);
  }, [heightM, weightKg]);

  return (
    <div className={styles.Calculator}>
      {/* <div className={styles.Title}>BMI Calculator</div> */}

      <div className={styles.TitleBlock}>
        <div className={styles.Title}>BMI Calculator</div>
      </div>
      <div className={styles.Genders}>
        <div
          className={getGenderClassName(isMale)}
          onClick={() => setGender(GENDER.MALE)}
        >
          <Icon type='male' fill='#add8e6' />
          <div className={styles.GenderTitle}>Male</div>
        </div>
        <div
          className={getGenderClassName(isFemale)}
          onClick={() => setGender(GENDER.FEMALE)}
        >
          <Icon type='female' fill='#FF69B4' />
          <div className={styles.GenderTitle}>Female</div>
        </div>
      </div>
      <div className={styles.InputSection}>
        <div className={styles.InputMeasure}>
          <div
            className={getUnitsClassName(heightUnits, HEIGHT_UNITS.CM)}
            onClick={() => setHeightUnits(HEIGHT_UNITS.CM)}
          >
            cm
          </div>
          <div
            className={getUnitsClassName(heightUnits, HEIGHT_UNITS.FT)}
            onClick={() => setHeightUnits(HEIGHT_UNITS.FT)}
          >
            ft
          </div>
        </div>
        {isFtIn ? (
          <div className={styles.InputValue}>
            <input
              type='number'
              placeholder='5'
              value={heightFt}
              onChange={(e) => onValueChange(e, setHeightFt)}
              style={{
                width: '3rem'
              }}
            />
            <div className={styles.UnitLabel}>
              <span>ft</span>
            </div>
            <input
              type='number'
              placeholder='8'
              value={heightIn}
              onChange={(e) => onValueChange(e, setHeightIn)}
              style={{
                width: '3rem'
              }}
            />
            <div className={styles.UnitLabel}>
              <span>in</span>
            </div>
          </div>
        ) : (
          <div className={styles.InputValue}>
            <input
              type='number'
              placeholder='172.72'
              value={heightCm}
              onChange={(e) => onValueChange(e, setHeightCm)}
            />
            <div className={styles.UnitLabel}>
              <span>cms</span>
            </div>
          </div>
        )}
        <div className={styles.InputMeasure}>
          <div
            className={getUnitsClassName(weightUnits, WEIGHT_UNITS.KG)}
            onClick={() => setWeightUnits(WEIGHT_UNITS.KG)}
          >
            kg
          </div>
          <div
            className={getUnitsClassName(weightUnits, WEIGHT_UNITS.LB)}
            onClick={() => setWeightUnits(WEIGHT_UNITS.LB)}
          >
            lb
          </div>
        </div>
        <div className={styles.InputValue}>
          <input
            type='number'
            placeholder='70'
            value={weight}
            onChange={(e) => onValueChange(e, setWeight)}
          />
          <div className={styles.UnitLabel}>
            <span>{isKgs ? 'kgs' : 'lbs'}</span>
          </div>
        </div>
      </div>
      <div className={styles.Actions}>
        <div className={styles.CalcAction} onClick={calcBMI}>
          Calculate
        </div>
      </div>
      {isMobile && !isResultOpen ? (
        <div className={styles.Requirements} onClick={calcBMI}>
          Fill Gender, Height and Weight then click Calculate
        </div>
      ) : null}
    </div>
  );
};

const getGenderClassName = (isSelected: boolean) => {
  return `${styles.Gender} ${isSelected ? styles.SelectedGender : ''}`;
};

const getUnitsClassName = (selectedUnits: string, currentUnits: string) => {
  return `${selectedUnits === currentUnits ? styles.SelectedUnits : ''}`;
};

const getHeightCm = (htFt: string, htIn: string) => {
  const htFtNum = Number(htFt);
  const htInNum = Number(htIn);
  if (Number.isNaN(htFtNum) || Number.isNaN(htInNum)) {
    return '';
  }
  const htCm =
    Math.floor(htFtNum) * FACTOR_FT_TO_CM + htInNum * FACTOR_IN_TO_CM;
  return htCm.toFixed();
};

const getHeightFtIn = (htCm: string) => {
  const htCmNum = Number(htCm);
  if (Number.isNaN(htCmNum)) {
    return {
      htFt: '',
      htIn: ''
    };
  }
  let feet = htCmNum / FACTOR_FT_TO_CM;
  const htFt = String(Math.floor(feet));
  const htIn = String(Math.floor((feet - Math.floor(feet)) * 12));

  return {
    htFt,
    htIn
  };
};

export default Calculator;
