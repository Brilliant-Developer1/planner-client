import React from 'react';
import { User, Briefcase, Code, DollarSign } from 'lucide-react';

const userTypes = [
  {
    icon: User,
    title: 'General Users',
    description: 'People from various backgrounds using our platform for personal and professional growth.'
  },
  {
    icon: Briefcase,
    title: 'Professionals',
    description: 'Corporate professionals leveraging our tools to enhance productivity and team collaboration.'
  },
  {
    icon: Code,
    title: 'Developers',
    description: 'Developers utilizing our resources to manage projects, track progress, and collaborate effectively.'
  },
  {
    icon: DollarSign,
    title: 'Bankers',
    description: 'Banking professionals using our platform for better project management and client relations.'
  }
];

const UserTypes = () => {
  return (
    <div className="container mx-auto my-12 p-6">
      <h2 className="text-4xl text-primary font-bold text-center mb-8">Who Uses Our Platform?</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {userTypes.map((userType, index) => (
          <div key={index} className="flex flex-col justify-center items-center p-6 bg-white shadow-lg rounded-lg">
            <userType.icon className="h-12 w-12 text-primary mb-4" />
            <h3 className="text-2xl font-semibold mb-2">{userType.title}</h3>
            <p className="text-center text-gray-600">{userType.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserTypes;
