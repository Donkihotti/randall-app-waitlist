'use client';

import { useState, useEffect, useRef } from "react"
import gsap from "gsap";
import Image from "next/image";

export default function Form () { 
const [email, setEmail] = useState("");
const [loading, setLoading] = useState(false); 
const [status, setStatus] = useState(null); 
const [message, setMessage] = useState("");
const [role, setRole] = useState(""); 

const validateEmail = (e) =>
    /^\S+@\S+\.\S+$/.test(e);

async function handleSubmit(e) {
    e.preventDefault();
    setStatus(null);
    setMessage("");

    if (!validateEmail(email)) {
      setStatus("error");
      setMessage("Please enter a valid email.");
      return;
    }

    setLoading(true);
    try {
      // include honeypot "website" (left blank by real users)
      const res = await fetch("/api/join", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, role, website: "" }),
      });

      const body = await res.json();
      if (res.ok) {
        setStatus("ok");
        setMessage("Thanks — you’re on the list! Check your inbox for updates.");
        setEmail("");
        setRole("");
      } else {
        setStatus("error");
        setMessage(body?.error || "Something went wrong. Try again later.");
      }
    } catch (err) {
      setStatus("error");
      setMessage("Network error — please try again.");
    } finally {
      setLoading(false);
    }
  }

    return (
    <div className="flex flex-row h-60 md:h-80 gap-x-3 w-screen md:w-1/2 z-20">
        <div className="bg-main h-full w-0 md:w-16 hidden md:block"></div>
        <form onSubmit={handleSubmit} className="w-full md:w-4/6 bg-main px-5 py-3 flex flex-col justify-between">
            <div className="flex flex-row gap-x-4 items-center">
                <h2 className="text-2xl md:text-big font-instrument pointer-events-none md:leading-20">Early access form</h2>
                <div className="relative w-8 h-8 md:w-14 md:h-14">
                <Image
                  src="/arrow-long-right.svg"
                  alt="arrow long right minimal"
                  fill
                  className="object-contain"
                  sizes="(min-width: 768px) 56px, 40px"
                />
              </div>
            </div>
        <div className="flex flex-col mb-5 text-white text-sm md:text-xl w-full">
            <label className="block mb-2">
            <input
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block md:w-2/3 w-full border-b px-2 py-2 waitlist-input"
                placeholder="Enter your email"
            />
            </label>
            <label className="block mb-2">
            <input
                type="text"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="mt-1 block w-full md:w-2/3 border-b px-2 py-2 waitlist-input"
                placeholder="Role at company (Optional)"
            />
            </label>
        </div>
  
        {/* Honeypot - hide from users but bots may fill it */}
        <div style={{ position: "absolute", left: "-9999px", top: "auto", width: "1px", height: "1px", overflow: "hidden" }}>
          <label>Website (leave blank)</label>
          <input name="website" />
        </div>
        <div className="flex flex-row w-full justify-between">
            <p className="text-[8px] md:text-xs pointer-events-none">We’ll only use this email for invites and <br className="hidden md:block"/> product updates. Privacy respected.</p>
            <div className="flex flex-row md:gap-x-1">
            <button
            type="submit"
            disabled={loading}
            className="whitespace-nowrap inline-flex items-center px-2 md:px-4 py-1 rounded-xs text-xs md:text-sm border border-white text-white disabled:opacity-60 hover:cursor-pointer hover:bg-white hover:text-black transition-colors duration-150"
            >
            {loading ? "Joining…" : "Join waitlist"}
            </button>
            <div className="py-1 px-2 border rounded-xs items-center justify-center hidden md:flex">
                <Image 
                src={"arrow-long-up-left.svg"}
                alt="arrow long right up"
                width={15}
                height={15}
                />
            </div>
            </div>
        </div>
        {status === "ok" && <p className="mt-3 text-green-600">{message}</p>}
        {status === "error" && <p className="mt-3 text-red-600">{message}</p>}
      </form>
    </div> 
    )
}