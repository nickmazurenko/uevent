import { ChangeEventHandler } from "react"

export type Props = {
    inputId: string
    label: string
    value: boolean
    onChange: ChangeEventHandler<HTMLInputElement>
}

export default function CheckboxInput( { inputId, label, value, onChange }: Props ) {

    return (
        <div className="flex flex-row justify-between items-center">
            <label htmlFor={inputId}>{label}</label>
            <input className="bg-ueventSecondary m-2 p-1 rounded-[8px] text-center" type="checkbox" id={inputId} defaultChecked={value} onChange={onChange}></input>
        </div>
    )

}