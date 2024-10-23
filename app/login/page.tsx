import LoginForm from '@/app/ui/login-form';
import React from 'react'
 
export default function LoginPage() {
  return (
    <div className="grid grid-cols-1 grid-rows-1 gap-2" style={{ "height": "calc(100vh - 88px)" }}>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-200">
            Inicio de sesión
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <LoginForm/>
        </div>
      </div>
    </div>
  )
}