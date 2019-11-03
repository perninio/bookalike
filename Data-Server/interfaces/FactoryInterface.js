module.exports = class FactoryInterface {
  constructor() {
    if (new.target === FactoryInterface) {
      throw new TypeError("Cannot construct Factory instances directly");
    }
    if (this.getProfileData === undefined) {
      throw new TypeError("Must override method");
    }
  }

  getProfileData(profile) {}
};
