/* eslint-disable no-unused-vars */
angular.module('appModule').controller('homeController', homePageController);

function homePageController(Employees, $scope, $location) {
  const homePageVm = this;
  homePageVm.employees = [];
  homePageVm.currentPage = 1;
  homePageVm.totalPages = 0;
  homePageVm.isPartTime = false;
  homePageVm.isLoading = false;

  activate();

  function activate() {
    homePageVm.isLoading = true;
    Employees.getEmployees()
      .then(({ data }) => {
        homePageVm.employees = homePageVm.employees.concat(data.employees);
        homePageVm.currentPage = data.current_page;
        homePageVm.totalPages = data.pages;
        homePageVm.isLoading = false;
      })
      .catch(() => {
        homePageVm.isLoading = false;
      });
  }

  homePageVm.loadMore = function () {
    if (homePageVm.currentPage === homePageVm.totalPages) return;
    homePageVm.isLoading = true;
    Employees.loadMoreEmployees(
      homePageVm.currentPage + 1,
      homePageVm.isPartTime
    )
      .then(({ data }) => {
        homePageVm.employees = homePageVm.employees.concat(data.employees);
        homePageVm.currentPage = data.current_page;
        homePageVm.totalPages = data.pages;
        homePageVm.isLoading = false;
      })
      .catch(() => {
        homePageVm.isLoading = false;
      });
  };

  function setIsPartTime() {
    homePageVm.isPartTime = !homePageVm.isPartTime;
  }
  homePageVm.getQueryParam = function () {
    return $location.search().filter;
  };
  homePageVm.handleFilterChange = function (value) {
    if (value) {
      $location.path('/').search({ filter: value });
    } else {
      $location.path('/').search({});
    }
  };
}
