import search from "@assets/icons/search.svg";
import { colors } from "@constants/colors";
import { IconButton, InputBase, Paper } from "@mui/material";
import React, { useState } from "react";

const SearchPhone = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const handleChange = (e) => {
    setSearchTerm(e.target.value);
    onSearch(e.target.value);
  };
  return (
    <div>
      <Paper
        component="form"
        sx={{
          p: "2px 4px",
          display: "flex",
          alignItems: "center",
          width: "100%",
          background: colors.purpleOpacity,
          boxShadow: 0,
        }}
      >
        <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
          <img src={search} alt={"search"} />
        </IconButton>
        <InputBase
          sx={{ ml: 1, flex: 1, color: colors.airaloText }}
          placeholder="Хайх"
          inputProps={{ "aria-label": "Хайх" }}
          onChange={handleChange}
          value={searchTerm}
        />
      </Paper>
    </div>
  );
};

export default SearchPhone;
