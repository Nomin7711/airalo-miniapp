import { colors } from "@constants/colors";
import { Box, CircularProgress, circularProgressClasses } from "@mui/material";
import React from "react";
const CustomCircularProgress = ({ progress, data, remaining, total }) => {
  return (
    <Box
      sx={{
        position: "relative",
      }}
    >
      <CircularProgress
        variant="determinate"
        size={100}
        thickness={4}
        value={100}
        sx={{
          color: "#E0434D",
          position: "relative",
        }}
      />

      <Box sx={{ width: "100%", position: "absolute", top: 0, left: 0 }}>
        <CircularProgress
          variant="determinate"
          sx={{
            color: colors.black0,
            animationDuration: "550ms",
            [`& .${circularProgressClasses.circle}`]: {
              strokeLinecap: "round",
            },
          }}
          size={100}
          thickness={4}
          value={progress}
        />
      </Box>
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "absolute",
        }}
      >
        <div className="text-center">
          <p className="text-xxs text-black0 font-bold">
            {total ? total / 1024 : 0} GB
          </p>
          <p className="text-xxs text-black0 font-bold">
            {(remaining / 1024)?.toFixed(2)} GB
          </p>
        </div>
      </Box>
    </Box>
  );
};

const UsedData = ({ progress, total, remaining, expired_at, data }) => {
  const expire = new Date(expired_at?.split(" ")?.[0]);
  const diffDay = Math.floor((expire - new Date()) / (1000 * 60 * 60 * 24));
  return (
    <div className="bg-purpleOpacity px-3 py-4 rounded-2xl flex grid grid-cols-2 gap-4">
      <div
        className="p-4 text-center"
        style={{
          backgroundImage:
            "linear-gradient(225deg, #FFC071 5.48%, #AC507D 66.26%)",
          borderRadius: 16,
        }}
      >
        <CustomCircularProgress
          progress={progress}
          data={data}
          total={total}
          remaining={remaining}
        />
      </div>
      <div className="flex flex-col gap-3 justify-center">
        <div>
          <p className="text-airaloText text-[13px]">Дуусах хугацаа</p>
          <p className="text-airaloText text-[16px] font-semibold mt-1">
            {diffDay > 0 ? diffDay : 0} days
          </p>
        </div>
        <div>
          <p className="text-airaloText text-[13px]">Үлдсэн дата</p>
          <p className="text-airaloText text-[16px] font-semibold mt-1">
            {(total / 1024)?.toFixed(2)} GB
          </p>
        </div>
      </div>
    </div>
  );
};

export default UsedData;
