import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Search, Download, ChevronDown, ChevronUp } from 'lucide-react';

interface Transaction {
  id: string;
  amount: number;
  date: string;
  clientName: string;
  invoiceNumber: string;
  status: 'Approved' | 'Pending' | 'Rejected';
}

const fetchTransactions = async (): Promise<Transaction[]> => {
  // Simulated API call
  return [
    { id: '1', amount: 100.50, date: '2024-03-15', clientName: 'Acme Corp', invoiceNumber: 'INV-001', status: 'Approved' },
    { id: '2', amount: 75.25, date: '2024-03-14', clientName: 'TechStart Inc', invoiceNumber: 'INV-002', status: 'Pending' },
    { id: '3', amount: 200.00, date: '2024-03-13', clientName: 'Global Services Ltd', invoiceNumber: 'INV-003', status: 'Rejected' },
    { id: '4', amount: 150.75, date: '2024-03-12', clientName: 'Innovate Solutions', invoiceNumber: 'INV-004', status: 'Approved' },
    { id: '5', amount: 300.00, date: '2024-03-11', clientName: 'Digital Dynamics', invoiceNumber: 'INV-005', status: 'Pending' },
  ];
};

const TransactionHistory: React.FC = () => {
  const { data: transactions, isLoading, error } = useQuery({
    queryKey: ['transactions'],
    queryFn: fetchTransactions,
  });

  const [sortConfig, setSortConfig] = useState<{ key: keyof Transaction; direction: 'asc' | 'desc' } | null>(null);

  const sortedTransactions = React.useMemo(() => {
    let sortableTransactions = [...(transactions ?? [])];
    if (sortConfig !== null) {
      sortableTransactions.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableTransactions;
  }, [transactions, sortConfig]);

  const requestSort = (key: keyof Transaction) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  if (isLoading) return <div className="text-center py-10">Loading transactions...</div>;
  if (error) return <div className="text-center py-10 text-red-600">Error loading transactions</div>;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">Transaction History</h1>
      <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
        <div className="relative w-full sm:w-64">
          <input
            type="text"
            placeholder="Search transactions..."
            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
        </div>
        <button className="flex items-center bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors duration-300">
          <Download size={20} className="mr-2" />
          Export CSV
        </button>
      </div>
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {['Date', 'Amount', 'Client', 'Invoice', 'Status'].map((header) => (
                  <th
                    key={header}
                    onClick={() => requestSort(header.toLowerCase() as keyof Transaction)}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  >
                    <div className="flex items-center">
                      {header}
                      {sortConfig?.key === header.toLowerCase() && (
                        sortConfig.direction === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sortedTransactions.map((transaction) => (
                <tr key={transaction.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{transaction.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    ${transaction.amount.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{transaction.clientName}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{transaction.invoiceNumber}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      transaction.status === 'Approved' ? 'bg-green-100 text-green-800' :
                      transaction.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {transaction.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TransactionHistory;