import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";

function MenuItemCreate() {
  const [menuGroup, setMenuGroup] = useState("");
  const [menuName, setMenuName] = useState("");
  const [url, setUrl] = useState("");
  const [icon, setIcon] = useState("");
  const [sortOrder, setSortOrder] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="flex flex-col w-full  bg-white p-10 rounded-lg shadow-sm">
      <h2 className="text-2xl  mb-8 text-gray-800">Menu Group Information</h2>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-2 gap-15">
          <div>
            <label className="text-sm font-medium text-gray-700 ">
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
              onChange={(e) => setSortOrder(e.target.value)}
              placeholder="Enter Sort Order"
              className="mt-2 h-12 bg-gray-50 text-gray-600 border-gray-200 focus:ring-1 focus:ring-gray-400 placeholder:text-gray-400"
            />
          </div>
        </div>

        <div className="flex justify-end gap-4 pt-6 ">
          <Button
            asChild
            type="button"
            className="bg-gray-300 text-gray-700 hover:bg-gray-400 rounded-md px-6 py-2"
          >
            <Link to={"/menuitem"}>Cancel</Link>
          </Button>
          <Button
            type="submit"
            className="bg-[#bbcdbf] text-gray-800 hover:bg-[#a6bfb1] rounded-md px-6 py-2"
            onClick={() => {
              setMenuGroup("");
              setMenuName("");
              setUrl("");
              setSortOrder("");
              setIcon("");
            }}
          >
            Create
          </Button>
        </div>
      </form>
    </div>
  );
}

export default MenuItemCreate;
