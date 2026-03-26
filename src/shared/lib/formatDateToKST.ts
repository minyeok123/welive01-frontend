export const formatDateToKST = (dateStr: string | null | undefined) => {
  if (dateStr == null || String(dateStr).trim() === '') return '-';

  const date = new Date(String(dateStr).trim());
  if (Number.isNaN(date.getTime())) return String(dateStr);

  return date
    .toLocaleString('ko-KR', {
      timeZone: 'Asia/Seoul',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    })
    .replace(/\. /g, '-')
    .replace(/\./g, '');
};
