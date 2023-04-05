import {RenderComponent} from "./RenderComponent"
import Vector2 from "./Vector2"

export type ImageConstructorParams = {
    position?: Vector2
    size: Vector2
    scale?: Vector2
    src: string
}


export class Image extends RenderComponent {

    src: string

    constructor({
        position,
        size,
        scale,
        src
    }: ImageConstructorParams) {
        super(position, size, scale, "Image");
        this.src = src;
    }

}