<template>
  <DefaultLayout>
    <form id="form_container" @submit.prevent="login">
      <div id="form_header">
        <h3>{{ title }}</h3>
      </div>
      <div id="form_content">
        <div class="input_container">
          <div>
            <input
              type="text"
              v-model="username"
              placeholder="Email/Số điện thoại/Tên đăng nhập"
            />
          </div>
          <p class="error"></p>
        </div>
        <div class="input_container">
          <div class="input_wrapper">
            <input type="text" v-model="password" placeholder="Mật khẩu" />
            <i class="bi bi-eye"></i>
            <!-- <i class="bi bi-eye-slash"></i> -->
          </div>
          <p class="error"></p>
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
export default {
  components: { DefaultLayout },
  data() {
    return {
      title: 'Đăng nhập',
      username: '',
      password: '',
    };
  },
  methods: {
    async login() {
      const data = await authenticateApi.login({
        username: this.username,
        password: this.password,
      });

      if (data.success) {
        window.location.replace(
          `http://shopee.vn?access_token=${data.access_token}&refresh_token=${data.refresh_token}`
        );
      }
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
</style>
