import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
// import { capitalizeCamelCase } from "@/lib/utils";
import {
  Edit,
  Trash2,
  FolderUp,
  Plus,
  ChevronRight,
  ChevronsRight,
  ChevronLeft,
  ChevronsLeft,
  Search,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { DeleteDialog } from "@/components/ui/DeleteDialog";
import { useEffect } from "react";
import { useDataStore } from "@/stores/useDataStore";

type Location = {
  locationCode: string;
  name: string;
  latitude: string;
  longitude: string;
  radius: string;
  createdAt: string;
  createdBy: string;
  modifiedBy: string | null;
  modifiedAt: string | null;
  deleteFlag: boolean;
};

export default function Location() {
  const navigate = useNavigate();
  // const [data, setData] = useState([
  //   {
  //     id: 1,
  //     location: "Insein",
  //     latitude: 16.9028,
  //     longitude: 96.1317,
  //     radius: 3.5,
  //   },
  //   {
  //     id: 2,
  //     location: "Hlaing",
  //     latitude: 16.8307,
  //     longitude: 96.1345,
  //     radius: 2.0,
  //   },
  //   {
  //     id: 3,
  //     location: "Mayangone",
  //     latitude: 16.8664,
  //     longitude: 96.1251,
  //     radius: 4.0,
  //   },
  //   {
  //     id: 4,
  //     location: "Sanchaung",
  //     latitude: 16.8055,
  //     longitude: 96.1399,
  //     radius: 2.5,
  //   },
  //   {
  //     id: 5,
  //     location: "Bahan",
  //     latitude: 16.811,
  //     longitude: 96.1601,
  //     radius: 3.0,
  //   },
  //   {
  //     id: 6,
  //     location: "Kamayut",
  //     latitude: 16.8284,
  //     longitude: 96.1305,
  //     radius: 2.5,
  //   },
  //   {
  //     id: 7,
  //     location: "Thingangyun",
  //     latitude: 16.8211,
  //     longitude: 96.1877,
  //     radius: 3.5,
  //   },
  //   {
  //     id: 8,
  //     location: "South Oakkalapa",
  //     latitude: 16.8554,
  //     longitude: 96.195,
  //     radius: 3.0,
  //   },
  //   {
  //     id: 9,
  //     location: "North Dagon",
  //     latitude: 16.9106,
  //     longitude: 96.2153,
  //     radius: 4.5,
  //   },
  //   {
  //     id: 10,
  //     location: "Tamwe",
  //     latitude: 16.8119,
  //     longitude: 96.1777,
  //     radius: 2.0,
  //   },
  //   {
  //     id: 11,
  //     location: "Yankin",
  //     latitude: 16.8397,
  //     longitude: 96.1484,
  //     radius: 2.5,
  //   },
  //   {
  //     id: 12,
  //     location: "Mingalar Taung Nyunt",
  //     latitude: 16.7869,
  //     longitude: 96.1761,
  //     radius: 3.0,
  //   },
  //   {
  //     id: 13,
  //     location: "Thaketa",
  //     latitude: 16.8234,
  //     longitude: 96.2156,
  //     radius: 4.0,
  //   },
  //   {
  //     id: 14,
  //     location: "Dagon Seikkan",
  //     latitude: 16.9245,
  //     longitude: 96.2489,
  //     radius: 5.0,
  //   },
  //   {
  //     id: 15,
  //     location: "East Dagon",
  //     latitude: 16.9567,
  //     longitude: 96.2267,
  //     radius: 4.5,
  //   },
  //   {
  //     id: 16,
  //     location: "North Oakkalapa",
  //     latitude: 16.8789,
  //     longitude: 96.1834,
  //     radius: 3.5,
  //   },
  //   {
  //     id: 17,
  //     location: "Pazundaung",
  //     latitude: 16.7845,
  //     longitude: 96.1823,
  //     radius: 2.5,
  //   },
  //   {
  //     id: 18,
  //     location: "Botahtaung",
  //     latitude: 16.7712,
  //     longitude: 96.1689,
  //     radius: 2.0,
  //   },
  //   {
  //     id: 19,
  //     location: "Dagon",
  //     latitude: 16.7934,
  //     longitude: 96.1556,
  //     radius: 2.5,
  //   },
  //   {
  //     id: 20,
  //     location: "Seikkan",
  //     latitude: 16.9134,
  //     longitude: 96.2567,
  //     radius: 4.5,
  //   },
  //   {
  //     id: 21,
  //     location: "Kyauktada",
  //     latitude: 16.7812,
  //     longitude: 96.1534,
  //     radius: 1.5,
  //   },
  //   {
  //     id: 22,
  //     location: "Pabedan",
  //     latitude: 16.7756,
  //     longitude: 96.1489,
  //     radius: 1.5,
  //   },
  //   {
  //     id: 23,
  //     location: "Lanmadaw",
  //     latitude: 16.7689,
  //     longitude: 96.1423,
  //     radius: 2.0,
  //   },
  //   {
  //     id: 24,
  //     location: "Latha",
  //     latitude: 16.7734,
  //     longitude: 96.1378,
  //     radius: 1.5,
  //   },
  //   {
  //     id: 25,
  //     location: "Ahlone",
  //     latitude: 16.7823,
  //     longitude: 96.1234,
  //     radius: 2.5,
  //   },
  //   {
  //     id: 26,
  //     location: "Kyimyindaing",
  //     latitude: 16.8012,
  //     longitude: 96.1189,
  //     radius: 3.0,
  //   },
  //   {
  //     id: 27,
  //     location: "Sanchaung East",
  //     latitude: 16.8123,
  //     longitude: 96.1456,
  //     radius: 2.0,
  //   },
  //   {
  //     id: 28,
  //     location: "Hlaing Thar Yar",
  //     latitude: 16.8734,
  //     longitude: 96.0623,
  //     radius: 5.5,
  //   },
  //   {
  //     id: 29,
  //     location: "Shwe Pyi Thar",
  //     latitude: 16.9234,
  //     longitude: 96.0845,
  //     radius: 5.0,
  //   },
  //   {
  //     id: 30,
  //     location: "Mingaladon",
  //     latitude: 16.9456,
  //     longitude: 96.1123,
  //     radius: 4.5,
  //   },
  //   {
  //     id: 31,
  //     location: "Hlegu",
  //     latitude: 17.0789,
  //     longitude: 96.2345,
  //     radius: 6.0,
  //   },
  //   {
  //     id: 32,
  //     location: "Hmawbi",
  //     latitude: 17.0234,
  //     longitude: 96.0567,
  //     radius: 5.5,
  //   },
  //   {
  //     id: 33,
  //     location: "Htantabin",
  //     latitude: 17.1234,
  //     longitude: 96.2678,
  //     radius: 6.5,
  //   },
  //   {
  //     id: 34,
  //     location: "Taikkyi",
  //     latitude: 17.0456,
  //     longitude: 95.9834,
  //     radius: 5.0,
  //   },
  //   {
  //     id: 35,
  //     location: "Dala",
  //     latitude: 16.7345,
  //     longitude: 96.1456,
  //     radius: 3.5,
  //   },
  //   {
  //     id: 36,
  //     location: "Seikkyi Kanaungto",
  //     latitude: 16.6789,
  //     longitude: 96.1234,
  //     radius: 4.0,
  //   },
  //   {
  //     id: 37,
  //     location: "Twante",
  //     latitude: 16.7123,
  //     longitude: 95.9567,
  //     radius: 4.5,
  //   },
  //   {
  //     id: 38,
  //     location: "Kungyangon",
  //     latitude: 16.4567,
  //     longitude: 96.2345,
  //     radius: 5.5,
  //   },
  //   {
  //     id: 39,
  //     location: "Kawhmu",
  //     latitude: 16.5234,
  //     longitude: 96.3456,
  //     radius: 5.0,
  //   },
  //   {
  //     id: 40,
  //     location: "Kayan",
  //     latitude: 16.6123,
  //     longitude: 96.4567,
  //     radius: 4.5,
  //   },
  //   {
  //     id: 41,
  //     location: "South Dagon",
  //     latitude: 16.8567,
  //     longitude: 96.2234,
  //     radius: 4.0,
  //   },
  //   {
  //     id: 42,
  //     location: "Dawbon",
  //     latitude: 16.7889,
  //     longitude: 96.1934,
  //     radius: 3.0,
  //   },
  //   {
  //     id: 43,
  //     location: "Thakayta East",
  //     latitude: 16.8345,
  //     longitude: 96.2289,
  //     radius: 3.5,
  //   },
  //   {
  //     id: 44,
  //     location: "Hlaing River",
  //     latitude: 16.8456,
  //     longitude: 96.1089,
  //     radius: 2.5,
  //   },
  //   {
  //     id: 45,
  //     location: "Kyeemyindaing West",
  //     latitude: 16.7967,
  //     longitude: 96.1123,
  //     radius: 2.0,
  //   },
  //   {
  //     id: 46,
  //     location: "Sanchaung North",
  //     latitude: 16.8189,
  //     longitude: 96.1423,
  //     radius: 2.5,
  //   },
  //   {
  //     id: 47,
  //     location: "Yankin East",
  //     latitude: 16.8456,
  //     longitude: 96.1567,
  //     radius: 2.0,
  //   },
  //   {
  //     id: 48,
  //     location: "Tamwe North",
  //     latitude: 16.8234,
  //     longitude: 96.1823,
  //     radius: 2.5,
  //   },
  //   {
  //     id: 49,
  //     location: "Bahan North",
  //     latitude: 16.8189,
  //     longitude: 96.1678,
  //     radius: 2.5,
  //   },
  //   {
  //     id: 50,
  //     location: "Kamayut East",
  //     latitude: 16.8356,
  //     longitude: 96.1389,
  //     radius: 2.0,
  //   },
  // ]);

  const { data, loading, error, fetchData } = useDataStore();

  useEffect(() => {
    loadLocations();
  }, []);

  const loadLocations = () => {
    fetchData({ url: `${import.meta.env.VITE_API_URL}/Location/list` });
  };

  const locations: Location[] = data?.data?.items || [];

  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const totalPages = Math.ceil(locations.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const currentData = locations.slice(startIndex, startIndex + rowsPerPage);
  const totalRows = locations.length;
  const startRow = (currentPage - 1) * rowsPerPage + 1;
  const endRow = Math.min(currentPage * rowsPerPage, totalRows);
  const goPrev = () => setCurrentPage((p) => Math.max(p - 1, 1));
  const goNext = () => setCurrentPage((p) => Math.min(p + 1, totalPages));
  const goToLast = () => setCurrentPage(totalPages);
  const goToFirst = () => setCurrentPage(1);

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedLocationId, setSelectedLocationId] = useState<string | null>(
    null
  );

  const goToCreateForm = () => navigate("/location/create");
  const goToEditForm = (locationCode: string) =>
    navigate(`/location/edit/${locationCode}`);
  const goToDetailView = (locationCode: string) =>
    navigate(`/location/detail/${locationCode}`);

  const openDeleteDialog = (locationCode: string) => {
    setSelectedLocationId(locationCode);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (selectedLocationId) {
      const result = await fetchData({
        url: `${
          import.meta.env.VITE_API_URL
        }/Location/delete/${selectedLocationId}`,
        method: "DELETE",
      });
      if (result?.isSuccess) {
        loadLocations();
      }
      // console.log("Deleted location:", selectedLocationId);

      // Close dialog and reset
      setDeleteDialogOpen(false);
      setSelectedLocationId(null);
    }
  };

  // const handleDeleteCancel = () => {
  //   setDeleteDialogOpen(false);
  //   setSelectedLocationId(null);
  // };

  // console.log(locations);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="p-6 w-full flex-1 bg-[#f0f3f1]">
      <div className="flex justify-between flex-col md:flex-row mb-4">
        <p className="font-bold text-2xl">Location</p>

        <div className="flex gap-2 flex-col md:flex-row ">
          {/* search */}
          <div className="relative w-full md:w-[50%] text-primary-800">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-primary-800 h-4 w-4" />
            <Input
              type="text"
              placeholder="Search..."
              className="focus-visible:ring-[1px] focus-visible:ring-ring focus-visible:ring-offset-0 pl-9" // Add left padding so text doesn’t overlap the icon
            />
          </div>
          {/* buttons */}
          <Button className="outline-btn">
            <FolderUp />
            Export
          </Button>
          <Button className="outline-btn" onClick={goToCreateForm}>
            <Plus />
            Add new
          </Button>
        </div>
      </div>

      <Table className="w-full overflow-auto shadow-sm rounded-md text-center">
        <TableHeader className="bg-primary-300">
          <TableRow className="border-none ">
            {/* {Object.keys(locations[0]).map((columnName) => (
              <TableHead key={columnName}>
                {columnName === "id" ? "No" : capitalizeCamelCase(columnName)}
              </TableHead>
            ))} */}
            <TableHead className="text-center">No</TableHead>
            <TableHead className="text-center">Name</TableHead>
            <TableHead className="text-center">Latitude</TableHead>
            <TableHead className="text-center">Longitude</TableHead>
            <TableHead className="text-center">Radius</TableHead>
            <TableHead className="text-center">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentData.map((location, index) => (
            <TableRow
              key={index}
              className="odd:bg-primary-100 even:bg-primary-50 hover:bg-primary-200 transition-colors border-none py-3 "
              onClick={() => goToDetailView(location.locationCode)}
            >
              <TableCell>{index + 1}</TableCell>
              <TableCell>{location.name}</TableCell>
              <TableCell>{location.latitude}</TableCell>
              <TableCell>{location.longitude}</TableCell>
              <TableCell>{location.radius}</TableCell>

              <TableCell className="flex justify-center">
                <Edit
                  className="text-emerald-500 cursor-pointer hover:text-emerald-700 mr-4"
                  size={22}
                  onClick={(e) => {
                    e.stopPropagation();
                    goToEditForm(location.locationCode);
                  }}
                />
                <Trash2
                  className="text-red-500 cursor-pointer hover:text-red-700"
                  size={22}
                  onClick={(e) => {
                    e.stopPropagation();
                    openDeleteDialog(location.locationCode);
                  }}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Paginations */}
      <div className="flex flex-col space-y-3 md:space-y-0 md:flex-row  items-center justify-between p-4 border-t ">
        {/* Left: Showing rows */}
        <div className="text-sm text-muted-foreground">
          {startRow}–{endRow} of {totalRows}
        </div>

        {/* Middle: Page buttons */}
        <div className="flex space-x-1">
          <button
            onClick={goToFirst}
            disabled={currentPage === 1}
            className="px-2 py-1 rounded pagination-btn disabled:opacity-50"
          >
            <ChevronsLeft />
          </button>
          <button
            onClick={goPrev}
            disabled={currentPage === 1}
            className="px-2 py-1 rounded pagination-btn disabled:opacity-50"
          >
            <ChevronLeft />
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-3 py-1 rounded ${
                page === currentPage
                  ? "bg-primary-500 text-natural-50"
                  : "bg-natural-50 text-black hover:bg-gray-200"
              }`}
            >
              {page}
            </button>
          ))}
          <button
            onClick={goNext}
            disabled={currentPage === totalPages}
            className="px-2 py-1 rounded pagination-btn disabled:opacity-50"
          >
            <ChevronRight />
          </button>
          <button
            onClick={goToLast}
            disabled={currentPage === totalPages}
            className="px-2 py-1 rounded pagination-btn disabled:opacity-50"
          >
            <ChevronsRight />
          </button>
        </div>

        {/* Right: Rows per page */}
        <div className="flex items-center space-x-2">
          <span className="text-sm text-muted-foreground">Rows/page:</span>
          <select
            value={rowsPerPage}
            onChange={(e) => {
              setRowsPerPage(Number(e.target.value));
              setCurrentPage(1); // reset page
            }}
            className="border rounded px-2 py-1 text-sm p-3"
          >
            {[10, 20, 30, 50].map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      <DeleteDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  );
}
