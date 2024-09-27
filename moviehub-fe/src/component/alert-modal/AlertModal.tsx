import { Dialog } from "@headlessui/react";
import {
  CheckIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";
import IAlertModal from "./IAlertModal";

export default function AlertModal({
  open,
  setOpen,
  title,
  message,
  buttonTitle,
  onClick,
  success,
}: IAlertModal) {
  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      className="relative z-10"
    >
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75" />
      <div className="fixed inset-0 z-10 flex items-center justify-center">
        <div className="bg-white rounded-md shadow-xl w-full sm:max-w-lg md:max-w-md lg:w-[30rem] h-max py-1">
          <div className="px-4 py-5">
            <div className="flex flex-col items-center">
              <div
                className={`flex-shrink-0 mx-auto flex items-center justify-center h-12 w-12 rounded-full ${
                  success ? "bg-green-100" : "bg-red-100"
                } sm:mx-0 sm:h-10 sm:w-10`}
              >
                {success ? (
                  <CheckIcon
                    className="h-6 w-6 text-green-500"
                    aria-hidden="true"
                  />
                ) : (
                  <ExclamationTriangleIcon
                    className="h-6 w-6 text-red-600"
                    aria-hidden="true"
                  />
                )}
              </div>
              <div className="mt-3 text-center sm:text-center">
                <Dialog.Title className="text-lg font-medium leading-6 text-gray-900">
                  {title}
                </Dialog.Title>
                <div className="mt-4">
                  <p className="text-sm text-gray-500">{message}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="px-4 py-3 sm:px-6 flex justify-center">
            <button
              type="button"
              onClick={() => {
                if (onClick) {
                  onClick();
                }
                setOpen(false);
              }}
              className={`w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 ${
                success ? "bg-green-600" : "bg-red-600"
              } text-base font-medium text-white ${
                success ? "hover:bg-green-700" : "hover:bg-red-700"
              } sm:ml-3 sm:w-auto sm:text-sm`}
            >
              {buttonTitle ? buttonTitle : "Back"}
            </button>
          </div>
        </div>
      </div>
    </Dialog>
  );
}