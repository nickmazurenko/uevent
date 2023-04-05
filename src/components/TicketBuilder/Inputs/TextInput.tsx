import { ChangeEventHandler } from "react"

export type Props = {
    inputId: string
    label: string
    value: string
    onChange: ChangeEventHandler<HTMLInputElement>
}

export default function TextInput( { inputId, label, value, onChange }: Props ) {

    return (
        <div>
            <label htmlFor={inputId}>{label}</label>
            <input type="text" id={inputId} value={value} onChange={onChange}></input>
        </div>
    )

}