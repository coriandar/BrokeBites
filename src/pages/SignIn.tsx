import { Auth } from "../components/Auth";
import { useRouter } from "next/router";

export default function SignIn() {
    const { setSignInEmail, setSignInPassword, signInWithGoogle } = Auth();
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
                    onChange={(e) => setSignInPassword(e.target.value)}
                />

                <br></br>
                <br></br>
                <button onClick={() => router.push("../index.tsx")}>
                    Sign In
                </button>

                <br></br>
                <br></br>
                <button onClick={signInWithGoogle}>Sign in with Google</button>

                <br></br>
                <br></br>
                <button onClick={() => router.push("../SignUp.tsx")}>
                    Sign Up
                </button>
            </center>
        </div>
    );
}
