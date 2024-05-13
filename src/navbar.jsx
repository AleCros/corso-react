import './Navbar.css'
import { Link } from 'react-router-dom'

function Navbar(){
    return(
        <header className="header">
        <a href="/" className="logo">LOGO</a>
        <input className="menu-btn" type="checkbox" id="menu-btn"/>
        <label htmlFor="menu-btn" className="menu-icon">
            <span className="nav-icon"></span>
        </label>
        <ul className="menu">
            <li><Link to={'/attivita'}>Attività</Link></li>
            <li><Link to={'/progetti'} >Progetti</Link></li>
            <li><a >shop</a></li>
            <li><a >concacts</a></li>
        </ul>
    </header>    
    )
}

export default Navbar