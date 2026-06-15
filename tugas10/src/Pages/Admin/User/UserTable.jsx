import Button from "@/Pages/Admin/Components/Button";
import { useAuthStateContext } from "@/Utils/Contexts/AuthContext";

const UserTable = ({ data = [], onEdit }) => {
  const { user } = useAuthStateContext();

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-gray-700">
        <thead className="bg-blue-600 text-white">
          <tr>
            <th className="py-2 px-4 text-left">Nama</th>
            <th className="py-2 px-4 text-left">Email</th>
            <th className="py-2 px-4 text-left">Role</th>
            <th className="py-2 px-4 text-left">Permission</th>
            <th className="py-2 px-4 text-center">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={5} className="py-4 px-4 text-center text-gray-500">
                Tidak ada data user
              </td>
            </tr>
          ) : (
            data.map((item, index) => (
              <tr
                key={item.id}
                className={index % 2 === 0 ? "bg-white" : "bg-gray-100"}
              >
                <td className="py-2 px-4">{item.name}</td>
                <td className="py-2 px-4">{item.email}</td>
                <td className="py-2 px-4">
                  <span className="inline-block px-2 py-1 text-xs font-semibold rounded bg-blue-100 text-blue-800 capitalize">
                    {item.role}
                  </span>
                </td>
                <td className="py-2 px-4">
                  <div className="flex flex-wrap gap-1 max-w-md">
                    {(item.permission || []).slice(0, 4).map((perm) => (
                      <span
                        key={perm}
                        className="inline-block px-2 py-0.5 text-xs rounded bg-gray-200 text-gray-700"
                      >
                        {perm}
                      </span>
                    ))}
                    {(item.permission || []).length > 4 && (
                      <span className="inline-block px-2 py-0.5 text-xs rounded bg-gray-300 text-gray-600">
                        +{item.permission.length - 4} lainnya
                      </span>
                    )}
                  </div>
                </td>
                <td className="py-2 px-4 text-center">
                  {user?.permission?.includes("user.update") && (
                    <Button size="sm" variant="warning" onClick={() => onEdit(item)}>
                      Edit Role & Permission
                    </Button>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
