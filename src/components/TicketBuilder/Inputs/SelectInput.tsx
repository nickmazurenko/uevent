import { ChangeEventHandler } from "react"

export type Props = {
    inputId: string
    label: string
    values: string[]
    onChange: ChangeEventHandler<HTMLSelectElement>
}

export default function SelectInput( { inputId, label, values, onChange }: Props ) {

    return (
        <div className="flex flex-row justify-between items-center">
            <label htmlFor={inputId}>{label}</label>
            <select className="bg-ueventSecondary m-2 p-1 rounded-[8px] text-center" id={inputId} onChange={onChange}>
                {
                    values.map((value, index) => {
                        return (
                            <option className="p-1" key={index} value={value}>{value}</option>
                        )
                    })
                }
            </select>
        </div>
    )

}