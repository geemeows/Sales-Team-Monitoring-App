/* eslint-disable no-unused-vars */
angular.module('appModule').controller('homeController', homePageController);

function homePageController(Employees) {
  const homePageVm = this;
  homePageVm.employees = [];
  homePageVm.currentPage = 1;
  homePageVm.totalPages = 0;
  homePageVm.isPartTime = true;
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
}
