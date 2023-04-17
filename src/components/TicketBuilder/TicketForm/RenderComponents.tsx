import { ChangeEvent, Dispatch, MouseEventHandler, SetStateAction, useContext, useEffect, useState } from "react";
import { TicketBuilderContext } from "../TicketBuilderContext";
import { RenderComponent, Text, Image } from "../CanvasRenderer";
import TicketData from "../TicketData";
import RenderComponentController from "../Controllers/RenderComponentController";
import FileInput from "@/components/defaults/Inputs/FileInput";
import { Modal } from "flowbite-react";
import { AiOutlineClose } from "react-icons/ai";

type ImageStatus = "none" | "browse" | "load";

function SelectRC({ toggleModal }: { toggleModal: () => void }) {

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
                    // {/* <!-- Modal body --> */}
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
        //         </div>
        //     </div>
        // </div>
    )
}

export default function RenderComponents({ ticketData, setTicketData }: { ticketData: TicketData, setTicketData: Dispatch<SetStateAction<TicketData>> }) {
    const { ticketItems, renderComponentsArray, rcService } = useContext(TicketBuilderContext);

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

    const createMoveFunction = (moveTo: "up" | "down", index: number) => {
        return (() => {

            let newIndex = -1;
            if (moveTo === 'up') {
                newIndex = index - 1;
            } else if (moveTo === 'down') {
                newIndex = index + 1;
            }

            if (newIndex < 0 || newIndex >= renderComponentsArray.length) {
                return;
            }

            const newRenderComponentsArray = [...renderComponentsArray];

            [newRenderComponentsArray[index], newRenderComponentsArray[newIndex]] =
                [newRenderComponentsArray[newIndex], newRenderComponentsArray[index]];

            rcService?.swapElements(newRenderComponentsArray);

        })
    }

    return (
        <div className="w-[20%] min-w-min" id="renderComponents">
            <span className="m-2">Render Components</span>
            {
                renderComponentsArray.map((rc, index) => {
                    return <RenderComponentController
                        key={index}
                        rc={rc}
                        controllerData={{ name: getInstanceOf(rc) }}
                        moveUp={createMoveFunction("up", index)}
                        moveDown={createMoveFunction("down", index)}
                    ></RenderComponentController>
                })
            }
            <button
                className="p-2 hover:bg-cyan-400 w-[100%] text-[#11B7CE]"
                onClick={onAddComponentClick}>
                Add component</button>
            {
                isAddComponent &&
                <Modal
                    onClose={() => toggleModal()}
                    show={isAddComponent}
                    size="md"
                    className="bg-ueventSecondary backdrop-blur-sm"
                    dismissible={true}
                >
                    <Modal.Body className="drop-shadow-2xl w-full flex flex-col justify-center items-center bg-ueventSecondary rounded-lg">
                        <SelectRC {...{ toggleModal }} />
                    </Modal.Body>
                </Modal>

            }
        </div>
    )
}