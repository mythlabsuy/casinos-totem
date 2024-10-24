'use client'

import DynamicHeroIcon from '../dynamic-hero-icon';

interface Props {
  text?: string,
  onClickCallback: Function,
  icon?: string,
  className?: string
  iconColor?: string
  children?: React.ReactNode;
}

export function Button({ children, text, onClickCallback, icon, className, iconColor}: Props) {
  return (
    <button type='button' onClick={() => {onClickCallback()}} className={`${className} flex justify-center items-center rounded py-4 px-1`}>
      {text ? <span className="hidden md:block mr-2">{text}</span> : null}
      {children ? children : null}
      {icon ?  <DynamicHeroIcon icon={icon} className={`w-5 h-5 ${iconColor}`} /> : null }
    </button>
  );
}