import React from 'react'

const ConfirmDeleteDialog = ({open, handleClose, deleteHandler}) => {
    if(!open) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center  bg-transparent">
    <div className="bg-white rounded-lg shadow-lg p-6 w-96">
      <h2 className="text-lg font-semibold">Confirm Delete</h2>
      <p className="mt-2 text-gray-600">Are you sure you want to delete this group?</p>
      <div className="mt-4 flex justify-end gap-3">
        <button
          onClick={handleClose}
          className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md"
        >
          No
        </button>
        <button
          onClick={deleteHandler}
          className="px-4 py-2 bg-red-600 text-white rounded-md  "
        >
          Yes
        </button>
      </div>
    </div>
  </div>
  )
}

export default ConfirmDeleteDialog
