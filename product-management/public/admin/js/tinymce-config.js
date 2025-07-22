//tinymce
tinymce.init({
  selector: "textarea.tinymce",
  plugins: "image",
  file_picker_callback: function (callback, value, meta) {
    if (meta.filetype === "image") {
      const input = document.createElement("input");
      input.setAttribute("type", "file");
      input.setAttribute("accept", "image/*");
      input.onchange = function () {
        const file = this.files[0];

        const reader = new FileReader();
        reader.onload = function () {
          const base64 = reader.result;
          callback(base64, { alt: file.name });
        };
        reader.readAsDataURL(file);
      };
      input.click();
    }
  },
});
