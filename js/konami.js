/**
 * does a konami
 *
 * @param      {Function}  cb      callback after konami is done
 * @return     {object}    the konami object
 */
const konami = cb => {
  const code = {
    input: '',
    pattern: '38384040373937396665',
    load: function() {
      document.addEventListener('keydown', event => {
        this.input += event.keyCode;

        if (this.input.length > this.pattern.length) {
          this.input = this.input.substr((this.input.length - this.pattern.length));
        }

        if (this.input === this.pattern) {
          event.preventDefault();
          cb();
          this.input = '';
          return false;
        }
      });
    }
  };
  code.load();
  return code;
};

export default konami;
