import Button from "@/Pages/Admin/Components/Button";
import { useAuthStateContext } from "@/Utils/Contexts/AuthContext";

const MahasiswaTable = ({ data = [], onEdit, onDelete, onDetail, isLoading }) => {
  const { user } = useAuthStateContext();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-2 text-gray-600 font-medium">Memuat data...</span>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500 font-medium bg-gray-50 rounded border border-dashed">
        Tidak ada data mahasiswa.
      </div>
    );
  }

  return (
    <table className="w-full text-sm text-gray-700">
      <thead className="bg-blue-600 text-white">
        <tr>
          <th className="py-2 px-4 text-left">NIM</th>
          <th className="py-2 px-4 text-left">Nama</th>
          <th className="py-2 px-4 text-center">Aksi</th>
        </tr>
      </thead>
      <tbody>
        {data.map((mhs, index) => (
          <tr key={mhs.nim} className={index % 2 === 0 ? "bg-white" : "bg-gray-100"}>
            <td className="py-2 px-4">{mhs.nim}</td>
            <td className="py-2 px-4">{mhs.nama}</td>
            <td className="py-2 px-4 text-center space-x-2">
              {user?.permission?.includes("mahasiswa.read") && (
                <Button onClick={() => onDetail(mhs.id)}>Detail</Button>
              )}
              {user?.permission?.includes("mahasiswa.update") && (
                <Button size="sm" variant="warning" onClick={() => onEdit(mhs)}>
                  Edit
                </Button>
              )}
              {user?.permission?.includes("mahasiswa.delete") && (
                <Button size="sm" variant="danger" onClick={() => onDelete(mhs.id)}>
                  Hapus
                </Button>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default MahasiswaTable;
