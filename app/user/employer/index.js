// import { ScreenHeaderBtn } from "../worker";

// home screen
import Welcome from "./home/Welcome";
import Worker from "./job-details/Worker"
import PostedJob from "./home/PostedJob";

// job details screen
// import Company from "./worker/job-details/Company";
// import { default as JobTabs } from "./worker/job-details/Tabs";
// import { default as JobFooter } from "./worker/job-details/Footer";
// import Specifics from "./worker/job-details/Specifics";

// card
import WorkerCard from "./job-details/WorkerCard";
import PostedJobCard from "./home/PostedJobCard"

import Footer from "./job-details/Footer";

// fetch data
import {default as FirestoreDataFetch} from "../../../hook/firestoreFetch";
import { default as FirestoreDataCreate } from "../../../hook/firestoreCreate"


export {
  // ScreenHeaderBtn,
  Welcome,
  Worker,
  PostedJob,
  // Company,
  // JobTabs,
  // JobFooter,
  // Specifics,
  WorkerCard,
  PostedJobCard,
  Footer,
  FirestoreDataFetch,
  FirestoreDataCreate
};
