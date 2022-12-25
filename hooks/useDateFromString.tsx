function useDateFromString(dateString: string) {
  const releaseDateConverted = new Date(dateString);

  let releaseDateResult = (releaseDateConverted.getUTCMonth() + 1).toString();
  releaseDateResult += ". " + releaseDateConverted.getUTCDate().toString();
  releaseDateResult += ". " + releaseDateConverted.getUTCFullYear().toString();

  return releaseDateResult;
}

export default useDateFromString;
