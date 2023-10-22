export default function FollowContainer({ followData }) {
    return (
        <div>
            <ul key={followData.id} className="w-full">
                user followed{followData.recipient}
            </ul>
        </div>
    );
}
