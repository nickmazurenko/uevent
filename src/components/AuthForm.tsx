import Link from "next/link";

export interface SignUpFormProps {
  errorMessage: any,
  onSubmit: any
  isLogin: boolean,
}

const AuthForm = (props: SignUpFormProps) => {
  return (
    <form onSubmit={props.onSubmit}>
      {
        !props.isLogin && (
          <label>
            <span>Username</span>
            <input type="text" name="username" required />
          </label>
        )
      }

      <label>
        <span>Email</span>
        <input type="email" name="email" required />
      </label>

      <label>
        <span>Password</span>
        <input type="password" name="password" required />
      </label>

      {!props.isLogin && (
        <label>
          <span>Repeat password</span>
          <input type="password" name="rpassword" required />
        </label>
      )}

      <div className="submit">
        {props.isLogin ? (
          <>
            <Link href="/auth/signup" legacyBehavior>
              <a>I don't have an account</a>
            </Link>
            <button type="submit">Login</button>
          </>
        ) : (
          <>
            <Link href="/auth/login" legacyBehavior>
              <a>I already have an account</a>
            </Link>
            <button type="submit">Signup</button>
          </>
        )}
      </div>

      {props.errorMessage && <p className="error">{props.errorMessage}</p>}

      <style jsx>{`
          form,
          label {
            display: flex;
            flex-flow: column;
          }
          label > span {
            font-weight: 600;
          }
          input {
            padding: 8px;
            margin: 0.3rem 0 1rem;
            border: 1px solid #ccc;
            border-radius: 4px;
          }
          .submit {
            display: flex;
            justify-content: flex-end;
            align-items: center;
            justify-content: space-between;
          }
          .submit > a {
            text-decoration: none;
          }
          .submit > button {
            padding: 0.5rem 1rem;
            cursor: pointer;
            background: #fff;
            border: 1px solid #ccc;
            border-radius: 4px;
          }
          .submit > button:hover {
            border-color: #888;
          }
          .error {
            color: brown;
            margin: 1rem 0 0;
          }
        `}</style>
    </form>
  )
}

export default AuthForm;