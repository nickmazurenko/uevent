import Button, { Props } from "./Button";

export default function RedButton(props: Props) {

    const defaultAdditionalClasses = "bg-red-700 hover:bg-red-900 focus:ring-red-300 dark:bg-red-800 dark:hover:bg-red-700";

    const calculatedProps = {
        ...props,
        additionalClasses: defaultAdditionalClasses + " " + props.additionalClasses
    };

    return (
        <Button
            { ...calculatedProps }
        ></Button>
    )

}