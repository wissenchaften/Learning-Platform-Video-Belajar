import { create } from "zustand";
import axiosInstance from "../api/axiosInstance";

// Helper untuk mendapatkan angka acak 1-9 untuk gambar dan avatar
const getRandomIndex = () => Math.floor(Math.random() * 9) + 1;

// Helper untuk generate rating acak antara 3.5 sampai 5.0
const getRandomRating = () => (Math.random() * (5 - 3.5) + 3.5).toFixed(1);

const useCourseStore = create((set) => ({
  courses: [],
  loading: false,
  error: null,

  // GET: Fetch Data
  fetchCourses: async () => {
    set({ loading: true });
    try {
      const response = await axiosInstance.get("/courses");
      set({ courses: response.data, loading: false });
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },

  // POST: Add Data dengan Gambar, Avatar, dan Rating Acak
  addCourse: async (newCourse) => {
    const randomIndex = getRandomIndex();

    const finalPayload = {
      ...newCourse,
      img: `/img-cards/card${randomIndex}.jpg`,
      avatar: `/img-avatars/ava${randomIndex}.png`,
      rating: parseFloat(getRandomRating()),
      reviews: Math.floor(Math.random() * 150) + 10, // Reviews acak 10-160
      duration: Math.floor(Math.random() * 10) + 1, // Durasi acak 1-10 jam
    };

    try {
      const response = await axiosInstance.post("/courses", finalPayload);
      set((state) => ({ courses: [response.data, ...state.courses] }));
      return true;
    } catch (err) {
      console.error("Gagal menambah data:", err);
      return false;
    }
  },

  // PUT: Update Data
  updateCourse: async (id, updatedData) => {
    try {
      const response = await axiosInstance.put(`/courses/${id}`, updatedData);
      set((state) => ({
        courses: state.courses.map((c) => (c.id === id ? response.data : c)),
      }));
      return true;
    } catch (err) {
      return false;
    }
  },

  // DELETE: Delete Data
  deleteCourse: async (id) => {
    try {
      await axiosInstance.delete(`/courses/${id}`);
      set((state) => ({
        courses: state.courses.filter((c) => c.id !== id),
      }));
      return true;
    } catch (err) {
      return false;
    }
  },
}));

export default useCourseStore;
