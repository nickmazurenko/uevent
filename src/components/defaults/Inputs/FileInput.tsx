import { ChangeEvent } from "react";

type Props = {
    handleChange: (e: ChangeEvent<HTMLInputElement>) => void
    id: string,
    description: string
}

export default function FileInput({ handleChange, id, description }: Props) {

    return (
        <div className="flex flex-col items-center w-full mb-6">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="user_avatar">Upload file</label>
            <input className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-transparent dark:border-ueventContrast dark:placeholder-gray-400"
                aria-describedby="user_avatar_help"
                id={id}
                type="file"
                accept=".png, .jpg, .jpeg"
                onChange={handleChange} />
            <div className="mt-1 text-sm text-gray-500 dark:text-gray-300" id="user_avatar_help">{description}</div>
        </div>
    )

}