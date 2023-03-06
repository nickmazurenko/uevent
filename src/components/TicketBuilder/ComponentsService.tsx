import { RenderComponent, Text, Image } from "./CanvasRenderer";
import { RenderComponents } from "./TicketBuilderContext";

export default class ComponentsService {

    renderComponents: RenderComponents
    eventRC: Text | null

    constructor(renderComponents: RenderComponents) {
        this.renderComponents = renderComponents;
        this.eventRC = null;
    }

    deleteRC(rc: RenderComponent) {
        this.renderComponents.deleteComponent(rc);
    }

    addTextRC(text: string) {

        const rc = new Text({ text });
        this.renderComponents.addComponent(rc);
        return rc;

    }

    updateRC(rc: RenderComponent) {
        this.renderComponents.updateComponent(rc);
    }

    updateTextRC(rc: RenderComponent) {

        this.renderComponents.updateComponent(rc);

    }

    addImageRC(src: string) {
        console.log(src);
        const rc = new Image({ src });
        this.renderComponents.addComponent(rc);
        return rc;
    }

    eventSelected(eventName: string) {
        if (this.eventRC) {

            this.eventRC.text = eventName;
            this.updateTextRC(this.eventRC);

        } else {

            this.eventRC = this.addTextRC(eventName);

        }
    }

}