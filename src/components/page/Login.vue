<template>
  <div class="login-wrap">
    <div class="ms-login">
      <div class="dv-top"></div>
      <div class="dv-img">
        <img src="../../assets/img/xiao.jpg" alt />
      </div>
      <div class="ms-title">积分商品兑换平台</div>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="ms-content">
        <el-form-item prop="username">
          <el-input v-model="ruleForm.username" placeholder="请输入用户名称">
            <el-button slot="prepend" icon="el-icon-lx-people"></el-button>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            type="password"
            placeholder="请输入登录密码"
            v-model="ruleForm.password"
            @keyup.enter.native="submitForm('ruleForm')"
          >
            <el-button slot="prepend" icon="el-icon-lx-lock"></el-button>
          </el-input>
        </el-form-item>
        <!-- <el-form-item prop="yanzhen">
          <el-input
            placeholder="请输入验证码"
            v-model="ruleForm.yanzhen"
            @keyup.enter.native="submitForm('ruleForm')"
            style="width:75%"
          >
            <el-button slot="prepend" icon="el-icon-lx-lock"></el-button>
            
          </el-input>
          <div class="yan-p">{{checkCode}}</div>
        </el-form-item>
         -->
        <div class="login-btn">
          <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import { login } from "../../api/index";
export default {
  data: function () {
    return {
      checkCode:"",
      ruleForm: {
        password: "",
        username: "",    
      },
      yanzhen: "",
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        yanzhen: [{ required: true, message: "请输入验证码", trigger: "blur" }],
      },
    };
  },
  created(){
    // this.createCode()
  },
  methods: {
    submitForm() {
      this.$router.push("/Dashboard")

      // login.goLogin({string1:this.ruleForm.username,string2:this.ruleForm.password,number1:1}).then(res=>{
      //     console.log(res)
      //     if(res.data.code == 200){
      //       this.$message.success('登录成功')
      //         this.$router.push("/Dashboard")
      //         localStorage.setItem("intergral-address", res.data.data.addressId)
      //         localStorage.setItem("intergral-persole",res.data.data.id)
      //         localStorage.setItem('token',res.data.data.token)
      //         var Name = res.data.data.account
      //         localStorage.setItem('Name',Name)
      //     }else {
      //       this.$message.error('用户名或密码输入错误');
      //     }
      // }).catch(err=>{
      //       this.$message.error('服务器有错');
      // })
     
      //在这个位置可以存储用户名和id之类的全局信息

      // const data = this.ruleForm
      // // 登录
      // var ris = this
      // login.loginUser(data).then((res)=>{
      //   console.log(res)
      //    this.$refs.ruleForm.validate((valid) => {
      //       if (!valid) {
      //         ris.$message.error("格式错误");
      //       }else if(this.ruleForm.yanzhen != this.checkCode){
      //         ris.$message.error("验证码错误");
      //       } else{

      //         if(res.data.code == 200){
      //           ris.$message.success("登陆成功")
      //           this.$router.push("/Dashboard")
      //           var Root = res.data.pcLogin.menu
      //           var Name = res.data.pcLogin.rAccount
      //           localStorage.setItem('Root',JSON.stringify(Root))
      //           localStorage.setItem('Name',Name)
      //           Root = JSON.parse(localStorage.getItem('Root'))
      //           console.log(localStorage.getItem('Name'))
      //         }else{
      //           ris.$message.error(res.data.msg)
      //         }
      //       }
      //    })
        // if(!res.pcLogin){
          
        // }
      // })
    },
    
  },
};
</script>

<style scoped>
.yan-p{
  float: right;
  width: 20%;
  text-align: center;
  line-height: 31px;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  font-weight: normal ;
  font-size: 13px;
  /* margin-top: -50px; */
}
.dv-top {
  height: 10px;
  width: 350px;
  margin: 0 auto;
  background: #199ed8;
}
.dv-img {
  width: 61px;
  height: 68px;
  margin: 0 auto;
  padding-top: 20px;
}
.dv-img img {
  width: 100%;
}
.login-wrap {
  position: relative;
  width: 100%;
  height: 100%;
  background-image: url(../../assets/img/login-bg.jpg);
  background-size: 100%;
}
.ms-title {
  text-align: center;
  border-width: 0px;
  /* position: absolute;
    left: 357px;
    top: 203px; */
  width: 350px;
  height: 47px;
  font-family: "微软雅黑 Bold", "微软雅黑 Regular", "微软雅黑";
  font-weight: 700;
  font-style: normal;
  font-size: 24px;
  color: #0099cc;
  line-height: 47px;
}
.ms-login {
  border-width: 0px;
  margin: 0 auto;
  width: 350px;
  height: 472px;
  position: relative;
  top: 50%; /*偏移*/
  transform: translateY(-50%);
  background: inherit;
  background-color: rgba(255, 255, 255, 1);
  border: none;
  border-left: 0px;
  border-right: 0px;
  border-bottom: 0px;
  border-radius: 0px;
  border-top-left-radius: 0px;
  border-top-right-radius: 0px;
  border-bottom-right-radius: 0px;
  border-bottom-left-radius: 0px;
  -moz-box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.349019607843137);
  -webkit-box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.349019607843137);
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.349019607843137);
  font-family: "微软雅黑 Bold", "微软雅黑 Regular", "微软雅黑";
  font-weight: 700;
  font-style: normal;
  font-size: 16px;
  color: #999999;
  text-align: left;
  line-height: 20px;
  background: #ffffff;
}
.ms-content {
  padding: 30px 30px;
}
.login-btn {
  text-align: center;
  border-width: 0px;
  font-size: 18px;
  width: 296px;
  word-wrap: break-word;
}
.login-btn button {
  width: 100%;
  height: 36px;
  margin-bottom: 10px;
}
.login-tips {
  font-size: 12px;
  line-height: 30px;
  color: #fff;
}
</style>