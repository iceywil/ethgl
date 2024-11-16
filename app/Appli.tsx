import Header from "../components/Header";
import { PassportProfile } from "../components/passport-profile";
import Register from './integration/register'
import SetText from './setText/setText'

function Appli() {
	return (
		<div className="min-h-screen bg-cream text-navy">
			<Header />
			<PassportProfile />
			<Register />
			<SetText />

		</div>
	);
}

export default Appli;
