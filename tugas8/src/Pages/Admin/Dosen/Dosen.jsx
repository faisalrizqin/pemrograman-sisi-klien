import Card from "@/Pages/Admin/Components/Card";
import Heading from "@/Pages/Admin/Components/Heading";
import Button from "@/Pages/Admin/Components/Button";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import DosenTable from "./DosenTable";
import DosenModal from "./DosenModal";

import { confirmDelete, confirmUpdate } from "@/Utils/Helpers/SwalHelpers";
import { toastSuccess, toastError } from "@/Utils/Helpers/ToastHelpers";

import {
  getAllDosen,
  storeDosen,
  updateDosen,
  deleteDosen,
} from "@/Utils/Apis/DosenApi";
import { useAuthStateContext } from "@/Utils/Contexts/AuthContext";

const Dosen = () => {
  const navigate = useNavigate();
  const { user } = useAuthStateContext();

  const [dosen, setDosen] = useState([]);
  const [form, setForm] = useState({ nidn: "", nama: "", prodi: "" });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const fetchDosen = async () => {
    try {
      const res = await getAllDosen();
      setDosen(res.data);
    } catch (err) {
      toastError("Gagal mengambil data dosen");
    }
  };

  useEffect(() => {
    fetchDosen();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.nidn || !form.nama || !form.prodi) {
      toastError("NIDN, Nama, dan Prodi wajib diisi");
      return;
    }

    if (isEdit) {
      confirmUpdate(async () => {
        try {
          await updateDosen(form.id, form);
          toastSuccess("Data berhasil diperbarui");
          setForm({ nidn: "", nama: "", prodi: "" });
          setIsEdit(false);
          setIsModalOpen(false);
          fetchDosen();
        } catch (err) {
          toastError("Gagal memperbarui data");
        }
      });
    } else {
      const exists = dosen.find((d) => d.nidn === form.nidn);
      if (exists) {
        toastError("NIDN sudah terdaftar!");
        return;
      }
      try {
        await storeDosen(form);
        toastSuccess("Data berhasil ditambahkan");
        setForm({ nidn: "", nama: "", prodi: "" });
        setIsModalOpen(false);
        fetchDosen();
      } catch (err) {
        toastError("Gagal menambahkan data");
      }
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
    confirmDelete(async () => {
      try {
        await deleteDosen(id);
        toastSuccess("Data berhasil dihapus");
        fetchDosen();
      } catch (err) {
        toastError("Gagal menghapus data");
      }
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
