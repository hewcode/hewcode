import Action from "./Action";

export default function Actions({ actions, className = "", spacing = "space-x-2", onSuccess, onError }) {
  if (!actions || Object.keys(actions).length === 0) {
    return null;
  }

  return (
    <div className={`flex items-center ${spacing} ${className}`}>
      {Object.entries(actions).map(([key, actionProps]) => (
        <Action
          key={key}
          {...actionProps}
          onSuccess={onSuccess}
          onError={onError}
        />
      ))}
    </div>
  );
}
