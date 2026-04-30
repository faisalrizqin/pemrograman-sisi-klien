import Input from "@/Pages/Admin/Components/Input";
import Label from "@/Pages/Admin/Components/Label";
import Button from "@/Pages/Admin/Components/Button";

const MahasiswaModal = ({
  isOpen,
  isEdit,
  form,
  onChange,
  onClose,
  onSubmit,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[rgba(0,0,0,0.3)] z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-semibold">
            {isEdit ? "Edit Mahasiswa" : "Tambah Mahasiswa"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-red-500 text-xl"
          >
            &times;
          </button>
        </div>

        {/* Form */}
        <form onSubmit={onSubmit} className="p-4 space-y-4">
          <div>
            <Label htmlFor="nim">NIM</Label>
            <Input
              id="nim"
              type="text"
              name="nim"
              value={form.nim}
              onChange={onChange}
              readOnly={isEdit}
              placeholder="Masukkan NIM"
              required
            />
          </div>

          <div>
            <Label htmlFor="nama">Nama</Label>
            <Input
              id="nama"
              type="text"
              name="nama"
              value={form.nama}
              onChange={onChange}
              placeholder="Masukkan Nama"
              required
            />
          </div>

          {/* ✅ Status ditambahkan */}
          <div>
            <Label htmlFor="status">Status</Label>
            <select
              id="status"
              name="status"
              value={form.status ? "true" : "false"}
              onChange={(e) =>
                onChange({
                  target: {
                    name: "status",
                    value: e.target.value === "true",
                  },
                })
              }
              className="w-full border rounded px-3 py-2"
            >
              <option value="true">Aktif</option>
              <option value="false">Nonaktif</option>
            </select>
          </div>

          {/* Footer */}
          <div className="flex justify-end space-x-2">
            <Button type="button" onClick={onClose}>
              Batal
            </Button>
            <Button type="submit">
              {isEdit ? "Update" : "Simpan"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MahasiswaModal;