import { News } from "@prisma/client";
import moment from "moment";
import Image from "next/image";

type Props = {
  news: News;
};

export default function NewsCard({ news }: Props) {
  return (
    <div className="w-full h-full rounded-xl bg-ueventSecondary p-5 gap-10 flex flex-col items-center justify-center">
      <div className="flex flex-row w-full items-center justify-between py-4 border-b-2 border-ueventContrast">
        <div className="flex flex-row gap-5">
          <Image
            alt="orgImage"
            // @ts-ignore
            src={news.organization.image}
            width={50}
            height={50}
            className="rounded-full"
          />
          <span className="text-ueventText text-xs">
            {/* @ts-ignore */}
            {news.organization.name}
          </span>
        </div>
        <span className="text-gray-600 text-xs">
          {moment(news.createdAt).format("LL")}
        </span>
      </div>
      <div className="flex w-full justify-between">
        <span className="text-ueventText text-xl">{news.title}</span>
        <div></div>
      </div>
      <div className="flex items-center justify-center w-full">
        <Image
          alt="newsImage"
          className="rounded-xl"
          width={500}
          height={500}
          src={news.image}
        />
      </div>
      <p className="text-gray-300 whitespace-pre-wrap w-full">{news.plot}</p>
    </div>
  );
}
