import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { mahasiswaList as dummyList } from "@/Data/Dummy";
import Card from "@/Pages/Admin/Components/Card";
import Heading from "@/Pages/Admin/Components/Heading";
import Button from "@/Pages/Admin/Components/Button";
import Input from "@/Pages/Admin/Components/Input";
import Label from "@/Pages/Admin/Components/Label";

const MAHASISWA_KEY = "mahasiswaList";

const Mahasiswa = () => {
  const navigate = useNavigate();

  // ================= INIT DATA =================
  const getInitialData = () => {
    const stored = localStorage.getItem(MAHASISWA_KEY);
    if (stored) return JSON.parse(stored);
    localStorage.setItem(MAHASISWA_KEY, JSON.stringify(dummyList));
    return dummyList;
  };

  const [mahasiswa, setMahasiswa] = useState(() => getInitialData());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [form, setForm] = useState({ nim: "", nama: "", status: true });

  // ================= SYNC =================
  useEffect(() => {
    localStorage.setItem(MAHASISWA_KEY, JSON.stringify(mahasiswa));
  }, [mahasiswa]);

  // ================= CRUD =================
  const addMahasiswa = (newData) => {
    setMahasiswa((prev) => [...prev, { ...newData, status: newData.status ?? true }]);
  };

  const updateMahasiswa = (nim, newData) => {
    setMahasiswa((prev) =>
      prev.map((mhs) =>
        String(mhs.nim) === String(nim) ? { ...mhs, ...newData } : mhs
      )
    );
  };

  const deleteMahasiswa = (nim) => {
    setMahasiswa((prev) =>
      prev.filter((mhs) => String(mhs.nim) !== String(nim))
    );
  };

  // ================= FORM =================
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.nim || !form.nama) {
      alert("NIM dan Nama wajib diisi");
      return;
    }

    if (isEdit) {
      if (window.confirm("Yakin ingin update data mahasiswa ini?")) {
        updateMahasiswa(form.nim, form);
        setIsModalOpen(false);
        setIsEdit(false);
        setForm({ nim: "", nama: "", status: true });
      }
    } else {
      const exists = mahasiswa.find(
        (m) => String(m.nim) === String(form.nim)
      );

      if (exists) {
        alert("NIM sudah terdaftar!");
        return;
      }

      addMahasiswa(form);
      setIsModalOpen(false);
      setForm({ nim: "", nama: "", status: true });
    }
  };

  // ================= UI =================
  const openAddModal = () => {
    setIsModalOpen(true);
    setForm({ nim: "", nama: "", status: true });
    setIsEdit(false);
  };

  const handleDelete = (nim) => {
    if (window.confirm("Yakin ingin hapus data mahasiswa ini?")) {
      deleteMahasiswa(nim);
    }
  };

  const handleEdit = (mhs) => {
    setForm({ nim: mhs.nim, nama: mhs.nama, status: mhs.status });
    setIsEdit(true);
    setIsModalOpen(true);
  };

  // ================= RENDER =================
  return (
    <>
      <Card>
        <div className="flex justify-between items-center mb-4">
          <Heading as="h2" className="mb-0 text-left">
            Daftar Mahasiswa
          </Heading>
          <Button onClick={openAddModal}>+ Tambah Mahasiswa</Button>
        </div>

        <table className="w-full text-sm text-gray-700">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="py-2 px-4 text-left">NIM</th>
              <th className="py-2 px-4 text-left">Nama</th>
              <th className="py-2 px-4 text-left">Status</th>
              <th className="py-2 px-4 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {mahasiswa.map((mhs, index) => (
              <tr
                key={mhs.nim}
                className={index % 2 === 0 ? "bg-white" : "bg-gray-100"}
              >
                <td className="py-2 px-4">{mhs.nim}</td>
                <td className="py-2 px-4">{mhs.nama}</td>
                <td className="py-2 px-4">{mhs.status ? "Aktif" : "Nonaktif"}</td>
                <td className="py-2 px-4 text-center space-x-2">
                  <Button
                    size="sm"
                    className="bg-blue-600 hover:bg-blue-700"
                    onClick={() =>
                      navigate(`/admin/mahasiswa/${mhs.nim}`)
                    }
                  >
                    Detail
                  </Button>
                  <Button
                    size="sm"
                    className="bg-yellow-500 hover:bg-yellow-600"
                    onClick={() => handleEdit(mhs)}
                  >
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    className="bg-red-500 hover:bg-red-600"
                    onClick={() => handleDelete(mhs.nim)}
                  >
                    Hapus
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-[rgba(0,0,0,0.3)] z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="text-lg font-semibold">
                {isEdit ? "Edit Mahasiswa" : "Tambah Mahasiswa"}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-600 hover:text-red-500 text-xl"
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-4 space-y-4">
              <div>
                <Label htmlFor="nim">NIM</Label>
                <Input
                  type="text"
                  name="nim"
                  value={form.nim}
                  onChange={handleChange}
                  readOnly={isEdit}
                  placeholder="Masukkan NIM"
                  required
                />
              </div>

              <div>
                <Label htmlFor="nama">Nama</Label>
                <Input
                  type="text"
                  name="nama"
                  value={form.nama}
                  onChange={handleChange}
                  placeholder="Masukkan Nama"
                  required
                />
              </div>

              <div>
                <Label htmlFor="status">Status</Label>
                <select
                  name="status"
                  value={form.status ? "true" : "false"}
                  onChange={(e) => setForm({ ...form, status: e.target.value === "true" })}
                  className="w-full border rounded px-3 py-2"
                  required
                >
                  <option value="true">Aktif</option>
                  <option value="false">Nonaktif</option>
                </select>
              </div>
              <div className="flex justify-end space-x-2">
                <Button type="button" onClick={() => setIsModalOpen(false)}>
                  Batal
                </Button>
                <Button type="submit">Simpan</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Mahasiswa;