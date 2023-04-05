import Vector2 from "./Vector2"

export class RenderComponent {
    position: Vector2
    size: Vector2
    scale: Vector2
    type: string

    constructor(position: Vector2 = new Vector2(), size: Vector2, scale: Vector2 = new Vector2(1.0, 1.0), type = "RenderComponent") {
        this.position = position;
        this.size = size;
        this.scale = scale;
        this.type = type;
    }

}
