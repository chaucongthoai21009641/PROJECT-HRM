export const getColor = (char) => {
  const colors = [
    "#f56a00",
    "#7265e6",
    "#ffbf00",
    "#00a2ae",
    "#87d068",
    "#1890ff",
    "#d46b08",
  ];
  const index = char?.charCodeAt(0) % colors.length;
  return colors[index] || "#ccc";
};
