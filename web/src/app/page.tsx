import React from 'react';
import style from './home.module.css'

export default function Page() {
  return (
    <section className="max-h-[64rem] h-screen -mx-3">
      <div className="flex flex-col md:flex-row h-full w-full">
        <div className="w-full md:w-1/3 h-full group relative">
          <div className={[style.splash, style.splash_1].join(' ')}>
            <div className="opacity-0 group-hover:opacity-100 duration-300 absolute top-3 inset-x-0 text-white text-center drop-shadow">
              <h2 className="font-bold tracking-tight text-2xl md:text-4xl">Cosplay</h2>
              <p className="text-lg">Recreate original media</p>
            </div>
          </div>
        </div>
        <div className="w-full md:w-1/3 h-full group relative">
          <div className={[style.splash, style.splash_2].join(' ')}>
            <div className="opacity-0 group-hover:opacity-100 duration-300 absolute top-3 inset-x-0 text-white text-center drop-shadow">
              <h2 className="font-bold tracking-tight text-4xl">Event</h2>
              <p className="text-lg">Document the moment</p>
            </div>
          </div>
        </div>
        <div className="w-full md:w-1/3 h-full group relative">
          <div className={[style.splash, style.splash_3].join(' ')}>
            <div className="opacity-0 group-hover:opacity-100 duration-300 absolute top-3 inset-x-0 text-white text-center drop-shadow">
              <h2 className="font-bold tracking-tight text-4xl">Portrait</h2>
              <p className="text-lg">Capture your true self</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
