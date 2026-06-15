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

import { toastSuccess, toastError } from "@/Utils/Helpers/ToastHelpers";

import {
  getAllMahasiswa,
  storeMahasiswa,
  updateMahasiswa,
  deleteMahasiswa,
} from "@/Utils/Apis/MahasiswaApi";
import { useAuthStateContext } from "@/Utils/Contexts/AuthContext";

const Mahasiswa = () => {
  const navigate = useNavigate();
  const { user } = useAuthStateContext();

  const [mahasiswa, setMahasiswa] = useState([]);
  const [form, setForm] = useState({ nim: "", nama: "" });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const fetchMahasiswa = async () => {
    try {
      const res = await getAllMahasiswa();
      setMahasiswa(res.data);
    } catch (err) {
      toastError("Gagal mengambil data mahasiswa");
    }
  };

  useEffect(() => {
    fetchMahasiswa();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.nim || !form.nama) {
      toastError("NIM dan Nama wajib diisi");
      return;
    }

    if (isEdit) {
      confirmUpdate(async () => {
        try {
          await updateMahasiswa(form.id, form);
          toastSuccess("Data berhasil diperbarui");
          setForm({ nim: "", nama: "" });
          setIsEdit(false);
          setIsModalOpen(false);
          fetchMahasiswa();
        } catch (err) {
          toastError("Gagal memperbarui data");
        }
      });
    } else {
      const exists = mahasiswa.find((m) => m.nim === form.nim);
      if (exists) {
        toastError("NIM sudah terdaftar!");
        return;
      }
      try {
        await storeMahasiswa(form);
        toastSuccess("Data berhasil ditambahkan");
        setForm({ nim: "", nama: "" });
        setIsModalOpen(false);
        fetchMahasiswa();
      } catch (err) {
        toastError("Gagal menambahkan data");
      }
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
    confirmDelete(async () => {
      try {
        await deleteMahasiswa(id);
        toastSuccess("Data berhasil dihapus");
        fetchMahasiswa();
      } catch (err) {
        toastError("Gagal menghapus data");
      }
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
