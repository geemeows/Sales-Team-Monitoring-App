angular.module('appModule').service('Employees', EmployeesService);

function EmployeesService($http) {
  const getEmployees = () => {
    const employeesUrl =
      'https://fe-task.getsandbox.com/employees?isPartTime=true';

    return $http.get(employeesUrl);
  };

  const loadMoreEmployees = (page = 1, isPartTime = false) => {
    // [Load more empolyess logic goes here]
    const employeesUrl = isPartTime
      ? `https://fe-task.getsandbox.com/employees?page=${page}&isPartTime=${isPartTime}`
      : `https://fe-task.getsandbox.com/employees?page=${page}`;

    return $http.get(employeesUrl);
  };

  return {
    getEmployees,
    loadMoreEmployees,
  };
}
