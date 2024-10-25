import { SubmitButton } from "./button";
import { CardTranslucid } from "./components/card-translucid";
import { TextInput } from "./components/form-fields/input";

// Loading animation
const shimmer =
  'before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent';

export function WelcomeSkeleton() {
  return (
    <main>
      <div className="flex justify-center items-center min-h-screen">
        <CardTranslucid title='Ingresa tu documento para participar'> 
            <TextInput id={'document'} className="bg-transparent border-black mt-8 mb-4 px-16"
              icon="MagnifyingGlassIcon"/>
            <div className="mt-6 flex justify-center">
              <SubmitButton type="submit" className="flex h-10 items-center justify-items-center rounded-2xl bg-primary-600 py-8 text-2xl 
                font-medium text-white transition-colors hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 
                focus-visible:outline-offset-2 focus-visible:outline-primary-600 uppercase w-96 text-center mt-4">Participar Ahora</SubmitButton>
            </div>
        </CardTranslucid>
      </div>
    </main>
  );
}