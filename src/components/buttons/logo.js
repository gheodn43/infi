import { Link } from 'react-router-dom';
export default function Logo() {
    return (
        <div className="d-flex align-items-center">
            <Link to="/" className="d-flex align-items-center text-decoration-none">
                <img
                    className='h-custom mr-2'
                    src="/images/infi-logo.png"
                    alt="Infi Logo"
                    style={{ filter: 'brightness(0) invert(1)' }}
                />
                <p className="h1 text-white mb-0">Infi</p>
            </Link>
        </div>
    )
}