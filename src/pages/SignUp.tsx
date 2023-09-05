import { Auth } from "../components/Auth";

export default function SignIn() {
    const { setSignUpEmail, setSignUpPassword } = Auth();

    return (
        <div>
            <center>
                <input
                    placeholder="Email"
                    onChange={(e) => setSignUpEmail(e.target.value)}
                />
                <input
                    placeholder="Passowrd"
                    type="Password"
                    onChange={(e) => setSignUpPassword(e.target.value)}
                />

                <br></br>
                <br></br>

                <button>Sign up</button>
            </center>
        </div>
    );
}
