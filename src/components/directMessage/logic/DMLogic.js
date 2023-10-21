export const chatExists = (displayName, chats, currentUser) =>
    chats?.find(
        (chat) =>
            chat.users.includes(currentUser.displayName) &&
            chat.users.includes(displayName),
    );

export const userExists = (displayName, users) =>
    users?.find((user) => user.displayName.includes(displayName));

export const getMessageList = (chats, currentUser) =>
    chats?.filter((chat) => chat.users.includes(currentUser.displayName));
