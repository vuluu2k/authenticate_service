<template>
  <DefaultLayout>
    <form id="form_container" @submit.prevent="onSubmit">
      <div id="form_header">
        <h3>Đăng Nhập</h3>
      </div>
      <div id="form_content">
        <div class="input_container">
          <div>
            <input
              type="text"
              v-model="data.username"
              placeholder="Email/Số điện thoại/Tên đăng nhập"
              :class="status.statusUserName ? 'success' : 'failer'"
            />
          </div>
          <p class="error">{{ message.messageUserName }}</p>
        </div>
        <div class="input_container">
          <div class="input_wrapper">
            <input type="text" v-model="data.password" placeholder="Mật khẩu" />
            <i class="bi bi-eye"></i>
            <!-- <i class="bi bi-eye-slash"></i> -->
          </div>
          <p class="error">{{ message.messagePassword }}</p>
        </div>
        <button class="btn_dang_nhap" type="submit">Đăng nhập</button>
        <div class="link_container">
          <a href="#">Quên mật khẩu</a>
          <a href="#">Đăng nhập với SMS</a>
        </div>
        <div id="hoac_container">
          <div class="side_container"></div>
          <div id="center">HOẶC</div>
          <div class="side_container"></div>
        </div>
      </div>
      <div id="form_footer">
        <span>Bạn mới biết đến Shopee?</span>
        <router-link to="/register">Đăng kí</router-link>
      </div>
    </form>
  </DefaultLayout>
</template>
<script>
import DefaultLayout from '../layout/DefaultLayout.vue';
import authenticateApi from '../api/authenticateApi';
import validator from 'validator';
export default {
  components: { DefaultLayout },
  data() {
    return {
      data: {
        username: '',
        password: '',
      },
      status: {
        statusUserName: true,
        statusPassword: true,
      },
      message: {
        messageUserName: '',
        messagePassword: '',
      },
    };
  },
  methods: {
    async login() {
      const data = await authenticateApi.login(this.data);

      if (data.success) {
        window.location.replace(
          `http://shopee.vn?access_token=${data.access_token}&refresh_token=${data.refresh_token}`
        );
      }
    },
    handelValidator() {
      const { username, password } = this.data;
      // Check Username
      if (!validator.isLength(password.trim(), { min: 6 })) {
        this.status.statusPassword = false;
        this.message.messagePassword = 'mat khau phai co it nhat 6 ki tu';
      } else {
        this.status.statusPassword = true;
        this.message.messagePassword = '';
      }

      // Check password
      if (!validator.isLength(username.trim(), { min: 6 })) {
        this.status.statusUserName = false;
        this.message.messageUserName = 'ten phai co it nhat 6 ki tu';
      } else {
        this.status.statusUserName = true;
        this.message.messageUserName = '';
      }
    },

    onSubmit() {
      this.handelValidator();
      if (this.status.statusUserName && this.status.statusPassword) {
        this.login();
      }
      // userInfo
      // username: username1
      // password: 1234567
      //gmail: abcde@gmail.com
    },
  },
};
</script>

<style scoped>
#form_container {
  background-color: white;
  border-radius: 10px;
  padding: 30px;
  width: 30%;
  margin-right: 80px;
}
#form_header h3 {
  margin: 20px 0;
}
.input_container input {
  width: 100%;
  height: 40px;
  margin: 15px 0;
  padding: 15px;
  border: 1px solid #e0e0e0;
}
.input_container input::placeholder {
  color: #c7c4c4;
}
.input_wrapper {
  position: relative;
}
.input_wrapper input {
  padding-right: 20px;
}
.input_wrapper .bi-eye {
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
}
.btn_dang_nhap {
  width: 100%;
  padding: 10px 0;
  text-transform: uppercase;
  border: none;
  color: #fff;
  background-color: #ee4d2d;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.09);
}
.link_container {
  margin: 10px 0;
  display: flex;
  justify-content: space-between;
  font-size: 10px;
}
#hoac_container {
  padding-bottom: 14px;
  display: flex;
  align-items: center;
}
.side_container {
  height: 1px;
  width: 100%;
  background-color: #dbdbdb;
  flex: 1;
}
#center {
  color: #ccc;
  padding: 0 16px;
  text-transform: uppercase;
  font-size: 0.75rem;
}
#form_footer {
  font-size: 0.875rem;
  white-space: pre;
  padding-right: 4px;
  color: rgba(0, 0, 0, 0.26);
  align-items: center;
  display: flex;
  justify-content: center;
  width: 100%;
}
#form_footer span {
  margin-right: 4px;
}
#form_footer a {
  color: #ee4d2d;
  text-decoration: none;
}

.success {
  border: 10px solid rgb(6, 186, 6);
}
.failer {
  border: 1px solid rgb(225, 7, 7);
}

.error {
  font-size: 12px;
  color: red;
}
</style>
