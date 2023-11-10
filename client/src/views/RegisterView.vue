<template>
  <DefaultLayout>
    <form id="form_container" @submit.prevent="handleSubmit">
      <div id="form_header">
        <h3>Đăng kí</h3>
      </div>
      <div id="form_content">
        <div class="input_container">
          <div>
            <input
              type="text"
              placeholder="Tên đăng ki"
              class="name"
              v-model="data.userName"
            />
          </div>
          <p class="error"></p>
        </div>
        <div class="input_container">
          <div class="input_wrapper">
            <input
              type="text"
              placeholder="Mật khẩu"
              class="password"
              @change="getValue"
            />
            <div class="icon">
              <i class="bi bi-eye"></i>
            </div>
            <!-- <i class="bi bi-eye-slash"></i> -->
          </div>
          <p class="error"></p>
        </div>
        <div class="input_container">
          <div class="input_wrapper">
            <input type="email" placeholder="Email" class="email" />
          </div>
          <p class="error"></p>
        </div>
        <button class="btn_dang_nhap" type="submit">Đăng Kí</button>
        <div id="hoac_container">
          <div class="side_container"></div>
          <div id="center">HOẶC</div>
          <div class="side_container"></div>
        </div>
      </div>
      <div id="form_footer">
        <span>Bạn mới biết đến Shopee?</span>
        <router-link to="/login">Đăng nhập</router-link>
      </div>
    </form>
  </DefaultLayout>
</template>

<script>
import DefaultLayout from '../layout/DefaultLayout.vue';
import validator from 'validator';
import axios from 'axios';
const URLAPI = '';
export default {
  components: { DefaultLayout },
  methods: {
    handleSubmit: async function (e) {
      // const email = document.querySelector('.email');
      // const password = document.querySelector('.password');
      // const name = document.querySelector('.name');
      // console.log(email, password, name);
      // this.checkValue(email.value);
      // this.checkEmpty(name.value);
      // this.checkLength(password.value);
      // console.log(this.data.userName);
      try {
        const res = await axios.post(URLAPI, this.data);
        this.resData = res.data;
      } catch (error) {
        console.log(this.err);
      }
    },
    checkValue: function (inputValue) {
      console.log(validator.isEmail(inputValue));
    },
    checkEmpty: function (inputValue) {
      console.log(validator.isEmpty(inputValue, { ignore_whitespace: false }));
    },
    checkLength: function (inputValue) {
      console.log(
        validator.isByteLength(inputValue, { min: 6, max: undefined })
      );
    },
  },
  data() {
    return {
      data: {
        userName: '',
        email: '',
        password: '',
      },
      resData: null,
      err: null,
    };
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

.input_wrapper .icon {
  cursor: pointer;
}
.btn_dang_nhap {
  width: 100%;
  padding: 10px 0;
  text-transform: uppercase;
  border: none;
  cursor: pointer;
  color: #fff;
  background-color: #ee4d2d;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.09);
}

#hoac_container {
  padding: 14px;
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
