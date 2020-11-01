import {
  FACTOR_FT_TO_CM,
  FACTOR_IN_TO_CM,
  FACTOR_LB_TO_KG,
  HEIGHT_UNITS,
  WEIGHT_UNITS
} from 'consts';
import { atom, selector } from 'recoil';

export const _gender = atom<string | null>({
  key: '_gender',
  default: null
});

export const _heightUnits = atom<string>({
  key: '_heightUnits',
  default: HEIGHT_UNITS.FT
});

export const _weightUnits = atom<string>({
  key: '_weightUnits',
  default: WEIGHT_UNITS.KG
});

export const _heightFt = atom<string>({
  key: '_heightFt',
  default: ''
});
export const _heightIn = atom<string>({
  key: '_heightIn',
  default: ''
});

export const _heightCm = atom<string>({
  key: '_heightCm',
  default: ''
});

export const _heightM = selector({
  key: '_heightM',
  get: ({ get }) => {
    const heightUnits = get(_heightUnits);
    if (heightUnits === HEIGHT_UNITS.FT) {
      const heightFt = get(_heightFt);
      const heightIn = get(_heightIn);
      return (
        (Number(heightFt) * FACTOR_FT_TO_CM) / 100 +
        (Number(heightIn) * FACTOR_IN_TO_CM) / 100
      );
    } else {
      const heightCm = get(_heightCm);
      return Number(heightCm) / 100;
    }
  }
});

export const _weightKg = selector({
  key: '_weightKg',
  get: ({ get }) => {
    const weightUnits = get(_weightUnits);
    const weight = get(_weight);
    if (weightUnits === WEIGHT_UNITS.KG) {
      return Number(weight);
    } else {
      return Number(weight) * FACTOR_LB_TO_KG;
    }
  }
});

export const _weight = atom<string>({
  key: '_weight',
  default: ''
});

export const _bmi = atom<string>({
  key: '_bmi',
  default: ''
});
