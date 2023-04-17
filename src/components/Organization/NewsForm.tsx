import { Spinner } from "flowbite-react";
import FileInput from "../defaults/Inputs/FileInput";
import { ChangeEvent } from "react";
import { useState } from "react";
import { TiTick } from "react-icons/ti";

const newsImageId = "newsImage";
const newsImageMimeType = /image\/(png|jpg|jpeg)/i;

type NewsFormData = {
  title: string;
  plot: string;
  [newsImageId]: string | Blob;
};

const defaultNewsFormData = {
  title: "",
  plot: "",
  [newsImageId]: "",
};

export default function NewsForm({ closeModal }: { closeModal: () => void }) {
  const [formData, setFormData] = useState<NewsFormData>({
    ...defaultNewsFormData,
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (e.target.id === newsImageId) {
      // @ts-ignore
      const image = e.target.files[0];

      if (!image.type.match(newsImageMimeType)) {
        alert("Image mime type is not valid");
        return;
      }

      setFormData({
        ...formData,
        [newsImageId]: image,
      });
    } else {
      setFormData({
        ...formData,
        [e.target.id]: e.target.value,
      });
    }
  };

  const onSubmit = async () => {
    try {
      setLoading(true);
      const body = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        body.append(key, value);
      });

      const response = await fetch(`/api/organizations/news/create`, {
        method: "POST",
        body,
      });

      if (response.ok) {
        const news = await response.json();
        setSuccess(true);
        console.log(`Published news:`, news);
      } else {
        setSuccess(false);
        console.error(
          "Failed to publish news:",
          response.status,
          response.statusText
        );
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
      setTimeout(() => {
        closeModal();
        setSuccess(false);
      }, 2000);
    }
  };
  return (
    <div className="py-20 w-full flex flex-col gap-5 text-ueventText">
      {loading ? (
        <div className="flex w-full p-10 items-center justify-center">
          <Spinner className="self-center" size={"xl"} />
        </div>
      ) : (
        <>
          {!loading && success ? (
            <div className="w-full h-full flex items-center justify-center">
              <TiTick className="self-center" size={60} />
            </div>
          ) : (
            <>
              <div className="flex flex-col gap-5 w-full items-center justify-start">
                <span className="w-full text-xl">Title</span>
                <input
                  id="title"
                  value={formData.title}
                  onChange={onChange}
                  placeholder="e.g Meet overview"
                  className="bg-transparent w-full border-b-2 border-ueventContrast"
                />
              </div>
              <div className="flex flex-col gap-5 w-full items-center justify-start">
                <span className="w-full text-xl">Plot</span>
                <textarea
                  id="plot"
                  value={formData.plot}
                  onChange={onChange}
                  placeholder="News plot here..."
                  rows={5}
                  className="bg-transparent rounded-xl w-full border-b-2 border-ueventContrast"
                />
                <FileInput
                  handleChange={onChange}
                  id="newsImage"
                  description="Put a photo that would highlight some moment"
                />
              </div>
              <button
                onClick={() => onSubmit()}
                className="w-full md:w-1/2 p-2 text-ueventContrast border-b-2 border-ueventContrast bg-transparent self-center pt-5 hover:text-ueventText hover:bg-ueventContrast hover:rounded-xl"
              >
                Publish
              </button>
            </>
          )}
        </>
      )}
    </div>
  );
}
