


// Define the Sidebar component
const Sidebar = {
  template: `
  <div class="sidebar">
  <span class="absolute text-white text-4xl top-5 left-4 cursor-pointer">
      <i class="fas fa-bars px-2 bg-gray-900 rounded-md" @click="OpenSidebar()"></i></span>
                  <div class="text-gray-100 text-xl">
  <div class="fixed top-0 bottom-0 lg:left-0 left-[-300px] p-2 w-[300px] overflow-y-auto text-center bg-black" id="sidebar">
  
   

      <div class="p-2.5 mt-1 flex items-center">
        <i class="fas fa-user-circle"></i>
        <h1 class="font-bold texy-gray-200 text-[15px] ml-3"> User Name</h1>
        <i class="fas fa-times ml-20 cursor-pointer lg:hidden" @click="OpenSidebar()"></i>
        </div>
        <hr class="my-2 text-gray-700">


        <div class="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover bg-orange-600 text-white ">
        <i class="fas fa-home"></i> 
        <span class="text-[15px] ml-4 text-gray-200">
       <a href="./teacher-dashboard.html">Dashboard</a></span>  
      </div>

          <div class="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover bg-orange-600 text-white ">
          <i class=""></i> 
          <a href="./create-activity.html"><span class="text-[15px] ml-4 text-gray-200">Create Activity</span></a>
          </div>

          <div class="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover bg-orange-600 text-white ">
          <i class=""></i> 
          <a href="./manage-activity-per-teacher.html"><span class="text-[15px] ml-4 text-gray-200">Manage Activities</span></a>
          </div>
   


      
          
          <div class="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover bg-orange-600 text-white ">
          <i class="fa-solid fa-clipboard-user"></i>
              <span class="text-[15px] ml-4 text-gray-200"><a href="./attendance.html">Attendance</a></span></span>  
              </div>
   


      
      <div class="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover bg-orange-600 text-white ">
          <i class="fa fa-calendar"></i> 
          <span class="text-[15px] ml-4 text-gray-200">Event calender</span>  
      </div>


          <hr class="my-4 text-gray-700">

              
      <div class="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover bg-orange-600 text-white " @click="dropdown()">
          <i class="fas fa-chat"></i> 
          <div class="flex justify-between w-full items-center">
          <span class="text-[15px] ml-4 text-gray-200">Dropdown</span>  
          <span class="text-sm rotate-0" id="arrow"><i class="fas fa-chevron-down ml-2"></i></span>
      </div>
      </div>


      <div class="text-left text-sm font-thin mt-2 w-4/5 mx-auto text-gray-200 flex flex-col hidden" id="submenu">
        <a href="#" class="cursor pointer p-2 hover:bg-gray-700 rounded-md mt-1 hover:text-white">Submenu 1</a>  
        <a href="#" class="cursor pointer p-2 hover:bg-gray-700 rounded-md mt-1 hover:text-white">Submenu 1</a>  
        <a href="#" class="cursor pointer p-2 hover:bg-gray-700 rounded-md mt-1 hover:text-white">Submenu 1</a>  

        </div>

        <div class="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover bg-orange-600 text-white ">
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
      document.querySelector("#sidebar").classList.toggle("left-[-300px]");
    }
  },
};

// Register the Sidebar component globally
Vue.component('sidebar', Sidebar);
