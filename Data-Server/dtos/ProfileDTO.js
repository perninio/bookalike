const ProfileInterface = require("../interfaces/ProfileInterface");

class PublicOrFriendProfileDTO extends ProfileInterface {
  constructor(profile) {
    super();
    this.status = profile.status;
    this.firstname = profile.firstname;
    this.lastname = profile.lastname;
    this.birthdate = profile.birthdate;
    this.description = profile.description;
    this.graphic = profile.graphic;
    this.id = profile.userid;
  }
}
class PrivateProfileDTO extends ProfileInterface {
  constructor(profile) {
    super();
    this.status = profile.status;
    this.firstname = profile.firstname;
    this.lastname = profile.lastname;
    this.graphic = profile.graphic;
    this.id = profile.userid;
  }
}

module.exports = { PublicOrFriendProfileDTO, PrivateProfileDTO };
