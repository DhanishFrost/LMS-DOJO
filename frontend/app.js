const adminSidebar = {
  template: `
  <div class="adminsidebar">
  <span class="absolute text-white text-4xl top-5 left-4 cursor-pointer">
      <i class="fas fa-bars px-2 bg-gray-900 rounded-md" @click="OpenSidebar()"></i></span>
                  <div class="text-gray-100 text-xl">
  <div class="fixed top-0 bottom-0 lg:left-0 left-[-300px] p-2 w-[300px] overflow-y-auto text-center bg-black" id="adminsidebar">
  
   

      <div class="p-2.5 mt-1 flex items-center">
        <i class="fas fa-user-circle"></i>
        <h1 class="font-bold texy-gray-200 text-[15px] ml-3"> User Name</h1>
        <i class="fas fa-times ml-20 cursor-pointer lg:hidden" @click="OpenSidebar()"></i>
        </div>
        <hr class="my-2 text-gray-700">


        <div class="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover bg-orange-600 text-white ">
          <i class="fas fa-home"></i> 
          <span class="text-[15px] ml-4 text-gray-200">

          <a href="./admin-dashboard.html">Dashboard</a></span>  
          </div>

          <div class="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover bg-orange-600 text-white " @click="dropdown()">
          <i class="fas fa-user"></i> 
          <div class="flex justify-between w-full items-center">
          <span class="text-[15px] ml-4 text-gray-200">Manage Users</span>  
          <span class="text-sm rotate-0" id="arrow"><i class="fas fa-chevron-down ml-2"></i></span>
      </div>
      </div>


      <div class="text-left text-sm font-thin mt-2 w-4/5 mx-auto text-gray-200 flex flex-col hidden" id="submenu">
        <a href="./manage-students.html" class="cursor pointer p-2 hover:bg-gray-700 rounded-md mt-1 hover:text-white">Manage Students</a>  
        <a href="./manage-teachers.html" class="cursor pointer p-2 hover:bg-gray-700 rounded-md mt-1 hover:text-white">Manage Teachers</a>  
        <a href="./manage-admins.html" class="cursor pointer p-2 hover:bg-gray-700 rounded-md mt-1 hover:text-white">Manage Administrators</a>  

        </div>

          <div class="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover bg-orange-600 text-white ">
          <i class="fas "></i> 
          <span class="text-[15px] ml-4 text-gray-200">Subjects</span>  
          </div>
   


      
      <div class="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover bg-orange-600 text-white ">
      <i class="fa-solid fa-clipboard-user"></i>
          <a href="#" class="text-[15px] ml-4 text-gray-200">Classes</a> 
          </div>
   


      
      <div class="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover bg-orange-600 text-white ">
          <i class="fa fa-calendar"></i> 
          <a href="./manage-events.html" class="text-[15px] ml-4 text-gray-200">Manage Events</a>
      </div>


          <hr class="my-4 text-gray-700">

              
      

        <div class="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover bg-orange-600 text-white " @click="logout">
        <i class="fa-solid fa-arrow-right-from-bracket"></i>
          <span class="text-[15px] ml-4 text-gray-200">Logout</span>  
      </div>
      </div>


    </div>
</div>
  `,
  methods: {
    navigateTo(url) {
      window.location.href = url;
    },
    dropdown() {
      document.querySelector("#submenu").classList.toggle("hidden");
      document.querySelector("#arrow").classList.toggle("rotate-180");
    },
    OpenSidebar() {
      document.querySelector("#adminsidebar").classList.toggle("left-[-300px]");
    },

    logout() {
      this.$emit('logout');
    }
  },
};

Vue.component('adminsidebar', adminSidebar);


