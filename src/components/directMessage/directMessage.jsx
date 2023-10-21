import SideBar from "./component/SideBar";

import { SelectedChatProvider } from "./logic/SelectedChatContext";

export default function DirectMessage() {
    return (
        <div>
            <SelectedChatProvider>
                <SideBar />
            </SelectedChatProvider>
        </div>
    );
}
