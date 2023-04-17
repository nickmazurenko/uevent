import {RenderComponent} from "./CanvasRenderer/RenderComponent"

export type Props = {
    renderComponent: RenderComponent
}

export default function ComponentItem( { renderComponent }: Props ) {

    if (renderComponent instanceof Image)
return (<></>);
}