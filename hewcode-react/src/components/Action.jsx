import { Button } from "./ui/button";
import { useState } from "react";

const colorMap = {
  primary: "default",
  warning: "destructive",
  secondary: "secondary",
  success: "default",
  danger: "destructive",
};

export default function Action({ route, component, hash, name, label, color = "primary", args = {}, recordId, onSuccess, onError }) {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);

    try {
      const response = await fetch('/_hewcode/action', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content'),
        },
        body: JSON.stringify({
          route,
          component,
          hash,
          action: {
            name,
            args,
            recordId,
          },
        }),
      });

      const data = await response.json();

      if (response.ok && onSuccess) {
          onSuccess(data.result);
      }
    } catch (error) {
      if (onError) {
        onError(error);
      } else {
        console.error('Action error:', error);
      }
    } finally {
      setLoading(false);
    }
  };

  if (! hash) {
    return null;
  }

  return (
    <Button
      variant={colorMap[color] || "default"}
      onClick={handleClick}
      disabled={loading}
    >
      {loading ? "Loading..." : label || name}
    </Button>
  );
}
