import Card from "@/Pages/Admin/Components/Card";
import Heading from "@/Pages/Admin/Components/Heading";

import { useEffect, useState } from "react";

import UserTable from "./UserTable";
import UserModal from "./UserModal";
import { DEFAULT_PERMISSIONS_BY_ROLE } from "@/Data/RolePermission";

import { confirmUpdate } from "@/Utils/Helpers/SwalHelpers";
import { toastSuccess, toastError } from "@/Utils/Helpers/ToastHelpers";

import { getAllUsers, updateUser } from "@/Utils/Apis/UserApi";
import { useAuthStateContext } from "@/Utils/Contexts/AuthContext";

const User = () => {
  const { user: currentUser, setUser } = useAuthStateContext();

  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({
    id: "",
    name: "",
    email: "",
    role: "mahasiswa",
    permission: [],
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchUsers = async () => {
    try {
      const res = await getAllUsers();
      setUsers(res.data);
    } catch {
      toastError("Gagal mengambil data user");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const openEditModal = (selectedUser) => {
    setForm({
      id: selectedUser.id,
      name: selectedUser.name,
      email: selectedUser.email,
      role: selectedUser.role,
      permission: [...(selectedUser.permission || [])],
      password: selectedUser.password,
    });
    setIsModalOpen(true);
  };

  const handleRoleChange = (e) => {
    const newRole = e.target.value;
    setForm({
      ...form,
      role: newRole,
      permission: [...(DEFAULT_PERMISSIONS_BY_ROLE[newRole] || [])],
    });
  };

  const handlePermissionToggle = (perm) => {
    const current = form.permission || [];
    const updated = current.includes(perm)
      ? current.filter((p) => p !== perm)
      : [...current, perm];
    setForm({ ...form, permission: updated });
  };

  const handleApplyDefaultPermissions = () => {
    setForm({
      ...form,
      permission: [...(DEFAULT_PERMISSIONS_BY_ROLE[form.role] || [])],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.permission || form.permission.length === 0) {
      toastError("Minimal pilih satu permission");
      return;
    }

    confirmUpdate(async () => {
      try {
        const payload = {
          name: form.name,
          email: form.email,
          password: form.password,
          role: form.role,
          permission: form.permission,
        };

        await updateUser(form.id, payload);
        toastSuccess("Role dan permission berhasil diperbarui");
        setIsModalOpen(false);
        fetchUsers();

        if (String(currentUser?.id) === String(form.id)) {
          setUser({ ...currentUser, role: form.role, permission: form.permission });
        }
      } catch {
        toastError("Gagal memperbarui role dan permission");
      }
    });
  };

  return (
    <>
      <Card>
        <div className="flex justify-between items-center mb-4">
          <Heading as="h2" className="mb-0 text-left">
            Manajemen User — Role & Permission
          </Heading>
        </div>

        {currentUser?.permission?.includes("user.read") && (
          <UserTable data={users} onEdit={openEditModal} />
        )}
      </Card>

      {isModalOpen && (
        <UserModal
          isOpen={isModalOpen}
          form={form}
          onRoleChange={handleRoleChange}
          onPermissionToggle={handlePermissionToggle}
          onApplyDefaultPermissions={handleApplyDefaultPermissions}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleSubmit}
        />
      )}
    </>
  );
};

export default User;
