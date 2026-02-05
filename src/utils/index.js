import React from "react";

export function numberWithCommas(x) {
  return (+x)?.toLocaleString();
}

export const useCountdown = (s) => {
  const [time, setTime] = React.useState(s);

  React.useEffect(() => {
    if (s === 0) {
      return;
    }
    const interval = setInterval(() => {
      setTime((t) => t - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [s]);

  const pad = (n) => (n < 10 ? "0" : "") + n;

  const days = Math.floor(time / (60 * 60 * 24));
  const hoursLeft = Math.floor(time - days * 86400);
  const hours = Math.floor(hoursLeft / 3600);
  const minutesLeft = Math.floor(hoursLeft - hours * 3600);
  const minutes = Math.floor(minutesLeft / 60);
  const seconds = Math.floor(time % 60);

  return [
    `${pad(days)}`,
    `${pad(hours)}`,
    `${pad(minutes)}`,
    `${pad(seconds)}`,
  ];
};

export const handleName = (name) => {
  return name?.charAt(0)?.toUpperCase() + name?.slice(1)?.toLowerCase();
};
export function formatNumber(
  amount,
  decimalCount = 0,
  decimal = ".",
  thousands = ","
) {
  try {
    decimalCount = Math.abs(decimalCount);
    decimalCount = isNaN(decimalCount) ? 2 : decimalCount;

    const negativeSign = amount < 0 ? "-" : "";

    let i = parseInt(
      (amount =
        decimalCount > 0
          ? Math.abs(Number(amount) || 0).toFixed(decimalCount)
          : Math.trunc(Number(amount) || 0)),
      10
    ).toString();
    let j = i.length > 3 ? i.length % 3 : 0;

    return (
      negativeSign +
      (j ? i.substr(0, j) + thousands : "") +
      i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) +
      (decimalCount
        ? decimal +
          Math.abs(amount - i)
            .toFixed(decimalCount)
            .slice(2)
        : "")
    );
  } catch (e) {
    console.log(e);
  }
}
