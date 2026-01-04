import React from 'react';
import StatsWidget from './StatsWidget';
import ListWidget from './ListWidget';
import ListingWidget from './ListingWidget';
import CardWidget from './CardWidget';
import ChartWidget from './ChartWidget';
import InfoWidget from './InfoWidget';

const widgetComponentMap = {
  'stats': StatsWidget,
  'list': ListWidget,
  'listing': ListingWidget,
  'card': CardWidget,
  'chart': ChartWidget,
  'info': InfoWidget,
};

export default function Widget({ type, seal, ...props }) {
  const WidgetComponent = widgetComponentMap[type];

  if (!WidgetComponent) {
    console.warn(`Unknown widget type: ${type}`);
    return null;
  }

  return <WidgetComponent seal={seal} {...props} />;
}
