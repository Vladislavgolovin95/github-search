export const formatDate = (date: string): string => {
  const parsDate = new Date(date);

  const day = String(parsDate.getDate()).padStart(2, '0');
  const month = String(parsDate.getMonth() + 1).padStart(2, '0');
  const year = parsDate.getFullYear();

  return `${day}.${month}.${year}`;
};