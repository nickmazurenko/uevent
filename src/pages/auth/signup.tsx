import Router from "next/router";
import { useState } from "react";
import Layout from "@/components/Layout";
import AuthForm from "@/components/AuthForm";

const SignUp = () => {
    const [errorMsg, setErrorMsg] = useState('');

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        if (errorMsg) setErrorMsg('');

        const body = {
            username: e.currentTarget.username.value,
            email: e.currentTarget.email.value,
            password: e.currentTarget.password.value,
            rpassword: e.currentTarget.rpassword.value
        }

        if (body.password !== body.rpassword) {
            setErrorMsg("The passwords don\'t match");
            return;
        }

        try {

            const res = await fetch('/api/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            })
            if (res.status === 200) {
                Router.push('/auth/login')
            } else {
                throw new Error(await res.text())
            }

        } catch (error: any) {
            console.error('An unexpected error happened occurred:', error)
            setErrorMsg(error.message)
        }
    }

    return (
        <Layout>
            <div className="login">
                <AuthForm isLogin={false} errorMessage={errorMsg} onSubmit={handleSubmit} />
            </div>
            <style jsx>{`
            .login {
              max-width: 21rem;
              margin: 0 auto;
              padding: 1rem;
              border: 1px solid #ccc;
              border-radius: 4px;
            }
          `}</style>
        </Layout>
    )


}

export default SignUp;