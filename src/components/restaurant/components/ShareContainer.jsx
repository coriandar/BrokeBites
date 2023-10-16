import React from "react";
import {
    EmailShareButton,
    EmailIcon,
    FacebookShareButton,
    FacebookIcon,
    TwitterShareButton,
    TwitterIcon,
} from "react-share";

export const ShareContainer = ({ selected }) => {
    return (
        <div>
            <FacebookShareButton
                url={selected?.website}
                quote="Take a look at this place!"
            >
                <FacebookIcon size={32} round={true} />
            </FacebookShareButton>
            <EmailShareButton
                url={selected?.website}
                subject="Take a look at this place!"
            >
                <EmailIcon size={32} round={true} />
            </EmailShareButton>
            <TwitterShareButton
                url={selected?.website}
                title="Take a look at this place!"
            >
                <TwitterIcon size={32} round={true} />
            </TwitterShareButton>
        </div>
    );
};
