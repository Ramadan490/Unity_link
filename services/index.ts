// services/index.ts
export { addAnnouncement, getAnnouncements } from './announcementService';
export { addEvent, getEvents } from './eventService';
export { addMemorial, getMemorials } from './memorialService';
export { addRequest, getRequests } from './requestService';
export {
    getCurrentUser, getUsers, loadUserFromStorage, loginUser, logoutUser, registerUser, updateUserRole
} from './userService';

