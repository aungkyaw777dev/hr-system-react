import * as Dialog from "@radix-ui/react-dialog";
import { RefreshCw, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

function MenuGroupEdit() {
  const location = useLocation();
  const item = location.state?.item;

  const [menuGroup, setMenuGroup] = useState("");
  const [menuName, setMenuName] = useState("");
  const [url, setUrl] = useState("");
  const [icon, setIcon] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  useEffect(() => {
    if (item) {
      setMenuGroup(item.group);
      setMenuName(item.name);
      setUrl(item.url);
      setIcon(item.icon);
      setSortOrder(String(item.order));
    }
  }, [item]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowSuccessModal(true);

    setTimeout(() => setShowSuccessModal(false), 2000);
  };

  return (
    <>
      <div className="flex flex-col w-full bg-white p-10 rounded-lg shadow-sm">
        <h2 className="text-2xl mb-8 text-gray-800">Menu Group Information</h2>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-2 gap-15">
            <div>
              <label className="text-sm font-medium text-gray-700">
                Menu Group Name
              </label>
              <Input
                type="text"
                value={menuGroup}
                onChange={(e) => setMenuGroup(e.target.value)}
                placeholder="Enter Menu Group Name"
                className="mt-2 h-12 bg-gray-50 text-gray-600 border-gray-200 focus:ring-1 focus:ring-gray-400 placeholder:text-gray-400"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">
                Menu Name
              </label>
              <Input
                type="text"
                value={menuName}
                onChange={(e) => setMenuName(e.target.value)}
                placeholder="Enter Menu Name"
                className="mt-2 h-12 bg-gray-50 text-gray-600 border-gray-200 focus:ring-1 focus:ring-gray-400 placeholder:text-gray-400"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-15 mt-4">
            <div>
              <label className="text-sm font-medium text-gray-700">URL</label>
              <Input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Enter URL"
                className="mt-2 h-12 bg-gray-50 text-gray-600 border-gray-200 focus:ring-1 focus:ring-gray-400 placeholder:text-gray-400"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Icon</label>
              <Input
                type="text"
                value={icon}
                onChange={(e) => setIcon(e.target.value)}
                placeholder="Enter Icon"
                className="mt-2 h-12 bg-gray-50 text-gray-600 border-gray-200 focus:ring-1 focus:ring-gray-400 placeholder:text-gray-400"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-15 mt-4">
            <div>
              <label className="text-sm font-medium text-gray-700">
                Sort Order
              </label>
              <Input
                type="text"
                value={sortOrder}
                onChange={(e) =>
                  setSortOrder(e.target.value.replace(/\D/g, ""))
                }
                placeholder="Enter Sort Order"
                className="mt-2 h-12 bg-gray-50 text-gray-600 border-gray-200 focus:ring-1 focus:ring-gray-400 placeholder:text-gray-400"
              />
            </div>
          </div>

          <div className="flex justify-end gap-4 pt-6">
            <Button asChild type="button" className="outline-btn">
              <Link to={"/menuitem"}>Cancel</Link>
            </Button>
            <Button
              type="submit"
              className="outline-btn"
              onClick={() => {
                setMenuGroup("");
                setMenuName("");
                setUrl("");
                setSortOrder("");
                setIcon("");
              }}
            >
              Update
            </Button>
          </div>
        </form>
      </div>

      <Dialog.Root open={showSuccessModal} onOpenChange={setShowSuccessModal}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/30" />
          <Dialog.Content className="fixed top-1/2 left-1/2 w-[380px] h-[280px] -translate-x-1/2 -translate-y-1/2 bg-[#f3f6f4] rounded-xl shadow-md p-10 flex flex-col items-center justify-center space-y-4">
            <button
              onClick={() => setShowSuccessModal(false)}
              className="absolute right-4 top-4 opacity-70 hover:opacity-100"
            >
              <X className="h-4 w-4 text-gray-600" />
            </button>
            <RefreshCw className="h-24 w-24 text-gray-400" />
            <p className="text-sm font-medium text-gray-400">
              Update Successfully
            </p>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
}

export default MenuGroupEdit;
