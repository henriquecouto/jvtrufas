const project = {
  name: "JV Trufas",
  authors: ["Henrique Couto"]
};

const getAuthors = () => project.authors.join(", ");

module.exports = { project, getAuthors };
