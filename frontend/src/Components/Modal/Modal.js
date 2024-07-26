import React from 'react';

const Modal = ({ show, handleClose, children, title }) => {
    if (!show) return null;

    return (
        <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                    <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                </div>
                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                <div 
                    role="dialog" 
                    aria-labelledby="modal-title" 
                    aria-describedby="modal-description"
                    className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
                >
                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <h3 id="modal-title" className="text-lg font-medium leading-6 text-gray-900">
                            {title}
                        </h3>
                        <div id="modal-description" className="mt-2">
                            {children}
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
    );
};

export default Modal;
