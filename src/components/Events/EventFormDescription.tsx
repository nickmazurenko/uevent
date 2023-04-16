import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { ReactPropTypes } from "react";
import { AiOutlineLaptop } from "react-icons/ai";
import CreateEvent from "./CreateEvent";

export default function EventFormDescription(props: { className?: string }) {
  const t = useTranslations();
  return (
    <div className={`relative ${props.className}`}>
      <img
        src="https://res.cloudinary.com/dg40lzqln/image/upload/v1681654449/ticketDesc_wyvgzq.png"
        alt="your-image-alt"
        className="brightness-[0.5] blur-small w-full h-full object-cover"
      />
      <div className="sm:absolute lg:inset-0 bottom-0 flex items-center justify-start">
        <div className="p-8 max-w-3xl mx-auto gap-5 flex flex-col lg:w-2/3">
          <div className="lg:absolute top-32 p-8">
            <Tickets />
          </div>
          <span className="w-full monserat tracking-wider text-ueventText font-extrabold lg:text-5xl md:w-2/3 text-xl">
            CREATE NEW EVENT.
          </span>
        </div>
        <div className="w-0 lg:w-1/2"></div>
      </div>
    </div>
  );
}

function Tickets() {
  return (
    <>
      <div className="hidden lg:grid grid-cols-3 grid-rows-3">
        <div className="col-start-3 row-start-1">
          <Image
            className="z-30"
            alt="ticket"
            width={600}
            height={600}
            src="https://res.cloudinary.com/dg40lzqln/image/upload/v1681654444/1ticket_cgp4jh.png"
          />
        </div>
        <div className="col-start-2 row-start-2">
          <Image
            className="z-20"
            width={600}
            height={600}
            alt="ticket"
            src="https://res.cloudinary.com/dg40lzqln/image/upload/v1681654440/2ticket_ditvpf.png"
          />
        </div>
        <div className="col-start-1 row-start-3">
          <Image
            className="z-10"
            width={600}
            height={600}
            alt="ticket"
            src="https://res.cloudinary.com/dg40lzqln/image/upload/v1681654440/3ticket_t5dads.png"
          />
        </div>
      </div>
      <div className="lg:hidden w-full flex flex-col items-center justify-center gap-4">
        <Image
          className="z-30"
          alt="ticket"
          width={600}
          height={600}
          src="https://res.cloudinary.com/dg40lzqln/image/upload/v1681654444/1ticket_cgp4jh.png"
        />
        <Image
          className="z-20"
          width={600}
          height={600}
          alt="ticket"
          src="https://res.cloudinary.com/dg40lzqln/image/upload/v1681654440/2ticket_ditvpf.png"
        />
        <Image
          className="z-10"
          width={600}
          height={600}
          alt="ticket"
          src="https://res.cloudinary.com/dg40lzqln/image/upload/v1681654440/3ticket_t5dads.png"
        />
      </div>
    </>
  );
}
