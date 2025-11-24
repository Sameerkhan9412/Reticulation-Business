import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const DashboardCard = ({ title, value, icon: Icon, description, color = 'purple' }) => {
  const colors = {
    purple: 'text-purple-400',
    green: 'text-green-400',
    red: 'text-red-400',
    blue: 'text-blue-400',
    yellow: 'text-yellow-400',
  };

  return (
    <motion.div whileHover={{ y: -5 }}>
      <Card className="bg-gray-800 border-gray-700 text-white">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-gray-300">{title}</CardTitle>
          {Icon && <Icon className={`h-5 w-5 ${colors[color]}`} />}
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{value}</div>
          {description && <p className="text-xs text-gray-400">{description}</p>}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default DashboardCard;