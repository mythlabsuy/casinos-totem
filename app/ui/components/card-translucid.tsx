'use client'

import { Button } from "./button";

interface Props {
  title?: string,
  onClickCallback: Function,
  btnText: string,
  btnClassName: string,
  children?: React.ReactNode;
}

export function CardTranslucid({ children, title, onClickCallback, btnText, btnClassName}: Props) {
  return (
    <div className="bg-white/50 backdrop-blur-lg rounded-3xl px-24">
      <div className="px-4 py-5 sm:p-6 justify-center items-center flex flex-col h-80">
        <h3 className="text-3xl font-bold leading-6 text-gray-900 uppercase">{ title }</h3>
        <div className="mt-2 max-w-xl text-sm text-gray-500">
          { children }
        </div>
        <div className="mt-5">
        <Button onClickCallback={() => onClickCallback()} className={ !btnClassName ? `flex h-10 items-center justify-items-center rounded-lg bg-primary-600 px-4 text-sm font-medium text-white 
      transition-colors hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 
      focus-visible:outline-offset-2 focus-visible:outline-primary-600` : btnClassName}>
          {btnText}
        </Button>
        </div>
      </div>
    </div>
  );
}