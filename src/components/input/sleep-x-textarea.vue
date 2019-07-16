<!-- crated：2018/12/24  author：Monster  -->
<script>
import {XTextarea} from 'vux'
export default {
  name: 'index',
  extends: XTextarea,
  created () {
    this.$on('on-blur', () => {
      // 处理 ios 键盘顶起 UI 问题
      // console.log('处理 ios 键盘顶起 UI 问题')
      window.scrollTo(0, 0)
    })
  }
}
</script>
