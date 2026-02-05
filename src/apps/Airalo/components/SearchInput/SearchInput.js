import filter from "@assets/icons/filter.svg";
import search from "@assets/icons/search.svg";
import { colors } from "@constants/colors";
import { Divider, IconButton, InputBase, Paper } from "@mui/material";
import React, { useState } from "react";

const SearchInput = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const handleChange = (e) => {
    setSearchTerm(e.target.value);
    onSearch(e.target.value);
  };
  return (
    <div className={"w-full py-2 box-border"}>
      <Paper
        component="form"
        sx={{
          p: "2px 4px",
          height: 40,
          display: "flex",
          alignItems: "center",
          background: colors.black0,
          boxShadow: 0,
        }}
      >
        <IconButton sx={{ p: "10px" }} aria-label="menu">
          <img src={filter} alt={"filter"} />
        </IconButton>
        <InputBase
          sx={{
            ml: 1,
            flex: 1,
            height: 40,
            color: colors.airaloText,
          }}
          placeholder="Улс орон"
          inputProps={{ "aria-label": "Улс орон" }}
          onChange={handleChange}
          value={searchTerm}
        />
        <IconButton
          type="button"
          sx={{ paddingLeft: "10px" }}
          aria-label="search"
        >
          <img src={search} alt={"search"} />
        </IconButton>
      </Paper>
    </div>
  );
};

export default SearchInput;
