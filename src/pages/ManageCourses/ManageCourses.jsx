import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import Button from "../../components/Button/Button";
import useCourseStore from "../../store/useCourseStore"; // Import Store Zustand
import "./ManageCourses.css";

const ManageCourses = () => {
  // Ambil state dan fungsi dari Zustand Store
  const {
    courses,
    fetchCourses,
    addCourse,
    updateCourse,
    deleteCourse,
    loading,
  } = useCourseStore();

  // State untuk menangani mode edit
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  // State untuk form input
  const [newCourse, setNewCourse] = useState({
    title: "",
    category: "Pemasaran",
    instructor: "",
    role: "",
    company: "",
    price: "",
    description: "",
  });

  // State Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Fetch data dari API saat komponen pertama kali dimuat
  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  // Logika Pagination menggunakan data dari Store
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = courses.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(courses.length / itemsPerPage);

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

  const resetForm = () => {
    setNewCourse({
      title: "",
      category: "Pemasaran",
      instructor: "",
      role: "",
      company: "",
      price: "",
      description: "",
    });
    setIsEditing(false);
    setEditId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Persiapkan data agar sesuai dengan skema API
    const coursePayload = {
      ...newCourse,
      price: parseInt(newCourse.price) || 0,
    };

    if (isEditing) {
      // Logic Update tetap menggunakan data yang ada
      const success = await updateCourse(editId, coursePayload);
      if (success) {
        alert("Perubahan berhasil disimpan ke API!");
        resetForm();
      }
    } else {
      // Logic Add: store akan otomatis menambahkan img, avatar, rating, dll secara acak
      const success = await addCourse(coursePayload);
      if (success) {
        alert("Video berhasil ditambahkan ke API!");
        resetForm();
      }
    }
  };

  const handleDelete = async (id) => {
    if (
      window.confirm("Apakah Anda yakin ingin menghapus kursus ini dari API?")
    ) {
      const success = await deleteCourse(id);
      if (success) {
        alert("Item berhasil dihapus!");
        if (currentItems.length === 1 && currentPage > 1) {
          setCurrentPage(currentPage - 1);
        }
      }
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
                <Button variant="outline" onClick={resetForm}>
                  Batal
                </Button>
              )}
            </div>
          </form>
        </section>

        <section className="list-section">
          <div className="list-header">
            <h3>Daftar Kursus ({courses.length})</h3>
            {courses.length > 0 && !loading && (
              <p>
                Menampilkan {indexOfFirstItem + 1}-
                {Math.min(indexOfLastItem, courses.length)} dari{" "}
                {courses.length} data
              </p>
            )}
          </div>

          <div className="table-responsive">
            {loading ? (
              <div className="loading-state">
                Sedang memuat data dari API...
              </div>
            ) : (
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
                  {currentItems.length > 0 ? (
                    currentItems.map((course) => (
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
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="text-center">
                        Belum ada data di API.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}
          </div>

          {totalPages > 1 && !loading && (
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
