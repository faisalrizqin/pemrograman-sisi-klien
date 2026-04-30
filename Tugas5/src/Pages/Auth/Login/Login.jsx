import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Input from "@/Pages/Auth/Components/Input";
import Label from "@/Pages/Auth/Components/Label";
import Button from "@/Pages/Auth/Components/Button";
import Link from "@/Pages/Auth/Components/Link";
import Card from "@/Pages/Auth/Components/Card";
import Heading from "@/Pages/Auth/Components/Heading";
import Form from "@/Pages/Auth/Components/Form";

import { dummyUser } from "@/Data/Dummy";

const Login = () => {
  const navigate = useNavigate();

  // ✅ useEffect (sesuai yang diminta sebelumnya)
  useEffect(() => {
    console.log("Komponen dimount pertama kali");

    const user = localStorage.getItem("user");
    if (user) {
      navigate("/admin");
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    // VALIDASI
    if (!email || !password) {
      alert("Email dan Password wajib diisi!");
      return;
    }

    // CEK LOGIN
    if (email === dummyUser.email && password === dummyUser.password) {
      localStorage.setItem("user", JSON.stringify(dummyUser));
      navigate("/admin");
    } else {
      alert("Email atau password salah!");
    }
  };

  return (
    <Card className="max-w-md">
      <Heading as="h2">Login</Heading>

      <Form onSubmit={handleSubmit}>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            name="email"
            id="email"
            placeholder="Masukkan email"
            required
          />
        </div>

        <div>
          <Label htmlFor="password">Password</Label>
          <Input
            type="password"
            name="password"
            id="password"
            placeholder="Masukkan password"
            required
          />
        </div>

        <div className="flex justify-between items-center">
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" />
            <span className="text-sm text-gray-600">Ingat saya</span>
          </label>

          {/* ✅ perbaikan */}
          <Link to="#" className="text-sm">
            Lupa password?
          </Link>
        </div>

        <Button type="submit" className="w-full">
          Login
        </Button>
      </Form>

      <p className="text-sm text-center text-gray-600 mt-4">
        Belum punya akun? <Link to="#">Daftar</Link>
      </p>
    </Card>
  );
};

export default Login;