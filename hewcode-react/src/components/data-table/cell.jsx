import Fragment from '../support/fragment.jsx';
import { Icon } from '../icon-registry.jsx';

export default function CellContent({ record, column }) {
  if (column.render) {
    return column.render(record[column.key], record);
  }

  const beforeContent = record[column.key + '_before'];
  const afterContent = record[column.key + '_after'];
  const color = record[column.key + '_color']; // @todo: use color
  const iconData = record[column.key + '_icon'];

  // Create icon element if icon data exists
  const iconElement = iconData ? <Icon icon={iconData} /> : null;

  const value = record[column.key];
  let mainContent = <Fragment value={value} />;

  if (!column.badge && iconElement) {
    if (iconData.position === 'before') {
      mainContent = (
        <span className="inline-flex items-center gap-2">
          {iconElement}
          {mainContent}
        </span>
      );
    } else if (iconData.position === 'after') {
      mainContent = (
        <span className="inline-flex items-center gap-2">
          {mainContent}
          {iconElement}
        </span>
      );
    }
  }

  // If there's before or after content, wrap in a div
  if (beforeContent || afterContent) {
    return (
      <div className="space-y-1">
        {beforeContent && (
          <div className="text-muted-foreground text-xs">
            <Fragment value={beforeContent} />
          </div>
        )}
        <div>{mainContent}</div>
        {afterContent && (
          <div className="text-muted-foreground text-xs">
            <Fragment value={afterContent} />
          </div>
        )}
      </div>
    );
  }

  return mainContent;
}
