$( document ).ready(function() {
  function createActivityObject(id, time, date, activity) {
    let object = {
      id: id,
      time: time,
      date: date,
      activity: activity
    };

    createActivity(object);

    return object;
  }

  function createActivity(object) {
    let activities = getActivitiesArray();
    activities.push(object);
    pushActivityToLocalStorage(activities);
    return object;
  }

  function pushActivityToLocalStorage(array) {
    localStorage.setItem('scheduled-activities', JSON.stringify(array));
    return true;
  }

  function getActivitiesArray() {
    if (localStorage.getItem('scheduled-activities')) {
      try {
        let activities = JSON.parse(localStorage.getItem('scheduled-activities'));
        if (activities.length > 0) {
          return activities;
        } else {
          return [activities];
        }
      } catch {
        let activities = [localStorage.getItem('scheduled-activities')];
        return activities;
      }
    } else {
      return [];
    }
  }

  function createActivityId() {
    let activites = getActivitiesArray();
    let ids = [];
    for (let i = 0; i < activites.length; i++) {
      if (ids[i] > 1) {
        ids.push(activites[i].id);
      }
    }

    ids.sort(function(a, b){return b - a});

    return ids[ids.length - 1] + 1;
  }

  function queryActivity(id) {
    let activities = getActivitiesArray();

    for (let i = 0; i < activites.length; i++) {
      if (activites[i].id === id) {
        return activites[i];
      }
    }

    return false;
  }

  function queryActivityByDate(unix) {
    let activites = getActivitiesArray();
    console.log(activites);
    let todaysActivites = [];

    for (let i = 0; i < activites.length; i++) {
      if (activites[i].date === unix) {
        todaysActivites.push(activites[i]);
      }
    }

    return todaysActivites;
  }

  function indexOfObject(array, attribute, value) {
    for (let i = 0; i < array.length; i += 1) {
      if (array[i][attribute] === value) {
        return i;
      }
    }

    return -1;
  }

  function updateActivity (id, attribute, value) {
    let activites = getActivitiesArray();
    let index = indexOfObject(activites, 'id', id);
    console.log(index);
    if (typeof attribute === 'string') {
      activites[index][attribute] = value;
    } else {
      if (attribute.length == value.length) {
        for (let i = 0; i < attribute.length; i++) {
          activites[index][attribute[i]] = value[i];
        }
      }
    }
    pushActivityToLocalStorage(activities);

    return activities[index];
  }

  function deleteActivity(id) {
    let activites = getActivitiesArray();
    let index = indexOfObject(activites, 'id', id);
    activites.splice(index, 1);

    return true;
  }

  function showAllActivities() {
    let activites = queryActivityByDate(moment().format('MMDDYYYY'));
    for (let i = 0; i < activites.length; i++) {
      console.log(activites[i].time)
      console.log(activites[i].date)
      console.log(moment().format('MMDDYYYY'))
      $('.description').each(function() {
        if ($(this).attr('data-time') === activites[i].time) {
          $(this).val(activites[i].activity);
          $(this).attr('data-id', activites[i].id);
        }
      })
    }
  }
    let today = moment().format("dddd, MMMM Do, YYYY");
    $("#currentDay").text(today);
    let hours = 8;
    let dayStart = 9;
    for (let i = 0; i < hours; i++) {
      let color = '';
      if (parseInt(moment().format('kk')) < dayStart + i) {
        color = 'future';
      } else if (parseInt(moment().format('kk')) > dayStart + i) {
        color = "past";
      } else {
        color = "present";
      }
      $('.container').append(`<div class="row time-block">
        <div class="hour col-1">
          ${(dayStart + i) < 13 ? dayStart + i : (dayStart + i) - 12}${(dayStart + i) < 13 ? 'AM' : 'PM'}
        </div>
        <textarea data-time="${dayStart + i}" rows="2" class="${color} description col-10"></textarea>
        <button class="saveBtn" data-time="${dayStart + i}">
          <i class="fas fa-save"></i>
        </button>
      </div>`)
    }

    $('.saveBtn').on('click', function() {
      createActivityObject(createActivityId(), $(this).attr('data-time'), moment().format('MMDDYYYY'), $(this).prev('textarea').val());
      showAllActivities();
    });
    showAllActivities();
});
