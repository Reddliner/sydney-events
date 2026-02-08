// Fix for undici / fetch File reference in Node environments
if (typeof global.File === 'undefined') {
  global.File = class File {}
}
