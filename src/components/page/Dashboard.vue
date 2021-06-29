<template>
  <div class="carManager">
    <div class="container">
      <el-container>
        <el-header>
          筛选查询
          <el-button
            type="primary"
            class="handle-btn1"
            icon="el-icon-search"
            style="margin-left: 10px"
            @click="lookClick"
            >查询</el-button
          >
        </el-header>
        <el-main>
          <span style="font-size: 14px">家庭编号：</span>
          <el-input
            placeholder="请输入家庭编号"
            v-model="familyNum"
            class="handle-input mr10"
            @input="inputMess"
          ></el-input>
          <span style="font-size: 14px">家庭住址：</span>
          <el-input
            placeholder="请输入家庭住址"
            v-model="familyAddress"
            class="handle-input mr10"
            @input="inputMess"
          ></el-input>
          <span style="font-size: 14px">户主姓名：</span>
          <el-input
            placeholder="请输入户主姓名"
            v-model="familyName"
            class="handle-input mr10"
            @input="inputMess"
          ></el-input>
        </el-main>
      </el-container>
      <el-container style="border: 1px solid #eee">
        <el-header> 数据列表 </el-header>
      </el-container>
      <!-- 数据列表 -->
      <el-table style="width: 100%" border :data="tableData" class="table">
        <el-table-column
          type="index"
          align="center"
          label="编号"
          class-name="table"
          width="90"
        ></el-table-column>
        <el-table-column
          prop="homeNumber"
          align="center"
          label="家庭编号"
          class-name="table"
        ></el-table-column>
        <el-table-column
          prop="homeAddress"
          align="center"
          label="家庭住址"
          class-name="table"
        ></el-table-column>

        <el-table-column
          prop="familyMasterName"
          align="center"
          label="户主姓名"
          class-name="table"
        ></el-table-column>
        <el-table-column
          prop="integralSum"
          align="center"
          label="家庭积分值"
          class-name="table"
        ></el-table-column>
        <el-table-column
          prop="integralSurplus"
          align="center"
          label="可兑换积分值"
          class-name="table"
        ></el-table-column>

        <el-table-column label="操作" align="center" class-name="table">
          <template slot-scope="scope">
            <el-button
              type="text"
              class="green"
              @click="coinShop(scope.$index, scope.row)"
              >兑换商品</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 分页 -->
    <div class="pagination">
      <el-pagination
        background
        :current-page="pageNum"
        :page-size="pageSize"
        @current-change="handleCurrentChange"
        :total="total"
        :page-sizes="[5, 10, 20, 40]"
        @size-change="handleSizeChange"
        layout="total, sizes, prev, pager, next, jumper"
      ></el-pagination>
    </div>

    <!-- 兑换弹出框开始 -->
    <el-dialog title="商品兑换" :visible.sync="editTable" width="80%">
      <el-form ref="editRole" label-width="100px">
        <!-- 兑换查询 -->
        <el-container>
          <el-header>
            筛选查询
            <el-button
              type="primary"
              class="handle-btn1"
              icon="el-icon-search"
              style="margin-left: 10px"
              @click="chooseMessage"
              >查询</el-button
            >
          </el-header>
          <el-main>
            <span style="font-size: 14px">商品名称：</span>
            <el-input
              placeholder="请输入商品名称"
              v-model="shopMessage"
              class="handle-input mr10"
            ></el-input>
          </el-main>
        </el-container>
        <el-container style="border: 1px solid #eee">
          <el-header> 数据列表 </el-header>
        </el-container>
        <!-- 兑换商品信息 -->
        <el-table
          ref="multipleTable"
          :data="role"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" > </el-table-column>
          <el-table-column type='index' label="编号" >
          </el-table-column>
          <el-table-column prop="name" label="商品图片" >
              <template slot-scope="scope">
                <img :src="scope.row.shopImg" alt="" style="width:80px;height:100px">
              </template>
          </el-table-column>
          <el-table-column prop="shopName" label="商品名称" >
          </el-table-column>
          <el-table-column prop="shopIntegral" label="兑换积分值" >
          </el-table-column>
          <el-table-column prop="trueResidual" label="剩余库存" >
          </el-table-column>
        </el-table>
      </el-form>
      <div class="inteGral_box">
        <div class="inteGral">
          <p class="inteGral_p">{{allIntegral}}</p>
          <p>用户总积分</p>
        </div>
        <div class="inteGral">
          <p class="inteGral_p">{{trueIntegral}}</p>
          <p>可兑换积分数</p>
        </div>
        <div class="inteGral">
          <p class="inteGral_p">{{chooseIntegral}}</p>
          <p>已选择积分数</p>
        </div>
      </div>
      <div class="exchangePerson">
        <span class="exchangePerson_span">兑换人:</span>
        <el-select v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.id"
            :label="item.nickName"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editTable = false">取 消</el-button>
        <el-button type="primary" @click="saveWEdit">确认兑换</el-button>
      </span>
    </el-dialog>
    <!-- 编辑弹出框结束 -->
  </div>
