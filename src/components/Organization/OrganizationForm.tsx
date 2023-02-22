import { ChangeEventHandler, FormEventHandler } from "react"
import FileInput from "../defaults/Inputs/FileInput"
import Button from "../defaults/Buttons/Button"
import Spinner from "../defaults/Spinner"

export type Props = {
    onSubmit: FormEventHandler<HTMLFormElement>,
    organizationData: { name: string, description: string }
    onDataChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>,
    imageId: string,
    loading: boolean
}

export default function OrganizationForm(props: Props) {

    return (
        <form onSubmit={props.onSubmit} className="mb-6 flex flex-col items-center w-[100%]">
            <div className="flex flex-col items-center w-full mb-6">

                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                <input type="text" id="name" value={props.organizationData.name} onChange={props.onDataChange} className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />

            </div>

            <div className="flex flex-col items-center w-full mb-6">

                <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                <textarea id="description" 
                    value={props.organizationData.description} 
                    onChange={props.onDataChange} rows={4} 
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"></textarea>

            </div>

            <FileInput handleChange={props.onDataChange} id={props.imageId} description={"Organization image"} />

            <Button
                text="Register new organization"
                type="submit"
                isLoading={props.loading}
                loadingComponent={<Spinner></Spinner>}
                additionalClasses="w-[50%] "
            />

        </form >
    )

}