import React from 'react';
import Widget from './Widget';

export default function Widgets({ widgets = {}, columns = 1, seal, className = '' }) {
  const widgetEntries = Object.entries(widgets);

  if (widgetEntries.length === 0) {
    return null;
  }

  const gridClass = `grid gap-6 grid-cols-1 ${
    columns === 2 ? 'md:grid-cols-2' :
    columns === 3 ? 'md:grid-cols-3' :
    columns === 4 ? 'md:grid-cols-4' :
    ''
  }`;

  return (
    <div className={`${gridClass} ${className}`}>
      {widgetEntries.map(([key, widgetProps]) => (
        <Widget key={key} seal={seal} {...widgetProps} />
      ))}
    </div>
  );
}
