'use client'

import { ReactNode, useEffect, useState } from 'react'
import { Switch } from '@headlessui/react'
import DynamicHeroIcon from '../../dynamic-hero-icon'
import Link from 'next/link';
import Modal, { ModalType } from "../modal";
import { Button } from '../button';
import PdfViewer from '../pdf-viewer';

interface Props {
  id: string;
  label?: LabelProps;
  iconEnabled?: string;
  iconDisabled?: string;
  defaultEnabled?: boolean;
  onChange?: Function;
}

export interface LabelProps {
  start?: string;
  hrefText?: string;
  href?: string;
  end?: string;
}

export default function SwitchWithIcon({ id, label, iconEnabled = 'HomeIcon', iconDisabled = 'TruckIcon', defaultEnabled, onChange }: Props ) {
  const [enabled, setEnabled] = useState(defaultEnabled || false)

  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [modalText, setModalText] = useState<string>('');
  //TODO ver como abrir el link en un modal

  let modalTitle = `${label?.start} `
  if(label?.hrefText){
    modalTitle += label.hrefText + ' ';
  }
  if(label?.end){
    modalTitle += label.end + ' ';

  }

  return (
    <>
      <Modal open={modalOpen} setOpen={setModalOpen} 
        onConfirm={() => {setModalOpen(false)}}
        confirmText='Cerrar'
        type={ModalType.Info}
        hideCancelBtn = {true}
        icon = 'ExclamationTriangleIcon'
        title={modalTitle}
        text={modalText} >
          {/* <div className="bg-[#323639] h-14 w-32 absolute right-10"></div> */}
          {label && label.href ? 
            <PdfViewer height={900} path={ label?.href }/> : null
            // <iframe
            //   src={ label?.href }
            //   className="w-full h-[800px] touch-auto"
            //   title="PDF Viewer"
            // /> : null
          }
        </Modal>

      <Button onClickCallback={ () => setModalOpen(true) }>open modal</Button>
      { label ? 
        <label htmlFor={`${id}_switch`} className="mb-2 ml-1 block text-2xl font-medium text-gray-700">
          {label.start} { label.href ? <Link href={label.href}>{label.hrefText}</Link> : null } {label.end}
        </label> : null
        }
      <input id={id} name={id} type='hidden' value={String(enabled)}/>
      <Switch
        id={`${id}_switch`}
        name={`${id}_switch`}
        checked={enabled}
        onChange={(e) => {
          setEnabled(!enabled);
          if(onChange){
            onChange()
          }
        }}
        className="group relative inline-flex h-8 w-14 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-gray-200 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 data-[checked]:bg-indigo-600"
      >
        <span className="sr-only">Use setting</span>
        <span className="pointer-events-none relative inline-block h-7 w-7 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out group-data-[checked]:translate-x-6">
          <span
            aria-hidden="true"
            className="absolute inset-0 flex h-full w-full items-center justify-center transition-opacity duration-200 ease-in group-data-[checked]:opacity-0 group-data-[checked]:duration-100 group-data-[checked]:ease-out"
          >
            <DynamicHeroIcon icon={iconDisabled} className={"h-5 w-5 text-gray-400"}/>
          </span>
          <span
            aria-hidden="true"
            className="absolute inset-0 flex h-full w-full items-center justify-center opacity-0 transition-opacity duration-100 ease-out group-data-[checked]:opacity-100 group-data-[checked]:duration-200 group-data-[checked]:ease-in"
          >
            <DynamicHeroIcon icon={iconEnabled} className={"h-5 w-5 text-indigo-600"}/>
          </span>
        </span>
      </Switch>
    </>
  )
}
