import { ChangeEvent, Dispatch, FormEvent, SetStateAction } from "react";


export type OrganizationData = {
    name: string;
    description: string;
    organizationImage: string | Blob | null;
}

export type OrganizationFrontServiceParams = {
    organizationData: OrganizationData,
    setLoading: Dispatch<SetStateAction<boolean>>
    setOrganizationData: Dispatch<SetStateAction<OrganizationData>>
    fileDataURL: string | null
}

export default class OrganizationFrontService {

    static organizationImageId = "organizationImage";
    static imageMimeType = /image\/(png|jpg|jpeg)/i;

    organizationData: OrganizationData
    setLoading: Dispatch<SetStateAction<boolean>>
    setOrganizationData: Dispatch<SetStateAction<OrganizationData>>
    fileDataURL: string | null

    constructor({
        organizationData,
        setLoading,
        setOrganizationData,
        fileDataURL
    }: OrganizationFrontServiceParams) {
        this.organizationData = organizationData;
        this.setLoading = setLoading;
        this.setOrganizationData = setOrganizationData;
        this.fileDataURL = fileDataURL;
    }

    createHandleFormSubmit(type: "create" | "update") {

        const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
            event.preventDefault();

            const organizationForm = new FormData();

            organizationForm.append("name", this.organizationData.name);
            organizationForm.append("description", this.organizationData.description);
            organizationForm.append(OrganizationFrontService.organizationImageId, this.organizationData[OrganizationFrontService.organizationImageId] as Blob);

            this.setLoading(true);

            const response = await fetch(`/api/organizations/${type}`, {
                method: 'POST',
                body: organizationForm,
            });

            this.setLoading(false);

            if (response.ok) {
                const organization = await response.json();
                console.log(`${type}d organization:`, organization);
            } else {
                console.error('Failed to create organization:', response.status, response.statusText);
            }

            // location.reload();

        };

        return handleFormSubmit;

    }

    createHandleOrganizationDataChange() {
        const organizationData = this.organizationData;
        const handleOrganizationDataChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            if (event.target.id === OrganizationFrontService.organizationImageId) {
                const image = event.target.files[0];

                if (!image.type.match(OrganizationFrontService.imageMimeType)) {
                    alert("Image mime type is not valid");
                    return;
                }

                this.setOrganizationData({ ...organizationData, [OrganizationFrontService.organizationImageId]: image });

            } else {
                this.setOrganizationData({ ...organizationData, [event.target.id]: event.target.value })
            }
        }
        return handleOrganizationDataChange;
    }


    createGeneratePreviewOrganization() {

        const organizationData = this.organizationData;
        const fileDataURL = this.fileDataURL;

        const generatePreviewOrganization = () => {
            return {
                name: organizationData.name,
                description: organizationData.description,
                image: fileDataURL || "",
                id: "",
                ownerId: "",
                image_id: "",
                image_signature: "",
            }
        }
        return generatePreviewOrganization;
    }

}