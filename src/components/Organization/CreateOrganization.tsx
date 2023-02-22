import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import Button from '../defaults/Buttons/Button';
import OrganizationForm from './OrganizationForm';
import Organization from './Organization';
const organizationImageId = "organizationImage";
const imageMimeType = /image\/(png|jpg|jpeg)/i;


export default function CreateOrganization() {

  const [organizationData, setOrganizationData] = useState({ name: "", description: "", [organizationImageId]: null });
  const [fileDataURL, setFileDataURL] = useState(null);

  const [loading, setLoading] = useState(false);
  const [openPreview, setOpenPreview] = useState(false);

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

  const handleOrganizationDataChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (event.target.id === organizationImageId) {
      const image = event.target.files[0];

      if (!image.type.match(imageMimeType)) {
        alert("Image mime type is not valid");
        return;
      }

      setOrganizationData({ ...organizationData, [organizationImageId]: image });

    } else {
      setOrganizationData({ ...organizationData, [event.target.id]: event.target.value })
    }
  }

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

  const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const organizationForm = new FormData();

    organizationForm.append("name", organizationData.name);
    organizationForm.append("description", organizationData.description);
    console.log(organizationData[organizationImageId]);
    organizationForm.append(organizationImageId, organizationData[organizationImageId]);

    setLoading(true);

    const response = await fetch('/api/organizations/create', {
      method: 'POST',
      body: organizationForm,
    });

    setLoading(false);

    if (response.ok) {
      const organization = await response.json();
      console.log('Created organization:', organization);
    } else {
      console.error('Failed to create organization:', response.status, response.statusText);
    }

    location.reload();

  };

  return (
    <div className="flex flex-col items-center min-w-[35%]">
      <h1 className="text-white mb-6">Create a New Organization</h1>
      <OrganizationForm
        onSubmit={handleFormSubmit}
        onDataChange={handleOrganizationDataChange}
        loading={loading}
        imageId={organizationImageId}
        organizationData={organizationData}
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