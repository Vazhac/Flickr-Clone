import { useSelector } from 'react-redux';

export default function Dashboard() {
    const user = useSelector(state => state.session.user)
    if (user) {
        return (
            <div>
                <h1>Dashboard</h1>
                <p>Welcome to your dashboard!</p>
            </div>
        )
    } else {
        // return <Redirect to="/" />
        return <p>You must be logged in to view this page</p>
    }
}
