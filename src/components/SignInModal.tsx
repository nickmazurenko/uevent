import React, { useEffect, useState } from "react";
import { Modal, Button } from "flowbite-react";
import { ClientSafeProvider, getCsrfToken, getProviders, signIn } from "next-auth/react";
import { AppProvider } from "next-auth/providers";
import { AiFillGoogleSquare, AiFillGithub, AiOutlineClose } from "react-icons/ai";

export default function SignInModal({
  show,
  onClose,
}: {
  show: boolean;
  onClose: () => void;
}) {
  const [token, setToken] = useState<string | null>(null);
  const [providers, setProviders] = useState<Record<
    string,
    AppProvider
  > | null>(null);

  useEffect(() => {
    const fetchToken = async () => {
      const token = await getCsrfToken();
      setToken(token as string);
    };

    const fetchProviders = async () => {
      const providers = await getProviders();
      console.log(providers);
      // @ts-ignore
      setProviders(providers);
    };

    fetchToken();
    fetchProviders();
  }, []);

  return (
    <Modal
      size="md"
      className="bg-ueventSecondary backdrop-blur-sm"
      show={show}
      onClose={onClose}
      dismissible={true}
    >
      <Modal.Body className="drop-shadow-2xl flex flex-col justify-center items-center bg-ueventSecondary rounded-lg">
        <AiOutlineClose size={20} className="text-ueventText hover:text-ueventContrast cursor-pointer absolute top-5 right-5" onClick={onClose} />
        <h1 className="text-4xl py-20 text-ueventText">GATHERWISE</h1>
        <div className="max-w-sm w-full rounded-lg shadow dark:bg-transparent dark:border-gray-700">
          <EmailForm csrfToken={token} />
          <div className="pt-5 pb-1 px-2 flex justify-center items-center text-ueventText">
            <hr className="border-t-2 border-gray-400 flex-grow" />
            <div className="px-4 py-2">or</div>
            <hr className="border-t-2 border-gray-400 flex-grow" />
          </div>
          <div className="flex flex-row gap-2">
            <AuthWithGoogle provider={providers?.google as AppProvider} />
            <AuthWithGitHub provider={providers?.github as AppProvider} />
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}

const EmailForm = ({ csrfToken }: any) => {
  return (
    <form
      method="post"
      className="flex flex-col gap-4"
      action="/api/auth/signin/email"
    >
      <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
      <div className="mt-5">
        <label className="sr-only" htmlFor="email">
          Email address
        </label>
        <div className="relative w-full">
          <input
            placeholder="Email"
            className="w-full rounded-xl bg-ueventSecondary border-ueventText text-ueventText"
            type="email"
            id="email"
            name="email"
          />
        </div>
      </div>

      <button
        className="hover:bg-ueventContrast hover:text-ueventText p-2 text-center w-full font-bold text-ueventContrast border-ueventContrast border-2 rounded-xl"
        type="submit"
      >
        Sign in with Email
      </button>
    </form>
  );
};

interface ProviderAuthProps {
  provider: ClientSafeProvider;
}

const AuthWithGoogle = ({ provider }: ProviderAuthProps) => {
  return (
    <button
      className="text-white bg-blue-700 border border-transparent hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 disabled:hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 dark:disabled:hover:bg-blue-600 focus:!ring-2 group flex h-min items-center justify-center p-0.5 text-center font-medium focus:z-10 rounded-lg w-full mt-5 bg-gray-900"
      onClick={() => signIn(provider.id)}
    >
      <span className="flex items-center rounded-md text-sm px-4 py-2">
        <AiFillGoogleSquare size={40} />
        Sign in with Google
      </span>
    </button>
  );
};

const AuthWithGitHub = ({ provider }: ProviderAuthProps) => {
  return (
    <button
      className="text-white border border-transparent hover:bg-gray-900 focus:ring-4 focus:ring-blue-300 disabled:hover:bg-blue-700 group flex h-min items-center justify-center p-0.5 text-center font-medium focus:z-10 rounded-lg w-full mt-5 bg-gray-800"
      onClick={() => signIn(provider.id)}
    >
      <span className="flex items-center rounded-md text-sm px-4 py-2">
        <AiFillGithub size={30} />
        Sign in with GitHub
      </span>
    </button>
  );
};
