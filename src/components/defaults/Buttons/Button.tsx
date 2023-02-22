import { MouseEventHandler, ReactNode } from "react"

export type Props = {

    text: string,

    loadingComponent?: ReactNode | undefined,
    isLoading?: boolean | undefined,

    additionalClasses?: string | undefined

    type?: "button" | "submit" | "reset" | undefined

    onClick?: MouseEventHandler<HTMLButtonElement> | undefined

}

export const defaultButtonClasses =
    "text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"

export default function Button(props: Props) {

    const buttonInner = () => {
        if (props.loadingComponent) {
            return props.isLoading ? props.loadingComponent : props.text
        }
        return props.text;
    }

    const classes = () => {
        if (props.additionalClasses) {
            return props.additionalClasses + " " + defaultButtonClasses;
        } 
        return defaultButtonClasses;
    }

    return (
        <button
            type={props.type}
            className={
                classes()
            }
            onClick={props.onClick}
        >
            {buttonInner()}
        </button>
    )

}