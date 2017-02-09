/**
 * sets up JSON import textarea field
 *
 * @param      {HTMLTextAreaElement}  textarea  The textarea
 * @param      {HTMLButtonElement}  button    The button that triggers the import
 * @param      {JSONEditor}  editor    The JSONEditor editor
 * @return     {void}
 */
const setupJSONImport = (textarea, button, editor) => {
  button.addEventListener('click', e => {
    try {
      const json = JSON.parse(textarea.value);
      editor.setValue(json);
      textarea.classList.remove('textarea--invalid');
    } catch (e) {
      console.error('failed to parse JSON', e);
      textarea.classList.add('textarea--invalid');
    }
  });
};

export default setupJSONImport;
