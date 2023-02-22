
type Props = {
    organizations?: any[];
};


export default function Organizations({ organizations } : {organizations: any}) {
    return (
        <div>
            <h1>Organizations</h1>
            <ul>
                {organizations?.map((org) => (
                    <li key={org.id}>{org.name}</li>
                ))}
            </ul>
        </div>
    );
}

