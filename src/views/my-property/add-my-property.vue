<!-- crated：2019-07-28  author：Monster  -->
<template>
    <div class='add-my-property'>
      <group>
        <popup-picker :title="'选择公司'" :data="list1" v-model="value1" :placeholder="'选择'"
                      @on-change="pickerChange1"></popup-picker>
        <popup-picker :title="'选择小区'" :data="list2" v-model="value2" :placeholder="'选择'"
                      @on-change="pickerChange2"></popup-picker>
        <popup-picker :title="'选择楼号'" :data="list3" v-model="value3" :placeholder="'选择'"
                      @on-change="pickerChange3"></popup-picker>
        <popup-picker :title="'选择房间号'" :data="list4" v-model="value4" :placeholder="'选择'"
                      @on-change="pickerChange4"></popup-picker>
      </group>
      <x-button class="next-button" @click.native="submit" type="primary">添加</x-button>
    </div>
</template>

<script>
import { Group, PopupPicker, XButton } from 'vux'
export default {
  name: 'add-my-property',
  components: {
    Group, PopupPicker, XButton
  },
  data: function () {
    return {
      allCom: [],
      list1: [[]],
      list2: [[]],
      list3: [[]],
      list4: [[]],
      value1: [],
      value2: [],
      value3: [],
      value4: [],
      selectOptions: {
        companyId: '',
        comId: '',
        floorId: '',
        houseId: ''
      }
    }
  },
  created () {
    this.$api.get('/HouseManage/AppGetCompanyAndCommunity').then(res => {
      let arr1 = []
      this.allCom = res.data
      arr1 = res.data.map((i, index) => {
        let obj = {}
        obj.name = i.name
        obj.value = i.name
        obj.id = i.id
        obj.options = i.communityList
        return obj
      })
      this.list1 = [arr1]
    })
  },
  methods: {
    pickerChange1 (e) {
      let arr = []
      let options = {}
      this.list1[0].forEach(i => {
        if (i.name === this.value1[0]) {
          options = i
          this.selectOptions.companyId = i.id
        }
      })
      arr = options.options.map(i => {
        let obj = {}
        obj.id = i.id
        obj.name = i.comname
        obj.value = i.comname
        return obj
      })
      console.log(options)
      this.list2 = [arr]
    },
    pickerChange2 (e) {
      let arr = []
      let options = {}
      this.list2[0].forEach(i => {
        if (i.name === this.value2[0]) {
          options = i
          this.selectOptions.comId = i.id
        }
      })
      this.getlou().then(res => {
        let arr = []
        arr = res.data.map(i => {
          let obj = {}
          obj.id = i.id
          obj.name = i.buildingname
          obj.value = i.buildingname
          return obj
        })
        this.list3 = [arr]
      })
    },
    pickerChange3 (e) {
      let arr = []
      let options = {}
      this.list3[0].forEach(i => {
        if (i.name === this.value3[0]) {
          options = i
          this.selectOptions.floorId = i.id
        }
      })
      this.getlou({type: 2, floorId: this.selectOptions.floorId}).then(res => {
        let arr = []
        arr = res.data.map(i => {
          let obj = {}
          obj.id = i.id
          obj.name = i.housenum
          obj.value = i.housenum
          return obj
        })
        this.list4 = [arr]
      })
    },
    pickerChange4 (e) {
      this.list4[0].forEach(i => {
        if (String(i.name) === String(this.value4[0])) {
          this.selectOptions.houseId = i.id
        }
      })
    },
    getlou (params) {
      return this.$api.get('/HouseManage/AppRoomQuery', {
        params: {
          type: 1,
          companyId: this.selectOptions.companyId,
          comId: this.selectOptions.comId,
          floorId: '',
          ...params
        }
      })
    },
    submit () {
      if (!this.selectOptions.companyId) {
        this.$vux.toast.text('请选择物业公司')
        return
      }
      if (!this.selectOptions.comId) {
        this.$vux.toast.text('请选择小区')
        return
      }
      if (!this.selectOptions.floorId) {
        this.$vux.toast.text('请选择楼号')
        return
      }
      if (!this.selectOptions.houseId) {
        this.$vux.toast.text('请选择房间号')
        return
      }
      let params = {}
      params.companyId = this.selectOptions.companyId
      params.roomId = this.selectOptions.houseId
      params.phone = JSON.parse(sessionStorage.getItem('userInfo')).phone
      params.userName = JSON.parse(sessionStorage.getItem('userInfo')).phone
      this.$api.post('/HouseManage/addRoom', {
        ...params
      }).then(res => {
        if (res.success) {
          this.$vux.toast.text('添加成功')
          this.$router.go(-1)
        }
      })
    }
  }
}
</script>
<style rel="stylesheet/less" lang="less">

    @import "../../styles/index.less";

    .add-my-property {
      .next-button {
        margin-top: .6rem;
        width: 7rem;
        position: fixed;
        bottom: .3rem;
        left: .25rem;
        height: .84rem;
        background: linear-gradient(178deg, rgba(74, 180, 254, 1) 0%, rgba(27, 141, 246, 1) 64%, rgba(6, 123, 248, 1) 100%);
      }
    }
</style>
