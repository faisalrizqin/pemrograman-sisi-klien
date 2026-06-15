import Card from "@/Pages/Admin/Components/Card";
import Heading from "@/Pages/Admin/Components/Heading";
import Button from "@/Pages/Admin/Components/Button";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import MataKuliahTable from "./MataKuliahTable";
import MataKuliahModal from "./MataKuliahModal";

import { confirmDelete, confirmUpdate } from "@/Utils/Helpers/SwalHelpers";
import { toastError } from "@/Utils/Helpers/ToastHelpers";

import {
  useMataKuliah,
  useStoreMataKuliah,
  useUpdateMataKuliah,
  useDeleteMataKuliah,
} from "@/Utils/Hooks/useMataKuliah";
import { useAuthStateContext } from "@/Utils/Contexts/AuthContext";

const MataKuliah = () => {
  const navigate = useNavigate();
  const { user } = useAuthStateContext();

  const { data: mataKuliah = [] } = useMataKuliah();
  const { mutate: store } = useStoreMataKuliah();
  const { mutate: update } = useUpdateMataKuliah();
  const { mutate: remove } = useDeleteMataKuliah();

  const [form, setForm] = useState({ kode: "", nama: "", sks: "", semester: "" });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const resetForm = () => {
    setForm({ kode: "", nama: "", sks: "", semester: "" });
    setIsEdit(false);
    setIsModalOpen(false);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.kode || !form.nama || !form.sks || !form.semester) {
      toastError("Semua field wajib diisi");
      return;
    }

    const payload = {
      ...form,
      sks: Number(form.sks),
      semester: Number(form.semester),
    };

    if (isEdit) {
      confirmUpdate(() => {
        update({ id: form.id, data: payload });
        resetForm();
      });
    } else {
      const exists = mataKuliah.find((mk) => mk.kode === form.kode);
      if (exists) {
        toastError("Kode mata kuliah sudah terdaftar!");
        return;
      }
      store(payload);
      resetForm();
    }
  };

  const openAddModal = () => {
    setIsModalOpen(true);
    setForm({ kode: "", nama: "", sks: "", semester: "" });
    setIsEdit(false);
  };

  const openEditModal = (item) => {
    setForm({
      id: item.id,
      kode: item.kode,
      nama: item.nama,
      sks: item.sks,
      semester: item.semester,
    });
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
          <Heading as="h2" className="mb-0 text-left">Daftar Mata Kuliah</Heading>
          {user?.permission?.includes("matakuliah.create") && (
            <Button onClick={() => openAddModal()}>+ Tambah Mata Kuliah</Button>
          )}
        </div>

        {user?.permission?.includes("matakuliah.read") && (
          <MataKuliahTable
            data={mataKuliah}
            onEdit={openEditModal}
            onDelete={handleDelete}
            onDetail={(id) => navigate(`/admin/matakuliah/${id}`)}
          />
        )}
      </Card>

      {isModalOpen && (
        <MataKuliahModal
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

export default MataKuliah;
