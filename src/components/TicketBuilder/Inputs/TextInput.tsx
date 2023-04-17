import { ChangeEventHandler } from "react"

export type Props = {
    inputId: string
    label: string
    value: string
    onChange: ChangeEventHandler<HTMLInputElement>
}

export default function TextInput( { inputId, label, value, onChange }: Props ) {

    return (
        <div className="flex flex-row justify-between items-center">
            <label htmlFor={inputId}>{label}</label>
            <input className="bg-ueventSecondary w-[15em] m-2 p-1 rounded-[8px] text-center" type="text" id={inputId} value={value} onChange={onChange}></input>
        </div>
    )

}