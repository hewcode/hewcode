import React, { useState } from 'react';
import { Icon } from '../icon-registry';
import { ArrowUp, ArrowDown } from 'lucide-react';
import useWidgetPolling from './useWidgetPolling';

export default function StatsWidget({
  name,
  seal,
  label,
  value,
  formatted_value,
  icon,
  color = 'primary',
  description,
  trend,
  refreshInterval,
  className = '',
}) {
  // Use state to hold widget data that can be updated via polling
  const [widgetData, setWidgetData] = useState({
    label,
    value,
    formatted_value,
    description,
    trend,
  });

  // Set up polling if refreshInterval is provided
  useWidgetPolling({
    name,
    refreshInterval,
    seal,
    onUpdate: (data) => {
      setWidgetData({
        label: data.label ?? widgetData.label,
        value: data.value ?? widgetData.value,
        formatted_value: data.formatted_value ?? widgetData.formatted_value,
        description: data.description ?? widgetData.description,
        trend: data.trend ?? widgetData.trend,
      });
    },
  });
  const colorClasses = {
    primary: 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/50',
    secondary: 'text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-800',
    success: 'text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-950/50',
    danger: 'text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/50',
    warning: 'text-yellow-600 dark:text-yellow-400 bg-yellow-50 dark:bg-yellow-950/50',
    info: 'text-cyan-600 dark:text-cyan-400 bg-cyan-50 dark:bg-cyan-950/50',
  };

  const iconColorClass = color ? colorClasses[color]?.split(' ').slice(0, 2).join(' ') : 'text-gray-600 dark:text-gray-400';
  const iconBgClass = color ? colorClasses[color]?.split(' ').slice(2).join(' ') : 'bg-gray-50 dark:bg-gray-800';

  return (
    <div className={`bg-box border-box-border rounded-lg border p-6 shadow-sm ${className}`}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-muted-foreground">{widgetData.label}</span>
        {icon && (
          <div className={`p-2 rounded-lg ${iconBgClass}`}>
            <Icon icon={icon} className={`h-5 w-5 ${iconColorClass}`} />
          </div>
        )}
      </div>

      <div className="text-3xl font-bold text-foreground mb-1">
        {widgetData.formatted_value || widgetData.value}
      </div>

      {widgetData.description && (
        <p className="text-sm text-muted-foreground mb-2">{widgetData.description}</p>
      )}

      {widgetData.trend && (
        <div className="flex items-center text-sm">
          <TrendIndicator
            value={widgetData.trend.value}
            direction={widgetData.trend.direction}
          />
          {widgetData.trend.label && (
            <span className="ml-2 text-muted-foreground">{widgetData.trend.label}</span>
          )}
        </div>
      )}
    </div>
  );
}

function TrendIndicator({ value, direction }) {
  const isPositive = direction === 'up';
  const colorClass = isPositive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400';
  const TrendIcon = isPositive ? ArrowUp : ArrowDown;

  return (
    <div className={`flex items-center ${colorClass} font-medium`}>
      <TrendIcon className="h-4 w-4 mr-1" />
      <span>{Math.abs(value).toFixed(1)}%</span>
    </div>
  );
}
