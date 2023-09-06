import { Auth } from "../components/Auth";
import { useRouter } from "next/router";

export default function SignIn() {
    const {
        setSignInEmail,
        setPassword,
        signInWithGoogle,
        signIn,
        passwordReset,
    } = Auth();
    const router = useRouter();

    return (
        <div>
            <center>
                <input
                    placeholder="Email"
                    onChange={(e) => setSignInEmail(e.target.value)}
                />
                <input
                    placeholder="Passowrd"
                    type="Password"
                    onChange={(e) => setPassword(e.target.value)}
                />

                <br />

                <button onClick={signIn}>Sign In</button>

                <br />
                <br />

                <button onClick={signInWithGoogle}>Sign in with Google</button>

                <br />
                <br />

                <button onClick={() => router.push("../SignUp")}>
                    Sign Up
                </button>

                <br />
                <br />

                <button onClick={passwordReset}>Reset Password</button>
            </center>
        </div>
    );
}
