const setItem = async (name, data) => {
  await localStorage.setItem(name, JSON.stringify(data));
};

const getItem = async (name) => {
  const value = await localStorage.getItem(name);
  return JSON.parse(value || "{}");
};

const removeItem = async (name) => {
  await localStorage.removeItem(name);
};

export default {
  setItem,
  getItem,
  removeItem,
};
