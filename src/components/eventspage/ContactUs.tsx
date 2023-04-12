import Link from "next/link";

type Props = {};

export default function ContactUs(props: Props) {
  return (
    <div className="relative flex gap-10 border-b-2 py-24 border-ueventContrast flex-col md:flex-row md:justify-between justify-center">
      <div className="flex flex-col gap-4 px-0 md:px-10 items-start justify-center w-full md:w-1/2">
        <span className="text-ueventText text-xl md:text-2xl">
          Write to us about our services or cooperation
        </span>
        <div className="flex flex-col gap-4 p-14 rounded-2xl bg-ueventSecondary">
          <input
            placeholder="Name"
            className="w-full bg-ueventSecondary p-2 border=none border-b-2 text-ueventText"
          />
          <input
            placeholder="Email"
            className="bg-ueventSecondary p-2 border=none border-b-2 text-ueventText"
          />
          <input
            placeholder="Write here"
            className="bg-ueventSecondary p-2 border=none border-b-2 text-ueventText"
          />
          <button className="p-2 w-2/3 rounded-xl self-center bg-ueventContrast text-ueventText text-center">
            Send
          </button>
          <div className="text-center text-xs text-ueventText">
            Continuing you agree to our <span className="text-ueventContrast">Privacy Policy</span>
          </div>
        </div>
      </div>
      <div className="flex flex-col text-ueventText gap-4 items-start justify-center w-full md:w-1/3">
        <span className="text-2xl">You have questions?</span>
        <div className="text-base">
          Write to{" "}
          <span className="text-ueventContrast">deleashers@gmail.com</span>
        </div>
        <div className="text-base">
          or call <span className="text-ueventContrast">+380101011000</span>
        </div>
        <Link
          className="p-2 border-2 border-ueventContrast rounded-xl text-ueventText text-center"
          href="/events"
        >
          Join the event
        </Link>
      </div>
      <svg className="absolute z-0 right-0 bottom-0" width="408" height="523" viewBox="0 0 408 523" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M717.096 357.294C716.165 551.886 555.616 708.903 358.459 707.96C161.301 707.016 2.26174 548.471 3.19254 353.88C4.12334 159.288 164.673 2.27151 361.83 3.21458C558.987 4.15765 718.027 162.703 717.096 357.294Z" stroke="#11B7CE" strokeOpacity="0.2" strokeWidth="3"/>
        <path d="M642.827 356.939C641.894 551.873 514.29 708.705 358.459 707.959C202.628 707.214 76.5292 549.169 77.4616 354.235C78.394 159.301 205.999 2.46916 361.83 3.21455C517.661 3.95994 643.759 162.005 642.827 356.939Z" stroke="#11B7CE" strokeOpacity="0.2" strokeWidth="3"/>
        <path d="M546.896 356.48C546.429 454.004 524.976 542.119 490.741 605.738C456.47 669.423 409.617 708.204 358.459 707.959C307.3 707.715 260.821 668.487 227.161 604.478C193.536 540.534 172.926 452.217 173.393 354.694C173.859 257.17 195.313 169.054 229.548 105.435C263.818 41.7512 310.671 2.96971 361.83 3.21442C412.988 3.45913 459.468 42.687 493.128 106.696C526.753 170.64 547.362 258.957 546.896 356.48Z" stroke="#11B7CE" strokeOpacity="0.2" strokeWidth="3"/>
        <path d="M451.997 356.026C451.53 453.655 440.724 541.94 423.66 605.741C415.124 637.653 405.045 663.356 393.966 681.029C382.836 698.783 370.97 708.019 358.975 707.962C346.979 707.905 335.203 698.555 324.243 680.695C313.333 662.917 303.5 637.119 295.271 605.127C278.817 541.165 268.857 452.782 269.324 355.153C269.791 257.524 280.596 169.239 297.661 105.437C306.196 73.5255 316.275 47.8234 327.355 30.1499C338.485 12.3957 350.35 3.15962 362.346 3.217C374.341 3.27438 386.118 12.6235 397.078 30.4835C407.987 48.2621 417.82 74.0594 426.05 106.052C442.503 170.014 452.464 258.397 451.997 356.026Z" stroke="#11B7CE" strokeOpacity="0.2" strokeWidth="3"/>
        <path d="M361.046 167.167C459.835 167.639 549.096 189.229 613.544 223.679C678.059 258.166 717.345 305.312 717.098 356.785C716.852 408.259 677.117 455.026 612.275 488.894C547.501 522.726 458.037 543.461 359.248 542.989C260.458 542.516 171.197 520.926 106.75 486.476C42.2345 451.99 2.94884 404.844 3.19505 353.37C3.44127 301.897 43.1762 255.129 108.018 221.261C172.792 187.429 262.256 166.694 361.046 167.167Z" stroke="#11B7CE" strokeOpacity="0.2" strokeWidth="3"/>
        <path d="M360.919 193.644C459.739 194.116 549.044 212.754 613.534 242.441C678.159 272.19 717.309 312.742 717.098 356.785C716.888 400.828 677.352 441.004 612.445 470.134C547.674 499.202 458.194 516.985 359.374 516.512C260.554 516.039 171.249 497.402 106.759 467.715C42.1336 437.965 2.9842 397.414 3.19487 353.37C3.40554 309.327 42.9411 269.152 107.848 240.022C172.62 210.953 262.099 193.171 360.919 193.644Z" stroke="#11B7CE" strokeOpacity="0.2" strokeWidth="3"/>
      </svg>

    </div>
  );
}
