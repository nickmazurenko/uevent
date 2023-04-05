import { MouseEventHandler, ReactNode } from "react"

export type Props = {
    selected: boolean,
    text: string,
    handleSelect: MouseEventHandler<HTMLSpanElement>,
    
}

export default function Tab({ selected = false, text, handleSelect }: Props) {

    function selectSpan() {
        if (selected) {
            return (
                <span id={text} onClick={handleSelect} className="cursor-pointer inline-block p-4 text-blue-600 border-b-2 border-blue-600 rounded-t-lg dark:text-blue-500 dark:border-blue-500" >{text}</span>
            )
        } else {
            return (
                <span id={text} onClick={handleSelect} className="cursor-pointer inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 active">{text}</span>
            )
        }
    }

    return (
        <li className="mr-2">
            {selectSpan()}
        </li>
    )

}