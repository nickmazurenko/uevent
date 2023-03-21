import React, { useState } from "react";
import Dropzone from "react-dropzone";
import Image from "next/image";
import { AiOutlinePlus } from "react-icons/ai";
import { ChangeEventHandler } from "react";

export type Props = {
  id: string;
  className?: string;
  onChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
};

function ImageInput(props: Props) {
  const [images, setImages] = useState([]);

  const handleDrop = (acceptedFiles: File[]) => {
    setImages(images.concat(acceptedFiles));
    props.onChange({
      target: { id: props.id, value: images.concat(acceptedFiles) },
    });
  };

  const renderImages = () => {
    return images.map((image) => (
      <Image
        width={100}
        height={100}
        key={image.name}
        src={URL.createObjectURL(image)}
        alt={image.name}
      />
    ));
  };

  return (
    <div
      {...props}
      className={`cursor-pointer flex flex-wrap items-center justify-center gap-2 w-full ${props.className}`}
    >
      {renderImages()}
      <Dropzone onDrop={handleDrop}>
        {({ getRootProps, getInputProps }) => (
          <div
            className="flex flex-col gap-2 text-gray-400 text-sm items-center justify-center w-28 h-28 bg-gray-700 rounded-md"
            {...getRootProps()}
          >
            <input {...getInputProps()} />
            <p className="text-center p-2 z-10">Drop files here or click</p>
            <AiOutlinePlus className="z-0 absolute text-gray-600" size={50} />
          </div>
        )}
      </Dropzone>
    </div>
  );
}

export default ImageInput;
