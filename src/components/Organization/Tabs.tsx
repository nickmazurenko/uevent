import { MouseEventHandler } from "react"
import Tab from "./Tab"

export type TabData = {
    text: string,
    selected: boolean,
}

export type Props = {
    tabs: TabData[]
    handleSelect: MouseEventHandler<HTMLSpanElement>
}

export default function Tabs({ tabs, handleSelect }: Props) {

    return (
        <div className="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700 w-full">
            <ul className="flex flex-wrap -mb-px justify-center items-center">
                {tabs.map((tab, index) => <Tab key={index} selected={tab.selected} text={tab.text} handleSelect={handleSelect} />)}
            </ul>
        </div>
    )

}