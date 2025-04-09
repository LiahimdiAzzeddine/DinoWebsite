import React from 'react'

export default function NavMobile() {
  return (
    <div className="absolute top-[60px] left-1/2 transform -translate-x-1/2 px-2 z-[999] md:hidden">
    <div
      className="rounded-[1.625em] p-6 shadow-[0_2px_15px_rgba(2,2,43,0.2)] bg-[linear-gradient(90deg,#fff,hsla(0,0%,100%,.95))]"
      style={{ width: "calc(100dvw - 40px)" }}
    >
      <ul className="list-none space-y-4">
        <li>
          <button className="text-black hover:text-[#48beaa] font-medium">
            contact us
          </button>
        </li>
        <li>
          <button className="text-black hover:font-bold font-medium">
            about us
          </button>
        </li>
        <li>
          <button className="text-black hover:font-bold font-medium">
            our Games
          </button>
          <div className="mt-2">
            <div className="rounded-xl p-4 bg-white shadow-md text-left">
              <p className="font-bold">hello</p>
              <p className="text-sm text-[rgb(127,126,144)]">
                Lorem ipsum, dolor sit amet consectetur...
              </p>
            </div>
          </div>
        </li>
        <li>
          <a href="#" className="text-black font-medium">
            contact us
          </a>
        </li>
        <li className="flex flex-col gap-2">
          <a
            href="#"
            className="border border-[rgb(224,224,224)] rounded-2xl px-4 py-2 bg-white text-[rgb(20,20,20)] shadow-[rgba(0,0,0,0.05)_0px_0px_1.3rem_inset]"
          >
            about us
          </a>
          <a
            href="#"
            target="_blank"
            className="bg-[linear-gradient(69deg,_rgb(63,_189,_168),_rgb(63,_177,_39))] text-white rounded-2xl px-4 py-2 shadow-[rgba(0,0,0,0.05)_0px_0px_1.3rem_inset]"
          >
            Book a Call
          </a>
        </li>
      </ul>
    </div>
  </div>
  )
}
