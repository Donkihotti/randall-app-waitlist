'use client';

import Logo from "./components/Logo";
import Image from "next/image";
import Form from "./components/Form";

export default function Home() {
  return (
    <>
    <main className="w-screen h-screen bg-white p-5 overflow-hidden">
      <div className="absolute top-0 right-0 bg-gradient-to-r from-white to-secondary w-3/5 h-full"></div>
      <div className="h-1/8 w-full">
        <Logo />
      </div>
        <div className="flex flex-row w-1/3 gap-x-5 ml-28">
          <div className="relative h-[270px] w-[180px]">
          <Image 
          src={"/bull-2.png"}
          alt="pixelated bull"
          fill={true}
          className="object-cover"
          />
          </div>
          <div className="flex flex-col text-black justify-center pointer-events-none z-20">
            <h2 className="font-instrument text-big leading-14">Randall, <br/> purposeful craft <br/> over gimmicks.</h2>
            <div className="flex flex-row gap-x-2 text-medium leading-6 tracking-tight mt-3">
              <p>join the waitlist for early access</p>
              <Image 
              src={"/arrow-long-down-left.svg"}
              alt="arrow right"
              width={22}
              height={22}
              />
            </div>
          </div>
        </div>
        <div className="w-full flex items-end justify-end mt-22">
         <Form />
        </div>
        <div className="h-full w-1/2 absolute right-0 top-0">
          <Image 
          src={"/bull-4.svg"}
          alt="bull pixelated"
          fill={true}
          className=""
          />
        </div>
        <div className="absolute bottom-3 left-3.5 flex flex-row gap-x-1">
        <div className=" text-black border py-1 px-4 rounded-xs">
            <p className="text-sm">contact@randallapp.com</p>
        </div>
        <div className="py-1 px-2 border rounded-xs flex items-center border-black justify-center">
          <Image 
          src={"Arrow_Right.svg"}
          alt="arrow long right up"
          width={15}
          height={15}
          />
        </div>
        </div>
    </main>
    </>
  );
}