new Vue({
  el: '#app',
  data() {
    return {
      studentUsers: [],
      adminUsers: [],
      teacherUsers: [],
      events: [],
      timetables: [],
      userName: '',
      studentClass: '',
      email: '',
      password: '',
      loginError: '',
      openCreateUserPopup: false,
      showEditUserPopup: false,
      showEditEventPopup: false,
      classOptions: ['1A', '1B', '1C', '2A', '2B', '2C', '3A', '3B', '3C', '4A', '4B', '4C', '5A', '5B', '5C', '6A', '6B', '6C', '7A', '7B', '7C', '8A', '8B', '8C', '9A', '9B', '9C', '10A', '10B', '10C', '11A', '11B', '11C', '12A', '12B', '12C'],
      user: {
        name: '',
        email: '',
        password: '',
        role: '',
        class: ''
      },
      editedUser: {
        name: '',
        email: '',
        role: '',
        password: '',
        class: ''
      },
      successMessage: '',
      errors: {
        password: ''
      },
      event: {
        name: '',
        date: '',
        time: '',
        description: '',
        location: '',
        image: null,
      },
      editedEvent: {
        selectedEventId: '',
        name: '',
        date: '',
        time: '',
        description: '',
        location: '',
        image: null,
      },
    };
  },

  mounted() {
    this.getStudentUsers();
    this.getAdminUsers();
    this.getTeacherUsers();
    this.getAllEvents();
  },

  created() {
    this.loadUserName();
    this.getAllTimetables();
    this.loadClassName();
  },

  computed: {
    isEmailValid() {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailPattern.test(this.user.email);
    },
    isPasswordValid() {
      return this.user.password.length >= 8;
    },

    timetableData() {
      if (this.timetables.length === 0) return [];

      const timetable = this.timetables[0].timetable;
      const newTimetableData = [];

      // Add the first 4 rows to the new array
      for (let i = 0; i < 4; i++) {
        newTimetableData.push(timetable[i]);
      }
      newTimetableData.push({
        time: "10.55 AM - 11.10 AM",
        Monday: "Interval",
        Tuesday: "Interval",
        Wednesday: "Interval",
        Thursday: "Interval",
        Friday: "Interval",
      });

      for (let i = 4; i < timetable.length; i++) {
        newTimetableData.push(timetable[i]);
      }

      return newTimetableData;
    },
  
  },
 
  watch: {
    'user.role': 'updateClassOptions'
  },

  methods: {

    validatePassword() {
      if (this.user.password.length < 8) {
        this.errors.password = 'Password must be at least 8 characters long';
      } else {
        this.errors.password = '';
      }
    },


    login() {
      const userData = {
        email: this.email,
        password: this.password,
      };

      // Send the user data to the backend using an HTTP request
      // After successful login
      axios.post('/user/login', userData)
        .then(response => {
          const token = response.data.token;

          if (response.data.status === false) {
            this.loginError = response.data.message;
            return;
          }

          const decodedToken = JSON.parse(atob(token.split('.')[1]));
          console.log(decodedToken);
          const userName = decodedToken.name;
          const studentClass = decodedToken.class;

          // Store the token in the local storage
          localStorage.setItem('token', token);
          localStorage.setItem('userName', userName);
          localStorage.setItem('studentClass', studentClass);
          const storedToken = localStorage.getItem('token');
          console.log(storedToken);
          console.log(studentClass);


          // Redirect based on user role
          if (response.data.user.role === 'admin') {
            window.location.href = `/admin/admin-dashboard?token=${token}`;
          } else if (response.data.user.role === 'teacher') {
            window.location.href = `/teacher/teacher-dashboard?token=${token}`;
          } else if (response.data.user.role === 'pStudent') {
            window.location.href = `/primary-student/primary-student-dashboard?token=${token}`;
          } else if (response.data.user.role === 'lsStudent') {
            window.location.href = `/lower-secondary-student/lower-secondary-student-dashboard?token=${token}`;
          } else if (response.data.user.role === 'usStudent') {
            window.location.href = `/upper-secondary-student/upper-secondary-student-dashboard?token=${token}`;
          } else {
            console.error('Invalid role');
          }

        })
        .catch(error => {
          console.log(error.response);
          console.log(error.message);
          console.log(error);
          this.loginError = error.response && error.response.data && error.response.data.message
            ? error.response.data.message
            : error.message || 'An error occurred during login.';

        });
    },

    loadUserName() {
      const userName = localStorage.getItem('userName');

      if (userName) {
        this.userName = userName;
      } else {
        this.userName = 'Guest';
      };
    },

    getStudentUsers() {
      axios.get('/admin/getStudentUsers')
        .then(response => {
          console.log(response.data);
          this.studentUsers = response.data.data;
        })
        .catch(error => {
          console.error(error);
        });
    },
    getAdminUsers() {
      axios.get('/admin/getAdminUsers')
        .then(response => {
          console.log(response.data);
          this.adminUsers = response.data.data;
        })
        .catch(error => {
          console.error(error);
        });
    },
    getTeacherUsers() {
      axios.get('/admin/getTeacherUsers')
        .then(response => {
          console.log(response.data);
          this.teacherUsers = response.data.data;
        })
        .catch(error => {
          console.error(error);
        });
    },

    openPopup() {
      this.openCreateUserPopup = true;
    },

    updateClassOptions() {
      if (this.user.role === 'pStudent') {
        this.classOptions = ['1A', '1B', '1C', '2A', '2B', '2C', '3A', '3B', '3C', '4A', '4B', '4C', '5A', '5B', '5C'];
        this.user.class = this.classOptions[0]; 
      } else if (this.user.role === 'lsStudent') {
        this.classOptions = ['6A', '6B', '6C', '7A', '7B', '7C', '8A', '8B', '8C', '9A', '9B', '9C', '10A', '10B', '10C'];
        this.user.class = this.classOptions[0]; 
      } else if (this.user.role === 'usStudent') {
        this.classOptions = ['11A', '11B', '11C', '12A', '12B', '12C'];
        this.user.class = this.classOptions[0]; 
      }
    },

    submitCreateUserForm() {
      this.validatePassword();

      if (this.errors.email || this.errors.password) {
        return;
      }

      axios
        .post('/admin/createUser', this.user)
        .then(response => {
          alert(response.data.message);
          this.openCreateUserPopup = false;

          if (this.user.role === 'admin') {
            this.getAdminUsers();
          } else if (this.user.role === 'teacher') {
            this.getTeacherUsers();
          } else if (['lsStudent', 'pStudent', 'usStudent'].includes(this.user.role)) {
            this.getStudentUsers();
          }

          // Clear the user object fields
          this.user.name = '';
          this.user.email = '';
          this.user.password = '';
          this.user.role = '';
          this.user.class = '';
        })
        .catch(error => {
          console.error(error);
          alert('An error occurred while creating the user.');
        });
    },


    openEditUserPopup(user) {
      console.log(this.user);
      this.editedUser = { ...user };
      this.editedUser.password = '';
      this.showEditUserPopup = true;
    },


    updateEditedClassOptions() {
      // Filter the classOptions array based on the selected role
      if (this.editedUser.role === 'pStudent') {
        return this.classOptions.filter(option => option.startsWith('1') || option.startsWith('2') || option.startsWith('3') || option.startsWith('4') || option.startsWith('5'));
      } else if (this.editedUser.role === 'lsStudent') {
        return this.classOptions.filter(option => option.startsWith('6') || option.startsWith('7') || option.startsWith('8'));
      } else if (this.editedUser.role === 'usStudent') {
        return this.classOptions.filter(option => option.startsWith('9') || option.startsWith('10') || option.startsWith('11') || option.startsWith('12'));
      } else {
        return [];
      }
    },
    
    submitEditUserForm() {
      const isPasswordEmpty = this.editedUser.password === undefined || this.editedUser.password === "";

      if (isPasswordEmpty) {
        delete this.editedUser.password;
      }


      axios.put(`/admin/updateUser/${this.editedUser.email}`, this.editedUser)
        .then(response => {
          console.log(response.data);
          this.showEditUserPopup = false;
          // Update the user list based on role
          if (this.editedUser.role === 'admin') {
            this.getAdminUsers();
          } else if (this.editedUser.role === 'teacher') {
            this.getTeacherUsers();
          } else if (['lsStudent', 'pStudent', 'usStudent'].includes(this.editedUser.role)) {
            this.getStudentUsers();
          }
        })
        .catch(error => {
          console.error(error);
        });
    },

    deleteUser(email) {
      const confirmed = window.confirm(`Are you sure you want to delete the user with email ${email}?`);
    
      if (confirmed) {
        axios.delete(`/admin/deleteUser/${email}`)
          .then(response => {
            console.log(response.data);
            // Update the user list based on role
            if (this.adminUsers.find(user => user.email === email)) {
              this.adminUsers = this.adminUsers.filter(user => user.email !== email);
            } else if (this.teacherUsers.find(user => user.email === email)) {
              this.teacherUsers = this.teacherUsers.filter(user => user.email !== email);
            } else if (this.studentUsers.find(user => user.email === email)) {
              this.studentUsers = this.studentUsers.filter(user => user.email !== email);
            }
          })
          .catch(error => {
            console.error(error);
          });
      }
    },
    



    // Event handlers

    onFileChangeCreateEvent(e) {
      console.log(e.target.files[0]);
      this.event.image = e.target.files[0];
    },

    formatDate(dateString) {
      const date = new Date(dateString);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    },

    submitCreateEventForm() {
      const formData = new FormData();
      formData.append("eventName", this.event.name);
      formData.append("eventDate", this.formatDate(this.event.date));
      formData.append("eventTime", this.event.time)
      formData.append("eventDescription", this.event.description);
      formData.append("eventLocation", this.event.location);
      formData.append("eventImage", this.event.image);

      axios.post('/event/createEvent', formData)
        .then(response => {
          alert(response.data.message);
          this.getAllEvents();
          this.resetEventForm();
        })
        .catch(error => {
          console.error(error);
          alert('An error occurred while creating the event.');
        });
    },



    getAllEvents() {
      axios.get('/event/getAllEvents')
        .then(response => {
          console.log(response.data);
          this.events = response.data.data;
        })
        .catch(error => {
          console.error(error);
        });
    },

    resetEventForm() {
      this.event.name = '';
      this.event.date = '';
      this.event.time = '';
      this.event.description = '';
      this.event.location = '';
      this.event.image = null;
    },

    onFileChangeEditEvent(e) {
      console.log(e.target.files[0]);
      this.editedEvent.image = e.target.files[0];
    },

    openEditEventPopup(event) {
      this.editedEvent.selectedEventId = event._id;
      this.editedEvent.name = event.eventName;
      this.editedEvent.date = this.formatDate(event.eventDate);
      this.editedEvent.time = event.eventTime;
      this.editedEvent.description = event.eventDescription;
      this.editedEvent.location = event.eventLocation;
      this.editedEvent.image = event.eventImage;
      this.showEditEventPopup = true;
    },

    onEditFileChange(event) {
      const fileInput = event.target;
      if (fileInput.files.length > 0) {
        this.editedEvent.eventImage = fileInput.files[0].name;
      }
    },

    submitEditEventForm() {
      const formData = new FormData();
      formData.append('eventName', this.editedEvent.name);
      formData.append('eventDate', this.editedEvent.date);
      formData.append('eventTime', this.editedEvent.time);
      formData.append('eventDescription', this.editedEvent.description);
      formData.append('eventLocation', this.editedEvent.location);
      formData.append('eventImage', this.editedEvent.image); // Make sure this contains the selected file

     
      axios.put(`/event/updateEvent/${this.editedEvent.selectedEventId}`, formData)
        .then((response) => {
          this.showEditEventPopup = false;
          this.getAllEvents();
        })
        .catch((error) => {
          console.error('Error updating event:', error);
        });
    },

    deleteEvent(eventId) {
      axios.delete(`/event/deleteEvent/${eventId}`)
        .then(response => {
          console.log(response.data);
          this.getAllEvents();
        })
        .catch(error => {
          console.error(error);
        });
    },


    // Timetable handler

    loadClassName() {
      const studentClass = localStorage.getItem('studentClass');

      if (studentClass) {
        this.studentClass = studentClass;
      } else {
        this.studentClass = '';
      };
    },

    getAllTimetables() {
      const studentClass = localStorage.getItem('studentClass');
      console.log(studentClass)
      axios.get(`/timetable/getClassTimetables/${studentClass}`)
        .then(response => {
          console.log(response.data);
          this.timetables = response.data.data;
        })
        .catch(error => {
          console.error(error);
        });
    },

    handleLogout() {
      localStorage.removeItem('token');
      localStorage.removeItem('userName');
      localStorage.removeItem('studentClass');

      window.location.href = '/';
    }
}
});





