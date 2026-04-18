import AdminLayout from "@/Pages/Admin/AdminLayout";
import Card from "@/Pages/Admin/Components/Card";
import Footer from "@/Pages/Admin/Components/Footer";
import Heading from "@/Pages/Admin/Components/Heading";
import Header from "@/Pages/Admin/Components/Header";
import Sidebar from "@/Pages/Admin/Components/Sidebar";
import Button from "@/Pages/Admin/Components/Button";
import { useState } from "react";
import Modal from "@/Pages/Admin/Components/Modal";

const Mahasiswa = () => {
  // 🔷 State data mahasiswa
  const [data, setData] = useState([
    { nim: "20211001", nama: "Budi Santoso" },
    { nim: "20211002", nama: "Siti Aminah" },
  ]);

  // 🔷 State modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 🔷 State form
  const [formData, setFormData] = useState({
    nim: "",
    nama: "",
  });

  // 🔷 Open modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  // 🔷 Close modal
  const closeModal = () => {
    setIsModalOpen(false);
    setFormData({ nim: "", nama: "" });
  };

  // 🔷 Submit form (Tambah data)
  const handleSubmit = (e) => {
    e.preventDefault();

    setData([...data, formData]);

    alert("Mahasiswa berhasil ditambah!");
    closeModal();
  };

  // 🔷 Edit (sementara alert)
  const handleEdit = (nama) => {
    alert(`Edit data ${nama}`);
  };

  // 🔷 Delete
  const handleDelete = (nim) => {
    if (confirm("Yakin ingin hapus data?")) {
      setData(data.filter((item) => item.nim !== nim));
    }
  };

  return (
    <AdminLayout>
      <Card>
        <div className="flex justify-between items-center mb-4">
          <Heading as="h2" className="mb-0 text-left">Daftar Mahasiswa</Heading>
          <Button onClick={openModal}>+ Tambah Mahasiswa</Button>
        </div>

        <table className="w-full text-sm text-gray-700">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="py-2 px-4 text-left">NIM</th>
              <th className="py-2 px-4 text-left">Nama</th>
              <th className="py-2 px-4 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody>
            <tr className="odd:bg-white even:bg-gray-100">
              <td className="py-2 px-4">20211001</td>
              <td className="py-2 px-4">Budi Santoso</td>
              <td className="py-2 px-4 text-center space-x-2">
                <Button
                  size="sm"
                  className="bg-yellow-500 hover:bg-yellow-600"
                  onClick={() => handleEdit("Budi Santoso")}
                >
                  Edit
                </Button>
                <Button
                  size="sm"
                  className="bg-red-500 hover:bg-red-600"
                  onClick={() => handleDelete("Budi Santoso")}
                >
                  Hapus
                </Button>
              </td>
            </tr>
            <tr className="odd:bg-white even:bg-gray-100">
              <td className="py-2 px-4">20211002</td>
              <td className="py-2 px-4">Siti Aminah</td>
              <td className="py-2 px-4 text-center space-x-2">
                <Button
                  size="sm"
                  className="bg-yellow-500 hover:bg-yellow-600"
                  onClick={() => handleEdit("Siti Aminah")}
                >
                  Edit
                </Button>
                <Button
                  size="sm"
                  className="bg-red-500 hover:bg-red-600"
                  onClick={() => handleDelete("Siti Aminah")}
                >
                  Hapus
                </Button>
              </td>
            </tr>
          </tbody>
        </table>
      </Card>

      {/* 🔷 Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSubmit={handleSubmit}
        formData={formData}
        setFormData={setFormData}
      />
      
    </AdminLayout>
  );
};

export default Mahasiswa;