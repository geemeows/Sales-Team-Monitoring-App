import { BASE_URL } from '../constants/constants';
angular.module('appModule').service('Employees', EmployeesService);

function EmployeesService($http) {
  const getEmployees = () => {
    const employeesUrl = `${BASE_URL}/employees`;

    return $http.get(employeesUrl);
  };

  const loadMoreEmployees = (page = 1, isPartTime = false) => {
    // [Load more empolyess logic goes here]
    const employeesUrl = isPartTime
      ? `${BASE_URL}/employees?page=${page}&isPartTime=${isPartTime}`
      : `${BASE_URL}/employees?page=${page}`;

    return $http.get(employeesUrl);
  };

  return {
    getEmployees,
    loadMoreEmployees,
  };
}
