import React from "react";
import "./SidebarFilter.css";

const SidebarFilter = ({
  selectedCategories,
  setSelectedCategories,
  selectedPrices,
  setSelectedPrices,
  selectedDuration,
  setSelectedDuration,
  onReset,
}) => {
  const handleCheckboxChange = (value, state, setState) => {
    if (state.includes(value)) {
      setState(state.filter((item) => item !== value));
    } else {
      setState([...state, value]);
    }
  };

  return (
    <aside className="filter-sidebar">
      <div className="filter-group-header">
        <span>Filter</span>
        <button className="btn-reset" onClick={onReset}>
          Reset
        </button>
      </div>

      <div className="filter-section">
        <h4>Bidang Studi</h4>
        {[
          "Pemasaran",
          "Desain",
          "Digital & Teknologi",
          "Pengembangan Diri",
          "Bisnis Manajemen",
        ].map((cat) => (
          <label key={cat} className="filter-item">
            <input
              type="checkbox"
              checked={selectedCategories.includes(cat)}
              onChange={() =>
                handleCheckboxChange(
                  cat,
                  selectedCategories,
                  setSelectedCategories,
                )
              }
            />
            {cat}
          </label>
        ))}
      </div>

      <div className="filter-section">
        <h4>Harga</h4>
        {["Gratis", "Berbayar"].map((p) => (
          <label key={p} className="filter-item">
            <input
              type="checkbox"
              checked={selectedPrices.includes(p)}
              onChange={() =>
                handleCheckboxChange(p, selectedPrices, setSelectedPrices)
              }
            />
            {p}
          </label>
        ))}
      </div>

      <div className="filter-section">
        <h4>Durasi</h4>
        {["Kurang dari 4 Jam", "4-8 Jam", "Lebih dari 8 Jam"].map((dur) => (
          <label key={dur} className="filter-item">
            <input
              type="radio"
              name="duration"
              checked={selectedDuration === dur}
              onChange={() => setSelectedDuration(dur)}
            />
            {dur}
          </label>
        ))}
      </div>
    </aside>
  );
};

export default SidebarFilter;
