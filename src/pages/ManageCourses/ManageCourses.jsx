import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import Button from "../../components/Button/Button";
import { videoData } from "../../data/courses";
import "./ManageCourses.css";

import thumb9 from "../../assets/img-cards/card9.jpg";
import ava9 from "../../assets/img-avatars/ava9.png";

const ManageCourses = () => {
  // state course yang sudah ada
  const [courses, setCourses] = useState(() => {
    const savedData = localStorage.getItem("myCoursesData");
    return savedData ? JSON.parse(savedData) : videoData;
  });

  // Local storage
  useEffect(() => {
    localStorage.setItem("myCoursesData", JSON.stringify(courses));
  }, [courses]);

  // state edit
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  // state untuk ambil input dari form
  const [newCourse, setNewCourse] = useState({
    title: "",
    category: "Pemasaran",
    instructor: "",
    role: "",
    company: "",
    price: "",
    description: "",
  });

  // state pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // logika untuk menghitung data yang ditampilkan
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = courses.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(courses.length / itemsPerPage);

  // fungsi navigasi halaman
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCourse({ ...newCourse, [name]: value });
  };

  const handleEdit = (course) => {
    setIsEditing(true);
    setEditId(course.id);
    setNewCourse({
      title: course.title,
      category: course.category,
      instructor: course.instructor,
      role: course.role,
      company: course.company,
      price: course.price,
      description: course.description,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isEditing) {
      // update
      const updatedCourses = courses.map((c) =>
        c.id === editId
          ? { ...c, ...newCourse, price: parseInt(newCourse.price) }
          : c,
      );
      setCourses(updatedCourses);
      setIsEditing(false);
      setEditId(null);
      alert("Perubahan berhasil disimpan!");
    } else {
      //create
      const courseToAdd = {
        ...newCourse,
        id: Date.now(),
        rating: 3.5,
        reviews: 20,
        duration: 2.5,
        img: thumb9,
        avatar: ava9,
        price: parseInt(newCourse.price) || 0,
      };
      setCourses([courseToAdd, ...courses]);
      alert("Video berhasil ditambahkan!");
    }

    // Reset Form
    setNewCourse({
      title: "",
      category: "Pemasaran",
      instructor: "",
      role: "",
      company: "",
      price: "",
      description: "",
    });
  };

  const handleDelete = (id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus kursus ini?")) {
      const updatedCourses = courses.filter((course) => course.id !== id);
      setCourses(updatedCourses);

      alert("Item berhasil dihapus!");
    }
  };

  return (
    <div className="manage-page">
      <Navbar />
      <main className="manage-container">
        <section className="create-section">
          <h2>{isEditing ? "Edit Data Kursus" : "Tambah Data Kursus"}</h2>
          <form onSubmit={handleSubmit} className="create-form">
            <div className="form-grid">
              <input
                name="title"
                type="text"
                placeholder="Judul Kursus"
                value={newCourse.title}
                onChange={handleInputChange}
                required
              />
              <input
                name="instructor"
                type="text"
                placeholder="Nama Pengajar"
                value={newCourse.instructor}
                onChange={handleInputChange}
                required
              />
              <input
                name="role"
                type="text"
                placeholder="Jabatan"
                value={newCourse.role}
                onChange={handleInputChange}
                required
              />
              <input
                name="company"
                type="text"
                placeholder="Perusahaan"
                value={newCourse.company}
                onChange={handleInputChange}
                required
              />
              <input
                name="price"
                type="number"
                placeholder="Harga"
                value={newCourse.price}
                onChange={handleInputChange}
                required
              />
              <select
                name="category"
                value={newCourse.category}
                onChange={handleInputChange}
              >
                <option value="Pemasaran">Pemasaran</option>
                <option value="Bisnis Manajemen">Bisnis Manajemen</option>
                <option value="Desain">Desain</option>
                <option value="Pengembangan Diri">Pengembangan Diri</option>
                <option value="Digital & Teknologi">Digital & Teknologi</option>
              </select>
            </div>
            <textarea
              name="description"
              placeholder="Deskripsi..."
              value={newCourse.description}
              onChange={handleInputChange}
              rows="3"
              required
            />

            <div className="form-buttons">
              <Button type="submit" variant="primary">
                {isEditing ? "Simpan Perubahan" : "Tambah Kursus"}
              </Button>
              {isEditing && (
                <Button
                  variant="outline"
                  onClick={() => {
                    setIsEditing(false);
                    setNewCourse({
                      title: "",
                      category: "Pemasaran",
                      instructor: "",
                      role: "",
                      company: "",
                      price: "",
                      description: "",
                    });
                  }}
                >
                  Batal
                </Button>
              )}
            </div>
          </form>
        </section>

        <section className="list-section">
          <div className="list-header">
            <h3>Daftar Kursus ({courses.length})</h3>
            <p>
              Menampilkan {indexOfFirstItem + 1}-
              {Math.min(indexOfLastItem, courses.length)} dari {courses.length}{" "}
              data
            </p>
          </div>

          <div className="table-responsive">
            <table className="manage-table">
              <thead>
                <tr>
                  <th>Judul</th>
                  <th>Kategori</th>
                  <th>Pengajar</th>
                  <th className="text-center">Harga</th>
                  <th className="text-center">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((course) => (
                  <tr key={course.id}>
                    <td className="title-cell">
                      <strong>{course.title}</strong>
                    </td>
                    <td>
                      <span className="badge">{course.category}</span>
                    </td>
                    <td>{course.instructor}</td>
                    <td>Rp {course.price}K</td>
                    <td className="text-center">
                      <div className="action-cell">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEdit(course)}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => handleDelete(course.id)}
                        >
                          Hapus
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* --- UI PAGINATION --- */}
          {totalPages > 1 && (
            <div className="pagination">
              <button
                disabled={currentPage === 1}
                onClick={() => paginate(currentPage - 1)}
                className="page-btn"
              >
                &laquo; Prev
              </button>

              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index + 1}
                  onClick={() => paginate(index + 1)}
                  className={`page-btn ${currentPage === index + 1 ? "active" : ""}`}
                >
                  {index + 1}
                </button>
              ))}

              <button
                disabled={currentPage === totalPages}
                onClick={() => paginate(currentPage + 1)}
                className="page-btn"
              >
                Next &raquo;
              </button>
            </div>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ManageCourses;
