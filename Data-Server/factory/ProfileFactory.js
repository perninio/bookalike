const {
  PublicOrFriendProfileDTO,
  PrivateProfileDTO
} = require("../dtos/ProfileDTO");

const FactoryInterface = require("../interfaces/FactoryInterface");

module.exports = class ProfileFactory extends FactoryInterface {
  constructor() {
    super();
  }

  getProfileData(profile, isFriend) {
    switch (profile.status) {
      case "public":
        return new PublicOrFriendProfileDTO(profile);
      case "friends":
        if (isFriend) {
          return new PublicOrFriendProfileDTO(profile);
        } else {
          return new PrivateProfileDTO(profile);
        }
      case "private":
        return new PrivateProfileDTO(profile);
      default:
        console.log("tutaj");
    }
  }
};
