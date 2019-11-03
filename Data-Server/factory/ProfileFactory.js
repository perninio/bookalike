const {
  PublicOrFriendProfileDTO,
  PrivateProfileDTO
} = require("../dtos/ProfileDTO");

const FactoryInterface = require("../interfaces/FactoryInterface");

module.exports = class ProfileFactory extends FactoryInterface {
  constructor() {
    super();
  }

  getProfileData(profile) {
    switch (profile.status) {
      case "public":
      case "private":
        return new PublicOrFriendProfileDTO(profile);
      case "private":
        return new PrivateProfileDTO(profile);
      default:
        console.log("tutaj");
    }
  }
};
