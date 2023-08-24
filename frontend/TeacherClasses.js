/*const ClassesPanel ={
    template: `
         <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded"
                                @click="openEditUserPopup(user)">Edit</button>
    <div class="max-w-sm rounded overflow-hidden shadow-lg">
  <div class="px-6 py-4">
    <div class="font-bold text-xl mb-2">The Coldest Sunset</div>
  </div>
  <div class="px-6 pt-4 pb-2" v-for="teacherclass in user.teacherclasses" :key="teacherclass">
    <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#photography</span>
  </div>
</div>
    `,


    
}


Vue.component('classes-panel', ClassesPanel);

new Vue({
el: '#classes-panel'  ,
data(){
  return {
    user: {classes: []},
  };


},

mounted() {
  this.getAllClasses();
},


methods: {
  getAllClasses() {
    console.log('User object:', this.user);
    console.log('User email:', this.user.email);
    console.log(this.user.email)
    this.requestUser = this.user.email;


    axios.get(`/admin/getAllClasses/${this.requestUser} `)
    .then(response => {
      console.log(response.data);
      this.teacherclasses = response.data.data;
    })
    .catch(error => {
      console.error(error);
    }
    );

  },
}


});
*/