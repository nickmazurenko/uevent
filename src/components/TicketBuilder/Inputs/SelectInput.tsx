import { ChangeEventHandler } from "react"

export type Props = {
    inputId: string
    label: string
    values: string[]
    onChange: ChangeEventHandler<HTMLSelectElement>
}

export default function SelectInput( { inputId, label, values, onChange }: Props ) {

    return (
        <div>
            <label htmlFor={inputId}>{label}</label>
            <select id={inputId} onChange={onChange}>
                {
                    values.map((value, index) => {
                        return (
                            <option key={index} value={value}>{value}</option>
                        )
                    })
                }
            </select>
        </div>
    )

}