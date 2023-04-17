import React, { useState } from "react";
import { Modal } from "flowbite-react";
import { AiOutlineClose } from "react-icons/ai";
import NewsForm from "./NewsForm";
import { News } from "@prisma/client";
import moment from "moment";
import Image from "next/image";

type Props = {
  news: News;
  isOwner?: boolean;
};

function NewsFormModal({
  show,
  onClose,
}: {
  show: boolean;
  onClose: () => void;
}) {
  return (
    <React.Fragment>
      <Modal
        className="bg-ueventSecondary backdrop-blur-sm"
        show={show}
        size="xl"
        onClose={onClose}
      >
        <Modal.Body className="drop-shadow-2xl flex flex-col justify-center items-center bg-ueventSecondary rounded-lg">
          <AiOutlineClose
            size={20}
            className="text-ueventText hover:text-ueventContrast cursor-pointer absolute top-5 right-5"
            onClick={onClose}
          />
          <h1 className="text-4xl top-5 left-5 absolute text-ueventText">
            Add news
          </h1>
          <NewsForm closeModal={onClose} />
        </Modal.Body>
      </Modal>
    </React.Fragment>
  );
}

export default function NewsList(props: Props) {
  const [show, setShow] = useState<boolean>(false);

  const onClose = () => {
    setShow(false);
  };

  return (
    <div className="flex flex-col w-full h-full gap-5 items-center justify-center">
      {props.isOwner && (
        <button
          onClick={() => {
            setShow(!show);
          }}
          className="p-2 w-full hover:bg-ueventContrast bg-transparent border-2 border-ueventContrast hover:text-ueventText text-ueventContrast rounded-xl"
        >
          Add News
        </button>
      )}

      <NewsFormModal show={show} onClose={onClose} />
      <div className="w-full h-full flex flex-col gap-5 justify-center items-center text-ueventText">
        {props.news ? (
          <>
            {props.news.map((item, key) => (
              <NewsCard key={key} news={item} />
            ))}
          </>
        ) : (
          <span className="text-ueventText text-center text-xl">
            No news here yet...
          </span>
        )}
      </div>
    </div>
  );
}

function NewsCard({ news }: { news: News }) {
  return (
    <div className="relative w-full gap-5 h-full min-h-[10vh] bg-ueventBg rounded-2xl p-8 flex flex-col items-center justify-center text-ueventText">
      <div className="w-full flex flex-row justify-between">
        <div></div>
        <span className="text-sm text-gray-600">
          {moment(news.createdAt).format("LL")}
        </span>
      </div>
      <div className="flex flex-row justify-between w-full">
        <span className="text-xl  capitalize">{news.title}</span>
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
      <span className="whitespace-pre-wrap self-start text-gray-500">
        {news.plot}
      </span>
    </div>
  );
}
