import { Auth } from "../components/Auth";
import { useRouter } from "next/router";

export default function SignIn() {
    const { setSignUpEmail, setSignUpPassword, signUp, setDisplayName } =
        Auth();

    const router = useRouter();

    return (
        <div>
            <center>
                <input
                    placeholder="Email"
                    onChange={(e) => setSignUpEmail(e.target.value)}
                />
                <br></br>
                <input
                    placeholder="Passowrd"
                    type="Password"
                    onChange={(e) => setSignUpPassword(e.target.value)}
                />
                <br></br>
                <input
                    placeholder="Name"
                    type="Name"
                    onChange={(e) => setDisplayName(e.target.value)}
                ></input>

                <br></br>
                <br></br>

                <button onClick={signUp}>Sign up</button>
            </center>
        </div>
    );
}
