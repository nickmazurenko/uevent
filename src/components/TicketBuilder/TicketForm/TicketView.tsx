import { useContext, useEffect, useRef, useState } from "react"
import { TicketBuilderContext } from "../TicketBuilderContext";
import { Text, Image as ImageRender } from "../CanvasRenderer";
import Vector2 from "../CanvasRenderer/Vector2";

export default function TicketView() {

    const { ticketSize, renderComponentsArray, rcService } = useContext(TicketBuilderContext);

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
            // console.log('there');
            if (rc instanceof Text) {
                context.fillStyle = rc.color;
                context.font = rc.font;
                context?.fillText(rc.text, rc.position.x, rc.position.y);
            }
            if (rc instanceof ImageRender) {
                const image = new Image();
                image.src = rc.src;

                image.onload = (e) => {
                    if (!rc.size) {
                        rc.size = new Vector2();
                        rc.size.x = image.width;
                        rc.size.y = image.height;
                        rcService?.updateRC(rc);
                    }
                }

                if (rc.size) 
                {                    
                    context.drawImage(
                        image,
                        rc.position.x,
                        rc.position.y,
                        rc.size.x,
                        rc.size.y);
                }


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