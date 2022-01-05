import axios from "axios";
const BASE_URL = "https://api.stagingaia.com";
// const BASE_URL = "http://192.168.0.21:5001"; //Fatima
// const BASE_URL = "http://192.168.0.21:5001"; //Usama
const BASE_URL_STRIPE = "https://api.stripe.com/v1";
const STRIPE_PUBLISHABLE_KEY = "pk_test_p70ntuGAVS0fwxQrqHagViMn00ndsuW2zD";


class ApiServices {
  constructor(props) {}

  onLoginApi = (email, password, callback) => {
    let data = JSON.stringify({
      email: email,
      password: password,
    });

    let config = {
      method: "post",
      url: BASE_URL + "/api/v1/auth/login/customer",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then((response) => {
        callback({
          isSuccess: true,
          response: response,
        });
      })
      .catch((error) => {
        callback({
          isSuccess: false,
          response: error,
        });
      });
  };


  addCard = (token, id,name, callback) => {
    var data = JSON.stringify({
      "source": id,
      "name": name,
      "address_line1": "Pakistan LHR"
    });

    var config = {
      method: 'post',
      url: 'https://api.stagingaia.com/api/v1/users/addcard',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      data : data
    };

    console.log('Config',config)

    axios(config)
        .then((response) => {
          callback({
            isSuccess: true,
            response: response,
          });
        })
        .catch((error) => {
          callback({
            isSuccess: false,
            response: error,
          });
        });
  };


  onGetPlan = (callback) => {
    let config = {
      method: "get",
      url: BASE_URL + "/api/v1/auth/default_plan?default=1",
      headers: {
        "Content-Type": "application/json",
      },
    };

    axios(config)
      .then((response) => {
        callback({
          isSuccess: true,
          response: response,
        });
      })
      .catch((error) => {
        callback({
          isSuccess: false,
          response: error,
        });
      });
  };

  onSignUpApi = (stripeId, data, callback) => {
    let value = JSON.stringify({
      StripeId: stripeId,
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      password: data.password,
      phone: data.phoneNumber,
      username: `${data.firstName} ${data.lastName}`,
      profilePictureURL: 'null',
    });

    var config = {
      method: "post",
      url: BASE_URL + "/api/v1/auth/signup/customer",
      headers: {
        "Content-Type": "application/json",
      },
      data: value,
    };

    axios(config)
      .then((response) => {
        callback({
          isSuccess: true,
          response: response,
        });
      })
      .catch((error) => {
        callback({
          isSuccess: false,
          response: error,
        });
      });
  };

  createImageUrl = (token, type,name, callback) => {
    var data = JSON.stringify({
      "ContentType": type,
      "Key": name,
      "title": ''
    });

    var config = {
      method: 'post',
      url: BASE_URL + '/api/v1/media/signed/url',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      data : data
    };

    axios(config)
        .then(response => {
          callback({
            isSuccess: true,
            response: response,
          });
        })
        .catch(error => {
          callback({
            isSuccess: false,
            response: error,
          });
        });
  };

  updateProfile = (token,value, callback) => {
    var config = {
      method: 'put',
      url: BASE_URL + '/api/v1/users/profile',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      data: value,
    };

    axios(config)
        .then(response => {
          callback({
            isSuccess: true,
            response: response,
          });
        })
        .catch(error => {
          callback({
            isSuccess: false,
            response: error,
          });
        });
  };

  onSignUpPaidApi = (id,stripeId, data, callback) => {
    let value = JSON.stringify({
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      password: data.password,
      username: data.userName,
      source: id,
      profilePictureURL: "/abcsghi",
      StripeId: stripeId,
    });

    var config = {
      method: "post",
      url: BASE_URL + "/api/v1/auth/signup/customer",
      headers: {
        "Content-Type": "application/json",
      },
      data: value,
    };

    axios(config)
      .then((response) => {
        callback({
          isSuccess: true,
          response: response,
        });
      })
      .catch((error) => {
        callback({
          isSuccess: false,
          response: error,
        });
      });
  };

  getToken = async (cardName, cardNumber, cvc, month, year) => {
    const card = {
      "card[number]": cardNumber.replace(/ /g, ""),
      "card[exp_month]": month,
      "card[exp_year]": year,
      "card[cvc]": cvc,
    };
    return await fetch(`${BASE_URL_STRIPE}/tokens`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${STRIPE_PUBLISHABLE_KEY}`,
      },
      method: "post",
      body: Object.keys(card)
        .map((key) => key + "=" + card[key])
        .join("&"),
    }).then((response) => response.json());
  };

  getUserProfile = (token, callback) => {
    var config = {
      method: "get",
      url: BASE_URL + "/api/v1/users/",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };

    axios(config)
      .then((response) => {
        callback({
          isSuccess: true,
          response: response,
        });
      })
      .catch((error) => {
        callback({
          isSuccess: false,
          response: error,
        });
      });
  };

  getCategories = (token,type,callback) => {
    var config = {
      method: "get",
      url: BASE_URL + `/api/v1/category/categories?type=${type}`,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };

    axios(config)
        .then((response) => {
          callback({
            isSuccess: true,
            response: response,
          });
        })
        .catch((error) => {
          callback({
            isSuccess: false,
            response: error,
          });
        });
  };

  getUserTasks = (token,callback) => {
    var config = {
      method: "get",
      url: BASE_URL + '/api/v1/tasks/user',
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };

    axios(config)
        .then((response) => {
          callback({
            isSuccess: true,
            response: response,
          });
        })
        .catch((error) => {
          callback({
            isSuccess: false,
            response: error,
          });
        });
  };

  getCourseTypes = (token,url,callback) => {
    var config = {
      method: "get",
      url: BASE_URL + url,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };

    axios(config)
        .then((response) => {
          callback({
            isSuccess: true,
            response: response,
          });
        })
        .catch((error) => {
          callback({
            isSuccess: false,
            response: error,
          });
        });
  };

  getResourceTypes = (token,url,callback) => {
    var config = {
      method: "get",
      url: BASE_URL + url,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };

    axios(config)
        .then((response) => {
          callback({
            isSuccess: true,
            response: response,
          });
        })
        .catch((error) => {
          callback({
            isSuccess: false,
            response: error,
          });
        });
  };

  getNotifications = (token,page,callback) => {
    var config = {
      method: "get",
      url: BASE_URL +`/api/v1/notification?admin=false&page=${page}`,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };

    console.log('Config',config)

    axios(config)
        .then((response) => {
          callback({
            isSuccess: true,
            response: response,
          });
        })
        .catch((error) => {
          callback({
            isSuccess: false,
            response: error,
          });
        });
  };

  newJourney = (token,title,description,callback) => {
    var data = JSON.stringify({
      "title": title,
      "description": description
    });

    var config = {
      method: 'post',
      url: BASE_URL + '/api/v1/journey/newjourney',
      headers: {
        'Authorization': `Bearer ${token}` ,
        'Content-Type': 'application/json'
      },
      data : data
    };

    axios(config)
        .then((response) => {
          callback({
            isSuccess: true,
            response: response,
          });
        })
        .catch((error) => {
          callback({
            isSuccess: false,
            response: error,
          });
        });
  }

  createGoal = (token,title,description,catId,progress,dateComplete,checkList,callback) => {
    var data = JSON.stringify({
      "title": title,
      "description": description,
      "categoryId": catId,
      "progress": progress,
      "dateCompleted": dateComplete,
      "checklist": checkList
    });

    var config = {
      method: 'post',
      url: BASE_URL + '/api/v1/goals/user',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      data : data
    };

    axios(config)
        .then((response) => {
          callback({
            isSuccess: true,
            response: response,
          });
        })
        .catch((error) => {
          callback({
            isSuccess: false,
            response: error,
          });
        });
  }

  editGoal = (token,goalId,title,description,catId,progress,dateComplete,checkList,deleteList,callback) => {
    var data = JSON.stringify({
      "title": title,
      "description": description,
      "categoryId": catId,
      "progress": progress,
      "dateCompleted": dateComplete,
      "checklist": checkList,
      // "previous_checklist": checkList,
      // "delete_checklist": deleteList,
    });

    var config = {
      method: 'put',
      url: BASE_URL + '/api/v1/goals/'+ goalId,
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      data : data
    };

    console.log('Config',config)

    axios(config)
        .then((response) => {
          callback({
            isSuccess: true,
            response: response,
          });
        })
        .catch((error) => {
          callback({
            isSuccess: false,
            response: error,
          });
        });
  }

  createUserTask = (token,title,status,priority,description,date,endDate,callback) => {
    var data = JSON.stringify({
      "title": title,
      "priority": priority,
      "status": status,
      "startDate": date,
      "dueDate": endDate,
      "description": description
    });

    var config = {
      method: 'post',
      url: BASE_URL + '/api/v1/tasks/user',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      data : data
    };

    axios(config)
        .then((response) => {
          callback({
            isSuccess: true,
            response: response,
          });
        })
        .catch((error) => {
          callback({
            isSuccess: false,
            response: error,
          });
        });
  }

  updateUserTask = (id,token,title,status,priority,description,date,endDate,callback) => {
    var data = JSON.stringify({
      "title": title,
      "priority": priority,
      "status": status,
      "startDate": date,
      "dueDate": endDate,
      "description": description
    });

    var config = {
      method: 'put',
      url: BASE_URL + `/api/v1/tasks/${id}`,
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      data : data
    };

    axios(config)
        .then((response) => {
          callback({
            isSuccess: true,
            response: response,
          });
        })
        .catch((error) => {
          callback({
            isSuccess: false,
            response: error,
          });
        });
  }

  deleteUserTask = (token,id,callback) => {

    var config = {
      method: 'delete',
      url: BASE_URL + `/api/v1/tasks/user/${id}`,
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    };

    axios(config)
        .then((response) => {
          callback({
            isSuccess: true,
            response: response,
          });
        })
        .catch((error) => {
          callback({
            isSuccess: false,
            response: error,
          });
        });
  }

  getJourney = (token,callback) => {
    var config = {
      method: 'get',
      url: BASE_URL + '/api/v1/journey/alljourney/?size=30',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    };

    axios(config)
        .then((response) => {
          callback({
            isSuccess: true,
            response: response,
          });
        })
        .catch((error) => {
          callback({
            isSuccess: false,
            response: error,
          });
        });
  }

  getGoals = (token,callback) => {
    var config = {
      method: 'get',
      url: BASE_URL + '/api/v1/goals/user',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    };

    axios(config)
        .then((response) => {
          callback({
            isSuccess: true,
            response: response,
          });
        })
        .catch((error) => {
          callback({
            isSuccess: false,
            response: error,
          });
        });
  }

  getCoursesData = (token,page,callback) => {
    var config = {
      method: "get",
      // url: BASE_URL + `/api/v1/courses/?size=10&page=${page}`,
      url: BASE_URL + '/api/v1/courses/?size=30',
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };

    axios(config)
      .then((response) => {
        callback({
          isSuccess: true,
          response: response,
        });
      })
      .catch((error) => {
        callback({
          isSuccess: false,
          response: error,
        });
      });
  };

  getEvents = (token,url,callback) => {
    var config = {
      method: "get",
      url: BASE_URL + url,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };

    axios(config)
      .then((response) => {
        callback({
          isSuccess: true,
          response: response,
        });
      })
      .catch((error) => {
        callback({
          isSuccess: false,
          response: error,
        });
      });
  };

  getResourceData = (token, callback) => {
    var config = {
      method: "get",
      // url: BASE_URL + `/api/v1/resources/?size=15&page=${page}`,
      url: BASE_URL + '/api/v1/resources/?size=30',
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };

    axios(config)
      .then((response) => {
        callback({
          isSuccess: true,
          response: response,
        });
      })
      .catch((error) => {
        callback({
          isSuccess: false,
          response: error,
        });
      });
  };

  getAllForum = (token, callback) => {
    var config = {
      method: "get",
      // url: BASE_URL + `/api/v1/resources/?size=15&page=${page}`,
      url: BASE_URL + '/api/v1/forum/getall',
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };

    axios(config)
      .then((response) => {
        callback({
          isSuccess: true,
          response: response,
        });
      })
      .catch((error) => {
        callback({
          isSuccess: false,
          response: error,
        });
      });
  };

  getDashboardData = (token, callback) => {
    var config = {
      method: "get",
      url: BASE_URL + "/api/v1/dashboard/latest",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };

    axios(config)
      .then((response) => {
        callback({
          isSuccess: true,
          response: response,
        });
      })
      .catch((error) => {
        callback({
          isSuccess: false,
          response: error,
        });
      });
  };

  getAnnouncements = (token, callback) => {
    var config = {
      method: "get",
      url: BASE_URL + "/api/v1/annoucements/latest",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };

    axios(config)
        .then((response) => {
          callback({
            isSuccess: true,
            response: response,
          });
        })
        .catch((error) => {
          callback({
            isSuccess: false,
            response: error,
          });
        });
  };

  getSingleCourse = (token,courseId, callback) => {
    var config = {
      method: "get",
      url: BASE_URL + "/api/v1/courses/" + courseId,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };

    axios(config)
        .then((response) => {
          callback({
            isSuccess: true,
            response: response,
          });
        })
        .catch((error) => {
          callback({
            isSuccess: false,
            response: error,
          });
        });
  };


  getTasks = (token,start_date,end_date,page ,callback) => {
    var config = {
      method: "get",
      url: BASE_URL + `/api/v1/payment?start_date=${start_date}&end_date=${end_date}&size=50&page=${page}`,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };

    console.log('config',config)

    axios(config)
        .then((response) => {
          callback({
            isSuccess: true,
            response: response,
          });
        })
        .catch((error) => {
          callback({
            isSuccess: false,
            response: error,
          });
        });
  };


  getCardsData = (token, callback) => {
    var config = {
      method: "get",
      url: BASE_URL + '/api/v1/users/getcard',
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };

    axios(config)
        .then((response) => {
          callback({
            isSuccess: true,
            response: response,
          });
        })
        .catch((error) => {
          callback({
            isSuccess: false,
            response: error,
          });
        });
  };

  enrollCourse = (token,data,url,callback) => {
    var config = {
      method: 'post',
      url: BASE_URL + url,
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      data : data
    };


    axios(config)
        .then((response) => {
          callback({
            isSuccess: true,
            response: response,
          });
        })
        .catch((error) => {
          callback({
            isSuccess: false,
            response: error,
          });
        });
  }


  onChangePlan = (token,data,url,callback) => {
    var config = {
      method: 'post',
      url: BASE_URL + url,
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      data : data
    };

    console.log('Config',config)

    axios(config)
        .then((response) => {
          callback({
            isSuccess: true,
            response: response,
          });
        })
        .catch((error) => {
          callback({
            isSuccess: false,
            response: error,
          });
        });
  }

  deleteGoal = (token,id,callback) => {
    var config = {
      method: 'delete',
      url: BASE_URL + `/api/v1/goals/user/${id}`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    };

    axios(config)
        .then((response) => {
          callback({
            isSuccess: true,
            response: response,
          });
        })
        .catch((error) => {
          callback({
            isSuccess: false,
            response: error,
          });
        });
  }

  changeSingleGoalStatus = (token,id,callback) => {
    var config = {
      method: 'put',
      url: BASE_URL + `/api/v1/goals/changestatus/${id}`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    };

    axios(config)
        .then((response) => {
          callback({
            isSuccess: true,
            response: response,
          });
        })
        .catch((error) => {
          callback({
            isSuccess: false,
            response: error,
          });
        });
  }

  getNotificationsSeen = (token,id,callback) => {
    var config = {
      method: 'put',
      url: BASE_URL + `/api/v1/notification/read/${id}`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    };

    axios(config)
        .then((response) => {
          callback({
            isSuccess: true,
            response: response,
          });
        })
        .catch((error) => {
          callback({
            isSuccess: false,
            response: error,
          });
        });
  }


  changeDefault = (token,url,method,callback) => {
    var config = {
      method: method,
      url: BASE_URL + url,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    };

    axios(config)
        .then((response) => {
          callback({
            isSuccess: true,
            response: response,
          });
        })
        .catch((error) => {
          callback({
            isSuccess: false,
            response: error,
          });
        });
  }
}

const apiService = new ApiServices();

export default apiService;
