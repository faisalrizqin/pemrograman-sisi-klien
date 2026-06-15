import Button from "@/Pages/Admin/Components/Button";
import { useAuthStateContext } from "@/Utils/Contexts/AuthContext";

const DosenTable = ({ data = [], onEdit, onDelete, onDetail }) => {
  const { user } = useAuthStateContext();

  return (
    <table className="w-full text-sm text-gray-700">
      <thead className="bg-blue-600 text-white">
        <tr>
          <th className="py-2 px-4 text-left">NIDN</th>
          <th className="py-2 px-4 text-left">Nama</th>
          <th className="py-2 px-4 text-left">Prodi</th>
          <th className="py-2 px-4 text-center">Aksi</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={item.nidn} className={index % 2 === 0 ? "bg-white" : "bg-gray-100"}>
            <td className="py-2 px-4">{item.nidn}</td>
            <td className="py-2 px-4">{item.nama}</td>
            <td className="py-2 px-4">{item.prodi}</td>
            <td className="py-2 px-4 text-center space-x-2">
              {user?.permission?.includes("dosen.read") && (
                <Button onClick={() => onDetail(item.id)}>Detail</Button>
              )}
              {user?.permission?.includes("dosen.update") && (
                <Button size="sm" variant="warning" onClick={() => onEdit(item)}>
                  Edit
                </Button>
              )}
              {user?.permission?.includes("dosen.delete") && (
                <Button size="sm" variant="danger" onClick={() => onDelete(item.id)}>
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

export default DosenTable;
