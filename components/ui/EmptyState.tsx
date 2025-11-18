interface EmptyStateProps {
  title: string;
  description?: string;
  action?: {
    label: string;
    href: string;
  };
  icon?: React.ReactNode;
}

export function EmptyState({ title, description, action, icon }: EmptyStateProps) {
  return (
    <div className="text-center py-12 px-4">
      {icon && <div className="mb-4 flex justify-center">{icon}</div>}
      <h3 className="text-xl font-semibold text-sand-900 dark:text-sand-100 mb-2">
        {title}
      </h3>
      {description && (
        <p className="text-sand-600 dark:text-sand-400 mb-6 max-w-md mx-auto">
          {description}
        </p>
      )}
      {action && (
        <a
          href={action.href}
          className="inline-block px-6 py-3 bg-terracotta-600 hover:bg-terracotta-700 text-white rounded-lg font-semibold transition-colors"
        >
          {action.label}
        </a>
      )}
    </div>
  );
}

