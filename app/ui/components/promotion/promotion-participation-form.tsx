'use client'

import { CardTranslucid } from "../card-translucid";
import { FormFieldsErrors, TextInput } from "../form-fields/input";
import { useRouter } from 'next/navigation';
import SwitchWithIcon from "../form-fields/switch";
import { useActionState, useEffect, useState } from "react";
import { Participant } from "@/app/lib/definitions";

import { createOrUpdateParticipant, ParticipateFormState } from '@/app/lib/actions/participate'
import { SubmitButton } from "../../button";

interface Props {
  participant?: Participant;
}

export function PromotionParticipationForm({ participant }: Props) {
  const initialState: ParticipateFormState = { message: null, errors: {}, formData: {} };

  const router = useRouter()
  const [state, formAction] = useActionState(createOrUpdateParticipant, initialState);
  const [formData, setFormData] = useState<any>({});

  const [isOver18, setIsOver18] = useState<boolean>(state.formData.is_over_18 || participant?.over_18 || false);
  const [acceptsTos, setAcceptsTos] = useState<boolean>(state.formData.accepts_tos || participant?.accepts_terms_of_service || false);
  const [acceptsPrivacyPolicy, setAcceptsPrivacyPolicy] = useState<boolean>(state.formData.accepts_privacy_policy || participant?.accepts_privacy_policy || false);

  useEffect(() => {
    if (state.errors) {
      setFormData(state.formData || {});
      //TODO Si ya lo aceptaron lo tenemos que cargar?, o lo tienen que aceptar todas las veces?
      // setIsOver18(state.formData.is_over_18 || participant?.is_over_18 || false);
      // setIsOver18(state.formData.accepts_tos || participant?.accepts_tos || false);
      // setIsOver18(state.formData.accepts_privacy_policy || participant?.accepts_privacy_policy || false);
    }
  }, [state]);

  return (
    <div className="flex justify-center items-center min-h-screen">
      <CardTranslucid title='Participá por una promocion de un auto 0KM'> 
        <form action={formAction}>
          <div className="pt-4">
            <TextInput id={'document'} name="document" className="w-96 text-2xl rounded-2xl bg-transparent border-black" icon="IdentificationIcon"
            label="Documento" disabled={true}/>
          </div>
          <div className="pt-4">
            <TextInput id={'full_name'} name="full_name" className="w-96 text-2xl rounded-2xl bg-transparent border-black" icon="UserIcon"
            errors={state.errors ? state.errors.full_name : undefined} 
            label="Nombre y Apellido"/>
          </div>
          <div className="flex w-full pt-4">
            <div className="w-1/4 pr-1">
              <TextInput id={'phone_area_code'} name="phone_area_code" className="text-2xl rounded-2xl bg-transparent border-black" icon="PlusIcon" 
              label="Prefijo"/>
            </div>
            <div className="w-3/4">
              <TextInput id={'phone_number'} name="phone_number" className="text-2xl rounded-2xl bg-transparent border-black" icon="DevicePhoneMobileIcon" 
              label="Teléfono"/>
            </div>
          </div>
          {state.errors ? <div id={`phone-error`} aria-live="polite" aria-atomic="true">
            { state.errors.phone_area_code ? <FormFieldsErrors errors={ state.errors.phone_area_code }/> : null}
            { state.errors.phone_number ? <FormFieldsErrors errors={ state.errors.phone_number }/> : null}
          </div> : null}
          <div className="pt-4">
            <TextInput id={'email'} name="email" className="w-96 text-2xl rounded-2xl bg-transparent border-black" icon="AtSymbolIcon"
            errors={state.errors ? state.errors.phone_number : undefined} 
            label="E-Mail"/>
          </div>
          <div className="mt-4">
            <SwitchWithIcon id={'is_over_18'} label='Soy mayor de 18' 
            iconDisabled="XMarkIcon" iconEnabled="CheckIcon" 
            defaultEnabled={ formData.is_over_18 || participant?.over_18 || false } 
            onChange={() => setIsOver18(!isOver18)}/>
          </div>
          <div className="mt-4">
            <SwitchWithIcon id={'accepts_tos'} label='Acepto los términos y condiciones del sorteo.' 
            iconDisabled="XMarkIcon" iconEnabled="CheckIcon" 
            defaultEnabled={ formData.accepts_tos || participant?.accepts_terms_of_service || false } 
            onChange={() => setAcceptsTos(!acceptsTos)}/>
          </div>
          <div className="mt-4">
            <SwitchWithIcon id={'accepts_privacy_policy'} label='Acepto las políticas de privacidad del organizador.' 
            iconDisabled="XMarkIcon" iconEnabled="CheckIcon" 
            defaultEnabled={ formData.accepts_privacy_policy || participant?.accepts_privacy_policy || false } 
            onChange={() => setAcceptsPrivacyPolicy(!acceptsPrivacyPolicy)}/>
          </div>
          {state.errors ? <div id={`toggle-error`} aria-live="polite" aria-atomic="true">
            { state.errors.is_over_18 ? <FormFieldsErrors errors={ state.errors.is_over_18 }/> : null}
            { state.errors.accepts_tos ? <FormFieldsErrors errors={ state.errors.accepts_tos }/> : null}
            { state.errors.accepts_privacy_policy ? <FormFieldsErrors errors={ state.errors.accepts_privacy_policy }/> : null}
          </div> : null}
          <div className="mt-6 flex justify-center">
            <SubmitButton type="submit" className="flex h-10 items-center justify-items-center rounded-2xl bg-primary-600 py-8 text-2xl 
              font-medium text-white transition-colors hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 
              focus-visible:outline-offset-2 focus-visible:outline-primary-600 uppercase w-96 text-center">Participar Ahora</SubmitButton>
          </div>
        </form>
      </CardTranslucid>
    </div>
  );
}