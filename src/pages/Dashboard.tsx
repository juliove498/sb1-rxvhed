import React from 'react';
import { Link } from 'react-router-dom';
import { CreditCard, DollarSign, Users, TrendingUp, QrCode, History, FileText } from 'lucide-react';
import PendingApprovals from '../components/PendingApprovals';

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold text-gray-800">Welcome, John Doe</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <DashboardCard
          title="Current Balance"
          value="$1,234.56"
          icon={<DollarSign size={24} className="text-green-500" />}
          trend="+2.5%"
          trendUp={true}
        />
        <DashboardCard
          title="Pending Approvals"
          value="3"
          icon={<CreditCard size={24} className="text-blue-500" />}
          linkTo="/approvals"
          linkText="Review"
        />
        <DashboardCard
          title="Team Members"
          value="12"
          icon={<Users size={24} className="text-purple-500" />}
          linkTo="/team"
          linkText="Manage"
        />
        <DashboardCard
          title="Total Expenses"
          value="$5,678.90"
          icon={<TrendingUp size={24} className="text-orange-500" />}
          trend="-1.2%"
          trendUp={false}
        />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <PendingApprovals />
        </div>
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Quick Actions</h2>
          <div className="space-y-4">
            <QuickActionCard
              title="Generate QR Code"
              description="Create a new QR code for expense reimbursement"
              icon={<QrCode size={32} className="text-primary-500" />}
              linkTo="/generate-qr"
            />
            <QuickActionCard
              title="View Transactions"
              description="Check your recent transaction history"
              icon={<History size={32} className="text-primary-500" />}
              linkTo="/transactions"
            />
            <QuickActionCard
              title="Submit Expense"
              description="Submit a new expense for approval"
              icon={<FileText size={32} className="text-primary-500" />}
              linkTo="/submit-expense"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

interface DashboardCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  trend?: string;
  trendUp?: boolean;
  linkTo?: string;
  linkText?: string;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ title, value, icon, trend, trendUp, linkTo, linkText }) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-700">{title}</h2>
        {icon}
      </div>
      <p className="text-3xl font-bold text-gray-800 mb-2">{value}</p>
      {trend && (
        <p className={`text-sm font-medium ${trendUp ? 'text-green-500' : 'text-red-500'}`}>
          {trend} {trendUp ? '↑' : '↓'}
        </p>
      )}
      {linkTo && (
        <Link to={linkTo} className="mt-4 inline-block text-primary-600 hover:text-primary-800 font-medium">
          {linkText} →
        </Link>
      )}
    </div>
  );
};

interface QuickActionCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  linkTo: string;
}

const QuickActionCard: React.FC<QuickActionCardProps> = ({ title, description, icon, linkTo }) => {
  return (
    <Link to={linkTo} className="block">
      <div className="bg-white rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-lg hover:bg-primary-50">
        <div className="flex items-center mb-4">
          {icon}
          <h3 className="text-xl font-semibold text-gray-800 ml-4">{title}</h3>
        </div>
        <p className="text-gray-600">{description}</p>
      </div>
    </Link>
  );
};

export default Dashboard;