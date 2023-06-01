import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  type: "Studio",
  rentType: "Monthly",
  action: "HAVE ROOM",
  budget: null,
  description: null,
  movingDate: null,
  images: [],
  videos: [],
  amenities: [],
  interests: [],
  country: null,
  city: null,
  location: null,
  yourNationality: null,
  yourAstrologicalSign: null,
  yourAge: null,
  yourGender: "Male",
  yourOccupation: "Professional",
  yourLanguages: [],
  yourLifeStyle: null,

  gender: "Male",
  lifeStyle: "Early Brird",
  grouping: "Single",
  nationality: "Arab",
  numberOfPeople: null,
  smoking: false,
  drinking: false,
  visitors: false,
  cooking: false,
  pets: false,
  party: false,

  idEdit: "false",
  adId: null,
};

const TenantSlice = createSlice({
  name: "tenant",
  initialState,
  reducers: {
    isEdit(state, action) {
      state.isEdit = action.payload;
    },
    pets(state, action) {
      state.pets = action.payload;
    },
    party(state, action) {
      state.party = action.payload;
    },
    type(state, action) {
      state.type = action.payload;
    },
    rentType(state, action) {
      state.rentType = action.payload;
    },
    action(state, action) {
      state.action = action.payload;
    },
    budget(state, action) {
      state.budget = action.payload;
    },
    description(state, action) {
      state.description = action.payload;
    },
    movingDate(state, action) {
      state.movingDate = action.payload;
    },
    images(state, action) {
      console.log("action.payload", typeof action.payload);
      state.images = [...state.images, action.payload];
    },
    videos(state, action) {
      state.videos = [...state.videos, action.payload];
    },
    amenities(state, action) {
      state.amenities = action.payload;
    },
    interests(state, action) {
      state.interests = action.payload;
    },
    country(state, action) {
      state.country = action.payload;
    },
    city(state, action) {
      state.city = action.payload;
    },
    location(state, action) {
      state.location = action.payload;
    },
    yourNationality(state, action) {
      state.yourNationality = action.payload;
    },
    yourAstrologicalSign(state, action) {
      state.yourAstrologicalSign = action.payload;
    },
    yourAge(state, action) {
      state.yourAge = action.payload;
    },
    yourGender(state, action) {
      state.yourGender = action.payload;
    },
    yourOccupation(state, action) {
      state.yourOccupation = action.payload;
    },
    yourLanguages(state, action) {
      state.yourLanguages = action.payload;
    },
    yourLifeStyle(state, action) {
      state.yourLifeStyle = action.payload;
    },
    lifeStyle(state, action) {
      state.lifeStyle = action.payload;
    },
    numberOfPeople(state, action) {
      state.numberOfPeople = action.payload;
    },
    gender(state, action) {
      state.gender = action.payload;
    },
    grouping(state, action) {
      state.grouping = action.payload;
    },
    nationality(state, action) {
      state.nationality = action.payload;
    },
    smoking(state, action) {
      state.smoking = action.payload;
    },
    drinking(state, action) {
      state.drinking = action.payload;
    },
    visitors(state, action) {
      state.visitors = action.payload;
    },
    cooking(state, action) {
      state.cooking = action.payload;
    },

    clear(state, action) {
      state.type = "Studio";
      state.rentType = "Monthly";
      state.action = "HAVE ROOM";
      state.budget = "";
      state.description = null;
      state.movingDate = null;
      state.images = [];
      state.videos = [];
      state.amenities = [];
      state.interests = [];
      state.country = null;
      state.city = null;
      state.location = null;
      state.yourNationality = null;
      state.yourAstrologicalSign = null;
      state.yourAge = null;
      state.yourGender = "Male";
      state.yourOccupation = "Professional";
      state.yourLanguages = [];
      state.yourLifeStyle = null;

      state.gender = "Male";
      state.lifeStyle = "Early Brird";
      state.grouping = "Single";
      state.nationality = "Arab";
      state.numberOfPeople = null;
      state.smoking = false;
      state.drinking = false;
      state.visitors = false;
      state.cooking = false;
      state.pets = false;
      state.party = false;
    },
    editTenant(state, action) {
      state.type = action.payload.type;
      state.rentType = action.payload.rentType;
      state.action = action.payload.action;
      state.budget = action.payload.budget;
      state.description = null;
      const movingDate = new Date(action.payload.movingDate);
      const year = movingDate.getUTCFullYear();
      const month = String(movingDate.getUTCMonth() + 1).padStart(2, "0");
      const day = String(movingDate.getUTCDate()).padStart(2, "0");
      const formattedDate = `${year}-${month}-${day}`;
      console.log(formattedDate);
      state.movingDate = formattedDate;
      state.images = action.payload.images;
      state.videos = action.payload.videos;
      state.amenities = action.payload.amenities;
      state.interests = action.payload.interests;
      state.adId = action.payload.id;
      console.log(action.payload.id);
      state.city = action.payload.address.city;
      state.location = action.payload.address.location;
      state.yourNationality = action.payload.aboutYou.nationality;
      state.yourAstrologicalSign = action.payload.aboutYou.astrologicalSign;
      state.yourAge = action.payload.aboutYou.age;
      state.yourGender = action.payload.aboutYou.gender;
      state.yourOccupation = action.payload.aboutYou.occupation;
      state.yourLanguages = action.payload.aboutYou.languages;
      state.yourLifeStyle = action.payload.aboutYou.lifeStyle;

      state.gender = action.payload.poster.gender;
      state.lifeStyle = action.payload.socialPreferences.lifeStyle;
      state.grouping = action.payload.socialPreferences.grouping;
      state.nationality = action.payload.socialPreferences.nationality;
      //state.numberOfPeople = action.payload.socialPreferences;
      state.smoking = action.payload.socialPreferences.smoking;
      state.drinking = action.payload.socialPreferences.drinking;
      state.visitors = action.payload.socialPreferences.visitors;
      state.cooking = action.payload.socialPreferences.cooking;
      state.pets = action.payload.socialPreferences.pets;
      state.party = action.payload.socialPreferences.friendParty;
    },
  },
});

export const TenantActions = TenantSlice.actions;

export default TenantSlice.reducer;
