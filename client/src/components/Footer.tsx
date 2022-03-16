import { GiDeathStar as Icon } from 'react-icons/gi';
import { Link } from 'react-router-dom';
export const Footer = () => {
    return (
        <footer>
            <div className="footer-container">
                <p><Icon /> Developed by <Link to={'/'}>Joseph Quispe</Link></p>
            </div>
        </footer>
    )
}