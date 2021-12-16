<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar style="background-color: #fece41" class="text-black" >
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />
        <q-toolbar-title class="text-weight-bold">
          <span class="gt-sm">{{this.$route.name}}</span>
          <q-icon size="lg" class="header-icon q-pa-md lt-md" >
            <img  style="height: 45px"  src="../assets/Ihuay/IHuay_Logo.png" />
          </q-icon>
        </q-toolbar-title>

        <div>
          <span> Drawer> </span>
        </div>
      </q-toolbar>
    </q-header>
    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
    >
      <q-scroll-area class="iframe" style="height: calc(100% - 150px);margin-top: 150px ; border-right: 1px solid #ddd">
      <q-list>
        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.name"
          v-bind="link"
        />
      </q-list>
        <q-separator/>
        <q-item clickable v-ripple v-if="!isLogin" v-on:click="navigationPage('login')">
          <q-item-section avatar>
            <q-icon name="login" />
          </q-item-section>
          <q-item-section>
            Login (เข้าสู่ระบบ)
          </q-item-section>
        </q-item>

        <q-item clickable v-ripple v-else v-on:click="logout">
          <q-item-section avatar>
            <q-icon name="logout" />
          </q-item-section>

          <q-item-section>
            Logout (ออกจากระบบ)
          </q-item-section>
        </q-item>

        <q-item tag="label" v-ripple class="absolute-bottom" v-on:click="setThemeAppearance">
          <q-item-section avatar>
            <q-icon name="dark_mode"  v-if="!isDarkModeActive"/>
            <q-icon name="light_mode" v-else/>
          </q-item-section>

          <q-item-section>
            <span v-if="!isDarkModeActive">
                   Dark Mode
            </span>
            <span v-else>
                  Light Mode
            </span>
          </q-item-section>
        </q-item>
      </q-scroll-area>
      <q-img class=" absolute-top" src="https://media.istockphoto.com/vectors/dark-blue-yellow-polygonal-triangular-pattern-background-vector-id477953588?k=20&m=477953588&s=170667a&w=0&h=lccND4xmcv_U66ZUB_XnnItVTnyQe4WwwTZJWNWd3b4=" style="height: 150px ;">
        <div class="absolute-bottom bg-transparent">
          <div v-if="username">
            <q-avatar size="56px" class="q-mb-sm">
              <img src="https://cdn.quasar.dev/img/boy-avatar.png">
            </q-avatar>
            <div class="text-weight-bold">User : {{username}}</div>
            <span>Credit : {{userCredit}}</span>
          </div>
        </div>
      </q-img>
    </q-drawer>

    <q-page-container
    >
        <router-view v-slot="{ Component }">
          <transition
            enter-active-class="animate__animated  animate__fadeIn"
          >
          <component :is="Component"/>
          </transition>
        </router-view>
    </q-page-container>
  </q-layout>
</template>
<script>
import { useQuasar } from 'quasar'
import { isLoginList, notLoginList } from 'components/EssentialLink'
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth'
import EssentialLink from 'components/EssentialLink.vue'

import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'MainLayout',

  components: {
    EssentialLink
  },
  computed: {
    userID () {
      return this.$store.getters['userEntity/userID']
    },
    username () {
      return this.$store.getters['userEntity/username']
    },
    userCredit () {
      return this.$store.getters['userEntity/user_Credit']
    }
  },

  setup () {
    const leftDrawerOpen = ref(false)
    const active = ref(false)
    return {
      essentialLinks: [],
      active,
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  },
  data () {
    return {
      isLogin: false,
      isDark: false,
      $q: useQuasar(),
      isDarkModeActive: this.$q.localStorage.getItem('darkMode')
    }
  },
  async created () {
    const value = this.$q.localStorage.getItem('darkMode')
    // const x = this.$store.getters['appearance/userIsDarkMode']
    this.$q.dark.set(value)
    await this.checkUserAuth()
  },

  methods: {
    checkUserAuth () {
      const auth = getAuth()
      onAuthStateChanged(auth, (user) => {
        if (user) {
          this.$store.dispatch('userEntity/setUserID', { userID: user.uid })
          this.$store.dispatch('userEntity/fetchUser')
          this.essentialLinks = isLoginList
          this.isLogin = true
        } else {
          this.essentialLinks = notLoginList
        }
      })
    },
    navigationPage (path) {
      this.$router.push({ path: `${path}` })
    },
    setThemeAppearance () {
      this.isDarkModeActive = !this.isDarkModeActive
      this.$store.dispatch('appearance/setUserTheme', { isDarkMode: this.isDarkModeActive })
    },
    logout () {
      const auth = getAuth()
      signOut(auth).then(() => {
        this.isLogin = false
        sessionStorage.clear()
        this.$store.dispatch('userEntity/resetUserState')
        // this.$router.push({ name: 'Login' })
        this.checkUserAuth()
      }).catch((error) => {
        alert(error)
      })
    }
  }

})
</script>

<style lang="scss">
.header-icon{
  position: absolute;
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
}
.nav-herader{
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
}
</style>
