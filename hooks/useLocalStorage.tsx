function useLocalStorage() {
  function getFromLocalStorage(key: string) {
    return localStorage.getItem(key);
  }
  function setToLocalStorage(key: string, value: string) {
    localStorage.setItem(key, value);
  }

  return { getFromLocalStorage, setToLocalStorage };
}

export default useLocalStorage;
