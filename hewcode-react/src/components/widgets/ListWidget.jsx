import React, { useState } from 'react';
import { Icon } from '../icon-registry';
import useWidgetPolling from './useWidgetPolling';

export default function ListWidget({
  name,
  seal,
  label,
  items = [],
  emptyState = 'No items',
  hasAction = false,
  refreshInterval,
  className = '',
}) {
  // Use state to hold widget data that can be updated via polling
  const [widgetData, setWidgetData] = useState({
    label,
    items,
  });

  // Set up polling if refreshInterval is provided
  useWidgetPolling({
    name,
    refreshInterval,
    seal,
    onUpdate: (data) => {
      setWidgetData({
        label: data.label ?? widgetData.label,
        items: data.items ?? widgetData.items,
      });
    },
  });
  if (!widgetData.items || widgetData.items.length === 0) {
    return (
      <div className={`bg-box border-box-border rounded-lg border shadow-sm ${className}`}>
        {widgetData.label && (
          <div className="px-6 py-4 border-b border-box-border">
            <h3 className="text-lg font-semibold text-foreground">{widgetData.label}</h3>
          </div>
        )}
        <div className="p-6 text-center text-muted-foreground">
          {emptyState}
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-box border-box-border rounded-lg border shadow-sm ${className}`}>
      {widgetData.label && (
        <div className="px-6 py-4 border-b border-box-border">
          <h3 className="text-lg font-semibold text-foreground">{widgetData.label}</h3>
        </div>
      )}
      <ul className="divide-y divide-border">
        {widgetData.items.map((item, index) => (
          <ListItem
            key={index}
            item={item}
            hasAction={hasAction}
          />
        ))}
      </ul>
    </div>
  );
}

function ListItem({ item, hasAction }) {
  const colorClasses = {
    primary: 'text-blue-600 dark:text-blue-400',
    secondary: 'text-gray-600 dark:text-gray-400',
    success: 'text-green-600 dark:text-green-400',
    danger: 'text-red-600 dark:text-red-400',
    warning: 'text-yellow-600 dark:text-yellow-400',
    info: 'text-cyan-600 dark:text-cyan-400',
  };

  const iconColorClass = item.color ? colorClasses[item.color] : 'text-muted-foreground';

  return (
    <li className={`px-6 py-4 ${hasAction ? 'hover:bg-muted/50 cursor-pointer' : ''}`}>
      <div className="flex items-start gap-3">
        {item.icon && (
          <div className="flex-shrink-0 mt-0.5">
            <Icon icon={item.icon} className={`h-5 w-5 ${iconColorClass}`} />
          </div>
        )}
        <div className="flex-1 min-w-0">
          {item.description && (
            <p className="text-sm font-medium text-foreground">
              {item.description}
            </p>
          )}
          {item.time && (
            <p className="text-xs text-muted-foreground mt-1">
              {item.time}
            </p>
          )}
        </div>
      </div>
    </li>
  );
}
