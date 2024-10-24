'use client'

import { CardTranslucid } from "../card-translucid";
import { TextInput } from "../form-fields/input";
import { useRouter } from 'next/navigation';
import SwitchWithIcon from "../form-fields/switch";

export function PromotionParticipationForm() {
  const router = useRouter()

  return (
    <div className="flex justify-center items-center min-h-screen">
      <CardTranslucid title='Participá por una promocion de un auto 0KM' onClickCallback={() => { participate() }} btnText='Participar Ahora' 
      btnClassName={`flex h-10 items-center justify-items-center rounded-2xl bg-primary-600 py-8 text-2xl font-medium text-white 
        transition-colors hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 
        focus-visible:outline-offset-2 focus-visible:outline-primary-600 uppercase w-96`}> 
        <TextInput id={'document'} name="document" className="w-96 text-2xl rounded-2xl bg-transparent border-black" icon="IdentificationIcon"
        label="Documento" disabled={true}/>
        <div className="pt-4">
          <TextInput id={'full_name'} name="full_name" className="w-96 text-2xl rounded-2xl bg-transparent border-black" icon="UserIcon"
          label="Nombre y Apellido"/>
        </div>
        <div className="flex w-full pt-4">
          <div className="w-1/4 pr-1">
            <TextInput id={'phone_area_code'} name="phone_area_code" className="text-2xl rounded-2xl bg-transparent border-black" icon="PlusIcon" label="Prefijo"/>
          </div>
          <div className="w-3/4">
            <TextInput id={'phone_number'} name="phone_number" className="text-2xl rounded-2xl bg-transparent border-black" icon="DevicePhoneMobileIcon" label="Teléfono"/>
          </div>
        </div>
        <div className="pt-4">
          <TextInput id={'email'} name="email" className="w-96 text-2xl rounded-2xl bg-transparent border-black" icon="AtSymbolIcon"
          label="E-Mail"/>
        </div>
        <div className="mt-4">
          <SwitchWithIcon id={'is_over_18'} label='Soy mayor de 18' 
          iconDisabled="XMarkIcon" iconEnabled="CheckIcon" 
          defaultEnabled={false} onChange={() => console.log("TADAAA")}/>
        </div>
        <div className="mt-4">
          <SwitchWithIcon id={'accepts_tos'} label='Acepto los términos y condiciones del sorteo.' 
          iconDisabled="XMarkIcon" iconEnabled="CheckIcon" 
          defaultEnabled={false} onChange={() => console.log("TADAAA")}/>
        </div>
        <div className="mt-4">
          <SwitchWithIcon id={'accepts_privacy_policy'} label='Acepto las políticas de privacidad del organizador.' 
          iconDisabled="XMarkIcon" iconEnabled="CheckIcon" 
          defaultEnabled={false} onChange={() => console.log("TADAAA")}/>
        </div>
      </CardTranslucid>
    </div>
  );

  function participate(){
    console.log("TADAAA2!!!")
    router.push('/promotion/registration')
  }
}