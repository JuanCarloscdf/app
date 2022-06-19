<template>
  <base-nav
    v-model="showMenu"
    class="navbar-absolute top-navbar"
    type="dark"
    
    :transparent="true"
  >
    <div slot="brand" class="navbar-wrapper">
      <div
        class="navbar-toggle d-inline"
        :class="{ toggled: $sidebar.showSidebar }"
      >
       
      </div>
      
   
    </div>
    <!-- aqui colcaremos el menu desplegable para las pages-->


    <ul class="navbar-nav" :class="$rtl.isRTL ? 'mr-auto' : 'ml-auto'">
      <el-tooltip
      content="Realice todas las operaciones para administrar sus dispositivos"
      effect="dark"
      :open-delay="300"
      placement="top">
        
        <h6 style="padding: 20px">Operaciones</h6> 
      </el-tooltip>
        
      
     <el-select
       class="select-success"
        placeholder="Navegador"
        v-model="selectedPage"
     >
      <el-option value="Tablero">   
        <el-tooltip content="ultimo paso: ver los dispositivos en funcionamiento"
             effect="light"
             :open-delay="300"
             placement="top">
            <sidebar-item
              :link="{
                name: 'Tablero',
                path: '/dashboard'
            }"
            >   
            </sidebar-item>
        </el-tooltip> 
       </el-option>

       <el-option value="Dispositivos">   
        <el-tooltip content="tercer paso: asocie una plantilla a un dispositivo "
             effect="light"
             :open-delay="300"
             placement="top">
            <sidebar-item
            :link="{
             name: 'Dispositivos',
             path: '/devices'
            }"
            >
            </sidebar-item>
        </el-tooltip> 
       </el-option>

       <el-option value="Alarmas">
        <el-tooltip content="segundo paso: asocie una alarma a la variable de alguna de sus herramientas"
             effect="light"
             :open-delay="300"
             placement="top">
             <sidebar-item
          :link="{
            name: 'Alarmas',
            path: '/alarms'
          }"
        >
        </sidebar-item>
            
        </el-tooltip> 
       </el-option>

       <el-option value="Plantilla">
         <el-tooltip content="primer paso: seleccione las herramientas necesarias para su proyecto"
             effect="light"
             :open-delay="300"
             placement="top">
             <sidebar-item
          :link="{
            name: 'Plantilla',
            path: '/templates'
          }"
        >
        </sidebar-item>
            
        </el-tooltip>    
       </el-option>



       <el-option value="Lista de alarmas">
         <el-tooltip content="verifique las alarmas generadas para su cuenta"
             effect="light"
             :open-delay="300"
             placement="top">
             <sidebar-item
          :link="{
            name: 'Lista de alarmas',
            path: '/AlarmList'
          }"
        >
        </sidebar-item>
            
        </el-tooltip> 
         
       </el-option>

       <el-option value="Exportar Datos">
         <el-tooltip content="exporte los datos a formato xlsx"
             effect="light"
             :open-delay="300"
             placement="top">
             <sidebar-item
          :link="{
            name: 'Exportar Datos',
            path: '/getData'
          }"
        >
        </sidebar-item>
            
        </el-tooltip> 
         
       </el-option>
      

     </el-select>
     <el-tooltip
     content="seleccione un dispositivo creado"
     effect="dark"
     :open-delay="300"
     placement="top"
     >
       <h6 style="padding: 20px"> dispositivos</h6>
     </el-tooltip>
     
<!-- aqui colcaremos el menu desplegable para las pages-->
      <el-select
        class="select-success"
        placeholder="Select Device"
        @change="selectDevice()"
        v-model="selectedDevice"
      >
        <el-option
          v-for="(device, index) in $store.state.devices"
          :value="index"
          :label="device.name"
          :key="device._id"
        >
        </el-option>
      </el-select>


      <base-dropdown
        tag="li"
        :menu-on-right="!$rtl.isRTL"
        title-tag="a"
        title-classes="nav-link"
        class="nav-item"
      >
        <template slot="title">
          <div v-if="$store.state.notifications.length > 0" class="notification d-none d-lg-block d-xl-block"></div>
          <i class="tim-icons icon-sound-wave"></i>
          <p class="d-lg-none">Notificaciones</p>
        </template>

        <li @click="notificationReaded(notification._id)" v-for="notification in $store.state.notifications" class="nav-link" :key="notification._id">
          <div v-if="notification.readed == false">
             <a href="#" class="nav-item dropdown-item">
            <b style="color:orangered">{{ unixToDate(notification.time)}}</b>
              <div style="margin-left:50px">
                <b>Dispositivo: </b> {{notification.deviceName}} <br>
                <b>Variable: </b> {{notification.variableFullName}} <br>
                <b>Condicion: </b> {{notification.condition}} <br>
                <b>Umbral: </b> {{notification.value}} <br>
                <b>Valor: </b> {{notification.payload.value}}
              </div>    
          </a>

          </div>
         
        </li>

      </base-dropdown>


      <base-dropdown
        tag="li"
        :menu-on-right="!$rtl.isRTL"
        title-tag="a"
        class="nav-item"
        title-classes="nav-link"
        menu-classes="dropdown-navbar"
      >
        <template slot="title">
           <i class="tim-icons icon-single-02"></i>
          <!--<div class="photo"><img src="tim-icons icon-single-02" /></div>-->
          <b class="caret d-none d-lg-block d-xl-block"></b>
          <p @click="logOut()" class="d-lg-none">Log out</p>
        </template>
  
         <!--     <li class="nav-link">
          <a href="#" class="nav-item dropdown-item">Settings</a>
        </li> -->
        <div class="dropdown-divider"></div>
        <li class="nav-link">
           <a href="#" class="nav-item dropdown-item" > Usuario:</a>
          <a href="#" class="nav-item dropdown-item" > {{$store.state.auth.userData.name}}</a>
          <a href="#" class="nav-item dropdown-item" > Correo:</a>
          <a href="#" class="nav-item dropdown-item" >{{$store.state.auth.userData.email}}</a>
          <a @click="logOut()" href="#" class="nav-item dropdown-item">Log out</a>
          
        </li>
      </base-dropdown>
    </ul>
  </base-nav>
