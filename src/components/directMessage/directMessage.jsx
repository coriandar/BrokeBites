import BottomBar from "./component/BottomBar";
import Message from "./component/Message";
import SideBar from "./component/SideBar";
import TopBar from "./component/TopBar";

export default function DirectMessage() {
    return (
        <div>
            <SideBar />
            <TopBar />
            <Message />
            <BottomBar />
        </div>
    );
}
