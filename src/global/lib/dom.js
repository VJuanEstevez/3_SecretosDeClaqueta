class SafeHtml {
  #value;

  constructor(value) {
    this.#value = String(value);
  }

  toString() {
    return this.#value;
  }
}

const ESCAPES = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
};

export function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (character) => ESCAPES[character]);
}

export function raw(value) {
  return new SafeHtml(value);
}

function stringify(value) {
  if (value == null || value === false) return "";
  if (Array.isArray(value)) return value.map(stringify).join("");
  if (value instanceof SafeHtml) return value.toString();
  return escapeHtml(value);
}

export function html(strings, ...values) {
  let output = "";
  strings.forEach((part, index) => {
    output += part;
    if (index < values.length) output += stringify(values[index]);
  });
  return raw(output);
}

export function toElement(markup) {
  const template = document.createElement("template");
  template.innerHTML = String(markup).trim();
  return template.content.firstElementChild;
}
