import { useContext, useEffect, useRef, useState } from "react"
import { TicketBuilderContext } from "../TicketBuilderContext";
import { Text, Image as ImageRender } from "../CanvasRenderer";

export default function TicketView() {

    const { ticketSize, renderComponentsArray } = useContext(TicketBuilderContext);

    const canvasRef = useRef(null);

    const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);


    const fillRect = () => {
        context?.clearRect(0, 0, context.canvas.width, context.canvas.width);
        context.fillStyle = "grey";
        context?.fillRect(0, 0, context.canvas.width, context.canvas.height);
    }

    const drawRCs = () => {
        fillRect();
        renderComponentsArray.forEach(rc => {
            console.log('there');
            if (rc instanceof Text) {
                context.fillStyle = "black";
                context.font = "48px serif";
                context?.fillText(rc.text, 10, 50);
            }
            if (rc instanceof ImageRender) {
                const image = new Image();
                image.src = rc.src;
                context.drawImage(image, 0, 0);
            }
        })
    }

    const draw = () => {
        if (context) {
            // fillRect();
            drawRCs();
        }
    }

    useEffect(() => {
        const canvas: HTMLCanvasElement = canvasRef.current;
        setContext(canvas.getContext("2d"));
    }, []);

    useEffect(() => {

        if (context) {
            draw();
        }

    }, [context, ticketSize]);

    useEffect(() => {

        draw();

    }, [renderComponentsArray]);


    return (
        <div className="w-[50%]" id="ticketView">
            Ticket View
            <canvas width={ticketSize.x} height={ticketSize.y} ref={canvasRef}></canvas>
        </div>
    )
}