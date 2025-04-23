import CloseIcon from "./CloseIcon";
import ImageCropper from "./ImageCropper";

const Modal = ({ updateAvatar, closeModal }) => {
  return (
    <div
      className="relative z-50"
      aria-labelledby="crop-image-dialog"
      role="dialog"
      aria-modal="true"
    >
      <div className="fixed inset-0 bg-gray-900 opacity-50 transition-all backdrop-blur-sm"></div>
      <div className="fixed transform left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full justify-center px-2 py-12 text-center ">
          <div className="relative w-full max-w-xl h-full rounded-2xl bg-background text-slate-100 text-left shadow-xl transition-all">
            <div className="px-5 py-4">
              <button
                type="button"
                className="rounded-md p-1 inline-flex items-center justify-center text-gray-400 hover:bg-gray-700 focus:outline-none absolute top-2 right-2"
                onClick={closeModal}
              >
                <span className="sr-only">Close menu</span>
                <CloseIcon />
              </button>
              <ImageCropper
                updateAvatar={updateAvatar}
                closeModal={closeModal}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Modal;
