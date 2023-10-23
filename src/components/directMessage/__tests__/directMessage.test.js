import "@testing-library/jest-dom";
import { chatExists, getOtherDisplayName, userExists } from "../logic/DMLogic";

describe("DirectMessage", () => {
    test("should return the diaplayName that is not equl to currentUserDisplayName", () => {
        const users = ["Jamie L", "Jamie C"];
        const currentUserDisplayName = "Jamie L";
        const result = getOtherDisplayName(users, currentUserDisplayName);

        expect(result).toBe("Jamie L");
    });

    test("should return the chat if a chat between otherUser and currentUser exists", () => {
        const chats = [
            { users: ["Jamie L", "Jamie C"] },
            { users: ["Jamie C", "Micheal"] },
            { users: ["Jamie L", "William"] },
            { users: ["Jamie C", "Tony"] },
        ];
        const currentUser = { displayName: "Jamie L" };
        const otherUser = "Jamie C";
        const result = chatExists(otherUser, chats, currentUser);

        expect(result).toEqual({ users: ["Jamie L", "Jamie C"] });
    });

    test("should return unefined if a chat between otherUser and currentUser does not exist", () => {
        const chats = [
            { users: ["Jamie L", "Jamie C"] },
            { users: ["Jamie C", "Micheal"] },
            { users: ["Jamie L", "William"] },
            { users: ["Jamie C", "Tony"] },
        ];
        const currentUser = { displayName: "Jamie L" };
        const otherUser = "Tony";
        const result = chatExists(otherUser, chats, currentUser);

        expect(result).toEqual(undefined);
    });

    test("should return the user if they are found from userMasterList", () => {
        const userMasterList = [
            { displayName: "Jamie C" },
            { displayName: "Jamie L" },
            { displayName: "Micheal" },
            { displayName: "William" },
            { displayName: "Tony" },
        ];
        const displayName = "Micheal";
        const result = userExists(displayName, userMasterList);

        expect(result.displayName).toBe("Micheal");
    });

    test("should return undefined if the user is not found from userMasterList", () => {
        const userMasterList = [
            { displayName: "Jamie C" },
            { displayName: "Jamie L" },
            { displayName: "Micheal" },
            { displayName: "William" },
            { displayName: "Tony" },
        ];
        const displayName = "Matthew";
        const result = userExists(displayName, userMasterList);

        expect(result).toBe(undefined);
    });
});
