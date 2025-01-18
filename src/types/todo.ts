export interface Todo {
  id: string;
  title: string;
  tasks: string[];
}

export interface TodoFormData {
  title: string;
  tasks: string[];
}

export interface TodoFormProps {
  onSubmit: (todo: TodoFormData) => void;
  initialData?: TodoFormData;
  mode: 'create' | 'edit';
}

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  primaryAction?: {
    label: string;
    onClick: () => void;
  };
  secondaryAction?: {
    label: string;
    onClick: () => void;
  };
}