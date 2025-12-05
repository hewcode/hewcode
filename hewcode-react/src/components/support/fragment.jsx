import { Badge as ShadcnBadge } from '../ui/badge.jsx';

export default function Fragment({ value }) {
  if (!(value instanceof Object) || !('__hcf' in value)) {
    return value;
  }

  if (value._badge) {
    const icon = value._badge.icon;
    const badgeProps = {
      variant: value._badge.variant || 'default',
    };

    const iconElement = icon ? (
      <svg
        width={icon.size}
        height={icon.size}
        className="inline-block !size-auto flex-shrink-0"
        style={{ width: icon.size, height: icon.size }}
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <use href={`#${icon.name}`} />
      </svg>
    ) : null;

    return (
      <ShadcnBadge {...badgeProps}>
        {icon?.position === 'before' && iconElement}
        <Fragment value={value._badge.label} />
        {icon?.position === 'after' && iconElement}
      </ShadcnBadge>
    );
  }

  return <span className="hewcode-fragment">{value._text}</span>;
}
