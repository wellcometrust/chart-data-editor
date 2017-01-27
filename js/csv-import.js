import Papa from 'papaparse';
/**
 * CSV parse handler
 *
 * @param      {HTMLElement}  csvInput       The csv input element
 * @param      {HTMLElement}  csvInputLabel  The csv input label element
 * @param      {JSONEditor}  editor         The JSON editor instance
 * @return     {void}
 */
const onParse = (csvInput, csvInputLabel, editor) => res => {
  // let the user know we've finished parsing
  csvInputLabel.innerText = 'CSV data loaded.';
  // check if the editor is instantiated
  if (editor) {
    // get first row and make suggested chart description
    // we assume the presence of column headers in the first row
    const firstRow = res.data[0];
    if (editor.getEditor('root.desc')) {
      editor.setValue({
        desc: firstRow.join(' | ')
      });
    }
    // check if we need to fill out the categories array
    const categoriesEditor = editor.getEditor('root.categories');
    if (categoriesEditor) {
      const categories = firstRow.slice(1);
      categories.map((cat, ci) => {
        categoriesEditor.addRow();
        const row = categoriesEditor.rows[ci];
        row.setValue(cat);
      });
    }
    // get the rest of the rows and the data subeditor
    const data = res.data.slice(1);
    const dataEditor = editor.getEditor('root.value');
    data.map((d, di) => {
      dataEditor.addRow();
      const row = dataEditor.rows[di];
      const update = row.getValue();
      // use row header as label title
      update['title'] = d[0];
      // if the value is a single number, just use the second cell
      // if it's an array, use the rest of the cells
      if (row.getPropertySchema('value').type === 'number') {
        update['value'] = d[1];
      } else {
        update['value'] = d.slice(1);
      }

      row.setValue(update);
    });
  }
};
/**
 * Sets up CSV import functionality for the provided editor
 *
 * @param      {HTMLElement}  csvInput       The csv input element
 * @param      {HTMLElement}  csvInputLabel  The csv input label element
 * @param      {JSONEditor}  editor         The JSON editor instance
 * @return     {void}
 */
const setupCSVImport = (csvInput, csvInputLabel, editor) => {
  csvInput.addEventListener('change', e => Papa.parse(
    e.target.files[0],
    { complete: onParse(csvInput, csvInputLabel, editor) }
  ));
};

export default setupCSVImport;
