import Link from "next/link";
import { ReactPropTypes } from "react";
import { AiOutlineLaptop } from "react-icons/ai";

export default function Description(props: { className?: string }) {
  return (
    <div className={`relative ${props.className}`}>
      <img
        src="https://res.cloudinary.com/dg40lzqln/image/upload/v1680552908/unsplash_Lks7vei-eAgsdgdsg_pjn51j.png"
        alt="your-image-alt"
        className="brightness-[0.65] blur-small w-full h-full object-cover"
      />
      <div className="sm:absolute lg:inset-0 bottom-0 flex items-center justify-start">
        <div className="p-8 max-w-3xl mx-auto gap-5 flex flex-col lg:w-2/3">
          <svg
            className="text-ueventContrast absolute top-0 right-0 w-1/4"
            viewBox="0 0 351 667"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="335.63"
              cy="330.63"
              r="332.536"
              transform="rotate(0.274063 335.63 330.63)"
              stroke="#11B7CE"
              strokeOpacity="0.6"
              strokeWidth="3"
            />
            <path
              d="M598.952 331.889C598.072 515.885 479.162 663.856 334.039 663.162C188.916 662.467 71.4272 513.366 72.3073 329.37C73.1875 145.374 192.097 -2.5964 337.22 -1.90223C482.343 -1.20805 599.832 147.894 598.952 331.889Z"
              stroke="#11B7CE"
              strokeOpacity="0.6"
              strokeWidth="3"
            />
            <path
              d="M509.557 331.462C509.117 423.509 489.121 506.674 457.221 566.716C425.284 626.827 381.646 663.389 334.039 663.162C286.432 662.934 243.146 625.955 211.786 565.542C180.462 505.198 161.263 421.845 161.703 329.798C162.143 237.75 182.139 154.585 214.039 94.5439C245.976 34.4328 289.613 -2.12994 337.221 -1.90222C384.828 -1.6745 428.114 35.304 459.474 95.7179C490.798 156.062 509.997 239.414 509.557 331.462Z"
              stroke="#11B7CE"
              strokeOpacity="0.6"
              strokeWidth="3"
            />
            <path
              d="M421.122 331.039C420.681 423.19 410.607 506.519 394.703 566.738C386.749 596.858 377.357 621.112 367.037 637.786C356.664 654.545 345.633 663.217 334.52 663.164C323.407 663.111 312.459 654.334 302.247 637.476C292.087 620.704 282.928 596.362 275.261 566.166C259.934 505.799 250.658 422.377 251.098 330.225C251.539 238.074 261.613 154.745 277.517 94.5262C285.472 64.4058 294.864 40.1521 305.184 23.4783C315.557 6.71879 326.588 -1.95308 337.701 -1.89992C348.814 -1.84676 359.762 6.93023 369.974 23.7882C380.134 40.56 389.293 64.9024 396.959 95.0975C412.287 155.465 421.563 238.887 421.122 331.039Z"
              stroke="#11B7CE"
              strokeOpacity="0.6"
              strokeWidth="3"
            />
            <path
              d="M336.48 152.858C428.524 153.298 511.683 173.669 571.719 206.173C631.818 238.712 668.397 283.189 668.164 331.74C667.932 380.291 630.93 424.415 570.522 456.377C510.178 488.306 426.828 507.881 334.784 507.44C242.741 507 159.582 486.629 99.5456 454.125C39.4465 421.586 2.8682 377.109 3.10043 328.558C3.33267 280.008 40.3348 235.883 100.742 203.921C161.087 171.992 244.437 152.418 336.48 152.858Z"
              stroke="#11B7CE"
              strokeOpacity="0.6"
              strokeWidth="3"
            />
            <path
              d="M336.361 177.85C428.435 178.291 511.638 195.876 571.715 223.886C631.921 251.957 668.363 290.209 668.164 331.74C667.966 373.27 631.159 411.173 570.688 438.666C510.345 466.1 426.978 482.888 334.904 482.448C242.83 482.008 159.627 464.423 99.5498 436.412C39.344 408.342 2.90174 370.089 3.1004 328.559C3.29905 287.028 40.1056 249.126 100.577 221.633C160.92 194.198 244.287 177.41 336.361 177.85Z"
              stroke="#11B7CE"
              strokeOpacity="0.6"
              strokeWidth="3"
            />
          </svg>
          <span className="text-ueventText lg:text-2xl text-xl">
            IMAGINE THE SITUATION
          </span>
          <p className="text-xs lg:text-xl text-ueventText">
            You want to attend an event in another city. You buy tickets for the
            event, find the best way to travel, search for accommodation. After
            all this, you are alone all day or half-day before the beginning of
            the event for which you are there. Once the event is finished, you
            notice some of your acquaintances.
          </p>
          <div className="flex flex-row lg:flex-col gap-4 w-full lg:w-1/2">
            <Link
              className="bg-ueventContrast text-center text-ueventText p-3 rounded-lg"
              href="/events"
            >
              Create event
            </Link>
            <Link
              className="border-2 border-ueventContrast text-center text-ueventText p-3 rounded-lg"
              href="/events"
            >
              Join Event
            </Link>
          </div>
        </div>
        <div className="w-1/2"></div>
      </div>
    </div>
  );
}
