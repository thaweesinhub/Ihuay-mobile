<template>
  <div >
    <q-form class="q-pa-lg">
        <span class="text-h3 flex flex-center" style="margin: 40px" >Login</span>

      <span class="text-h6 text-weight-bold">Username</span>
      <q-input filled bottom-slots
               class="q-mb-md"
               v-model="mUsername"
               counter maxlength="12"
               :rules="[val => !!val || 'Field is required']"
      >
        <template v-slot:prepend>
          <q-icon name="person" />
        </template>

        <template v-slot:append>
          <q-icon v-if="mUsername !== ''" name="close" @click="mUsername = ''" class="cursor-pointer" />
        </template>

        <template v-slot:hint>
          ชื่อสมาชิกที่ใช้ในการเข้าสู่ระบบ
        </template>

      </q-input>

      <span class="text-h6 text-weight-bold">Password</span>
      <q-input filled bottom-slots
               v-model="mPassword"
               type="password"
               counter maxlength="12"
               :rules="[val => !!val || 'Field is required']"
      >
        <template v-slot:prepend>
          <q-icon name="lock" />
        </template>

        <template v-slot:append>
          <q-icon v-if="mPassword !== ''" name="close" @click="mPassword = ''" class="cursor-pointer" />
        </template>

        <template v-slot:hint>
          รหัสพาสสมาชิกที่ใช้ในการเข้าสู่ระบบ
        </template>

      </q-input>
    </q-form>

    <div class="flex flex-center">
      <q-btn
        @click="confrimBtnPress"
        class="flex flex-center q-px-lg q-py-sm q-mb-md"
        size="md"
        label="confirm"
        color="primary"
      />
    </div>

  </div>
</template>

<script>
// import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
// import { getMessageFromErrorCode } from 'src/logic/handleError'

export default {
  name: 'LoginPage',
  data () {
    return {
      mUsername: null,
      mPassword: null
    }
  },
  methods: {
    async confrimBtnPress () {
      if (this.mUsername && this.mUsername) {
        await this.$store.dispatch('userEntity/login', {
          email: this.mUsername.concat('@email.com'),
          password: this.mPassword
        })
        this.$router.push({ path: 'result-reward' })
      }
    }
  }
}
</script>

<style scoped>

</style>
