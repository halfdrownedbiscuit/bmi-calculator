import React from 'react';
import iconTypes from './iconTypes';

interface IconType extends React.SVGProps<SVGElement> {
  type: string;
}

const Icon = ({ type, ...props }: IconType) => {
  const Ic = iconTypes[type];
  return <Ic {...props} />;
};

export default Icon;
