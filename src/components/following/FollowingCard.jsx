import React, { useState, useEffect } from "react";
import Link from "next/link";
import Avatar from "../account/Avatar";

export default function FollowingCard({ follow }) {
    return (
        <div className="m-5 flex h-12 items-center justify-start rounded-lg bg-slate-200">
            <Link href={`/profile/${follow.id}`}>
                <Avatar maxW={"w-[40px]"} photoURL={follow.photoURL} />
            </Link>
            <Link href={`/profile/${follow.id}`}>{follow.displayName}</Link>
        </div>
    );
}
