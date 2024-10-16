import { Link } from 'react-router-dom';
export default function Logo() {
    return (
        <div className="d-flex align-items-center">
            <Link to="/" className="d-flex align-items-center text-decoration-none" onClick={()=>{document.body.style.overflow = '';}}>
                <img
                    className='h-custom mx-1 mx-lg-0 p-2 p-lg-3'
                    src="/images/infi-logo.png"
                    alt="Infi Logo"
                    style={{ filter: 'brightness(0) invert(1)' }}
                />
                <p className="h3 text-white mb-0">Infi</p>
            </Link>
        </div>
    )
}