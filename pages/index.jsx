import { userService } from 'services';
import { Link } from 'components';

export default Home;

function Home() {
    console.log(userService.userValue?.admin)
    if(userService.userValue?.admin){
        return (
            <div className="p-4">
                <div className="container">
                    <h1>Hi {userService.userValue?.firstName}!</h1>
                    <p>You&apos;re Admin!!</p>
                    <p><Link href="/users">Manage Users</Link></p>
                </div>
            </div>
        );
    } else {
        return (
            <div className="p-4">
                <div className="container">
                    <h1>Hi {userService.userValue?.firstName}!</h1>
                    <p>You&apos;re logged in!!</p>
                    <p><Link href={`/wallet/${userService.userValue?.id}`}>Create wallet</Link></p>
                </div>
            </div>
        );
    }
}
