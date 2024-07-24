function replaceHolder(template, replacements) {
  Object.keys(replacements).forEach((key) => {
    const placeholder = new RegExp(`{{${key}}}`, "g");
    template = template.replace(placeholder, replacements[key]);
  });
  return template;
}

module.exports = {
  replaceHolder,
};
