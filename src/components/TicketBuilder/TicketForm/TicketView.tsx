import { CanvasHTMLAttributes, useContext, useEffect, useRef, useState } from "react"
import { TicketBuilderContext } from "../TicketBuilderContext";
import { Text, Image as ImageRender } from "../CanvasRenderer";
import Vector2 from "../CanvasRenderer/Vector2";

export default function TicketView({ ticketViewId }: { ticketViewId: string }) {

    const { ticketSize, renderComponentsArray, rcService } = useContext(TicketBuilderContext);

    const canvasRef = useRef<HTMLCanvasElement>(null);

    const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);

    const saveTicket = async () => {
        if (canvasRef && canvasRef.current) {
            // const str = canvasRef.current.toDataURL("image/png", 1.0).split(", ")[1];

            const binStr = atob(canvasRef.current.toDataURL("image/png", 1.0).split(",")[1]),
                len = binStr.length,
                arr = new Uint8Array(len);

            for (let i = 0; i < len; i++) arr[i] = binStr.charCodeAt(i);
            const blob = new Blob([arr], { type: "image/png" });

            console.log(blob);

            let imageBlob = await new Promise(resolve => canvasRef?.current?.toBlob(resolve, 'image/png'));

            const ticketViewUpdateForm = new FormData();
            console.log("Ticket view id in ticket view: " + ticketViewId);
            ticketViewUpdateForm.append("ticketViewId", ticketViewId);
            ticketViewUpdateForm.append("image", imageBlob, "image.png");

            const res = await fetch("/api/events/load-ticket-view",
                {
                    method: "POST",
                    body: ticketViewUpdateForm
                });

            console.log(res);

        }
    }

    const fillRect = () => {
        context?.clearRect(0, 0, context.canvas.width, context.canvas.width);
        context.fillStyle = "#1A1A1A";
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

                if (rc.size) {
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

    const minWidth = ` min-w-fit `;

    return (

        <div className={"w-[60%] text-center"} id="ticketView">
            <span>Ticket View</span>
            <br></br>
            <span className="w-fit ">
                <canvas className="inline rounded-[32px]" width={ticketSize.x} height={ticketSize.y} ref={canvasRef}></canvas>
            </span>
            <div>
                {ticketViewId && ticketViewId.length && <button onClick={() => saveTicket()}>save</button>}
            </div>
        </div>
    )
}