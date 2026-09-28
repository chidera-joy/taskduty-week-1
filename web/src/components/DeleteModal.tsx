type DeleteModalProps = {
  onCancel: () => void;
  onConfirm: () => void;
};

const DeleteModal = ({ onCancel, onConfirm }: DeleteModalProps) => {
  return (
    <div className="fixed inset-0 backdrop-blur-xs bg-black/40 flex items-center justify-center z-50 px-5 ">
      <div className="bg-white rounded-lg p-6 w-full max-w-md space-y-5 shadow-black/20 shadow-xl">
        <h2 className="text-2xl font-semibold">Delete Task</h2>

        <p className="text-secondary">
          Are you sure you want to delete this task?
        </p>

        <div className="flex justify-end gap-3">
          <button
            type="button"
            className="border bg-violet text-white hover:border hover:border-violet px-4 py-2 rounded-sm cursor-pointer"
            onClick={onCancel}
          >
            Cancel
          </button>

          <button
            type="button"
            className=" text-red-500 border border-red-500 hover:text-white hover:bg-red-500 px-4 py-2 rounded-sm cursor-pointer"
            onClick={onConfirm}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
