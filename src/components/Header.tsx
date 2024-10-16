import React from 'react';
import { Link } from 'react-router-dom';
import { Wallet, QrCode, History, LogOut } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-primary-600 to-primary-800 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold flex items-center">
            <Wallet className="mr-2" /> Expense Wallet
          </Link>
          <nav>
            <ul className="flex space-x-6">
              <NavItem to="/generate-qr" icon={<QrCode size={18} />} text="Generate QR" />
              <NavItem to="/transactions" icon={<History size={18} />} text="Transactions" />
              <NavItem to="/login" icon={<LogOut size={18} />} text="Logout" />
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  text: string;
}

const NavItem: React.FC<NavItemProps> = ({ to, icon, text }) => (
  <li>
    <Link to={to} className="flex items-center hover:text-primary-200 transition-colors duration-200">
      {icon}
      <span className="ml-1">{text}</span>
    </Link>
  </li>
);

export default Header;