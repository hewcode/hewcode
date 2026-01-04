import React, { useState } from 'react';
import { Icon } from '../icon-registry';
import Actions from '../actions/Actions';
import useWidgetPolling from './useWidgetPolling';

export default function CardWidget({
  name,
  seal,
  heading,
  description,
  content,
  icon,
  color = 'primary',
  actions = {},
  refreshInterval,
  className = '',
}) {
  // Use state to hold widget data that can be updated via polling
  const [widgetData, setWidgetData] = useState({
    heading,
    description,
    content,
  });

  // Set up polling if refreshInterval is provided
  useWidgetPolling({
    name,
    refreshInterval,
    seal,
    onUpdate: (data) => {
      setWidgetData({
        heading: data.heading ?? widgetData.heading,
        description: data.description ?? widgetData.description,
        content: data.content ?? widgetData.content,
      });
    },
  });
  const colorClasses = {
    primary: 'border-blue-200 dark:border-blue-900 bg-blue-50 dark:bg-blue-950/50',
    secondary: 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800',
    success: 'border-green-200 dark:border-green-900 bg-green-50 dark:bg-green-950/50',
    danger: 'border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-950/50',
    warning: 'border-yellow-200 dark:border-yellow-900 bg-yellow-50 dark:bg-yellow-950/50',
    info: 'border-cyan-200 dark:border-cyan-900 bg-cyan-50 dark:bg-cyan-950/50',
  };

  const iconColorClasses = {
    primary: 'text-blue-600 dark:text-blue-400',
    secondary: 'text-gray-600 dark:text-gray-400',
    success: 'text-green-600 dark:text-green-400',
    danger: 'text-red-600 dark:text-red-400',
    warning: 'text-yellow-600 dark:text-yellow-400',
    info: 'text-cyan-600 dark:text-cyan-400',
  };

  const borderColorClass = color ? colorClasses[color]?.split(' ').slice(0, 2).join(' ') : 'border-gray-200 dark:border-gray-700';
  const bgColorClass = color ? colorClasses[color]?.split(' ').slice(2).join(' ') : 'bg-gray-50 dark:bg-gray-800';
  const iconColorClass = color ? iconColorClasses[color] : 'text-gray-600 dark:text-gray-400';

  return (
    <div className={`bg-box rounded-lg border shadow-sm ${borderColorClass} ${className}`}>
      {(widgetData.heading || icon) && (
        <div className={`px-6 py-4 border-b ${borderColorClass} ${bgColorClass}`}>
          <div className="flex items-center gap-3">
            {icon && (
              <Icon icon={icon} className={`h-6 w-6 ${iconColorClass}`} />
            )}
            {widgetData.heading && (
              <h3 className="text-lg font-semibold text-foreground">{widgetData.heading}</h3>
            )}
          </div>
        </div>
      )}

      <div className="p-6">
        {widgetData.description && (
          <p className="text-muted-foreground mb-4">{widgetData.description}</p>
        )}

        {widgetData.content && (
          <div
            className="prose prose-sm dark:prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: widgetData.content }}
          />
        )}

        {actions && Object.keys(actions).length > 0 && (
          <div className="mt-4 pt-4 border-t border-border">
            <Actions seal={seal} actions={actions} spacing="space-x-3" />
          </div>
        )}
      </div>
    </div>
  );
}
