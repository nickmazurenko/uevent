import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import Button from "../defaults/Buttons/Button";
import OrganizationForm from "./OrganizationForm";
import Organization from "./Organization";
import OrganizationFrontService from "@/lib/organizations/OrganizationFrontService";
import { Tabs } from "flowbite-react";
const organizationImageId = "organizationImage";
const imageMimeType = /image\/(png|jpg|jpeg)/i;

export default function CreateOrganization() {
  const [organizationData, setOrganizationData] = useState({
    name: "",
    description: "",
    [organizationImageId]: null,
  });
  const [fileDataURL, setFileDataURL] = useState(null);

  const [loading, setLoading] = useState(false);
  const [openPreview, setOpenPreview] = useState(false);

  const service = new OrganizationFrontService({
    organizationData,
    setLoading,
    setOrganizationData,
    fileDataURL,
  });

  const generatePreviewOrganization =
    service.createGeneratePreviewOrganization();

  const handleOrganizationDataChange =
    service.createHandleOrganizationDataChange();

  useEffect(() => {
    let fileReader: FileReader,
      isCancel = false;

    if (organizationData[organizationImageId]) {
      fileReader = new FileReader();
      fileReader.onload = (e) => {
        const { result } = e.target;
        if (result && !isCancel) {
          setFileDataURL(result);
        }
      };
      fileReader.readAsDataURL(organizationData[organizationImageId]);
    }

    return () => {
      isCancel = true;
      if (fileReader && fileReader.readyState === 1) {
        console.log("there");
        fileReader.abort();
      }
    };
  }, [organizationData[organizationImageId]]);

  const handleFormSubmit = service.createHandleFormSubmit("create");

  return (
    <div className="flex flex-col items-center min-w-[35%]">
      <Tabs.Group className="w-full self-center justify-center">
        <Tabs.Item title="Create">
          <h1 className="text-white mb-6">Create a New Organization</h1>
          <OrganizationForm
            onSubmit={handleFormSubmit}
            onDataChange={handleOrganizationDataChange}
            loading={loading}
            imageId={organizationImageId}
            organizationData={organizationData}
            formType="create"
          />
        </Tabs.Item>

        <Tabs.Item title="Preview">
          <Organization organization={generatePreviewOrganization()} />
        </Tabs.Item>
      </Tabs.Group>
    </div>
  );
}
