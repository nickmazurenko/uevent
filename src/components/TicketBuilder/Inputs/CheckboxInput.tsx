import { ChangeEventHandler } from "react"

export type Props = {
    inputId: string
    label: string
    value: boolean
    onChange: ChangeEventHandler<HTMLInputElement>
}

export default function CheckboxInput( { inputId, label, value, onChange }: Props ) {

    return (
        <div>
            <label htmlFor={inputId}>{label}</label>
            <input type="checkbox" id={inputId} defaultChecked={value} onChange={onChange}></input>
        </div>
    )

}