import DeleteButton from './DeleteButton';
import EditButton from './EditButton';

export interface EditStripProps {
  onEdit: () => void;
  onDelete: () => void;
}

const EditStrip = ({ onEdit, onDelete }: EditStripProps) => {
  return (
    <div className="flex items-center -space-x-4 hover:space-x-1">
      <EditButton onClick={onEdit} />
      <DeleteButton onClick={onDelete} />
    </div>
  );
};

export default EditStrip;
