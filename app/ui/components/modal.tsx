import { Fragment, ReactNode, useRef } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import DynamicHeroIcon from '../dynamic-hero-icon';

export enum ModalType {
  Warn = 'warn',
  Info = 'info',
  Success = 'success',
  Danger = 'danger', 
  Primary = 'primary',
  Secondary = 'secondary'
}

interface Props {
  children?: ReactNode;
  open: boolean;
  setOpen: Function;
  onConfirm: Function;
  confirmText?: string;
  onCancel?: Function;
  cancelText?: string;
  hideCancelBtn?: boolean;
  title: string;
  text: string;
  icon?: string;
  type?: ModalType;
}

/**
 * Modal to show information to the user or request action.
 * State of the modal must be handled from parent component to be
 * able to activate it.
 * 
 * Dependencies: React, Tailwind, DynamicHeroIcon
 * 
 * @param title Title to show to the user
 * @param text Body of the modal with more information for the user
 * @param open Modal state
 * @param setOpen State handler
 * @param onConfirm Callback to execute on modal confirm.
 * @param icon Icon to display to the user, if not specified, no icon will be displayed and the bicon background will be removed (optional).
 * @param type Color palette to use. Import ModalType Enum in your component. Default type is primary. (optional)
 * @param onCancel Callback to execute on modal cancel (optional).
 * @param cancelText Text to use in the cancel button (Default value: No) (optional).
 * @param cancelText Text to use in the cancel button (Default value: No) (optional).
 * @param hideCancelBtn Hide the cancel button (Default value: false) (optional).
 * @param children Extra components to show in the modal (optional).
 * @returns 
 */
const Modal = ({open, setOpen, onConfirm, onCancel, title, text, children, icon, type, cancelText = 'No', confirmText = 'Si', hideCancelBtn = false} : Props ) => {
  const cancelButtonRef = useRef(null)

  var iconColor: string;
  var iconBgColor: string;
  var buttonColor: string;
  var buttonHoverColor: string;

  switch (type) {
    case ModalType.Danger:
      iconBgColor = 'bg-red-100';
      iconColor = 'text-red-600';
      buttonColor = 'bg-red-500';
      buttonHoverColor = 'hover:bg-red-600'
      break;
    case ModalType.Info:
      iconBgColor = 'bg-sky-100';
      iconColor = 'text-sky-600';
      buttonColor = 'bg-sky-600';
      buttonHoverColor = 'hover:bg-sky-500'
      break;
    case ModalType.Success:
      iconBgColor = 'bg-emerald-100';
      iconColor = 'text-emerald-600';
      buttonColor = 'bg-emerald-600';
      buttonHoverColor = 'hover:bg-emerald-500'
      break;
    case ModalType.Warn:
      iconBgColor = 'bg-amber-100';
      iconColor = 'text-amber-600';
      buttonColor = 'bg-amber-500';
      buttonHoverColor = 'hover:bg-amber-600'
      break;
    case ModalType.Primary:
      iconBgColor = 'bg-primary-100';
      iconColor = 'text-primary-600';
      buttonColor = 'bg-primary-600';
      buttonHoverColor = 'hover:bg-primary-500'
      break;
    case ModalType.Secondary:
      iconBgColor = 'bg-secondary-100';
      iconColor = 'text-secondary-600';
      buttonColor = 'bg-secondary-600';
      buttonHoverColor = 'hover:bg-secondary-500'
      break;
    default:
      iconBgColor = 'bg-primary-100';
      iconColor = 'text-primary-600';
      buttonColor = 'bg-primary-600';
      buttonHoverColor = 'hover:bg-primary-500'
      break;
  }

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={() => {setOpen} }>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl">
                <div className="mt-3 text-center px-4 py-2 sm:mt-0 sm:text-left w-full border-b">
                  <Dialog.Title as="h3" className="text-2xl font-semibold leading-6 text-gray-900 flex flex-row items-center">
                    {(() => {
                      if(icon){
                        return (
                          <div className={"mx-auto flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full sm:mx-0 sm:h-14 sm:w-14 " + iconBgColor}>
                            <DynamicHeroIcon icon={icon} className={'h-10 w-10 ' + iconColor}/>
                          </div>
                        )
                      }
                    })()}
                    <span className='ml-6'>{title}</span>
                  </Dialog.Title>
                </div>
                <div className="bg-white px-4 sm:px-6">
                  <div className="sm:flex sm:items-start">
                    <div className="mt-0 text-center sm:ml-4 sm:mt-0 sm:text-left w-full">
                      <div>
                        <p className="text-sm text-gray-500">
                          { text }
                        </p>
                        { children }
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-white px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 border-t">
                  <button
                    type="button"
                    className="flex h-10 items-center justify-items-center rounded-2xl bg-primary-600 py-8 text-2xl 
                    font-medium text-white transition-colors hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 
                    focus-visible:outline-offset-2 focus-visible:outline-primary-600 uppercase w-auto px-8 text-center"
                    onClick={() => {
                      onConfirm();
                      setOpen(false);
                    }}
                  >
                    {confirmText}
                  </button>
                  {(() => {
                        if(!hideCancelBtn){
                          return (
                            <button
                              type="button"
                              className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                              onClick={() => {
                                if(onCancel) {
                                  onCancel();
                                }
                                setOpen(false);
                              }}
                              ref={cancelButtonRef}
                            >
                              {cancelText}
                          </button>
                          )
                        }
                    })()}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

export default Modal