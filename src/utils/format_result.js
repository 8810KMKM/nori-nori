export default fee => {
  const juice = Math.round(fee / 100);
  const burger = Math.round(fee / 500);
  const ramen = Math.round(fee / 1000);

  return { juice, burger, ramen };
};
