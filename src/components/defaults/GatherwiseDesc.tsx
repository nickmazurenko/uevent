import Link from "next/link";

export default function GatherwiseDesc() {
  return (
    <div className="w-full h-full flex flex-col gap-4 py-20 relative text-ueventText border-t-2 border-b-2  border-ueventContrast justify-center items-center">
       <svg className="text-ueventContrast w-1/4 h-full absolute left-0" viewBox="0 0 400 707" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M396.096 356.294C395.166 550.886 234.616 707.903 37.4592 706.96C-159.698 706.016 -318.738 547.471 -317.807 352.88C-316.876 158.288 -156.327 1.27151 40.8302 2.21458C237.987 3.15765 397.027 161.703 396.096 356.294Z" stroke="#11B7CE" strokeOpacity="0.2" strokeWidth="3"/>
        <path d="M321.827 355.939C320.895 550.873 193.29 707.705 37.4591 706.959C-118.372 706.214 -244.47 548.169 -243.538 353.235C-242.605 158.301 -115.001 1.46916 40.8302 2.21455C196.661 2.95994 322.76 161.005 321.827 355.939Z" stroke="#11B7CE" strokeOpacity="0.2" strokeWidth="3"/>
        <path d="M225.896 355.48C225.43 453.004 203.976 541.119 169.741 604.738C135.471 668.423 88.6179 707.204 37.4593 706.959C-13.6993 706.715 -60.1789 667.487 -93.8384 603.478C-127.463 539.534 -148.073 451.217 -147.607 353.694C-147.14 256.17 -125.687 168.054 -91.4513 104.435C-57.1811 40.7512 -10.3282 1.96971 40.8304 2.21442C91.989 2.45913 138.469 41.687 172.128 105.696C205.753 169.64 226.363 257.957 225.896 355.48Z" stroke="#11B7CE" strokeOpacity="0.2" strokeWidth="3"/>
        <path d="M130.997 355.026C130.53 452.655 119.724 540.94 102.66 604.741C94.1246 636.653 84.0455 662.356 72.9661 680.029C61.836 697.783 49.9706 707.019 37.975 706.962C25.9794 706.905 14.203 697.555 3.24324 679.695C-7.66656 661.917 -17.4993 636.119 -25.7289 604.127C-42.1824 540.165 -52.1429 451.782 -51.6759 354.153C-51.2089 256.524 -40.4033 168.239 -23.3387 104.437C-14.8034 72.5255 -4.72436 46.8234 6.35503 29.1499C17.4851 11.3957 29.3505 2.15962 41.3461 2.217C53.3417 2.27438 65.1182 11.6235 76.0779 29.4835C86.9877 47.2621 96.8204 73.0594 105.05 105.052C121.503 169.014 131.464 257.397 130.997 355.026Z" stroke="#11B7CE" strokeOpacity="0.2" strokeWidth="3"/>
        <path d="M40.0461 166.167C138.835 166.639 228.097 188.229 292.544 222.679C357.059 257.166 396.345 304.312 396.099 355.785C395.853 407.259 356.118 454.026 291.276 487.894C226.502 521.726 137.038 542.461 38.2484 541.989C-60.541 541.516 -149.802 519.926 -214.25 485.476C-278.765 450.99 -318.051 403.844 -317.804 352.37C-317.558 300.897 -277.823 254.129 -212.981 220.261C-148.207 186.429 -58.7434 165.694 40.0461 166.167Z" stroke="#11B7CE" strokeOpacity="0.2" strokeWidth="3"/>
        <path d="M39.9195 192.644C138.739 193.116 228.044 211.754 292.535 241.441C357.16 271.19 396.31 311.742 396.099 355.785C395.888 399.828 356.353 440.004 291.446 469.134C226.674 498.202 137.195 515.985 38.3751 515.512C-60.4449 515.039 -149.75 496.402 -214.24 466.715C-278.866 436.965 -318.015 396.414 -317.804 352.37C-317.594 308.327 -278.058 268.152 -213.151 239.022C-148.38 209.953 -58.9005 192.171 39.9195 192.644Z" stroke="#11B7CE" strokeOpacity="0.2" strokeWidth="3"/>
      </svg>

      
      <span className="text-3xl text-center">GATHERWISE</span>
      <div className="flex flex-wrap w-2/3 items-center justify-center gap-4">
        <p className="w-full md:w-1/3">
          It is an opportunity to participate in online and offline events and
          create your own meetings. The GATHERWISE also helps with the events
          organization, the choice of locations, the creation of invitations for
          participants and much more. Our mission is gather like-minded people.
          Finding people with same interests isn&apos;t always that easy.
        </p>
        <p className="w-full md:w-1/3">
          Finding people with the same goals and aspirations is even harder.
          It$&apos;s not about meeting just one specific person who shares all
          your interests, but about opening yourself to different people who
          share at least one common interest. Meeting like-minded people
          isn&apos;t hard - it&apos;s about taking the right steps.
        </p>
      </div>
      <Link
        className="p-2 rounded-xl w-1/3 bg-ueventContrast text-center"
        href="/events"
      >
        Create your event
      </Link>
    </div>
  );
}
