import React from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import nasaLogo from 'images/nasa-logo.png'
import { useHistory} from 'react-router-dom'

const Example = () => {
	const history = useHistory()
	return (
		<Navbar className="jcc pt40">
			<div className="logo fullFlex">
				<img src={nasaLogo} className="nasaLogo cup" alt="nasaLogo" onClick={() => history.push('/')}/>
				<div className='logoTitle'>MEDIA SEARCH</div>
			</div>
		</Navbar>
	);
}

export default Example;