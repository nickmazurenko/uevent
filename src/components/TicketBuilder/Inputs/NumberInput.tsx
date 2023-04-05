import { ChangeEventHandler } from "react"

export type Props = {
    inputId: string
    label: string
    value: number
    onChange: ChangeEventHandler<HTMLInputElement>
}

export default function NumberInput( { inputId, label, value, onChange }: Props ) {

    return (
        <div>
            <label htmlFor={inputId}>{label}</label>
            <input type="number" id={inputId} value={value} onChange={onChange}></input>
        </div>
    )

}