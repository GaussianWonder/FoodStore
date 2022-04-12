import AddButton from './AddButton';
import DeleteButton from './DeleteButton';
import EditButton from './EditButton';

export interface CrudStripProps {
  onAdd: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

const CrudStrip = ({ onAdd, onEdit, onDelete }: CrudStripProps) => {
  return (
    <div className="flex items-center -space-x-4 hover:space-x-1">
      <AddButton onClick={onAdd} />
      <EditButton onClick={onEdit} />
      <DeleteButton onClick={onDelete} />
    </div>
  );
};

export default CrudStrip;
