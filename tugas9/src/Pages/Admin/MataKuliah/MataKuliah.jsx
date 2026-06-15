import Card from "@/Pages/Admin/Components/Card";
import Heading from "@/Pages/Admin/Components/Heading";
import Button from "@/Pages/Admin/Components/Button";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import MataKuliahTable from "./MataKuliahTable";
import MataKuliahModal from "./MataKuliahModal";

import { confirmDelete, confirmUpdate } from "@/Utils/Helpers/SwalHelpers";
import { toastSuccess, toastError } from "@/Utils/Helpers/ToastHelpers";

import {
  getAllMataKuliah,
  storeMataKuliah,
  updateMataKuliah,
  deleteMataKuliah,
} from "@/Utils/Apis/MataKuliahApi";
import { useAuthStateContext } from "@/Utils/Contexts/AuthContext";

const MataKuliah = () => {
  const navigate = useNavigate();
  const { user } = useAuthStateContext();

  const [mataKuliah, setMataKuliah] = useState([]);
  const [form, setForm] = useState({ kode: "", nama: "", sks: "", semester: "" });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const fetchMataKuliah = async () => {
    try {
      const res = await getAllMataKuliah();
      setMataKuliah(res.data);
    } catch (err) {
      toastError("Gagal mengambil data mata kuliah");
    }
  };

  useEffect(() => {
    fetchMataKuliah();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
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
      confirmUpdate(async () => {
        try {
          await updateMataKuliah(form.id, payload);
          toastSuccess("Data berhasil diperbarui");
          setForm({ kode: "", nama: "", sks: "", semester: "" });
          setIsEdit(false);
          setIsModalOpen(false);
          fetchMataKuliah();
        } catch (err) {
          toastError("Gagal memperbarui data");
        }
      });
    } else {
      const exists = mataKuliah.find((mk) => mk.kode === form.kode);
      if (exists) {
        toastError("Kode mata kuliah sudah terdaftar!");
        return;
      }
      try {
        await storeMataKuliah(payload);
        toastSuccess("Data berhasil ditambahkan");
        setForm({ kode: "", nama: "", sks: "", semester: "" });
        setIsModalOpen(false);
        fetchMataKuliah();
      } catch (err) {
        toastError("Gagal menambahkan data");
      }
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
    confirmDelete(async () => {
      try {
        await deleteMataKuliah(id);
        toastSuccess("Data berhasil dihapus");
        fetchMataKuliah();
      } catch (err) {
        toastError("Gagal menghapus data");
      }
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
