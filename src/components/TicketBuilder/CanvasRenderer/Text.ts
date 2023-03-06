import {RenderComponent} from "./RenderComponent";
import Vector2 from "./Vector2";

export type TextConstructorParams = {
    position?: Vector2
    size: Vector2
    scale?: Vector2
    text: string
    color: string,
    font: any
    fontSize: number
}

export class Text extends RenderComponent {
    text: string
    color: string
    font: any
    fontSize: number
    
    constructor({
        position,
        size,
        scale,
        text,
        color = "black",
        font = "48px serif",
        fontSize
    }: TextConstructorParams
    ) {
        super(position, size, scale, "Text");
        this.text = text;
        this.color = color;
        this.font = font;
        this.fontSize = fontSize;
    }

    
}