angular.module('appModule').component('employeesList', {
  templateUrl: 'components/employees-list/employees-list.html',
  controller: EmployeesListComponent,
  controllerAs: 'EmployeesListComponentVm',
  bindings: {
    employeesList: '<',
    filterStr: '<', // < indicates one-way binding
  },
});

function EmployeesListComponent() {}
