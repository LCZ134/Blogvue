<template>
  <div class="login-container lowin">
    <div class="lowin-brand">
      <img src="@/assets/kodinger.jpg" />
    </div>

    <el-form
      :model="ruleForm"
      :rules="rules2"
      status-icon
      ref="ruleForm"
      label-position="left"
      label-width="0px"
      class="demo-ruleForm login-page"
    >
      <el-form-item class="lowin-box">
        <h3 class="title">this blog</h3>
      </el-form-item>

      <el-form-item prop="email">
        <el-input type="text" v-model="ruleForm.email" auto-complete="off" placeholder="用户名"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input :type="iptType" v-model="ruleForm.password" auto-complete="off" placeholder="密码">
          <i class="el-icon-view" slot="suffix" @click="upipttype"></i>
        </el-input>
      </el-form-item>

      <el-checkbox v-model="checked" class="rememberme">记住账号</el-checkbox>
      <el-form-item style="width:100%;">
        <el-button type="primary" style="width:100%;" @click="handleSubmit" :loading="logining">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";

import { formatUrlParams } from "@/utils";

import Secret from "@/utils/secret";

export default {
  data() {
    return {
      logining: false,
      ruleForm: {
        email: "",
        password: ""
      },
      rules2: {
        email: [{ required: true, message: "输入错误", trigger: "blur" }],
        password: [{ required: true, message: "输入错误", trigger: "blur" }]
      },
      checked: false,
      ispwd: true,
      iptType: "password"
    };
  },
  methods: {
    ...mapMutations("admin/user", ["login"]),
    handleSubmit(event) {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          this.userlogin();
        } else {
          return false;
        }
      });
    },
    userlogin() {
      this.logining = true;
      //后台登录用户
      this.$api.post(
        `/user/login${formatUrlParams(this.ruleForm)}`,
        null,
        r => {
          if (r.statusCode != "0") {
            this.logining = false;
            this.$message.error("错了哦，用户名或密码输入错误");
          } else {
            this.$message({
              message: "登录成功，欢迎您" + r.user.nickName,
              type: "success"
            });

            this.$cookie.set("token", r.token, { expires: 30 });
            this.logining = false;

            var rememberPwd = {
              checked: this.checked,
              email: this.checked ? this.ruleForm.email : "",
              password: this.checked
                ? Secret.Encrypts(this.ruleForm.password)
                : ""
            };

            this.$cookie.set("checkPwd", JSON.stringify(rememberPwd), {
              expires: 7
            });

            //把用户信息放store里
            this.login(r.user);
            //直接跳转页面
            this.$router.push("/");
          }
        },
        res => {
          this.logining = false;
          this.$message.error("api error, HTTP CODE: " + res.status);
        }
      );
    },
    upipttype() {
      this.ispwd = !this.ispwd;
      this.iptType = this.ispwd ? "password" : "text";
    }
  },
  computed: {
    ...mapState("admin/user", ["userinfo"])
  },
  created() {
    var checkPwd = JSON.parse(this.$cookie.get("checkPwd"));

    if (checkPwd.checked) {
      this.checked = checkPwd.checked;
      this.ruleForm.email = checkPwd.email;
      this.ruleForm.password = Secret.Decrypts(checkPwd.password);
    }
  }
};
</script>

<style scoped>
.login-container {
  width: 100%;
  height: 100%;
}
.login-page {
  -webkit-border-radius: 5px;
  border-radius: 5px;
  margin: 0px auto;
  width: 400px;
  padding: 35px 35px 15px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
}

label.el-checkbox.rememberme {
  margin: 0px 0px 15px;
  text-align: left;
}

.lowin {
  --color-primary: #44a0b3;
  --color-grey: rgba(68, 160, 179, 0.06);
  --color-dark: rgba(68, 160, 179, 0.5);
  --color-semidark: rgba(68, 160, 179, 0.5);
  margin: 60px 0 0 0;
  font-size: 14px;
}

.lowin * {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}

.lowin-box h3 {
  color: var(--color-semidark);
  font-weight: 700;
  margin: 20px;
  text-align: center;
}

.lowin-brand {
  overflow: hidden;
  width: 100px;
  height: 100px;
  margin: 0 auto -50px auto;
  border-radius: 50%;
  -webkit-box-shadow: 0 4px 40px rgba(0, 0, 0, 0.07);
  box-shadow: 0 4px 40px rgba(0, 0, 0, 0.07);
  padding: 10px;
  background-color: #fff;
  z-index: 1;
  position: relative;
}
.lowin-brand img {
  width: 100%;
  height: 100%;
}
</style>