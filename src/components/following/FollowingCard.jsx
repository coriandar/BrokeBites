import React, { useState, useEffect } from "react";
import Link from "next/link";
import Avatar from "../account/Avatar";

export default function FollowingCard({ follow }) {
    return (
        <div className="flex justify-start items-center h-12 bg-slate-200 m-5 rounded-lg">
            <Link href={`/profile/${follow.id}`}>
                <Avatar maxW={"w-[40px]"} photoURL={follow.photoURL} />
            </Link>
            <Link href={`/profile/${follow.id}`}>{follow.displayName}</Link>
        </div>
    );
}
