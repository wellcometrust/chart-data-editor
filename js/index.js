// this module doesn't do modules yet, so we just run it and get the JSONEditor object from the window
import 'json-editor';
import hljs from 'highlight.js';
import setupCSVImport from './csv-import.js';
import setupJSONImport from './json-import.js';
import konami from './konami.js';
import setupClipboard from './setup-clipboard.js';

// get CSV input elements
const csvInput = document.getElementById('csv-input');
const csvInputLabel = document.querySelector('.csv-input__label');

// get editor elements
const wrapper = document.querySelector('.editor-wrapper');
const editorHolder = document.getElementById('editor-holder');
const output = document.getElementById('output');
const outputContainer = document.querySelector('.output-container');
const screenshot = document.getElementById('screenshot');
const screenshotWrapper = document.querySelector('.screenshot-wrapper');

const jsonInput = document.getElementById('json-input');
const jsonInputBtn = document.getElementById('json-input-btn');

// set up select list interaction
const chartSelect = document.getElementById('chart-type');
chartSelect.value = '';
chartSelect.addEventListener('change', e => loadChartBuilder(e.target.value));

/**
 * Loads a chart builder based on the requested schema.
 *
 * @param      {string}  chartType  The selected chart type
 * @return     {void}  { description_of_the_return_value }
 */
const loadChartBuilder = chartType => {
  editorHolder.innerHTML = '';
  // load schemas
  const xhr = new window.XMLHttpRequest();
  xhr.open('GET', `/schemae/${chartType}.schema.json`, true);

  xhr.addEventListener('load', e => {
    // try catch in case the JSON doesn't parse
    try {
      const schema = JSON.parse(xhr.responseText);
      const editor = new window.JSONEditor(editorHolder, {
        schema,
        disable_properties: true
      });

      screenshot.src = `/images/${chartType}.screenshot.png`;
      setupCSVImport(csvInput, csvInputLabel, editor);
      setupJSONImport(jsonInput, jsonInputBtn, editor);

      editor.on('change', e => {
        output.innerText = JSON.stringify(editor.getValue(), null, ' ');
        // highlight the code field
        hljs.highlightBlock(output);
      });
      window.hljs = hljs;

      wrapper.classList.add('editor-wrapper--visible');
      outputContainer.classList.add('output-container--visible');
      screenshotWrapper.classList.add('screenshot-wrapper--visible');
    } catch (e) {
      console.error(e);
    }
  });

  xhr.send();
};
// set up other stuff
const laterSetup = () => {
  setupClipboard('.js-clippy', '#clippy-message');
  konami(() => document.documentElement.classList.add('konami'));
};
// we don't need to do these immediately, wait for a bit
if ('requestIdleCallback' in window) {
  window.requestIdleCallback(laterSetup);
} else {
  setTimeout(laterSetup, 1000);
}
