import Image from "next/image";

export default function Avatar() {
    return (
        <div className="m-8 w-90% bg-slate-500 rounded-lg">
            <Image
                src="/logoCut.png"
                alt="App Logo"
                width={200}
                height={200}
                priority
            />

            {/* <ChakraAvatar
                as={Link}
                to={`${PROTECTED}/profile/${user.id}`}
                name={user.username}
                size={size}
                src={overrideAvatar || user.avatar}
                _hover={{ cursor: "pointer", opacity: "0.8" }}
            /> */}
        </div>
    );
}
