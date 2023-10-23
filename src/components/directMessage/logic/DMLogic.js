export const chatExists = (otherUser, chats, currentUser) =>
    chats?.find(
        (chat) =>
            chat.users.includes(currentUser.displayName) &&
            chat.users.includes(otherUser),
    );

export const userExists = (displayName, users) =>
    users?.find((user) => user.displayName.includes(displayName));

export const getMessageList = (chats, currentUser) =>
    chats?.filter((chat) => chat.users.includes(currentUser.displayName));

export const getOtherDisplayName = (users, currentUser) => {
    return users?.filter((user) => user !== currentUser.displayName)[0];
};

export const getUserName = (users, currentUser) => {
    const otherUser = users?.find((user) => user !== currentUser.displayName);
    return otherUser || "...";
};
