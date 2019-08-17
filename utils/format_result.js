export default fee => {
  const juice = Math.floor(fee / 100);
  const burger = Math.floor(fee / 500);
  const ramen = Math.floor(fee / 1000);

  return { juice, burger, ramen };
};
