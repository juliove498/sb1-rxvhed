import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import QRCode from 'qrcode.react';
import { DollarSign, User, Briefcase, MapPin, FileText } from 'lucide-react';

interface QRFormData {
  amount: number;
  recipient: string;
  clientName: string;
  clientAddress: string;
  invoiceNumber: string;
}

const QRGenerator: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<QRFormData>();
  const [qrData, setQRData] = useState<string | null>(null);

  const onSubmit = (data: QRFormData) => {
    const qrContent = JSON.stringify(data);
    setQRData(qrContent);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Generate QR Code</h1>
      <div className="bg-white rounded-xl shadow-lg p-8">
        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            label="Amount"
            name="amount"
            type="number"
            icon={<DollarSign size={20} className="text-gray-400" />}
            register={register}
            required="Amount is required"
            min={0}
            error={errors.amount}
          />
          <FormField
            label="Recipient"
            name="recipient"
            type="text"
            icon={<User size={20} className="text-gray-400" />}
            register={register}
            required="Recipient is required"
            error={errors.recipient}
          />
          <FormField
            label="Client Name"
            name="clientName"
            type="text"
            icon={<Briefcase size={20} className="text-gray-400" />}
            register={register}
            required="Client name is required"
            error={errors.clientName}
          />
          <FormField
            label="Client Address"
            name="clientAddress"
            type="text"
            icon={<MapPin size={20} className="text-gray-400" />}
            register={register}
            required="Client address is required"
            error={errors.clientAddress}
          />
          <FormField
            label="Invoice Number"
            name="invoiceNumber"
            type="text"
            icon={<FileText size={20} className="text-gray-400" />}
            register={register}
            required="Invoice number is required"
            error={errors.invoiceNumber}
          />
          <div className="md:col-span-2">
            <button
              type="submit"
              className="w-full bg-primary-600 text-white py-3 px-4 rounded-lg hover:bg-primary-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-opacity-50"
            >
              Generate QR Code
            </button>
          </div>
        </form>
      </div>
      {qrData && (
        <div className="mt-12 text-center">
          <h2 className="text-2xl font-semibold mb-6">Generated QR Code</h2>
          <div className="inline-block p-4 bg-white rounded-xl shadow-lg">
            <QRCode value={qrData} size={250} />
          </div>
          <p className="mt-4 text-gray-600">Scan this QR code to process the expense</p>
        </div>
      )}
    </div>
  );
};

interface FormFieldProps {
  label: string;
  name: string;
  type: string;
  icon: React.ReactNode;
  register: any;
  required: string;
  min?: number;
  error?: any;
}

const FormField: React.FC<FormFieldProps> = ({ label, name, type, icon, register, required, min, error }) => (
  <div>
    <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        {icon}
      </div>
      <input
        type={type}
        id={name}
        {...register(name, { required, min })}
        className="pl-10 block w-full rounded-lg border-gray-300 bg-gray-50 focus:ring-primary-500 focus:border-primary-500"
      />
    </div>
    {error && <p className="mt-1 text-sm text-red-600">{error.message}</p>}
  </div>
);

export default QRGenerator;