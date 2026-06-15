import Card from "@/Pages/Admin/Components/Card";
import Heading from "@/Pages/Admin/Components/Heading";
import Button from "@/Pages/Admin/Components/Button";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import DosenTable from "./DosenTable";
import DosenModal from "./DosenModal";

import { confirmDelete, confirmUpdate } from "@/Utils/Helpers/SwalHelpers";
import { toastError } from "@/Utils/Helpers/ToastHelpers";

import {
  useDosen,
  useStoreDosen,
  useUpdateDosen,
  useDeleteDosen,
} from "@/Utils/Hooks/useDosen";
import { useAuthStateContext } from "@/Utils/Contexts/AuthContext";

const Dosen = () => {
  const navigate = useNavigate();
  const { user } = useAuthStateContext();

  const { data: dosen = [] } = useDosen();
  const { mutate: store } = useStoreDosen();
  const { mutate: update } = useUpdateDosen();
  const { mutate: remove } = useDeleteDosen();

  const [form, setForm] = useState({ nidn: "", nama: "", prodi: "" });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const resetForm = () => {
    setForm({ nidn: "", nama: "", prodi: "" });
    setIsEdit(false);
    setIsModalOpen(false);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.nidn || !form.nama || !form.prodi) {
      toastError("NIDN, Nama, dan Prodi wajib diisi");
      return;
    }

    if (isEdit) {
      confirmUpdate(() => {
        update({ id: form.id, data: form });
        resetForm();
      });
    } else {
      const exists = dosen.find((d) => d.nidn === form.nidn);
      if (exists) {
        toastError("NIDN sudah terdaftar!");
        return;
      }
      store(form);
      resetForm();
    }
  };

  const openAddModal = () => {
    setIsModalOpen(true);
    setForm({ nidn: "", nama: "", prodi: "" });
    setIsEdit(false);
  };

  const openEditModal = (item) => {
    setForm({ id: item.id, nidn: item.nidn, nama: item.nama, prodi: item.prodi });
    setIsEdit(true);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    confirmDelete(() => {
      remove(id);
    });
  };

  return (
    <>
      <Card>
        <div className="flex justify-between items-center mb-4">
          <Heading as="h2" className="mb-0 text-left">Daftar Dosen</Heading>
          {user?.permission?.includes("dosen.create") && (
            <Button onClick={() => openAddModal()}>+ Tambah Dosen</Button>
          )}
        </div>

        {user?.permission?.includes("dosen.read") && (
          <DosenTable
            data={dosen}
            onEdit={openEditModal}
            onDelete={handleDelete}
            onDetail={(id) => navigate(`/admin/dosen/${id}`)}
          />
        )}
      </Card>

      {isModalOpen && (
        <DosenModal
          isOpen={isModalOpen}
          isEdit={isEdit}
          form={form}
          onChange={handleChange}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleSubmit}
        />
      )}
    </>
  );
};

export default Dosen;
