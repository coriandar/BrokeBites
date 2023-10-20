import Avatar from "@/components/account/Avatar";
import { auth } from "@/database/firebase/firebaseApp";

export default function SideBar() {
    const currentUser = auth.currentUser;

    const messageList = () => {
        return <div>Message List</div>;
    };

    return (
        <div className="sidebarContainer">
            <p>{currentUser.displayName}</p>
            <Avatar maxW={"w-[50px]"} photoURL={currentUser.photoURL} />
            <button className="button">Search</button>
            <div>{messageList()}</div>
        </div>
    );
}
