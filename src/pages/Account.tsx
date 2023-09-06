import { getAuth } from "firebase/auth";
import { Auth } from "../components/Auth";

export default function Account() {
    const auth = getAuth();
    const currentUser = auth.currentUser;

    const { setNewEmailAddress, updateEmailAddress } = Auth();

    return (
        <div>
            <br></br>
            <input
                placeholder="New Email Address"
                type="newEmailAddress"
                onChange={(e) => setNewEmailAddress(e.target.value)}
            />
            <button onClick={updateEmailAddress}>Submit</button>
        </div>
    );
}