</template>
<script>
import { CollapseTransition } from "vue2-transitions";
import { BaseNav, Modal } from "@/components";
import { Select, Option } from "element-ui";
import SidebarShare from "@/components/Layout/SidebarSharePlugin";
import {BasePagination} from '@/components'
export default {
  
  components: {
    CollapseTransition,
    BasePagination,
    BaseNav,
    Modal,
    [Option.name]: Option,
    [Select.name]: Select
  },
  computed: {
    routeName() {
      const { path } = this.$route;
      let parts = path.split("/");
      if (parts == ",") {
        return "Dashboard";
      }
      return parts.map(p => this.capitalizeFirstLetter(p)).join(" ");
    },
    isRTL() {
      return this.$rtl.isRTL;
    }
  },
  data() {
    return {
      activeNotifications: false,
      showMenu: false,
      searchModalVisible: false,
      searchQuery: "",
      selectedDevice: null,
      selectedPage: null,
      defaultPagination:1,
      pageDirs:[
        {name:"Tablero",direc:"/template"},
        {name:"Dispositivos",direc:"/template"},
        {name:"Alarmas",direc:"/template"},
        {name:"Plantilla",direc:"/template"},
        {name:"Lista de Alarmas",direc:"/template"},
      ]
    };
  },
  mounted() {
    this.$store.dispatch("getDevices");
    this.$nuxt.$on("selectedDeviceIndex", this.updateSelectedDeviceIndex);
  },
  beforeDestroy(){
    this.$nuxt.$off("selectedDeviceIndex");
  },
  methods: {
    updateSelectedDeviceIndex(index){
      this.selectedDevice = index;
    },
    
    logOut() {
      console.log("logout");
      localStorage.clear();
      const auth = {};
      this.$store.commit("setAuth", auth);
      window.location.href = "/login";
    },

    notificationReaded(notifId) {

      const axiosHeaders = {
        headers: {
          token: this.$store.state.auth.token
        }
      };

      var auto

      const toSend = {
        notifId: notifId
      };

      this.$axios
        .put("/notifications", toSend, axiosHeaders)
        .then(res => {
         
          this.$store.dispatch("getNotifications");

        })
        .catch(e => {
          console.log(e);
          return;
        });

    },
    selectDevice() {
      const device = this.$store.state.devices[this.selectedDevice];

      const axiosHeaders = {
        headers: {
          token: this.$store.state.auth.token
        }
      };

      const toSend = {
        dId: device.dId
      };

      this.$axios
        .put("/device", toSend, axiosHeaders)
        .then(res => {
         
          this.$store.dispatch("getDevices");

        })
        .catch(e => {
          console.log(e);
          return;
        });

    },
    selectPage() {
      
      console.log( this.pageDirs[this.selectedPage])
     

    },
    //UNIX A FECHA
    unixToDate(ms) {
        var d = new Date(parseInt(ms)), 
          yyyy = d.getFullYear(),
          mm = ('0' + (d.getMonth() + 1)).slice(-2), // Months are zero based. Add leading 0.
          dd = ('0' + d.getDate()).slice(-2), // Add leading 0.
          hh = d.getHours(),
          h = hh,
          min = ('0' + d.getMinutes()).slice(-2), // Add leading 0.
          ampm = 'AM',
          time;

        if (hh > 12) {
          h = hh - 12;
          ampm = 'PM';
        } else if (hh === 12) {
          h = 12;
          ampm = 'PM';
        } else if (hh == 0) {
          h = 12;
        }

        // ie: 2013-02-18, 8:35 AM	
        time = dd + '/' + mm + '/' + yyyy + ', ' + h + ':' + min + ' ' + ampm;

        return time;
      },
    capitalizeFirstLetter(string) {
      if (!string || typeof string !== "string") {
        return "";
      }
      return string.charAt(0).toUpperCase() + string.slice(1);
    },
    closeDropDown() {
      this.activeNotifications = false;
    },
    toggleSidebar() {
      this.$sidebar.displaySidebar(!this.$sidebar.showSidebar);
    },
    toggleMenu() {
      this.showMenu = !this.showMenu;
    }
  }
};
</script>
<style scoped>
.top-navbar {
  top: 0px;
}
</style>
