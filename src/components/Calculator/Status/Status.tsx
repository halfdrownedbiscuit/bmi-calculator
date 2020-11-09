import React from 'react';
import styles from './Status.module.scss';

const Status = ({
  hasHeight,
  hasWeight,
  hasGender
}: {
  hasHeight: boolean;
  hasWeight: boolean;
  hasGender: boolean;
}) => {
  if (hasGender && hasHeight && hasWeight) {
    return (
      <div className={styles.Status}>
        <div className={styles.FillSection}>Ready to Calculate</div>
      </div>
    );
  }
  return (
    <div className={styles.Status}>
      <div className={styles.FillSection}>
        {calcFillMessage(hasGender, hasHeight, hasWeight)}
      </div>
    </div>
  );
};

const calcFillMessage = (
  hasGender: boolean,
  hasHeight: boolean,
  hasWeight: boolean
) => {
  // hack to get no. of fill in message fields
  let count = Number(!hasGender) + Number(!hasHeight) + Number(!hasWeight);
  let fields;
  if (count == 3) {
    fields = (
      <>
        <span className={styles.ToFill}>gender</span>
        {', '}
        <span className={styles.ToFill}>height</span>
        {' and '}
        <span className={styles.ToFill}>weight</span>{' '}
      </>
    );
  } else if (count == 1) {
    fields = (
      <>
        {!hasGender ? <span className={styles.ToFill}>gender</span> : null}
        {!hasWeight ? <span className={styles.ToFill}>weight</span> : null}
        {!hasHeight ? <span className={styles.ToFill}>height</span> : null}{' '}
      </>
    );
  } else {
    let errs = [];
    if (!hasGender) {
      errs.push('gender');
    }
    if (!hasHeight) {
      errs.push('height');
    }
    if (!hasWeight) {
      errs.push('weight');
    }
    fields = (
      <>
        <span className={styles.ToFill}>{errs[0]}</span>
        {' and '}
        <span className={styles.ToFill}>{errs[1]}</span>{' '}
      </>
    );
  }
  return <>Please fill {fields} to calculate BMI</>;
};

export default Status;
