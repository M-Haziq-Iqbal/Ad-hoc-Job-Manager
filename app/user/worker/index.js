import ScreenHeaderBtn from "../admin/ScreenHeaderBtn";

// home screen
import Welcome from "./home/Welcome";
import AvailableJob from "./home/AvailableJob";

// job details screen
import Company from "./job-details/Company";
import { default as JobTabs } from "./job-details/Tabs";
import { default as JobFooter } from "./job-details/Footer";
import Specifics from "./job-details/Specifics";

// card
import AvailableJobCard from "./home/AvailableJobCard";

//fetch data
import { default as FetchData } from "../../../hook/useFetch";
import { default as FirestoreDataFetch } from "../../../hook/firestoreFetch";
import { default as FirestoreDataCreate } from "../../../hook/firestoreCreate"


export {
  ScreenHeaderBtn,
  Welcome,
  AvailableJob,
  Company,
  JobTabs,
  JobFooter,
  Specifics,
  AvailableJobCard,
  FetchData,
  FirestoreDataFetch,
  FirestoreDataCreate
};