</template>
<script>
import { family } from "../../api/index";
export default {
  data() {
    return {
      familyNum: "", //家庭编号
      familyAddress: "", //家庭住址
      familyName: "", //家庭户主姓名
      tableData: [], //表格数据
      pageSize: 10,
      pageNum: 1,
      total: 0,
      editTable: false,
      editRole: [],
      shopMessage: "", //商品信息
      role: [], //兑换商品列表
      value: "", //兑换人
      options: [], //所有兑换人
      allIntegral:0,//总积分
      trueIntegral:0,//可以兑换积分
      chooseIntegral:0,//已选择兑换积分
      requestList:[],//兑换商品ID列表
    };
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      const arr = {
        number1: "",
        string1: "",
        string2: "",
        pageNum:this.pageNum,
        pageSize:this.pageSize,
        id1:localStorage.getItem('intergral-address')
      };
      family.familyList(arr).then((res) => {
        console.log(res);
        if(res.data.code == 200){
          this.tableData = res.data.data.list;
          this.total = res.data.data.total
        }else if(res.data.code == 504){
            this.$router.push("/")
        }else{
          this.tableData = 0;
          this.total = []
        }
      });
    },
    //兑换商品
    coinShop(index,row) {
      console.log("33333333",row)
      this.editTable = true; 
      this.allIntegral = row.integralSum
      this.trueIntegral = row.integralSurplus
      family.shopList({ string1: '',id1: 1, }).then((res) => {
        console.log(res)
        this.role = res.data.data;
      });
      family.familyPeople({string1:row.homeNumber}).then(res=>{
        console.log("家庭成员",res)
        this.options = res.data.data
      })
    },
    //商品选中
    handleSelectionChange(val){
      console.log(val)
      if(this.role.length >= 0){
         let num = 0
        val.forEach((item,index) => {
          num +=item.shopIntegral
          return num
        });
        this.requestList = val.map((item,index,arr) =>{
          return item.id
        })
        this.chooseIntegral = num
      }
     
    },
    //筛选查询
    lookClick() {
      const arr = {
        string3: this.familyNum,
        string1: this.familyAddress,
        string2: this.familyName,
        id1:localStorage.getItem('intergral-address')
      };
      family.familyList(arr).then((res) => {
        console.log(res);
        this.tableData = res.data.data;
      });
    },
    //input值 为空
    inputMess() {
      if (
        this.familyNum == "" &&
        this.familyAddress == "" &&
        this.familyName == ""
      ) {
        this.getData();
      }
    },
    //兑换商品筛选
    chooseMessage() {
        family.shopList({ string1: this.shopMessage,id1:1 }).then((res) => {
        this.role = res.data.data;
      });
    },
    //确认兑换
    saveWEdit() {
      if(this.chooseIntegral>this.trueIntegral){
         this.$message({
          message: '您选择积分大于您可用积分,请重新选择',
          type: 'warning'
        });
      }else if (this.chooseIntegral == ''){
         this.$message({
          message: '请选择需要兑换的商品',
          type: 'warning'
        });
      }else if(this.value == ''){
        this.$message({
          message: '请选择兑换人',
          type: 'warning'
        });
      }
      else {
        family.convenHandel({id1:this.value,requestList:this.requestList}).then(res=>{
          console.log("兑换成功",res)
          if(res.data.code  == 200){
              this.getData()
              this.editTable = false
              this.requestList = []
              this.value = ''
          }else {
             this.$message({
          message: res.data.msg,
          type: 'warning'
        });
          }
        })
      }
    },
    handleCurrentChange(val) {
      console.log(val)
      this.pageNum = val
      this.getData()
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.getData()
    },
  },
};
</script>
<style>
.el-upload {
  width: 180px;

  line-height: 0;
}
</style>
<style scoped>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.el-header {
  height: 50px !important;
  background-color: #f3f3f3;
  line-height: 50px;
  font-size: 13px;
}
.handle-btn {
  float: right;
}
.handle-btn1 {
  float: right;
  margin-top: 9px;
}
.handle-input {
  width: 250px;
  display: inline-block;
}
.mr10 {
  margin-right: 10px;
}
.table {
  font-size: 14px;
}
.elipt {
  width: 60%;
}
.el-main1 {
  font-size: 13px;
  padding: 1px 0 0 0;
  color: #bcbcbc;
}
.elbtn {
  background: #f2f2f2;
  color: #bcbcbc;
  border-color: #e4e4e4;
}
.el-upload--text {
  width: 60px;
  height: 30px;
  display: inline-block;
  border: 0;
  overflow: visible;
}
.upload-demo {
  height: 30px;
  width: 100px;
  display: inline-block;
  margin-left: 10px;
}
.inteGral {
  /* text-align: center; */
  width: 180px;
  font-size: 30px;
  font-weight: bold;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
  margin-right: 40px;
}
.inteGral_p {
  margin-bottom: 10px;
}
.inteGral_box {
  display: flex;
}
.exchangePerson {
  margin-top: 30px;
  font-size: 19px;
  margin-left: 10px;
}
.exchangePerson_span {
  margin-right: 15px;
}
</style>