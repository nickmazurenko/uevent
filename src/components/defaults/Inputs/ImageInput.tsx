import React from "react";
import Dropzone from "react-dropzone";
import Image from "next/image";
import { AiOutlinePlus, AiOutlineCamera, AiOutlineClose } from "react-icons/ai";
import { ChangeEventHandler } from "react";

type InputProps = {
  id: string;
  number?: number;
  key?: number;
  index?: number;
  value: string[];
  className?: string;
  onChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
};

type DropZoneProps = {
  id: string;
  number: number;
  index: number;
  value: string[];
  onChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
};

function ImageDropZone({ onChange, id, value, index, number }: DropZoneProps) {
  const handleDrop = (acceptedFiles: File[]) => {
    onChange({
      target: { id: id, value: value.concat(acceptedFiles) },
    });
  };
  return (
    <Dropzone maxFiles={number} onDrop={handleDrop}>
      {({ getRootProps, getInputProps }) => (
        <div
          className="flex flex-col gap-2 text-gray-400 text-sm items-center justify-center w-28 h-28 bg-gray-700 rounded-md"
          {...getRootProps()}
        >
          <input {...getInputProps()} />
          {index === 0 ? (
            <>
              <p className="text-center p-2 z-10">Drop files here or click</p>
              <AiOutlinePlus className="z-0 absolute text-gray-600" size={50} />
            </>
          ) : (
            <AiOutlineCamera className="z-0 absolute text-gray-600" size={50} />
          )}
        </div>
      )}
    </Dropzone>
  );
}

function ImageInput({
  id,
  value,
  className,
  onChange,
  number = 3,
}: InputProps) {
  const renderImages = () => {
    return value.map((image, idx) => (
      <div className="relative text-transparent hover:text-red-700 " key={idx}>
        <AiOutlineClose
          onClick={() => {
            console.log(idx);
            onChange({
              target: {
                id: id,
                value: [...value.slice(0, idx), ...value.slice(idx + 1)],
              },
            });
          }}
          size={30}
          className="absolute right-0 top-0"
        />
        <Image
          width={100}
          className={idx === 0 ? "border-4 border-blue-700" : ""}
          height={100}
          src={URL.createObjectURL(image)}
          alt={image.name}
        />
      </div>
    ));
  };

  return (
    <div
      className={`cursor-pointer flex flex-wrap items-center justify-center gap-2 w-full ${className}`}
    >
      {renderImages()}
      {Array(number - value.length)
        .fill()
        .map((_, index) => (
          <ImageDropZone
            key={index}
            index={index}
            value={value}
            id={id}
            number={number}
            onChange={onChange}
          />
        ))}
    </div>
  );
}

export default ImageInput;
