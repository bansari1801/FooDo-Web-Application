//Author - Karan Rathore kr202401@dal.ca
import { getInstance } from '../config/token';
import axios from 'axios';

// for getting staff members list
export function getStaffMembers(payload){
    let config = getInstance('POST', `/staff/`, payload);
    return axios(config).then((res) => res.data)
               .catch(function (error) {
                 console.log(error);
               });
}

// for adding staff member
export function addStaffMember(payload){
  let url = '/staff/add';
  let config = getInstance('POST', url, payload);
  return axios(config).then((res) => res.data)
             .catch(function (error) {
               console.log(error);
             });
}

// for updating staff member details
export function updateStaffMember(payload){
  let url = '/staff/update';
  let config = getInstance('PUT', url, payload);
  return axios(config).then((res) => res.data)
             .catch(function (error) {
               console.log(error);
             });
}

// for deleting staff member
export function deleteStaffMember(id){
  let url = '/staff/'+id;
  let config = getInstance('DELETE', url, {});
  return axios(config).then((res) => res.data)
             .catch(function (error) {
               console.log(error);
             });
}

// for marking staff member present for the given date
export function presentStaffMember(payload){
  let url = '/staff/markpresent';
  let config = getInstance('POST', url, payload);
  return axios(config).then((res) => res.data)
             .catch(function (error) {
               console.log(error);
             });
}

// for marking staff member absent for the given date
export function absentStaffMember(payload){
  let url = '/staff/markabsent';
  let config = getInstance('POST', url, payload);
  return axios(config).then((res) => res.data)
             .catch(function (error) {
               console.log(error);
             });
}
