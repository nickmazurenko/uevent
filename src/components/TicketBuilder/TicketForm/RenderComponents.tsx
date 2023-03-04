import { ChangeEvent, Dispatch, MouseEventHandler, SetStateAction, useContext, useEffect, useState } from "react";
import { TicketBuilderContext } from "../TicketBuilderContext";
import { RenderComponent, Text, Image } from "../CanvasRenderer";
import TicketData from "../TicketData";
import RenderComponentController from "../Controllers/RenderComponentController";
import FileInput from "@/components/defaults/Inputs/FileInput";

type ImageStatus = "none" | "browse" | "load";

function ModalSelectRC({ toggleModal }: { toggleModal: () => void }) {

    const { rcService } = useContext(TicketBuilderContext);

    const [image, setImage] = useState<File | null>(null);
    const [imageDataURL, setImageDataURL] = useState(null);
    const [addImageStatus, setAddImageStatus] = useState<ImageStatus>("none");

    const nextImageStatus = () => {
        if (addImageStatus === "none") setAddImageStatus("browse");
        if (addImageStatus === "browse") setAddImageStatus("load");
        if (addImageStatus === "load") setAddImageStatus("none");
    }

    const onTextClick = () => {
        rcService?.addTextRC("");
        toggleModal();
    }

    const onImageClick = () => {
        nextImageStatus();
    }

    useEffect(() => {

        let fileReader: FileReader, isCancel = false;

        if (image) {
            fileReader = new FileReader();
            fileReader.onload = (e) => {
                const { result } = e.target;
                if (result && !isCancel) {
                    // setImageDataURL(result);
                    rcService?.addImageRC(result);
                    nextImageStatus();
                    toggleModal();
                }
            }
            nextImageStatus();
            fileReader.readAsDataURL(image);
        }

        return () => {
            isCancel = true;
            if (fileReader && fileReader.readyState === 1) {
                fileReader.abort();
            }
        }

    }, [image]);


    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {

        let image: File | null = null;
        if (e.target.files)
            image = e.target.files[0];

        image && setImage(image);

    }

    return (
        <div id="defaultModal" aria-hidden="true" className="fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full">
            <div className="relative w-[30%] h-full max-w-2xl md:h-auto">
                {/* <!-- Modal content --> */}
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    {/* <!-- Modal header --> */}
                    <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                            Select component
                        </h3>
                        <button onClick={toggleModal} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="defaultModal">
                            <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                    </div>
                    {/* <!-- Modal body --> */}
                    <div className="p-6 space-y-6">
                        {
                            addImageStatus === "none" &&
                            <>
                                <div>
                                    <button
                                        onClick={onTextClick}
                                        className="w-[100%] text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                        Text
                                    </button>
                                </div>
                                <div>
                                    <button
                                        onClick={onImageClick}
                                        className="w-[100%] text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                        Image
                                    </button>
                                </div>
                            </>
                        }
                        {
                            addImageStatus === "browse" &&
                            <>
                                <FileInput description="Select image" handleChange={handleImageChange}></FileInput>
                            </>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default function RenderComponents({ ticketData, setTicketData }: { ticketData: TicketData, setTicketData: Dispatch<SetStateAction<TicketData>> }) {
    const { ticketItems, renderComponentsArray, } = useContext(TicketBuilderContext);

    const [isAddComponent, setIsAddComponent] = useState(false);


    const getInstanceOf = (rc: RenderComponent) => {
        if (rc instanceof Text) return "Text";
        if (rc instanceof Image) return "Image";
        return "Component not found";
    }

    const toggleModal = () => setIsAddComponent(!isAddComponent);

    const onAddComponentClick: MouseEventHandler<HTMLButtonElement> = (e) => {

        toggleModal();

    }

    return (
        <div className="w-[25%]" id="renderComponents">
            Render Components
            {
                renderComponentsArray.map((rc, index) => {
                    return <RenderComponentController key={index} rc={rc} controllerData={{ name: getInstanceOf(rc) }} ></RenderComponentController>
                })
            }
            <button
                className="p-2 hover:bg-cyan-400 w-[100%]"
                onClick={onAddComponentClick}>
                Add component</button>
            {
                isAddComponent && <ModalSelectRC toggleModal={toggleModal} />
            }
        </div>
    )
}