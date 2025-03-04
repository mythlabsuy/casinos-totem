'use client'

import { SubmitButton } from "../button";
import { Button } from "./button";
import { redirect, useRouter } from "next/navigation";
import { InfiniteProgressBarCard } from "./infinite-progress";

interface Props {
  title?: string,
  onClickCallback?: Function,
  btnText?: string,
  btnClassName?: string,
  children?: React.ReactNode;
  participationId?: string;
  replaceOnReprint?: boolean;
  isLoading?: boolean;
}

export function CardTranslucid({ children, title, onClickCallback, btnText, btnClassName, participationId, replaceOnReprint = false, isLoading = false}: Props) {
  const router = useRouter()
  return (
    <div>
      <div className="bg-white/50 backdrop-blur-lg rounded-2xl px-24 relative">
        <div className="px-4 py-6 sm:p-6 justify-center items-center flex flex-col">
          <h3 className="text-4xl mt-6 font-bold leading-6 text-gray-900 uppercase">{ title }</h3>
          <div className="mt-4 max-w-2xl text-sm text-gray-500">
            { children }
          </div>
          <div className="mt-5">
            {
              participationId ? <Button   onClickCallback={() => {
                if (replaceOnReprint) {
                  console.log('refresh');
                  window.location.reload();
                } else {
                  console.log('push');
                  router.push(`/promotion/reprint/${participationId}`);
                }
              }} className={ !btnClassName ? `flex h-10 items-center justify-items-center rounded-lg bg-primary-600 px-4 text-sm font-medium text-white 
                transition-colors hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 
                focus-visible:outline-offset-2 focus-visible:outline-primary-600` : btnClassName}>
                    Reimprimir ticket
                  </Button> : null
            }
          </div>
          <div className="mt-5">
            {
              onClickCallback ? <Button onClickCallback={() => onClickCallback()} className={ !btnClassName ? `flex h-10 items-center justify-items-center rounded-lg bg-primary-600 px-4 text-sm font-medium text-white 
                transition-colors hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 
                focus-visible:outline-offset-2 focus-visible:outline-primary-600` : btnClassName}>
                    {btnText}
                  </Button> : null
            }
          </div>
        </div>
      </div>
      { isLoading ? <InfiniteProgressBarCard color="bg-violet-700"/> : null }
    </div>
  );
}