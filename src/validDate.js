class ValidDate {

  constructor(taskDate) {
    this.taskDate = taskDate;
    this.parseTaskDate();

    let defaultDateValue = ValidDate.getDefaultValueCurrentDate();

    this.dayOfMonth = defaultDateValue[0];
    this.month = ValidDate.normalizeMonth(defaultDateValue[1]);
    this.year = defaultDateValue[2];
  }

  parseTaskDate() {
    this.parsedTaskDate = this.taskDate.split("\/");
  }

  isValidDate() {
    let validDay = this.parsedTaskDate[1] >= this.dayOfMonth;
    let validMonth = this.parsedTaskDate[0] >= this.month;
    let validYear = this.parsedTaskDate[2] >= this.year;

    return validDay && validMonth && validYear;
  }

  static getDefaultValueCurrentDate() {
    let currentDate = new Date(Date.now());
    let dayOfMonth = currentDate.getDate();
    let month = currentDate.getMonth();
    let year = currentDate.getFullYear();

    return [dayOfMonth, month, year];
  }

  static getDefaultCurrentDateString() {
    let currentDate = new Date(Date.now());
    let dayOfMonth = currentDate.getDate();
    let month = ValidDate.normalizeMonth(currentDate.getMonth());

    if (month.toString().length == 1) {
      month = "0" + month;
    }

    let year = currentDate.getFullYear();
    return `${month}/${dayOfMonth}/${year}`
  }

  static normalizeMonth(month) {
    return month + 1;

  }
  static  getDateRegex() {
    return /\d{2}\/\d{2}\/\d{4}/;
  }

  static validDateRegex(dateString) {
    return this.getDateRegex().test(dateString);
  }
}

export default ValidDate;
