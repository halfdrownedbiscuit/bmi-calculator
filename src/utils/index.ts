import { BMI_CATEGORIES, FACTOR_LB_TO_KG, WEIGHT_UNITS } from 'consts';
import { _weightKg } from 'store/atoms';

const getBMIVerdict = (bmi: string) => {
  const bmiVal = Number(bmi);
  if (bmiVal < 15) {
    return BMI_CATEGORIES.VERY_SEVERELY_UNDERWEIGHT;
  }
  if (bmiVal < 16) {
    return BMI_CATEGORIES.SEVERELY_UNDERWEIGHT;
  }
  if (bmiVal <= 18.5) {
    return BMI_CATEGORIES.UNDERWEIGHT;
  }
  if (bmiVal <= 25) {
    return BMI_CATEGORIES.NORMAL;
  }
  if (bmiVal <= 30) {
    return BMI_CATEGORIES.OVERWEIGHT;
  }
  if (bmiVal <= 35) {
    return BMI_CATEGORIES.MODERATELY_OBESE;
  }
  if (bmiVal <= 40) {
    return BMI_CATEGORIES.SEVERELY_OBESE;
  }
  if (bmiVal > 40) {
    return BMI_CATEGORIES.VERY_SEVERELY_OBESE;
  }
};

const getBMIColor = (bmi: string) => {
  const bmiVal = Number(bmi);
  if (bmiVal < 16) {
    return 'red';
  }
  if (bmiVal <= 18.5) {
    return 'orange';
  }
  if (bmiVal <= 25) {
    return 'green';
  }
  if (bmiVal <= 30) {
    return 'orange';
  }
  if (bmiVal > 30) {
    return 'red';
  }
  return 'black';
};

const getBoundNormalWeight = (
  bound: number,
  heightM: number,
  weightUnits: string
) => {
  let weightKg = bound * heightM * heightM;
  if (weightUnits === WEIGHT_UNITS.KG) {
    return weightKg.toFixed();
  } else {
    return (weightKg / FACTOR_LB_TO_KG).toFixed();
  }
};

const getMinNormalWeight = (heightM: number, weightUnits: string) => {
  return `${getBoundNormalWeight(18.5, heightM, weightUnits)} ${
    weightUnits === WEIGHT_UNITS.KG ? 'kgs' : 'lbs'
  }`;
};

const getMaxNormalWeight = (heightM: number, weightUnits: string) => {
  return `${getBoundNormalWeight(25, heightM, weightUnits)} ${
    weightUnits === WEIGHT_UNITS.KG ? 'kgs' : 'lbs'
  }`;
};

const getWeightChangeDirection = (bmi: string) => {
  const bmiVal = Number(bmi);
  if (bmiVal < 18.5) {
    return 'gain';
  } else if (bmiVal <= 25) {
    return '';
  } else {
    return 'lose';
  }
};

const getWeightDifference = (
  bmi: string,
  heightM: number,
  weightKg: number,
  weightUnits: string
) => {
  if (getWeightChangeDirection(bmi) === 'gain') {
    return `${Math.abs(
      Number(getBoundNormalWeight(18.5, heightM, WEIGHT_UNITS.KG)) - weightKg
    ).toFixed()} ${weightUnits === WEIGHT_UNITS.KG ? 'kgs' : 'lbs'}`;
  } else {
    return `${Math.abs(
      weightKg - Number(getBoundNormalWeight(25, heightM, WEIGHT_UNITS.KG))
    ).toFixed()} ${weightUnits === WEIGHT_UNITS.KG ? 'kgs' : 'lbs'}`;
  }
};

export default {
  getBMIVerdict,
  getBMIColor,
  getMinNormalWeight,
  getMaxNormalWeight,
  getWeightChangeDirection,
  getWeightDifference
};
