import Card from "@/Pages/Admin/Components/Card";
import Heading from "@/Pages/Admin/Components/Heading";
import Button from "@/Pages/Admin/Components/Button";

import { useState } from "react";
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

import { useAuthStateContext } from "@/Utils/Contexts/AuthContext";

const Mahasiswa = () => {
  const navigate = useNavigate();
  const { user } = useAuthStateContext();

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [sortBy, setSortBy] = useState("nama");
  const [sortOrder, setSortOrder] = useState("asc");
  const [search, setSearch] = useState("");

  const [form, setForm] = useState({ nim: "", nama: "" });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const {
    data: result = { data: [], total: 0 },
    isLoading: isLoadingMahasiswa,
  } = useMahasiswa({
    q: search,
    _sort: sortBy,
    _order: sortOrder,
    _page: page,
    _limit: limit,
  });

  const { mutate: store } = useStoreMahasiswa();
  const { mutate: update } = useUpdateMahasiswa();
  const { mutate: remove } = useDeleteMahasiswa();

  const { data: mahasiswa = [] } = result;
  const totalCount = result.total;
  const totalPages = Math.ceil(totalCount / limit) || 1;

  const handlePrev = () => setPage((prev) => Math.max(prev - 1, 1));
  const handleNext = () => setPage((prev) => Math.min(prev + 1, totalPages));

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setForm({ nim: "", nama: "" });
    setIsEdit(false);
    setIsModalOpen(false);
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
        {/* Header Section */}
        <div className="flex justify-between items-center mb-6">
          <Heading as="h2" className="mb-0 text-left">Daftar Mahasiswa</Heading>
          {user?.permission?.includes("mahasiswa.create") && (
            <Button onClick={() => openAddModal()}>+ Tambah Mahasiswa</Button>
          )}
        </div>

        {/* Filter, Search & Limit Section (Above the Table) */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
          <div className="flex flex-wrap items-center gap-2 flex-grow">
            {/* Search */}
            <input
              type="text"
              placeholder="Cari nama/NIM..."
              className="border px-3 py-2 rounded flex-grow max-w-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
            />

            {/* Sort By Field */}
            <select
              value={sortBy}
              onChange={(e) => {
                setSortBy(e.target.value);
                setPage(1);
              }}
              className="border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            >
              <option value="nama">Sort by Nama</option>
              <option value="nim">Sort by NIM</option>
              <option value="max_sks">Sort by Max SKS</option>
            </select>

            {/* Sort Order */}
            <select
              value={sortOrder}
              onChange={(e) => {
                setSortOrder(e.target.value);
                setPage(1);
              }}
              className="border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            >
              <option value="asc">Asc</option>
              <option value="desc">Desc</option>
            </select>
          </div>

          {/* Per Page */}
          <select
            value={limit}
            onChange={(e) => {
              setLimit(Number(e.target.value));
              setPage(1);
            }}
            className="border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          >
            <option value={5}>5 / halaman</option>
            <option value={10}>10 / halaman</option>
            <option value={25}>25 / halaman</option>
          </select>
        </div>

        {/* Table Section */}
        {user?.permission?.includes("mahasiswa.read") && (
          <div className="overflow-x-auto">
            <MahasiswaTable
              data={mahasiswa}
              onEdit={openEditModal}
              onDelete={handleDelete}
              onDetail={(id) => navigate(`/admin/mahasiswa/${id}`)}
              isLoading={isLoadingMahasiswa}
            />
          </div>
        )}

        {/* Pagination Section (Below the Table) */}
        <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-100">
          <p className="text-sm text-gray-600">
            Halaman <span className="font-semibold text-gray-800">{page}</span> dari <span className="font-semibold text-gray-800">{totalPages}</span>
          </p>
          <div className="flex gap-2">
            <button
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded hover:bg-gray-200 disabled:opacity-50 disabled:hover:bg-gray-100 transition-colors"
              onClick={handlePrev}
              disabled={page === 1}
            >
              Prev
            </button>
            <button
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded hover:bg-gray-200 disabled:opacity-50 disabled:hover:bg-gray-100 transition-colors"
              onClick={handleNext}
              disabled={page === totalPages}
            >
              Next
            </button>
          </div>
        </div>
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
