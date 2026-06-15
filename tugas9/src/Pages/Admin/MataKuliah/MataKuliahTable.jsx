import Button from "@/Pages/Admin/Components/Button";
import { useAuthStateContext } from "@/Utils/Contexts/AuthContext";

const MataKuliahTable = ({ data = [], onEdit, onDelete, onDetail }) => {
  const { user } = useAuthStateContext();

  return (
    <table className="w-full text-sm text-gray-700">
      <thead className="bg-blue-600 text-white">
        <tr>
          <th className="py-2 px-4 text-left">Kode</th>
          <th className="py-2 px-4 text-left">Nama</th>
          <th className="py-2 px-4 text-left">SKS</th>
          <th className="py-2 px-4 text-left">Semester</th>
          <th className="py-2 px-4 text-center">Aksi</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={item.kode} className={index % 2 === 0 ? "bg-white" : "bg-gray-100"}>
            <td className="py-2 px-4">{item.kode}</td>
            <td className="py-2 px-4">{item.nama}</td>
            <td className="py-2 px-4">{item.sks}</td>
            <td className="py-2 px-4">{item.semester}</td>
            <td className="py-2 px-4 text-center space-x-2">
              {user?.permission?.includes("matakuliah.read") && (
                <Button onClick={() => onDetail(item.id)}>Detail</Button>
              )}
              {user?.permission?.includes("matakuliah.update") && (
                <Button size="sm" variant="warning" onClick={() => onEdit(item)}>
                  Edit
                </Button>
              )}
              {user?.permission?.includes("matakuliah.delete") && (
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

export default MataKuliahTable;
