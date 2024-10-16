import React from 'react';
import { CheckCircle, XCircle, Clock } from 'lucide-react';

interface Approval {
  id: string;
  employeeName: string;
  amount: number;
  date: string;
  description: string;
}

const mockApprovals: Approval[] = [
  { id: '1', employeeName: 'Alice Johnson', amount: 150.00, date: '2024-03-15', description: 'Office supplies' },
  { id: '2', employeeName: 'Bob Smith', amount: 75.50, date: '2024-03-14', description: 'Client lunch' },
  { id: '3', employeeName: 'Charlie Brown', amount: 200.00, date: '2024-03-13', description: 'Travel expenses' },
];

const PendingApprovals: React.FC = () => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Pending Approvals</h2>
      <div className="space-y-4">
        {mockApprovals.map((approval) => (
          <div key={approval.id} className="flex items-center justify-between border-b border-gray-200 pb-4 last:border-b-0 last:pb-0">
            <div>
              <p className="font-medium text-gray-800">{approval.employeeName}</p>
              <p className="text-sm text-gray-600">{approval.description}</p>
              <p className="text-xs text-gray-500">{approval.date}</p>
            </div>
            <div className="text-right">
              <p className="font-bold text-gray-800">${approval.amount.toFixed(2)}</p>
              <div className="mt-2 space-x-2">
                <button className="p-1 bg-green-100 text-green-600 rounded-full hover:bg-green-200 transition-colors duration-200">
                  <CheckCircle size={20} />
                </button>
                <button className="p-1 bg-red-100 text-red-600 rounded-full hover:bg-red-200 transition-colors duration-200">
                  <XCircle size={20} />
                </button>
                <button className="p-1 bg-yellow-100 text-yellow-600 rounded-full hover:bg-yellow-200 transition-colors duration-200">
                  <Clock size={20} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <button className="mt-6 w-full bg-primary-600 text-white py-2 px-4 rounded-lg hover:bg-primary-700 transition-colors duration-300">
        View All Pending Approvals
      </button>
    </div>
  );
};

export default PendingApprovals;