import DirectMessageContainer from "./component/DirectMessageContainer";
import { SelectedChatProvider } from "./logic/SelectedChatContext";

export default function DirectMessages() {
    return (
        <div>
            <SelectedChatProvider>
                <DirectMessageContainer />
            </SelectedChatProvider>
        </div>
    );
}
