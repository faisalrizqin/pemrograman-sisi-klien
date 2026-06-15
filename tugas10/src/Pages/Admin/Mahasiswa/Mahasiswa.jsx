import Card from "@/Pages/Admin/Components/Card";
import Heading from "@/Pages/Admin/Components/Heading";
import Button from "@/Pages/Admin/Components/Button";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import MahasiswaTable from "./MahasiswaTable";
import MahasiswaModal from "./MahasiswaModal";

import {
  confirmDelete,
  confirmUpdate,
} from "@/Utils/Helpers/SwalHelpers";

import { toastError } from "@/Utils/Helpers/ToastHelpers";

import {
  useMahasiswa,
  useStoreMahasiswa,
  useUpdateMahasiswa,
  useDeleteMahasiswa,
} from "@/Utils/Hooks/useMahasiswa";
import { useKelas } from "@/Utils/Hooks/useKelas";
import { useMataKuliah } from "@/Utils/Hooks/useMataKuliah";

import { useAuthStateContext } from "@/Utils/Contexts/AuthContext";

const Mahasiswa = () => {
  const navigate = useNavigate();
  const { user } = useAuthStateContext();

  const { data: mahasiswa = [] } = useMahasiswa();
  const { data: kelas = [] } = useKelas();
  const { data: mataKuliah = [] } = useMataKuliah();

  const { mutate: store } = useStoreMahasiswa();
  const { mutate: update } = useUpdateMahasiswa();
  const { mutate: remove } = useDeleteMahasiswa();

  const [form, setForm] = useState({ nim: "", nama: "" });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const resetForm = () => {
    setForm({ nim: "", nama: "" });
    setIsEdit(false);
    setIsModalOpen(false);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.nim || !form.nama) {
      toastError("NIM dan Nama wajib diisi");
      return;
    }

    if (isEdit) {
      confirmUpdate(() => {
        update({ id: form.id, data: form });
        resetForm();
      });
    } else {
      const exists = mahasiswa.find((m) => m.nim === form.nim);
      if (exists) {
        toastError("NIM sudah terdaftar!");
        return;
      }
      store(form);
      resetForm();
    }
  };

  const openAddModal = () => {
    setIsModalOpen(true);
    setForm({ nim: "", nama: "" });
    setIsEdit(false);
  };

  const openEditModal = (mhs) => {
    setForm({ id: mhs.id, nim: mhs.nim, nama: mhs.nama });
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
          <Heading as="h2" className="mb-0 text-left">Daftar Mahasiswa</Heading>
          {user?.permission?.includes("mahasiswa.create") && (
            <Button onClick={() => openAddModal()}>+ Tambah Mahasiswa</Button>
          )}
        </div>

        {user?.permission?.includes("mahasiswa.read") && (
          <MahasiswaTable
            data={mahasiswa}
            onEdit={openEditModal}
            onDelete={handleDelete}
            onDetail={(id) => navigate(`/admin/mahasiswa/${id}`)}
          />
        )}
      </Card>

      {isModalOpen && (
        <MahasiswaModal
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

export default Mahasiswa;
