<!-- crated：2018/12/24  author：Monster  -->
<script>
import {XInput} from 'vux'
export default {
  name: 'index',
  extends: XInput,
  methods: {
    onBlur ($event) {
      // 处理 ios 键盘顶起 UI 问题
      // console.log('处理 ios 键盘顶起 UI 问题')
      window.scrollTo(0, 0)
      this.setTouched()
      this.validate()
      this.isFocus = false
      this.$emit('on-blur', this.currentValue, $event)
    }
  }
}
</script>
