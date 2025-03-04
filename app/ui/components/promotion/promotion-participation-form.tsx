'use client'

import { CardTranslucid } from "../card-translucid";
import { FormFieldsErrors, TextInput } from "../form-fields/input";
import SwitchWithIcon, { LabelProps } from "../form-fields/switch";
import { useActionState, useEffect, useRef, useState } from "react";
import { Participant, Premise, Promotion } from "@/app/lib/definitions";

import { createOrUpdateParticipant, ParticipateFormState } from '@/app/lib/actions/participate'
import { SubmitButton } from "../../button";
import Swal from "sweetalert2";
import { InfiniteProgressBar } from "../infinite-progress";

interface Props {
  doc_number: string;
  promotion?: Promotion;
  participant?: Participant;
  premise?: Premise
}

export function PromotionParticipationForm({ participant, doc_number, promotion, premise }: Props) {
  const initialState: ParticipateFormState = { message: null, errors: {}, formData: {} };

  const [state, formAction] = useActionState(createOrUpdateParticipant, initialState);
  const [formData, setFormData] = useState<any>({});
  const [loading, setLoading] = useState<boolean>(false);

  const [isOver18, setIsOver18] = useState<boolean>(state.formData.is_over_18 || participant?.over_18 || true);
  const [acceptsTos, setAcceptsTos] = useState<boolean>(state.formData.accepts_tos || participant?.accepts_terms_of_service || true);
  const [acceptsPrivacyPolicy, setAcceptsPrivacyPolicy] = useState<boolean>(state.formData.accepts_privacy_policy || participant?.accepts_privacy_policy || true);

  const formRef = useRef<HTMLFormElement>(null);
  
  useEffect(() => {
    if (state && state?.errors) {
      setFormData(state.formData || {});
    }
  }, [state]);

  useEffect(() => {
    const handleError = () => {
      Swal.fire({
        title: 'Error!',
        text: state.message || 'Ha ocurrido un error',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    };

    if (state?.error) {
      handleError();
    }
  }, [state]);

  const Over18Label: LabelProps = { start: 'Soy mayor de 18' }
  const TosLabel: LabelProps = { start: 'Acepto los', hrefText: 'términos y condiciones', href: promotion?.terms_and_conditions.path, end: 'del sorteo.', modalTitle: 'Términos y condiciones'}
  const PrivacyPolicyLabel: LabelProps = { start: 'Acepto las', hrefText: 'políticas de privacidad', href: premise?.privacy_policy.path, end: 'del organizador.', modalTitle: 'Políticas de privacidad'}
  const handleNumericInput = (event: React.FormEvent<HTMLInputElement>) => {
    const input = event.currentTarget;
    input.value = input.value.replace(/\D/g, "");
  };
  return (
    <div className="flex justify-center items-center min-h-screen">
      <CardTranslucid title={promotion ? promotion.name : ''}> 
        <div className="text-2xl text-gray-700">
          {promotion ? promotion.description : ''}
        </div>
        <form action={formAction} ref={formRef}>
          <input id="promotion_id" name="promotion_id" type="hidden" value={promotion?.id}/>
          <div className="pt-4">
            <TextInput id='document' name="document" className="w-96 text-2xl rounded-2xl bg-transparent border-black" icon="IdentificationIcon"
            defaultValue={formData.document || doc_number || ''}
            label="Documento" readOnly/>
          </div>
          <div className="pt-4">
            <TextInput id='full_name' name="full_name" className="w-96 text-2xl rounded-2xl bg-transparent border-black" icon="UserIcon"
            defaultValue={formData.full_name || participant?.full_name || ''}
            errors={state?.errors ? state.errors.full_name : undefined} 
            label="Nombre y Apellido"/>
          </div>
          <div className="pt-4">
            <TextInput id={'phone_number'} name="phone_number" className="text-2xl rounded-2xl bg-transparent border-black" icon="DevicePhoneMobileIcon" 
            defaultValue={formData.phone_number || participant?.phone_number || ''}
            label="Teléfono"
            errors={state?.errors ? state.errors.phone_number : undefined}
            onInput={handleNumericInput}
            />
          </div>
          <div className="pt-4">
            <TextInput id={'email'} name="email" className="w-96 text-2xl rounded-2xl bg-transparent border-black" icon="AtSymbolIcon"
            defaultValue={formData.email || participant?.email || ''}
            errors={state?.errors ? state.errors.email : undefined} 
            label="E-Mail"/>
          </div>
          <div className="mt-4 flex flex-row-reverse items-center gap-1 justify-end">
            <SwitchWithIcon id={'is_over_18'} label={Over18Label}
            iconDisabled="XMarkIcon" iconEnabled="CheckIcon" 
            defaultEnabled={ formData.is_over_18 || participant?.over_18 || true } 
            onChange={() => setIsOver18(!isOver18)}/>
          </div>
          <div className="mt-4 flex flex-row-reverse items-center gap-1 justify-end">
            <SwitchWithIcon id={'accepts_tos'} 
            label={ TosLabel }
            iconDisabled="XMarkIcon" iconEnabled="CheckIcon" 
            defaultEnabled={ formData.accepts_tos || participant?.accepts_terms_of_service || true } 
            onChange={() => setAcceptsTos(!acceptsTos)}/>
          </div>
          <div className="mt-4 flex flex-row-reverse items-center gap-1 justify-end">
            <SwitchWithIcon id={'accepts_privacy_policy'} label={PrivacyPolicyLabel} 
            iconDisabled="XMarkIcon" iconEnabled="CheckIcon" 
            defaultEnabled={ formData.accepts_privacy_policy || participant?.accepts_privacy_policy || true } 
            onChange={() => setAcceptsPrivacyPolicy(!acceptsPrivacyPolicy)}/>
          </div>
          {state?.errors ? <div id={`toggle-error`} aria-live="polite" aria-atomic="true">
            { state?.errors.is_over_18 ? <FormFieldsErrors errors={ state.errors.is_over_18 }/> : null}
            { state?.errors.accepts_tos ? <FormFieldsErrors errors={ state.errors.accepts_tos }/> : null}
            { state?.errors.accepts_privacy_policy ? <FormFieldsErrors errors={ state.errors.accepts_privacy_policy }/> : null}
          </div> : null}
          <div className="mt-6 flex flex-col gap-1 items-center justify-center">
            <SubmitButton type="submit" className="flex h-10 items-center justify-items-center rounded-2xl bg-primary-600 py-8 text-2xl 
              font-medium text-white transition-colors hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 
              focus-visible:outline-offset-2 focus-visible:outline-primary-600 uppercase w-96 text-center mt-4"
              onClick={() => { 
                setLoading(true);
                // Changing the button to disabled status stops the form submission. This submits the form again.
                if (formRef.current) {
                  formRef.current.requestSubmit();
                }
              }} 
              disabled={loading}
              >Participar Ahora</SubmitButton>
              { loading ? <InfiniteProgressBar color="bg-violet-700"/> : null }
          </div>
        </form>
      </CardTranslucid>
    </div>
  );
}