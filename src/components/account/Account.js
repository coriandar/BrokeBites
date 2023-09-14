import { getAuth } from "firebase/auth";
import { Auth } from "./Auth";

export default function Account() {
    const auth = getAuth();
    const currentUser = auth.currentUser;

    const {
        setNewEmailAddress,
        updateEmailAddress,
        setNewPassword,
        changePassword,
    } = Auth();

    return (
        <div>
            <input
                placeholder="New Email Address"
                type="newEmailAddress"
                onChange={(e) => setNewEmailAddress(e.target.value)}
            />
            <button onClick={updateEmailAddress}>Submit</button>

            <br />

            <input
                placeholder="New Password"
                type="newPassword"
                onChange={(e) => setNewPassword(e.target.value)}
            />
            <button onClick={changePassword}>Submit</button>
        </div>
    );
}
