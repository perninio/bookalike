module.exports = class ProfileInterface {
  constructor() {
    if (new.target === ProfileInterface) {
      throw new TypeError("Cannot construct Profile instances directly");
    }
  }
};
