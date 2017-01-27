import Clipboard from 'clipboard';
/**
 * sets up the Clipboard button functionality
 *
 * @param      {string}  clippySelector     The copiable element selector
 * @param      {string}  clippyMsgSelector  The clippy message selector
 * @return     {void}
 */
const setupClipboard = (clippySelector, clippyMsgSelector) => {
  let timer;
  let textTimer;

  const clippy = new Clipboard(clippySelector);
  const clippyMessage = document.querySelector(clippyMsgSelector);

  clippy.on('success', e => {
    const timeout = 2000;

    clearTimeout(timer);
    clearTimeout(textTimer);
    clippyMessage.classList.add('is-shown');

    timer = setTimeout(() => {
      clippyMessage.classList.remove('is-shown');
      textTimer = setTimeout(() => clippyMessage.innerHTML = '', timeout);
    }, timeout);
  });
};

export default setupClipboard;
