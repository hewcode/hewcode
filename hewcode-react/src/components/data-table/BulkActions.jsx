import { router } from '@inertiajs/react';
import { Button } from '../ui/button.jsx';
import { X } from 'lucide-react';

const BulkActions = ({ selectedCount, bulkActions, selectedRecords, onClearSelection }) => {
  const executeAction = (action) => {
    // Execute the bulk action via the centralized _chisel/action route
    router.post('/_hewcode/action', {
      component: action.component,
      action: {
        name: action.name,
        recordIds: selectedRecords,
        args: {},
      },
      route: action.route,
      hash: action.hash,
    }, {
      onSuccess: () => {
        onClearSelection();
      },
      onError: (errors) => {
        console.error('Bulk action failed:', errors);
      }
    });
  };

  const getButtonVariant = (color) => {
    switch (color) {
      case 'danger':
        return 'destructive';
      case 'primary':
        return 'default';
      case 'secondary':
        return 'secondary';
      default:
        return 'outline';
    }
  };

  return (
    <div className="flex items-center justify-between p-4 bg-muted/50 border rounded-lg mb-4">
      <div className="flex items-center gap-4">
        <span className="text-sm font-medium">
          {selectedCount} {selectedCount === 1 ? 'item' : 'items'} selected
        </span>

        <div className="flex items-center gap-2">
          {bulkActions.map((action) => (
            <Button
              key={action.name}
              variant={getButtonVariant(action.color)}
              size="sm"
              onClick={() => executeAction(action)}
            >
              {action.label}
            </Button>
          ))}
        </div>
      </div>

      <Button
        variant="ghost"
        size="sm"
        onClick={onClearSelection}
        className="h-8 w-8 p-0"
      >
        <X className="h-4 w-4" />
        <span className="sr-only">Clear selection</span>
      </Button>
    </div>
  );
};

export default BulkActions;
