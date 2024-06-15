import { Link } from 'react-router-dom';
import React from 'react';
import { useColorMode, Button } from '@chakra-ui/react';

export default function Navbar() {
    const { colorMode, toggleColorMode } = useColorMode();

    const handleLogout = () =>{
        localStorage.clear();
    }

    return (
        <nav className={`navbar navbar-expand-lg ${colorMode === 'dark' ? 'bg-dark text-light' : 'bg-light text-dark'}`}>
            <div className="container-fluid d-flex justify-content-between">
                <a className={`navbar-brand ${colorMode === 'dark' ? 'text-light' : 'text-dark'}`} href="/">Sale Order Management</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                    <Link to='/' className={`nav-link active ${colorMode === 'dark' ? 'text-light' : 'text-dark'}`} aria-current="page">Home</Link>
                    </li>
                    <li className="nav-item">
                    <Link to='/about' className={`nav-link ${colorMode === 'dark' ? 'text-light' : 'text-dark'}`}>About</Link>
                    </li>
                </ul>
                <div className="d-flex gap-3">
                    <Link to='/login'><button className="btn btn-outline-success" type="submit">Login</button></Link>
                    <Link to='/'><button className="btn btn-outline-danger" type="submit" onClick={handleLogout}>Logout</button></Link>
                    <Button onClick={toggleColorMode}>
                        Toggle { colorMode === 'light' ? 'Dark' : 'Light'}
                    </Button>
                </div>
                </div>
            </div>
        </nav>
    )
}
