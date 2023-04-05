import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import Button from '../defaults/Buttons/Button';
import OrganizationForm from './OrganizationForm';
import Organization from './Organization';
import { Organization as Org } from '@prisma/client';
import OrganizationFrontService from '@/lib/organizations/OrganizationFrontService';
const organizationImageId = "organizationImage";
const imageMimeType = /image\/(png|jpg|jpeg)/i;


export default function UpdateOrganization({ organization }: { organization: Org }) {

  const [organizationData, setOrganizationData] = useState({ name: organization.name, description: organization.description, [organizationImageId]: null });
  const [fileDataURL, setFileDataURL] = useState(organization.image);

  const [loading, setLoading] = useState(false);
  const [openPreview, setOpenPreview] = useState(false);

  const service = new OrganizationFrontService({
    organizationData,
    setOrganizationData,
    fileDataURL,
    setLoading
  })

  const generatePreviewOrganization = service.createGeneratePreviewOrganization();

  const handleOrganizationDataChange = service.createHandleOrganizationDataChange();

  useEffect(() => {

    let fileReader: FileReader, isCancel = false;

    if (organizationData[organizationImageId]) {
      fileReader = new FileReader();
      fileReader.onload = (e) => {
        const { result } = e.target;
        if (result && !isCancel) {
          setFileDataURL(result);
        }
      }
      fileReader.readAsDataURL(organizationData[organizationImageId]);

    }

    return () => {
      isCancel = true;
      if (fileReader && fileReader.readyState === 1) {
        console.log("there");
        fileReader.abort();
      }
    }

  }, [organizationData[organizationImageId]]);

  const handleFormSubmit = service.createHandleFormSubmit("update");

  return (
    <div className="flex flex-col items-center min-w-[35%]">
      <h1 className="text-white mb-6">Create a New Organization</h1>
      <OrganizationForm
        onSubmit={handleFormSubmit}
        onDataChange={handleOrganizationDataChange}
        loading={loading}
        imageId={organizationImageId}
        organizationData={organizationData}
        formType="update"
      ></OrganizationForm>

      <Button text="Open preview" onClick={() => setOpenPreview(!openPreview)} />

      {
        openPreview ?
        <Organization
          organization={generatePreviewOrganization()}
        ></Organization>
        : null
      }

    </div >
  );
}